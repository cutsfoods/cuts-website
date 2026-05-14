import React from "react";
import { useNavigate } from "react-router-dom";

import {
  CartContext,
} from "../context/CartContext";

import { db } from "../firebase";

import {
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

import AddressModal
  from "../components/AddressModal";

export default function Checkout() {

  const navigate = useNavigate();

  const {
    cart,
    totalPrice,
  } = React.useContext(CartContext);

  const freeDeliveryThreshold = 499;
  const deliveryFee =
  totalPrice >=
  freeDeliveryThreshold
    ? 0
    : 9;

const originalDeliveryFee = 30;

const handlingFee = 0;


  const [customerDetails] =
    React.useState({

      coordinates:
        JSON.parse(
          localStorage.getItem(
            "userCoordinates"
          )
        ),

    });

  const [deliveryAddress,
    setDeliveryAddress] =
    React.useState("");

  const [isAddressModalOpen,
    setIsAddressModalOpen] =
    React.useState(false);

  const placeOrder = async () => {

    if (!deliveryAddress) {

      setIsAddressModalOpen(
        true
      );

      return;

    }

    try {

      const orderId =
        "CUTS" +
        Math.floor(
          100000 +
          Math.random() * 900000
        );

      const docRef =
  await addDoc(
    collection(
      db,
      "orders"
    ),
    
        {

          customerDetails: {

            ...customerDetails,

            address:
              deliveryAddress,

            coordinates:
              JSON.parse(
                localStorage.getItem(
                  "userCoordinates"
                )
              ),

          },

          cart,

          totalPrice,

          createdAt:
            serverTimestamp(),

          status:
            "New Order",

          orderId,

        }
      );
localStorage.setItem(
  "currentOrderId",
  docRef.id
);
      navigate(
        "/success",
        {
          state: {
            orderId
          },
        }
      );

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="bg-black min-h-screen text-white px-8 py-20">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-black text-green-400">

          Checkout

        </h1>

        <div className="mt-10 bg-[#0d0d0d] border border-green-900 rounded-[40px] p-10">

          {/* ADDRESS CARD */}

          <div className="bg-[#111111] border border-green-900 rounded-3xl p-5 mb-10">

            <div className="flex justify-between items-start gap-6">

              <div>

                <p className="text-gray-400 text-sm">

                  Deliver To

                </p>

                <p className="text-white text-lg font-semibold mt-2">

                  Home

                </p>

                <p className="text-gray-300 text-sm mt-2 leading-6">

                  {deliveryAddress ||
                    "No address selected"}

                </p>

              </div>

              <button
                onClick={() =>
                  setIsAddressModalOpen(
                    true
                  )
                }
                className="border border-green-500 text-green-400 px-4 py-2 rounded-xl text-sm"
              >

                Change

              </button>

            </div>

          </div>

          {/* ORDER SUMMARY */}

          <h2 className="text-4xl font-black text-green-400">

            Order Summary

          </h2>

          <div className="mt-10 space-y-6">

            {cart.map((item) => (

              <div
                key={item.id}
                className="border-b border-green-900 pb-5"
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <h3 className="font-bold text-xl">

                      {item.name}

                    </h3>

                    {item.selectedFruits && (

                      <div className="mt-2 space-y-1">

                        {item.selectedFruits.map(
                          (fruit) => (

                            <p
                              key={fruit.name}
                              className="text-sm text-gray-400"
                            >

                              {fruit.name} × {fruit.qty}

                            </p>

                          )
                        )}

                      </div>

                    )}

                  </div>

                  <p className="text-green-400 font-bold">

                    ₹
                    {item.price *
                      item.quantity}

                  </p>

                </div>

              </div>

            ))}

          </div>
<div className="mt-10 bg-[#111111] border border-green-900 rounded-3xl p-6">

  <h3 className="text-2xl font-bold text-white">

    Bill Summary

  </h3>

  <div className="mt-6 space-y-5">

    <div className="flex justify-between text-gray-300">

      <p>Item Total</p>

      <p>

        <span className="line-through text-gray-500 mr-2">

          ₹{totalPrice + 40}

        </span>

        ₹{totalPrice}

      </p>

    </div>

    <div className="flex justify-between text-gray-300">

      <p>Delivery Fee</p>

      <p>

        <span className="line-through text-gray-500 mr-2">

          ₹{originalDeliveryFee}

        </span>

        ₹{deliveryFee}

      </p>

    </div>

    <p className="text-green-400 text-sm">

      Free delivery above ₹499
      (Unlock by adding more items)

    </p>

    <div className="flex justify-between text-gray-300">

      <p>Handling Fee</p>

      <p>

        <span className="line-through text-gray-500 mr-2">

          ₹10

        </span>

       {handlingFee === 0
  ? "FREE"
  : `₹${handlingFee}`
}

      </p>

    </div>

    <div className="border-t border-green-900 pt-5 flex justify-between items-center">

      <p className="text-2xl font-bold">

        To Pay

      </p>

      <p className="text-3xl font-black text-green-400">

        ₹{
  totalPrice +
  deliveryFee +
  handlingFee
}

      </p>

    </div>

  </div>

</div>
          {/* TOTAL */}

          <div className="flex items-center justify-between mt-10">

            <p className="text-2xl font-bold">

              Total

            </p>

           <p className="text-4xl font-black text-green-400">

  ₹{
    totalPrice +
    deliveryFee +
    handlingFee
  }

</p>

          </div>

          {/* PAY BUTTON */}

          <button
            onClick={() => {

  if (!deliveryAddress) {

    setIsAddressModalOpen(
      true
    );

    return;

  }
const finalTotal =
  totalPrice +
  deliveryFee +
  handlingFee;

const orderId =
  "CUTS" +
  Math.floor(
    100000 +
    Math.random() * 900000
  );

localStorage.setItem(

  "pendingOrder",

  JSON.stringify({

    customerDetails: {

      ...customerDetails,

      address:
        deliveryAddress,

      coordinates:
        JSON.parse(
          localStorage.getItem(
            "userCoordinates"
          )
        ),

    },

    cart,

    totalPrice:
      finalTotal,

    status:
      "Preparing",

    orderId,

    createdAt:
      new Date()
        .toISOString(),

  })

);
  navigate("/payment");

}}
            className="w-full mt-10 bg-green-500 hover:bg-green-600 text-black py-5 rounded-3xl text-2xl font-black transition"
          >

           Click To Pay ₹{
  totalPrice +
  deliveryFee +
  handlingFee
}

          </button>

        </div>

      </div>

      <AddressModal
        isOpen={
          isAddressModalOpen
        }
        onClose={() =>
          setIsAddressModalOpen(
            false
          )
        }
        onSelectAddress={(
          address
        ) => {

          setDeliveryAddress(
            address
          );

        }}
      />

    </div>

  );

}