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

const convertCollectionSnapshotUsersToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { displayName, email } = doc.data();

    return {
      routeName: encodeURI(email.toLowerCase()),
      id: doc.id,
      displayName,
      email
    }
  })
}

app.get('/api/users', async function (req, res) {
 
  let usersRef = db.collection('users');
  let users = [];
  let allUsers = await usersRef.get()
  if (allUsers) {
    allUsers.forEach((doc) => {
      users.push(doc.id, '=>', doc.data());
    })
  }
  res.send(users);
  
  })
 
const port = 3001 ;
app.listen(port, () => console.log(`Listening on port ${port}`));