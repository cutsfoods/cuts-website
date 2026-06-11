
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
import {
  useLocation,
} from "react-router-dom";
 
import React, {
  useContext
} from "react";

export default function Payment() {
  const { setCart } =
  useContext(
    CartContext
  );
    const navigate = useNavigate();
    const location =
  useLocation();
const {
  totalPrice,
} = React.useContext(
  CartContext
);
const finalTotal = Number(

  sessionStorage.getItem(
    "finalTotal"
  )

) || 0;
const handleRazorpayPayment = async () => {

  try {
console.log(finalTotal);
    const response = await fetch(
      "http://127.0.0.1:5000/create-order",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          amount: finalTotal,
        }),
      }
    );

    const order = await response.json();

    console.log(order);

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
        "Order Payment",

      order_id:
        order.id,
prefill: {

  name:
    "CUTS Customer",

  contact:
    "9876543210",

},
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

                  paymentMethod:
                    "Online",

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
setCart([]);

localStorage.removeItem(
  "cart"
);

localStorage.removeItem(
  "pendingOrder"
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

    const razor = new window.Razorpay(
      options
    );

    razor.open();

  } catch (error) {

  console.error(error);

  alert(error?.message || "Payment Error");

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

            paymentMethod:
              "COD",

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
setCart([]);

localStorage.removeItem(
  "cart"
);

localStorage.removeItem(
  "pendingOrder"
);
      alert(
        "COD Order Placed Successfully 🚀"
      );

      navigate(
        "/track-order"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Failed to place order"
      );

    }

  }}

  className="w-full mt-6 bg-green-500 hover:bg-green-600 text-black py-5 rounded-3xl text-xl font-black transition"

>

  Confirm COD Order

</button>

        </div>

      </div>

    </div>

  );

}