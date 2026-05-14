import React from "react";

import { db } from "../firebase";

import {
  doc,
  onSnapshot,
} from "firebase/firestore";




export default function TrackOrder() {

  const [order,
    setOrder] =
    React.useState(null);

  React.useEffect(() => {

    const currentOrderId =
      localStorage.getItem(
        "currentOrderId"
      );

    if (!currentOrderId)
      return;

    const unsubscribe =
      onSnapshot(

        doc(
          db,
          "orders",
          currentOrderId
        ),

        (docSnapshot) => {

          if (
            docSnapshot.exists()
          ) {

            setOrder({

              id:
                docSnapshot.id,

              ...docSnapshot.data(),

            });

          }

        }

      );

    return () =>
      unsubscribe();

  }, []);

  return (

    <div className="min-h-screen bg-black text-white px-6 py-20">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl font-black text-green-400">

          Track Your Order

        </h1>

        <p className="text-gray-400 mt-5 text-xl">

          Your order is on the way 🚀

        </p>

        <div className="mt-10 bg-[#111111] border border-green-900 rounded-[35px] p-10">

          {/* ORDER ID */}

          <div>

            <p className="text-gray-400">

              Order ID

            </p>

            <p className="text-3xl font-black text-white mt-2">

              {order?.orderId}

            </p>

          </div>

          {/* STATUS */}

          <div className="mt-10">

            <p className="text-gray-400">

              Delivery Progress

            </p>

            <div className="mt-6 space-y-5">

              {/* PREPARING */}

              <div className="flex items-center gap-4">

                <div className={`w-5 h-5 rounded-full ${
                  order?.status ===
                    "Preparing" ||
                  order?.status ===
                    "Picked Up" ||
                  order?.status ===
                    "On The Way" ||
                  order?.status ===
                    "Delivered"
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`} />

                <p className="text-xl font-semibold">

                  Preparing Order

                </p>

              </div>

              {/* PICKED UP */}

              <div className="flex items-center gap-4">

                <div className={`w-5 h-5 rounded-full ${
                  order?.status ===
                    "Picked Up" ||
                  order?.status ===
                    "On The Way" ||
                  order?.status ===
                    "Delivered"
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`} />

                <p className="text-xl font-semibold">

                  Picked Up

                </p>

              </div>

              {/* ON THE WAY */}

              <div className="flex items-center gap-4">

                <div className={`w-5 h-5 rounded-full ${
                  order?.status ===
                    "On The Way" ||
                  order?.status ===
                    "Delivered"
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`} />

                <p className="text-xl font-semibold">

                  On The Way

                </p>

              </div>

              {/* DELIVERED */}

              <div className="flex items-center gap-4">

                <div className={`w-5 h-5 rounded-full ${
                  order?.status ===
                    "Delivered"
                    ? "bg-green-500"
                    : "bg-gray-600"
                }`} />

                <p className="text-xl font-semibold">

                  Delivered

                </p>

              </div>

            </div>

          </div>

          {/* DELIVERY PARTNER */}

          <div className="mt-10 bg-[#161616] border border-green-900 rounded-3xl p-6">

            <p className="text-gray-400 text-sm">

              Delivery Partner

            </p>

            <div className="flex justify-between items-center mt-4">

              <div>

                <h3 className="text-2xl font-black text-white">

                  Hariprakash 🚴

                </h3>

                <p className="text-gray-400 mt-2">

                  Your order is on the way

                </p>

              </div>

              <a
                href="tel:+919999999999"
                className="bg-green-500 hover:bg-green-600 text-black px-5 py-3 rounded-2xl font-bold"
              >

                Call

              </a>

            </div>

          </div>

          {/* DELIVERY INSTRUCTIONS */}

          <div className="mt-8 bg-[#161616] border border-green-900 rounded-3xl p-6">

            <h3 className="text-2xl font-black text-white">

              Delivery Instructions

            </h3>

            <textarea
              placeholder="Add delivery notes for rider..."
              className="w-full mt-5 bg-black border border-green-900 rounded-2xl p-5 text-white outline-none resize-none h-32"
            />

          </div>

          {/* LIVE MAP */}

          <div className="mt-10">

            <h2 className="text-3xl font-black text-green-400 mb-5">

              Live Delivery Tracking

            </h2>

          <div
  className="rounded-[35px] overflow-hidden border border-green-900"
  style={{
    height: "320px",
    width: "100%",
  }}
>

 <iframe
  title="Live Delivery Tracking"
  src={`https://www.google.com/maps?q=${
  order?.riderLocation?.lat ||
  12.9716
},${
  order?.riderLocation?.lng ||
  77.5946
}&z=14&output=embed`}
  width="100%"
  height="320"
  style={{
    border: 0,
  }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

</div>

          </div>

        </div>

      </div>

    </div>

  );

}