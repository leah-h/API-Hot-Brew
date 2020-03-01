// Firebase Firestore database
// Initialize on cloud functions

const admin = require('firebase-admin');

let serviceAccount = './.env';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();


const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const firebase = require('firebase');
const cors = require('cors')
const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

 
app.get('/', function (req, res) {
  res.send('Hello World 123...')
})

app.get('/api/users', async (req, res) => {
 
  let usersRef = db.collection('users');
  let users = [];
  let allUsers = await usersRef.get()
  if (allUsers) {
    allUsers.forEach((doc) => {
      users = {...users, [doc.id]: {...doc.data()} }
    })
  }
  res.send(users);
  
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
  
app.get('/api/products', async (req, res) => {
  let productsRef = db.collection('products');
  let products = [];
  let allProducts = await productsRef.get()
  if (allProducts) {
    allProducts.forEach((doc) => {
      products = {...products, [doc.id]: {...doc.data() } }
   
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
 
  let queryProduct = await db.collection('products').doc(id).get()
    .then(snapshot => {
      res.send(snapshot.data());    
    })

  .catch(err => {
    console.log('Error getting documents', err);
  });
  
})



// Delete an item from products
  app.delete('/api/products/delete/:id', async (req, res) => {
    
    let id = req.params.id;
    
    await db.collection('products').doc(id).delete()
      .then( () => {
      res.status(200).send('Item sucessfully deleted.');
  }) 
      .catch(err => {
    console.log('Error deleting document', err);
      });
    
  })


// Add new item to products  
app.post('/api/products/new', async (req, res) => {

    let data = {
    
      'category': req.body.category,
      'description': req.body.description,
      'flavorProfile': req.body.flavorProfile,
      'imageUrl': req.body.imageUrl,
      'name': req.body.name,
      'price': req.body.price,
      'product_id': req.body.product_id,
      'size': req.body.size,
      'type': req.body.type
    }
     
    await db.collection('products').doc().set(data)
      .then(() => {
        res.status(200).send('Item sucessfully added to db.');
      })
      .catch(error => {
        console.log(error);
      })
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
    'name': req.body.name,
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
  




 
const port = process.env.PORT || 3001 ;
app.listen(port, () => console.log(`Listening on port ${port}`));