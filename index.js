const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const path = require("path");
const Razorpay = require("razorpay");
const cors = require("cors");
const port = process.env.PORT || 5000;
const razorinstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
app.use(express.json());
app.use(cors());
app.post("/razorpay", async (req, res) => {
  const payment_capture = 1;
  const amount = 500;
  const currency = "INR";

  const options = {
    amount: amount * 100,
    currency,
    receipt: "order_rcptid_11",
    payment_capture,
  };

  try {
    const response = await razorinstance.orders.create(options);
    res.json({
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "razorpay.png"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
