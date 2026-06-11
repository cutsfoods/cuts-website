import React from "react";

import { db } from "../firebase";



import {
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";



export default function TrackOrder() {

  const [order,
    setOrder] =
    React.useState(null);
    const currentOrderId =
  localStorage.getItem(
    "currentOrderId"
  );
const [deliveryNote, setDeliveryNote] =
  React.useState("");

const [savingNote, setSavingNote] =
  React.useState(false);
  React.useEffect(() => {

    

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
const saveDeliveryNote =
  async () => {

    if (
      !deliveryNote.trim()
    ) {
      alert(
        "Please enter instructions"
      );
      return;
    }

    try {

      setSavingNote(true);

      await updateDoc(

        doc(
          db,
          "orders",
          currentOrderId
        ),

        {
          "customerDetails.notes":
            deliveryNote,
        }

      );

      alert(
        "Instructions sent to vendor"
      );

    } 
   catch (error) {

  console.error(error);

  alert(error.message);

}
    finally {

      setSavingNote(false);

    }

  };
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

          {order?.status ===
            "On The Way" &&
            order?.riderName && (

            <div className="mt-8 bg-[#111] border border-green-900 rounded-3xl p-6">

              <h3 className="text-2xl font-black text-green-400">

                🚴 Delivery Partner

              </h3>

              <p className="text-white text-xl mt-4">

                {order.riderName}

              </p>

              <a

                href={`tel:${order.riderPhone}`}

                className="inline-block mt-4 bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-xl"

              >

                Call Rider

              </a>

            </div>

          )}

          {/* DELIVERY INSTRUCTIONS */}

          {/* DELIVERY INSTRUCTIONS */}

        <div className="mt-8 bg-[#111] border border-green-900 rounded-3xl p-6">

  <h3 className="text-2xl font-black text-white">
    Delivery Instructions
  </h3>

  <textarea
    value={deliveryNote}
    onChange={(e) =>
      setDeliveryNote(
        e.target.value
      )
    }
    placeholder="Example: Less sugar, extra fruits, call before delivery..."
    className="w-full mt-5 bg-black border border-green-900 rounded-2xl p-5 text-white outline-none resize-none h-32"
  />

  <button
    onClick={saveDeliveryNote}
    disabled={savingNote}
    className="mt-4 bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-xl"
  >
    {savingNote
      ? "Saving..."
      : "Submit Instructions"}
  </button>

</div>

        

        </div>

      </div>

    </div>

  );

}