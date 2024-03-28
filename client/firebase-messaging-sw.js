importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyANnVa9mNu_anvXDVemL6MIIkMflo6PYAo",
  authDomain: "notifications-b71c0.firebaseapp.com",
  projectId: "notifications-b71c0",
  storageBucket: "notifications-b71c0.appspot.com",
  messagingSenderId: "94530273085",
  appId: "1:94530273085:web:40871903998efaca888f54",
  measurementId: "G-FPBC9TYNYT"
};
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
