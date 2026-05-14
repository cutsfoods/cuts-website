import express from "express";

import cors from "cors";

import Razorpay from "razorpay";

import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

const razorpay = new Razorpay({

  key_id:
    process.env
      .RAZORPAY_KEY_ID,

  key_secret:
    process.env
      .RAZORPAY_KEY_SECRET,

});

app.post(
  "/create-order",
  async (req, res) => {

    try {

      const options = {

        amount:
          req.body.amount * 100,

        currency: "INR",

        receipt:
          "receipt_order_" +
          Math.random(),

      };

      const order =
        await razorpay.orders.create(
          options
        );

      res.json(order);

    } catch (error) {

      console.log(error);

      res.status(500).send(
        error
      );

    }

  }
);

app.listen(
  5000,
  () => {

    console.log(
      "Server running on port 5000"
    );

  }
);