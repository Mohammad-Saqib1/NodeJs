import express from "express";
import User from "./db.js";
// import { sendNotification } from "./firebaseFunctions.js";
import admin from "firebase-admin";
import serviceAccount from "./fbserviceacc.json" assert { type: "json" };

const app = express();
app.use(express.json());



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/subscribe", (req, res) => {
  const payload = req.body;
  res.send({});
});

app.get("/sendNotification/:id", (req, res) => {
  console.log("hey");
  const message = {
    notification: {
      title: "New Message",
      body: "You have a new message!",
    },
    token: req.params.id,
  };

  admin
    .messaging()
    .send(message)
    .then((response) => {
      res.send(JSON.stringify(response));
    })
    .catch((error) => {
      // throw new Error(error);
      res.send(JSON.stringify(error));
    });
  // sendNotification(message)
  //   .then((response) => {
  //     res.send(JSON.stringify(response));
  //   })
  //   .catch((error) => {
  //     res.send(JSON.stringify(error));
  //   });
});

app.listen(3000, () => {
  console.log("server is running on port ", 3000);
});










