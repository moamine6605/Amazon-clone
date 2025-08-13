const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_API_KEY)

// API



// APP config

const app = express();

// middlewares

app.use(cors({origin:true}));
app.use(express.json());

// api rouutes

app.get('/', (request, response)=>response.status(200).send('hello world'))

// listen command

express.api = functions.https.onRequest(app)