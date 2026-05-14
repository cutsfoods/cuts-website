import React from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

export default function Success() {
const location = useLocation();

const orderId =
  location.state?.orderId;
  return (

    <div className="bg-black min-h-screen flex items-center justify-center px-6">

      <div className="bg-[#0d0d0d] border border-green-900 rounded-[40px] p-14 max-w-2xl w-full text-center shadow-[0_0_60px_rgba(34,197,94,0.08)]">

        <div className="text-8xl">
          ✅
        </div>

        <h1 className="text-5xl font-black text-green-400 mt-8">
          Order Placed!
        </h1>

        <p className="text-gray-300 text-xl mt-6 leading-relaxed">
            <div className="mt-8 bg-black border border-green-900 rounded-3xl p-6">

  <p className="text-gray-400 text-lg">
    Your Order ID
  </p>

  <h2 className="text-4xl font-black text-green-400 mt-3">

    {orderId}

  </h2>

</div>

          Your order has been placed successfully.

          Our team will start preparing your healthy meal shortly.

        </p>

        <Link
          to="/menu"
          className="inline-block mt-10 bg-green-500 hover:bg-green-600 text-black px-10 py-5 rounded-3xl text-xl font-black transition"
        >

          Back To Menu

        </Link>

      </div>

    </div>

  );

}