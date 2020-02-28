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

app.get('/api/products/:id', async (req, res) => {

  let id = req.params.id
  console.log(id);

  let productsRef = db.collection('products');
  let product = [];
  let queryProduct = await productsRef.doc(id).get()
    .then(snapShot => {
      res.send(snapShot.data());    
    })

  .catch(err => {
    console.log('Error getting documents', err);
  });
  
})

app.get('/api/products/:category', async (req, res) => {

})
 
const port = process.env.PORT || 3001 ;
app.listen(port, () => console.log(`Listening on port ${port}`));