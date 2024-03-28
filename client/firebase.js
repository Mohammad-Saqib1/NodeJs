// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import firebase from 'firebase/compat/app'; // Updated import statement
import 'firebase/compat/auth'; // Updated import statement
import 'firebase/compat/firestore';
import 'firebase/compat/messaging'; 
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
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const requestPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      getToken(messaging, {
        vapidKey:
          // "BBiX5N0c0gedE5ZuMSaz2GEAczNTEMzX6gmWkN2wc5wLxjbO2sQFYRwsrrALMh1smwd4htaCu2o9MFjuwdJwclc",
          "BNGmN2vGD_hWb94PXh0e9c5Az9imlxzFXVFy8IH6ARF5sMsIa0jsWhVgu7yYacMzGyJ6rdmrrtNv27dAJLx-eE0",
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("current token for client: ", currentToken);
            localStorage.setItem('deviceToken', currentToken);
          } else {
            console.log(
              "No registration token available. Request permission to generate one."
            );
          }
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });
    }
  } catch (error) {
    console.error(error);
  }
};

await requestPermission();

const notificationListener = () => {
  return onMessage(messaging, (payload) => {
    console.log("Message received:", payload);
    return payload;
  });
};

export { app, messaging, notificationListener ,firebase};



