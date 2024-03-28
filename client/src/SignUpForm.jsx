import React, { useState ,useEffect} from 'react';
import {firebase} from '../firebase.js';


const firebaseConfig = {
  apiKey: "AIzaSyANnVa9mNu_anvXDVemL6MIIkMflo6PYAo",
  authDomain: "notifications-b71c0.firebaseapp.com",
  projectId: "notifications-b71c0",
  storageBucket: "notifications-b71c0.appspot.com",
  messagingSenderId: "94530273085",
  appId: "1:94530273085:web:40871903998efaca888f54",
  measurementId: "G-FPBC9TYNYT"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

const AuthComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        // Fetch user data from Firestore
        const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          console.log('Fetched user data:', userData); // Log fetched user data
          setName(userData.name);
          setAge(userData.age);
        } else {
          console.log('User data not found in Firestore');
        }
      }
    });
  
    return () => unsubscribe();
  }, []);

  const handleSignUp = async () => {
    try {
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
  
      // Retrieve the device token
      const messaging = firebase.messaging();
      const token = await messaging.getToken();
      
      // Store user data in Firestore
      await firebase.firestore().collection('users').doc(userCredential.user.uid).set({
        name,
        age: parseInt(age),
        deviceToken: token, // Store the device token
      });
  
      console.log('User signed up:', userCredential.user);
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };
  

  const handleSignIn = async () => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log('User signed in:', userCredential.user);
    } catch (error) {
      console.error('Error signing in:', error.message);
    }
  };

  const handleEmailChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleAgeChange = (event) => setAge(event.target.value);

  const handleSignUpSubmit = (event) => {
    event.preventDefault();
    handleSignUp();
  };

  const handleSignInSubmit = (event) => {
    event.preventDefault();
    handleSignIn();
  };

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName} ({user.email})!</p>
          {name && <p>Name: {name}</p>}
          {age && <p>Age: {age}</p>}
          {user.deviceToken && <p>Device Token: {user.deviceToken}</p>}
          <button onClick={() => firebase.auth().signOut()}>Sign Out</button>
        </div>
      ) : (
        <div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignUpSubmit}>
            <input type="text" value={name} onChange={handleNameChange} placeholder="Name" />
            <input type="number" value={age} onChange={handleAgeChange} placeholder="Age" />
            <input type="email" value={email} onChange={handleEmailChange} placeholder="Email" />
            <input type="password" value={password} onChange={handlePasswordChange} placeholder="Password" />
            <button type="submit">Sign Up</button>
          </form>
  
          
        </div>
      )}
    </div>
  );
  
};

export default AuthComponent;
