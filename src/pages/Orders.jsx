
import {
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";

import { db }
  from "../firebase";

  import {
  useNavigate
} from "react-router-dom";

import React, {
  useContext,
} from "react";

import {
  CartContext,
} from "../context/CartContext";

export default function Orders() {

    const navigate =
  useNavigate();

  const { setCart } =
  useContext(
    CartContext
  );

  const [orders,
    setOrders] =
    React.useState([]);

  React.useEffect(() => {

    const phone =
      localStorage.getItem(
        "cutsUserPhone"
      );

    const unsubscribe =
      onSnapshot(

        collection(
          db,
          "orders"
        ),

        (snapshot) => {

          const allOrders =
            snapshot.docs.map(
              (doc) => ({

                id: doc.id,

                ...doc.data(),

              })
            );

          const userOrders =
            allOrders.filter(
              (order) =>

                order
                  ?.customerDetails
                  ?.phone ===
                phone
            );

          setOrders(
            userOrders
          );

        }

      );

    return () =>
      unsubscribe();

  }, []);

  return (

    <div className="min-h-screen bg-black text-white p-8">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-4xl font-black text-green-400 mb-8">

          My Orders

        </h1>

        {orders.length === 0 ? (

          <div className="bg-[#111111] border border-green-900 rounded-3xl p-8">

            No Orders Found

          </div>

        ) : (

          <div className="space-y-6">

            {orders.map(
              (order) => (

                <div

                  key={order.id}

                  className="bg-[#111111] border border-green-900 rounded-3xl p-6"

                >

                  <h2 className="text-2xl font-black text-green-400">

                    {order.orderId}

                  </h2>

                  <p className="mt-3">

                    Status:
                    {" "}
                    {order.status}

                  </p>

                  <p>

                    Amount:
                    {" "}
                    ₹{
                      order.totalPrice
                    }

                  </p>

                  <p>

                    Payment:
                    {" "}
                    {order.paymentMethod}

                  </p>
<div className="flex gap-3 mt-5">

  <button

    onClick={() => {

      localStorage.setItem(
        "currentOrderId",
        order.id
      );

      navigate(
        "/track-order"
      );

    }}

    className="bg-green-500 hover:bg-green-600 text-black px-5 py-2 rounded-xl font-bold"

  >

    Track Order

  </button>
<button

  onClick={() => {

    localStorage.setItem(
      "reorderCart",
      JSON.stringify(
        order.cart
      )
    );

    navigate("/menu");

  }}

  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl font-bold"

>

  Reorder

</button>

</div>
                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>

  );

}