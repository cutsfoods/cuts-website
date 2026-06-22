import React from "react";

import { db } from "../firebase";
import notificationSound from "../sounds/notification.mp3";

import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
updateDoc,
} from "firebase/firestore";

export default function Admin() {

 const [orders, setOrders] =
  React.useState([]);
const ordersToday =
  orders.filter((order) => {

    if (!order.createdAt)
      return false;

    const orderDate =
      order.createdAt
        ?.toDate?.();

    return (
      orderDate?.toDateString() ===
      new Date().toDateString()
    );

  });

const todayRevenue =
  ordersToday.reduce(
    (total, order) =>
      total +
      (order.totalPrice || 0),
    0
  );

const preparingOrders =
  orders.filter(
    (order) =>
      order.status ===
      "Preparing"
  ).length;

const deliveredOrders =
  orders.filter(
    (order) =>
      order.status ===
      "Delivered"
  ).length;
const [products, setProducts] =
  React.useState([]);
const [riders, setRiders] =
  React.useState([]);
const [
  newRiderName,
  setNewRiderName,
] = React.useState("");

const [
  newRiderPhone,
  setNewRiderPhone,
] = React.useState("");
const [
  notificationsEnabled,
  setNotificationsEnabled,
] = React.useState(false);

const audioRef =
  React.useRef(
    new Audio(
      notificationSound
    )
  );

const previousOrderCount =
  React.useRef(0);

const enableNotifications =
  () => {

    audioRef.current
      .play()
      .then(() => {

        audioRef.current.pause();

        audioRef.current.currentTime = 0;

        setNotificationsEnabled(
          true
        );

      })
      .catch((error) =>
        console.log(error)
      );

  };

const toggleStock =
  async (
    productId,
    currentStock
  ) => {

    try {

      await updateDoc(

        doc(
          db,
          "products",
          productId
        ),

        {

          inStock:
            !currentStock,

        }

      );

    } catch (error) {

      console.log(error);

    }

  };

const updateOrderStatus =
  async (
    orderId,
    newStatus
  ) => {

    try {

      await updateDoc(

        doc(
          db,
          "orders",
          orderId
        ),

        {

          status:
            newStatus,

        }

      );

    } catch (error) {

      console.log(error);

    }

  };

  const assignRider =
  async (
    orderId,
    riderName
  ) => {

    const rider =
      riders.find(
        (r) =>
          r.name === riderName
      );

    if (!rider) return;

    try {

      await updateDoc(

        doc(
          db,
          "orders",
          orderId
        ),

        {

          riderName:
            rider.name,

          riderPhone:
            rider.phone,

        }

      );

    } catch (error) {

      console.log(error);

    }

  };
React.useEffect(() => {

const ordersQuery =
  query(

    collection(
      db,
      "orders"
    ),

    orderBy(
      "createdAt",
      "desc"
    )

  );

  const unsubscribeOrders =
    onSnapshot(

      ordersQuery,

      (snapshot) => {

        const fetchedOrders =
          snapshot.docs.map(
            (doc) => ({

              id:
                doc.id,

              ...doc.data(),

            })
          );

        if (

          previousOrderCount.current >
            0 &&

          fetchedOrders.length >
            previousOrderCount.current

        ) {

          if (
            notificationsEnabled
          ) {

            audioRef.current.pause();

            audioRef.current.currentTime = 0;

            audioRef.current
              .play()
              .catch((error) =>
                console.log(
                  error
                )
              );

          }

        }

        previousOrderCount.current =
          fetchedOrders.length;

        setOrders(
          fetchedOrders
        );

      }

    );

  const unsubscribeProducts =
    onSnapshot(

      collection(
        db,
        "products"
      ),

      (snapshot) => {

        const fetchedProducts =
          snapshot.docs.map(
            (doc) => ({

              id:
                doc.id,

              ...doc.data(),

            })
          );

        setProducts(
          fetchedProducts
        );

      }

    );
const unsubscribeRiders =
  onSnapshot(

    collection(
      db,
      "riders"
    ),

    (snapshot) => {

      const fetchedRiders =
        snapshot.docs.map(
          (doc) => ({

            id: doc.id,

            ...doc.data(),

          })
        );

      setRiders(
        fetchedRiders
      );

    }

  );
return () => {

  unsubscribeOrders();

  unsubscribeProducts();

  unsubscribeRiders();

};

}, [notificationsEnabled]);
const updateRiderLocation =
  async (
    orderId,
    lat,
    lng
  ) => {

    try {

      await updateDoc(

        doc(
          db,
          "orders",
          orderId
        ),

        {

          riderLocation: {

            lat,
            lng,

          },

        }

      );

    } catch (error) {

      console.log(error);

    }

  };
  return (

    <div className="bg-black min-h-screen text-white px-8 py-20">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-5xl font-black text-green-400">
          Orders Dashboard
        </h1>

        <p className="text-gray-400 mt-4 text-xl">
          Live customer orders from Firebase
        </p>
        <div className="mt-14">

  <h2 className="text-4xl font-black text-green-400">
    Inventory Control
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

    {products.map((item) => (

        <div
          key={item.id}
          className="bg-[#0d0d0d] border border-green-900 rounded-3xl p-6"
        >

          <h3 className="text-2xl font-bold">
            {item.name}
          </h3>

          <button
            onClick={() =>
              toggleStock(
                item.id,
                item.inStock
              )
            }
            className={`mt-6 px-5 py-3 rounded-2xl font-bold ${
              item.inStock
                ? "bg-red-500 text-white"
                : "bg-green-500 text-black"
            }`}
          >

            {item.inStock
              ? "Mark Out Of Stock"
              : "Back In Stock"}

          </button>

        </div>

      ))}

  </div>

</div>
{!notificationsEnabled && (

  <button
    onClick={enableNotifications}
    className="mt-6 bg-green-500 hover:bg-green-600 text-black px-6 py-4 rounded-2xl font-bold transition"
  >

    🔔 Enable Order Notifications

  </button>

)}
<div className="grid md:grid-cols-4 gap-5 mb-8">

  <div className="bg-[#111111] border border-green-900 rounded-3xl p-6">

    <p className="text-gray-400">

      Orders Today

    </p>

    <h2 className="text-4xl font-black text-green-400">

      {ordersToday.length}

    </h2>

  </div>

  <div className="bg-[#111111] border border-green-900 rounded-3xl p-6">

    <p className="text-gray-400">

      Revenue Today

    </p>

    <h2 className="text-4xl font-black text-green-400">

      ₹{todayRevenue}

    </h2>

  </div>

  <div className="bg-[#111111] border border-green-900 rounded-3xl p-6">

    <p className="text-gray-400">

      Preparing

    </p>

    <h2 className="text-4xl font-black text-green-400">

      {preparingOrders}

    </h2>

  </div>

  <div className="bg-[#111111] border border-green-900 rounded-3xl p-6">

    <p className="text-gray-400">

      Delivered

    </p>

    <h2 className="text-4xl font-black text-green-400">

      {deliveredOrders}

    </h2>

  </div>

</div>
<div className="bg-[#0d0d0d] border border-green-900 rounded-[35px] p-8 mb-10">

  <h2 className="text-3xl font-black text-green-400 mb-6">

    🚴 Riders Management

  </h2>

  <div className="flex gap-4 flex-wrap">

    <input

      type="text"

      placeholder="Rider Name"

      value={newRiderName}

      onChange={(e) =>
        setNewRiderName(
          e.target.value
        )
      }

      className="bg-black border border-green-900 rounded-xl px-4 py-3 text-white"

    />

    <input

      type="text"

      placeholder="Phone Number"

      value={newRiderPhone}

      onChange={(e) =>
        setNewRiderPhone(
          e.target.value
        )
      }

      className="bg-black border border-green-900 rounded-xl px-4 py-3 text-white"

    />

    <button

      onClick={() => {

        if (
          !newRiderName ||
          !newRiderPhone
        )
          return;

        setRiders([
          ...riders,
          {
            name:
              newRiderName,
            phone:
              newRiderPhone,
          },
        ]);

        setNewRiderName("");

        setNewRiderPhone("");

      }}

      className="bg-green-500 hover:bg-green-600 text-black font-bold px-6 py-3 rounded-xl"

    >

      Add Rider

    </button>

  </div>

</div>
<div className="mt-6 grid md:grid-cols-3 gap-4">

  {riders.map(
    (rider, index) => (

      <div

        key={index}

        className="bg-black border border-green-900 rounded-2xl p-4"

      >

        <h3 className="text-green-400 font-bold">

          {rider.name}

        </h3>

        <p className="text-gray-400">

          {rider.phone}

        </p>

      </div>

    )
  )}

</div>
        <div className="mt-14 grid gap-8">

          {orders
  ?.filter(
    (order) =>
      order.customerDetails &&
      order.cart
  )
  .map((order) => (

            <div
              key={order.id}
              className="bg-[#0d0d0d] border border-green-900 rounded-[35px] p-8"
            >

              <div className="flex flex-col lg:flex-row justify-between gap-10">

                {/* LEFT */}

                <div>

                  <h2 className="text-3xl font-black text-green-400">
                    {order.customerDetails?.name}
                  </h2>
<div className="mt-4 flex items-center gap-4 flex-wrap">

  <span className="
bg-[#111111]
border
border-green-900
rounded-2xl
p-4
">

    {order.status || "Pending"}
    <div className="flex gap-3 mt-6 flex-wrap">

  <button
    onClick={() =>
      updateOrderStatus(
        order.id,
        "Preparing"
      )
    }
    className="bg-yellow-500 text-black px-4 py-2 rounded-xl font-bold"
  >

    Preparing

  </button>

  <button
    onClick={() =>
      updateOrderStatus(
        order.id,
        "Picked Up"
      )
    }
    className="bg-blue-500 text-white px-4 py-2 rounded-xl font-bold"
  >

    Picked Up

  </button>

  <button
    onClick={() =>
      updateOrderStatus(
        order.id,
        "On The Way"
      )
    }
    className="bg-purple-500 text-white px-4 py-2 rounded-xl font-bold"
  >

    On The Way

  </button>

  <button
    onClick={() =>
      updateOrderStatus(
        order.id,
        "Delivered"
      )
    }
    className="
bg-[#111111]
border
border-green-900
rounded-2xl
p-4
"
  >

    Delivered

  </button>
<div className="flex gap-3 mt-4 flex-wrap">

 <select

  value={
    order.riderName || ""
  }

  onChange={(e) =>
    assignRider(
      order.id,
      e.target.value
    )
  }

  className="bg-black border border-green-500 text-white rounded-xl px-4 py-2 font-bold"

>

  <option value="">
    Assign Rider
  </option>

  {riders.map(
    (rider) => (

      <option
        key={rider.name}
        value={rider.name}
      >

        {rider.name}

      </option>

    )
  )}

</select>
{order.riderName && (

  <div className="text-green-400 text-sm font-bold">

    🚴 {order.riderName}

    <br />

    📞 {order.riderPhone}

  </div>

)}
</div>
</div>

  </span>

 

</div>
                  <div className="mt-5 space-y-3 text-lg text-gray-300">

                    <p>
                      📞 {order.customerDetails?.phone}
                    </p>

                    <p>
                      📍 {order.customerDetails?.address}
                    </p>
{order.customerDetails?.coordinates && (

  <a
   href={`https://www.google.com/maps?q=${order.customerDetails.coordinates.lat},${order.customerDetails.coordinates.lng}`}
    target="_blank"
    rel="noreferrer"
    className="inline-block mt-6 bg-green-500 hover:bg-green-600 text-black px-6 py-3 rounded-2xl font-black"
  >

    Open in Google Maps

  </a>

)}
                    <p>
                      💳 {order.paymentMethod}
                    </p>

                    <p>
                      📝 {order.customerDetails?.notes || "No Notes"}
                    </p>

                  </div>

                </div>

                {/* RIGHT */}

                <div className="flex-1">

                  <h3 className="text-2xl font-bold mb-6">
                    Order Items
                  </h3>

                  <div className="space-y-5">

                    {order.cart?.map((item, index) => (

                      <div
                        key={index}
                        className="bg-black border border-green-900 rounded-3xl p-5"
                      >

                        <div className="flex justify-between gap-5">

                          <div>

                            <h4 className="text-xl font-bold">
                              {item.name}
                            </h4>

                            {item.selectedFruits && (

                              <div className="mt-3 space-y-1">

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

                          <div className="text-right">

                            <p className="text-lg text-gray-400">
                              Qty: {item.quantity}
                            </p>

                            <p className="text-green-400 text-2xl font-black mt-2">
                              ₹
                              {item.price *
                                item.quantity}
                            </p>

                          </div>

                        </div>

                      </div>

                    ))}

                  </div>

                  {/* TOTAL */}

                  <div className="flex justify-between items-center mt-10 border-t border-green-900 pt-6">

                    <p className="text-2xl font-bold">
                      Total
                    </p>

                    <p className="text-4xl font-black text-green-400">
                      ₹{order.totalPrice}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

}