// Firebase Firestore database
// Initialize on cloud functions

const admin = require('firebase-admin');

let serviceAccount = './.env';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

let db = admin.firestore();


const express = require('express')
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

app.get('api/users', function (req, res) {
  let users = [];
  let usersRef = db.collection('users');
  let allUsers = usersRef.get()
    .then(snapshot => { 
      snapshot.forEach(doc => {
      console.log(doc.id, '=>', doc.data());
      });

      res.send(allUsers);
      console.log(allUsers);
      })
  
    .catch(err => {
      console.log('Error getting documents', err);
    });

  })
 
const port = 3001 ;
app.listen(port, () => console.log(`Listening on port ${port}`));