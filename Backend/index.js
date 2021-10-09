const express = require("express");
const shortid = require("shortid");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const cors = require("cors");
const { urlencoded } = require("express");
const admin = require("firebase-admin");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
const serviceAccount = {
  type: "service_account",
  project_id: "bflixdot",
  private_key_id: "140a2f43057ef7bcc2ec75862a1bd9b5dd2c1ee9",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCjXU+NDs0B2Kul\nyw5jvlPWz7KyAt6Fu8d5aSTfB5c1237eFGGpTgj+l79phW5LXOeKs9in4eIZN6BN\n6lxh5QOjwNc2ueC2iluMp2De24qPnFdzEfIWBWe0UvaBzzHf3mOgJ1j0IW41cArw\nUkURnEs8UbuSjKhJDskdcVtw0bU+CjGQMnfAZ40e5W5cqlb0TyTLhwUpQBzu0MCO\n6vKKU4CuSKioq6I5z/7F8+Qp7nIHONWjpcL2g/38ksJUcEswH1+C/bQxhg0gB0wy\nPm613lxqlDLrljgH/wJxho5z3+XEdtI4ztlv08a8/E72yMBP0phUmSu+IMRz3LGf\nrEValjozAgMBAAECggEAON9RxAI8laF4NEpKMqg+aMC67aT5EearDZXwq6JpXmsR\nMkA3NalAkV2D2jkFCkCILS3qRZvqSiwm5ykpSz1etIH8ioVQeUwWjhNxMnSMuu1L\nNnivZkIwdcMSJWPb8Ztq5IT+P1NqGjls3XhOqlBWkuPDYMQODA0VL+ZYVqDzL2rv\nf0wH/cKmQo0aiCyzpY5TD7gz4lTjncYYYyFkuDvNCwYvDnM6yUNXfIBKhdVJXnrM\nC6dDlhAiCKadLas/sr4JAOPOeI6xSYVw0BPo6iII3l0NaQMsNzBBo2S4n2sN3BcN\n+r8RvWDjhdbdQp+Y3h/WV/eajzT/g1jUXsoice20DQKBgQDXD+3rryRIFX868U4r\nomh8oixaMjAqdXvY+5tsgbBa833BR6xRgXf5puy95QHsePAwv9ZQ0gWiuZNu/1+o\ndM5hL9qidJAi1SCLFzMO74Ej0vRtYFw2PD7WoE6kwI6SZNviuuwMLVA9Egp5E7cf\n9gv23ITtNe6kRPur6zc/1jArjQKBgQDCdiE40dffe924VtdA/UP52fpRFVZsYGoP\nFe+VuV7IordyWSJapnfdznknjuWVz6y1LUofM/bP/YqKGgj5Pc1I/2U1shBQI10U\n06bg2UbaZGdXSoMCoLWZC+zjIRuTnr5c//g3VqXAAAwhJfMsl66xOYlz5JhytKJQ\nfOHYkq+svwKBgHZ/6XnWzGgHqE5DDe6PE4GxHj0osE+E4pPht3cnUpQa3Gz2YCWc\n8A2Yg5Pyroes77P80EtCHibWmD0t63h3vAvjAVZIYe8/fioFw3V0VLT3lQT7dnPP\n6FP8irjO/P//IQWiN1RSV4b+/NRQH7Q1r8v7ICdQc0kCVaYZ+hxrmak1AoGBAK2V\nj2BOCPoocqnrcuhDa9trFcQtXOEPS3094ojvWMmWXlTHdiAfOx6XAZUrPIt3Pz7X\nN7QUybuuIm3Wga4i2c3QlQLSeTdf6eX+bJeHvHSUbZ8BF2NQG+qLN6Ej257xdBJG\nN8cGJJz4LdulKaXjnH/80VLPernhvoZEg8G0Zva3AoGBAIJ7K1yj+2odtsYOu2ta\nbIsAYu3XqgRLD2Bl0KL5Wz+Fdhuei5FZMsp/ilUcv75xJbQfaThfm4Vy6HU13h8w\ncX1VqCMbG/wmy3lYt0HNUNUv7y8E+j1V5jWZP24W1bsfDo60s8LjvZErA0UZG58O\n5gPOkYJHLhSKLoTJFD1laoQe\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-9k149@bflixdot.iam.gserviceaccount.com",
  client_id: "101209707476848543644",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9k149%40bflixdot.iam.gserviceaccount.com",
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
db.settings({ timestampsInSnapshots: true });

const plans = [
  { description: "Basic Plan", amount: "299", currency: "INR" },
  { description: "Standard", amount: "499", currency: "INR" },
  { description: "Advanced", amount: "799", currency: "INR" },
];

var instance = new Razorpay({
  key_id: "rzp_test_6GB0TI3RDdxRbo",
  key_secret: "lihofpGH6w5un2LOiou1I38O",
});

const paymentsRef = db.collection("payments");

app.post("/verification", async (req, res) => {
  // after the payment the razorpay server sends a response with details to our api end point
  const secret = "biplab@razorpay";

  // verifying if the payment was done from razor server only
  const shasum = crypto.createHmac("sha256", secret);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  if (digest === req.headers["x-razorpay-signature"]) {
    // verified payment so now update user database with payment details
    const snapshot = await paymentsRef
      .where("oid", "==", req.body.payload.payment.entity.order_id)
      .get();
    const userId = snapshot.docs[0].id;
    await paymentsRef.doc(userId).set(
      {
        paymentDetails: {
          id: req.body.payload.payment.entity.id,
          amount: req.body.payload.payment.entity.amount / 100,
          created_at: req.body.payload.payment.entity.created_at,
          currency: req.body.payload.payment.entity.currency,
          email: req.body.payload.payment.entity.email,
          description: req.body.payload.payment.entity.description,
          method: req.body.payload.payment.entity.method,
        },
      },
      {
        merge: true,
      }
    );

    res.status({ status: "ok" });
  } else {
    res.status(501).json({ msg: "wrong server requesting payment" });
  }
});

app.post("/razorpay", async (req, res) => {
  // the endpoint sends back an order object with the id and in frontend with checkout form
  // the orderid is mapped for payment and if its successful it will hit the /verification endpoint

  //this has details of the object and it should be stored in server as it can be manipulated in frontend
  // usually fetched from the database

  const currentPlan = plans[req.body.id - 1];
  // ideally should be fetched from the database from collection plans with id

  const option = {
    amount: currentPlan.amount * 100,
    currency: currentPlan.currency,
    payment_capture: 1,
    receipt: shortid.generate(),
  };

  try {
    const response = await instance.orders.create(option);
    //create user with uid and order id that is generated
    await paymentsRef.doc(req.body.uid).set({
      oid: response.id,
      planid: req.body.id,
    });

    res.json({
      id: response.id,
      amount: response.amount,
      currency: response.currency,
      receipt: response.receipt,
      description: currentPlan.description,
    });
  } catch (error) {
    // res.status(500).json({ error: error.message });
    console.log(error.message);
  }
});

const port = 5000 || process.env.PORT;

app.listen(port, () => {
  console.log("Listening on port " + port);
});
