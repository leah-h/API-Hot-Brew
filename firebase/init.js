// <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.8.2/firebase-app.js"></script>

//<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.8.2/firebase-analytics.js"></script>


 
  var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "api-hot-brew.firebaseapp.com",
    databaseURL: "https://api-hot-brew.firebaseio.com",
    projectId: "api-hot-brew",
    storageBucket: "api-hot-brew.appspot.com",
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID 
  };
 
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
    
