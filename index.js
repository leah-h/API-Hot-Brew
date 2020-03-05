// Firebase Firestore database
// Initialize on cloud functions
const admin = require('firebase-admin');

// let serviceAccount = './.env';

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

admin.initializeApp();

let db = admin.firestore();

const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const firebase = require('firebase');
const cors = require('cors')
const path = require('path')
const app = express()

app.use(cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));


app.get('/', function (req, res) {
  res.send('Hello World 123...')
})

app.get('/api/users', async (req, res) => {

  let usersRef = db.collection('users');
  let users = [];
  let allUsers = await usersRef.get()
  if (allUsers) {
    allUsers.forEach((doc) => {
      users.push(doc.data());
    })
    res.send(users);
  }
  
})

app.get('/api/users/:id', async (req, res) => {
  let id = req.params.id
 
  let usersRef = db.collection('users');
  let queryUser = await usersRef.doc(id).get()
    .then(snapshot => {
      res.send(snapshot.data());    
    })

  .catch(err => {
    console.log('Error getting documents', err);
  });
  
})

// Update user
app.put('/api/users/update/:id', async (req, res) => {

  let id = req.params.id;
  let data = {
    'email': req.body.email,
    'displayName': req.body.displayName,
    'address': req.body.address,
    'city': req.body.city,
    'zip': req.body.zip
  }
  console.log(data);
     
    await db.collection('users').doc(id).update(data)
      .then(() => {
        res.status(200).send('User info sucessfully updated');
      })
      .catch(error => {
        console.log(error);
      })
}) 
  
app.get('/api/products', async (req, res) => {
  let productsRef = db.collection('products');
  let products = [];
  let allProducts = await productsRef.get()
  if (allProducts) {
    allProducts.forEach((doc) => {
      products.push({
        productId: doc.id,
        ...doc.data()
        });
    })
  }
  res.send(products);

})

// Get item by category
app.get('/api/products/category/:category', async (req, res) => {

  let category = req.params.category;
  
  let itemsByCategory = [];
  
  await db.collection('products').where('category', '==', category).get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        itemsByCategory.push(doc.data())
      })
      res.send(itemsByCategory);
    })

    .catch(err => {
      console.log('Error getting documents', err);
    });

})

// Get an item from db
app.get('/api/products/:id', async (req, res) => {

  let id = req.params.id

  let productsRef = db.collection('products').doc(id);

  let queryProduct = await productsRef.get()
    .then(snapShot => {
      res.send(snapShot.data());
    })
        .catch(err => {
          console.log('Error getting documents', err);
        });
  
    })


  // Add new item to products table
  app.post('/api/products/new', async (req, res) => {

    let data = {
      category: req.body.category,
      description: req.body.description,
      flavorProfile: req.body.flavorProfile,
      imageUrl: req.body.imageUrl,
      name: req.body.name,
      price: req.body.price,
      product_id: req.body.product_id,
      size: req.body.size,
      type: req.body.type
    }
  
    await db.collection('products').doc().set(data)
      .then(() => {
        res.status(200).send('item added to db')
      })
      .catch(error => {
        res.status(404).send('item NOT added to db');
      })
  })

  //GET products by category
  app.get('/api/products/category/:category', async (req, res) => {

    let category = req.params.category;
  
    let itemsByCategory = [];
  
    await db.collection('products').where('category', '==', category).get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          itemsByCategory.push(doc.data())
        })
        res.send(itemsByCategory);
      })

      .catch(err => {
        console.log('Error getting documents', err);
      });

  })

  //DELETE product by id
  app.delete('/api/products/delete/:id', async (req, res) => {
    
    let id = req.params.id;
    
    await db.collection('products').doc(id).delete()
      .then(() => {
      
        res.status(200).send('Item sucessfully deleted.');
      })
      .catch(err => {
        console.log('Error deleting document', err);
      });
    
  })
  
  // Update an item by id
  // handle item.key must not be empty, handle on FE if key is not empty, 
  // send previous values as update values
  app.put('/api/products/update/:id', async (req, res) => {

    let id = req.params.id;
    let data = {
      'category': req.body.category,
      'description': req.body.description,
      'flavorProfile': req.body.flavorProfile,
      'imageUrl': req.body.imageUrl,
      'productName': req.body.productName,
      'type': req.body.type,
      'price': req.body.price,
      'product_id': req.body.product_id,
      'size': req.body.size
    }
     
    await db.collection('products').doc(id).update(data)
      .then(() => {
        res.status(200).send('Item sucessfully updated');
      })
      .catch(error => {
        console.log(error);
      })
  })

  // Get all reviews
  app.get('/api/reviews', async (req, res) => {
    let reviewsRef = db.collection('reviews');
    let reviews = [];
    let allReviews = await reviewsRef.get()
    if (allReviews) {
      allReviews.forEach((doc) => {
        reviews.push({
          // productId: doc.id,
          ...doc.data()
        });
  
      })
    }
    res.send(reviews);
  })

  // get reviews by product
  app.get('/api/reviews/:productId', async (req, res) => {
  
    let productId = req.params.productId;
    let reviewsRefByItem = db.collection('reviews').where('productId', '==', productId);
    let reviewsByItem = [];
    let allReviewsByItem = await reviewsRefByItem.get()
    if (allReviewsByItem) {
      allReviewsByItem.forEach((doc) => {
        reviewsByItem.push({
          productId: doc.id,
          ...doc.data()
        });
      })
    }
    res.send(reviewsByItem);
  })

  // Add a review to an item
  app.post('/api/reviews/new', async (req, res) => {

    let data = {
      'userId': req.body.userId,
      'productId': req.body.productId,
      'review': req.body.review
    }
     
    await db.collection('reviews').doc().set(data)
      .then(() => {
        res.send('Item review sucessfully submitted to db.');
      })
      .catch(error => {
        console.log(error);
      })
  })  

// Update a review
app.put('/api/reviews/update/:id', async (req, res) => {

    let id = req.params.id;
     let data = {
      'userId': req.body.userId,
      'productId': req.body.productId,
      'review': req.body.review
    }
     
    await db.collection('reviews').doc(id).update(data)
      .then(() => {
        res.status(200).send('Item sucessfully updated');
      })
      .catch(error => {
        console.log(error);
      })
  })

// Get all orders
app.get('/api/orders', async (req, res) => {
  let ordersRef = db.collection('orders');
    let orders = [];
    let allOrders = await ordersRef.get()
    if (allOrders) {
      allOrders.forEach((doc) => {
        orders.push({
          ...doc.data()
        });
  
      })
      res.send(orders); 
    } else {
      res.send('item NOT added to db');
    }
     
})

// Get orders by user
app.get('/api/orders/:userId', async (req, res) => {
  let userId = req.params.userId;
  let ordersRefByUser = db.collection('orders').where('userId', '==', userId);
  let ordersByUser = [];
  let allOrdersByUser = await ordersRefByUser.get()
    if (allOrdersByUser) {
      allOrdersByUser.forEach((doc) => {
        ordersByUser.push({
          productId: doc.id,
          ...doc.data()
        });
      })  
      res.send(ordersByUser);
    }   
})




 
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Listening on port ${3001}`));