import React from "react";
import logo from "../images/Logo.jpeg";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">

      <section className="relative px-8 py-24">

        <img
          src={logo}
          alt="Watermark"
          className="absolute right-[-100px] top-1/2 -translate-y-1/2 w-[700px] opacity-10"
        />

        <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">

          <div>

            <p className="text-green-400 text-2xl font-bold mb-5">
              FRESH. HEALTHY. DELICIOUS.
            </p>

            <h1 className="text-6xl md:text-8xl font-black leading-tight">

              YOUR WAKEUP

              <span className="block text-green-400">
                MEAL
              </span>

            </h1>

            <p className="mt-8 text-gray-300 text-xl max-w-xl leading-relaxed">
              Nutritious fruit bowls, cold pressed juices &
              healthy breakfasts delivered fresh to your doorstep.
            </p>

            <button className="mt-10 bg-green-500 hover:bg-green-600 text-black px-10 py-5 rounded-2xl text-xl font-bold transition">
              Explore Menu
            </button>

          </div>

        </div>

      </section>
      {/* ABOUT SECTION */}

<section
  id="about"
  className="px-8 py-24"
>

  <div className="max-w-7xl mx-auto">

    <div className="bg-[#0d0d0d] border border-green-900 rounded-[40px] p-12 shadow-[0_0_50px_rgba(34,197,94,0.08)]">

      <p className="text-green-400 font-bold tracking-[4px] uppercase">
        About Cuts
      </p>

      <h2 className="text-6xl font-black text-white mt-5">
        Healthy Food.
        <span className="block text-green-400">
          Premium Lifestyle.
        </span>
      </h2>

      <p className="text-gray-300 text-xl leading-relaxed mt-8 max-w-4xl">

        Cuts is focused on serving premium fruit bowls,
        cold pressed juices and healthy breakfasts using
        fresh ingredients and healthy preparation methods.

        We believe healthy food should taste amazing,
        look premium and energize your lifestyle.

      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-14">

        <div className="bg-black rounded-3xl p-6 border border-green-900">

          <h3 className="text-green-400 text-2xl font-bold">
            100% Fresh
          </h3>

          <p className="text-gray-400 mt-3">
            Daily fresh ingredients & fruits.
          </p>

        </div>

        <div className="bg-black rounded-3xl p-6 border border-green-900">

          <h3 className="text-green-400 text-2xl font-bold">
            No Preservatives
          </h3>

          <p className="text-gray-400 mt-3">
            Pure healthy preparation methods.
          </p>

        </div>

        <div className="bg-black rounded-3xl p-6 border border-green-900">

          <h3 className="text-green-400 text-2xl font-bold">
            Fast Delivery
          </h3>

          <p className="text-gray-400 mt-3">
            Freshly packed and delivered quickly.
          </p>

        </div>

      </div>

    </div>

  </div>

</section>

{/* CONTACT SECTION */}

<section
  id="contact"
  className="px-8 pb-24"
>

  <div className="max-w-7xl mx-auto">

    <div className="bg-[#0d0d0d] border border-green-900 rounded-[40px] p-12 shadow-[0_0_50px_rgba(34,197,94,0.08)]">

      <p className="text-green-400 font-bold tracking-[4px] uppercase">
        Contact Cuts
      </p>

      <h2 className="text-6xl font-black text-white mt-5">
        Let’s Build A
        <span className="block text-green-400">
          Healthy Lifestyle
        </span>
      </h2>

      <div className="grid md:grid-cols-2 gap-12 mt-14">

        <div className="space-y-8">

          <div className="bg-black border border-green-900 rounded-3xl p-6">

            <p className="text-green-400 font-bold text-xl">
              Phone
            </p>

            <p className="text-gray-300 mt-2 text-lg">
              +91 7989991066
            </p>

          </div>

          <div className="bg-black border border-green-900 rounded-3xl p-6">

            <p className="text-green-400 font-bold text-xl">
              Location
            </p>

            <p className="text-gray-300 mt-2 text-lg">
              Bangalore
            </p>

          </div>

          <div className="bg-black border border-green-900 rounded-3xl p-6">

            <p className="text-green-400 font-bold text-xl">
              Brand
            </p>

            <p className="text-gray-300 mt-2 text-lg">
              Fresh Healthy Lifestyle
            </p>

          </div>

        </div>

        <div className="flex items-center justify-center">

          <a
            href="https://wa.me/917989991066"
            target="_blank"
            className="bg-green-500 hover:bg-green-600 text-black px-12 py-6 rounded-3xl text-2xl font-black transition"
          >

            Order on WhatsApp

          </a>

        </div>

      </div>

    </div>

  </div>

</section>

    </div>
  );
}