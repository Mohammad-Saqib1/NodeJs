// import { useEffect, useState } from "react";
// import SignUpForm from './SignUpForm.jsx';
import { getToken, onMessage } from "firebase/messaging";
import { messaging, notificationListener } from "../firebase.js";
// import "./App.css";

// function App() {
//   useEffect(() => {
//     onMessage(messaging, (payload) => {
//       console.log("Message received. ", payload);
//     });
//   }, []);
//   return (
//     <>
//       <h1>Hey there </h1>
//       {/* <SignUpForm /> */}
//     </>
//   );
// }

// export default App;


import React,{useEffect} from 'react';

const App = () => {

  const handleSendNotification = async () => {
    try {
      // Retrieve device token from localStorage
      const deviceToken = localStorage.getItem('deviceToken');

      // Make a GET request to server to send notification
      const response = await fetch('https://xebiapushnotification.onrender.com/sendNotification/ddZJWiOSh42kfNF0jXfNU8:APA91bEF7-2gTGYOsbd7lfsccuswmlrLh2G0BsHfQHOH7BWzzvWpAQ9d_yLjVQUcmX0c_qdrFnKGKbTf2xKxS92HjSjpOWvmTLobqAdWhiJ9-HMAAsx6qSWoFncC_r5ZGz3JWB-Z0j1w', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to send notification');
      }
    } catch (error) {
      console.log('Error sending notification:', error);
    }
  };

  return (
    <button onClick={handleSendNotification}>Send Notification</button>
  );

};

export default App;

