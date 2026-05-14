import React from "react";
import {
  CartContext,
} from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db }
  from "../firebase";

export default function Payment() {
    const navigate = useNavigate();
const {
  totalPrice,
} = React.useContext(
  CartContext
);

const freeDeliveryThreshold = 499;

const deliveryFee =
  totalPrice >=
  freeDeliveryThreshold
    ? 0
    : 9;

const handlingFee = 0;

const finalTotal =
  totalPrice +
  deliveryFee +
  handlingFee;
  const handleRazorpayPayment =
  async () => {

    try {

      const response =
        await fetch(
          "http://localhost:5000/create-order",
          {

            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({

              amount:
                finalTotal,

            }),

          }
        );

      const order =
        await response.json();

      const options = {

        key:
          import.meta.env
            .VITE_RAZORPAY_KEY_ID,

        amount:
          order.amount,

        currency:
          order.currency,

        name: "CUTS",

        description:
          "Food Order Payment",

        order_id:
          order.id,

        handler:
          async function (
            response
          ) {

    try {

  const orderData =
    JSON.parse(
      localStorage.getItem(
        "pendingOrder"
      )
    );

  const docRef =
    await addDoc(

      collection(
        db,
        "orders"
      ),

      {

        ...orderData,

        paymentId:
          response
            .razorpay_payment_id,

        status:
          "Preparing",

        createdAt:
          serverTimestamp(),

      }

    );

  localStorage.setItem(

    "currentOrderId",

    docRef.id

  );

  alert(
`Payment Successful ✅

Order Placed Successfully 🚀

Order ID:
${orderData.orderId}`
  );

  navigate(
    "/track-order"
  );

} catch (error) {

  console.log(error);

}

          },

        theme: {
          color: "#00ff66",
        },

      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();

    } catch (error) {

      console.log(error);

    }

  };
  return (

    <div className="bg-black min-h-screen text-white px-6 py-10">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-black text-green-400">

          Payment Options

        </h1>

        {/* TO PAY */}

        <div className="mt-8 bg-[#111111] border border-green-900 rounded-3xl p-6 flex justify-between items-center">

          <p className="text-2xl font-bold">

            To Pay

          </p>

          <p className="text-4xl font-black text-green-400">

            ₹{finalTotal}

          </p>

        </div>

        {/* UPI */}

        <div className="mt-10 bg-[#111111] border border-green-900 rounded-3xl p-6">

          <h2 className="text-2xl font-bold text-white">

            Pay By UPI

          </h2>

          <div className="mt-6 space-y-4">

              <button
  onClick={
    handleRazorpayPayment
  }
  className="w-full bg-black border border-green-900 rounded-2xl px-6 py-5 text-left hover:bg-[#181818] transition"
>

              Pay via QR Code

            </button>

           <button
  onClick={
    handleRazorpayPayment
  }
  className="w-full bg-black border border-green-900 rounded-2xl px-6 py-5 text-left hover:bg-[#181818] transition"
>

  Google Pay

</button>

             <button
  onClick={
    handleRazorpayPayment
  }
  className="w-full bg-black border border-green-900 rounded-2xl px-6 py-5 text-left hover:bg-[#181818] transition"
>

              PhonePe

            </button>

              <button
  onClick={
    handleRazorpayPayment
  }
  className="w-full bg-black border border-green-900 rounded-2xl px-6 py-5 text-left hover:bg-[#181818] transition"
>

              Paytm

            </button>

          </div>

        </div>

        {/* COD */}

        <div className="mt-10 bg-[#111111] border border-green-900 rounded-3xl p-6">

          <h2 className="text-2xl font-bold text-white">

            Cash On Delivery

          </h2>

          <button className="w-full mt-6 bg-green-500 hover:bg-green-600 text-black py-5 rounded-3xl text-xl font-black transition">

            Confirm COD Order

          </button>
<button
  onClick={async () => {

  try {

    const orderData =
      JSON.parse(
        localStorage.getItem(
          "pendingOrder"
        )
      );

    const docRef =
      await addDoc(

        collection(
          db,
          "orders"
        ),

        {

          ...orderData,

          status:
            "Preparing",

          createdAt:
            serverTimestamp(),

        }

      );

    localStorage.setItem(

      "currentOrderId",

      docRef.id

    );

    alert(
      "Order Placed Successfully 🚀"
    );

    navigate(
      "/track-order"
    );

  } catch (error) {

    console.log(error);

  }

}}
  className="w-full mt-6 bg-green-500 hover:bg-green-600 text-black py-5 rounded-3xl text-xl font-black transition"
>

  Simulate Payment Success

</button>
        </div>

      </div>

    </div>

  );

}