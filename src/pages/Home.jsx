import React from "react";
import logo from "../images/Logo.jpeg";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link }
from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen overflow-hidden">

      <section className="relative px-8 py-24">

        <img
          src={logo}
          alt="Watermark"
          className="absolute right-[-0] top-1/2 -translate-y-1/2 w-[500px] md:w-[650px] lg:w-[750px] opacity-10"
        />

       <div className="relative z-10 flex flex-col md:flex-row items-center justify-between px-6 md:px-12">

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

            <p className="mt-8 text-gray-300 text-xl max-w-xl leading-8">
              Nutritious fruit bowls, cold pressed juices &
              healthy breakfasts delivered fresh to your doorstep.
            </p>

           

          </div>

        </div>

      </section>
{/* ABOUT SECTION */}

<section
  id="about"
 className="px-6 md:px-12 py-16"
>

  <div className="w-full">

    <div className="bg-[#0d0d0d] border border-green-900 rounded-[40px] p-10 md:p-12 shadow-[0_0_50px_rgba(34,197,94,0.08)]">

      <div className="grid md:grid-cols-2 gap-8 items-start">

        {/* LEFT SIDE */}

        <div>

          <p className="text-green-300 font-bold tracking-[4px] uppercase">
            About Cuts
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-white mt-6 leading-tight">

            Healthy Food.

            <span className="block text-green-400">
              Premium Lifestyle.
            </span>

          </h2>

        <div className="flex flex-col justify-center h-full">

  <p className="text-gray-400 text-sm md:text-base leading-8">

    CUTS is a modern healthy food brand focused on delivering
    freshness, energy, and convenience directly to your doorstep.

    From fresh-cut fruits and cold-pressed juices to healthy breakfasts,
    salads, oats bowls, and muesli meals, CUTS is designed for people
    who want nutritious food without compromising on taste or time.

  </p>

  <p className="text-gray-400 text-sm md:text-base leading-8">

    We believe healthy eating should be simple, attractive,
    and part of everyday life. Every product at CUTS is prepared
    using fresh ingredients, premium presentation,
    and quality-focused preparation methods.

  </p>

  <p className="text-gray-400 text-sm md:text-base leading-8">

    Our mission is to build a trusted healthy lifestyle brand
    that becomes part of people’s daily routines —
    whether it’s a quick breakfast, post-workout refreshment,
    or a complete healthy meal.
    

  </p>
<div className="mt-12 grid md:grid-cols-2 gap-16">

  {/* MENU */}

  <div>

    <p className="text-green-400 uppercase tracking-[3px] text-sm font-bold">
      Explore The Menu
    </p>

    <h3 className="text-3xl font-bold text-white mt-3">
      Fresh & Healthy Choices
    </h3>

    <div className="mt-8 space-y-4 text-gray-300 text-sm md:text-base">

      <p>→ Fresh Cut Fruits</p>

      <p>→ Fresh Juices & Smoothies</p>

      <p>→ Healthy Salads</p>

      <p>→ Oats Bowls</p>

      <p>→ Muesli Breakfasts</p>

      <p>→ Seasonal Healthy Snacks</p>

    </div>

  </div>

  {/* SUBSCRIPTIONS */}

  <div>

    <p className="text-green-400 uppercase tracking-[3px] text-sm font-bold">
      Subscription Plans
    </p>

    <h3 className="text-3xl font-bold text-white mt-3">
      Flexible Healthy Plans
    </h3>

    <div className="mt-8 space-y-4 text-gray-300 text-sm md:text-base">

      <p>→ Daily Healthy Meal Plans</p>

      <p>→ Weekly Fresh Delivery Plans</p>

      <p>→ Custom Meal Selections</p>

      <p>→ Breakfast Combo Packages</p>

    </div>

  </div>

</div>

<div className="mt-10 grid md:grid-cols-2 gap-12">

  <div>

    <p className="text-green-400 uppercase tracking-[3px] text-sm font-bold">
      Our Mission
    </p>

    <h3 className="text-2xl font-bold text-white mt-3">
      Healthy Eating Made Simple
    </h3>

    <p className="text-gray-400 mt-4 leading-8 text-sm md:text-base">

      To make healthy eating simple, tasty,
      and accessible through fresh products,
      premium quality, and reliable delivery.

    </p>

  </div>

  <div>

    <p className="text-green-400 uppercase tracking-[3px] text-sm font-bold">
      Our Vision
    </p>

    <h3 className="text-2xl font-bold text-white mt-3">
      Building A Premium Lifestyle Brand
    </h3>

    <p className="text-gray-400 mt-4 leading-8 text-sm md:text-base">

      To build CUTS into a trusted healthy lifestyle
      brand recognized for freshness, quality,
      convenience, and customer trust.

    </p>

  </div>

</div>
</div>

        </div>

        {/* RIGHT SIDE */}

        <div className="grid gap-6">

          <div className="bg-black border border-green-900 hover:border-green-400 transition rounded-2xl p-6">

            <h3 className="text-2xl font-black text-green-400">
              100% Fresh
            </h3>

            <p className="text-gray-400 mt-4 text-base">
              Daily fresh fruits, ingredients
              and premium healthy preparation.
            </p>

          </div>

          <div className="bg-black border border-green-900 hover:border-green-400 transition rounded-2xl p-6">

            <h3 className="text-2xl font-black text-green-400">
              No Preservatives
            </h3>

            <p className="text-gray-400 mt-4 text-base">
              Pure healthy methods without
              artificial preservatives or chemicals.
            </p>

          </div>

          <div className="bg-black border border-green-900 hover:border-green-400 transition rounded-2xl p-6">

            <h3 className="text-2xl font-black text-green-400">
              Fast Delivery
            </h3>

            <p className="text-gray-400 mt-4 text-base">
              Freshly packed and delivered quickly
              to maintain quality and freshness.
            </p>

          </div>
<div className="mt-16 border-t border-green-900 pt-10">

  <p className="text-green-400 uppercase tracking-[4px] font-bold">
    Founder’s Note
  </p>

  <p className="text-gray-400 text-sm md:text-base leading-8 mt-6 max-w-5xl">

    Hello, I’m Teja Parchuri, founder of CUTS.

    Many people skip breakfast in the morning and wait until lunch,
    but that is not a healthy way to start the day.

    That idea inspired us to create CUTS —
    a fresh and healthy food brand delivering fruits,
    juices, salads, oats, and muesli directly to homes,
    offices, and workspaces.

    Our goal is to make healthy eating simple,
    fresh, and convenient for modern lifestyles.

  </p>

  <p className="text-green-400 font-bold mt-8">
    — Teja Parchuri
  </p>

  <p className="text-gray-500">
    Founder, CUTS
  </p>

</div>
        </div>

      </div>

    </div>

  </div>

</section>

{/* CONTACT SECTION */}

<section
  id="contact"
  className="px-6 md:px-12 py-24"
>

  <div className="w-full">

    <div className="bg-[#0d0d0d] border border-green-900 rounded-[40px] p-12 shadow-[0_0_50px_rgba(34,197,94,0.08)]">

      <div className="flex flex-col items-center text-center">

        {/* HEADING */}

        <p className="text-green-400 font-bold tracking-[4px] uppercase">
          Connect With Cuts
        </p>

        <h2 className="text-4xl md:text-5xl font-black text-white mt-4">
          Let’s Build A

          <span className="block text-green-400">
            Healthy Lifestyle
          </span>

        </h2>

        <p className="text-gray-400 mt-6 max-w-2xl text-base leading-8">
          Fresh healthy meals, premium nutrition,
          and modern lifestyle experiences crafted
          for your daily energy.
        </p>

        {/* CONTACT CARDS */}

        <div className="flex flex-wrap justify-center gap-6 mt-12">

          {/* PHONE */}

          <div className="bg-black border border-green-900 hover:border-green-400 transition rounded-2xl px-8 py-6 min-w-[260px]">

            <div className="flex items-center gap-4">

              <FaPhoneAlt className="text-green-400 text-2xl" />

              <div className="text-left">

                <p className="text-green-400 font-semibold">
                  Phone
                </p>

                <p className="text-white mt-1">
                  +91 7989991066
                </p>

              </div>

            </div>

          </div>

          {/* EMAIL */}

          <div className="bg-black border border-green-900 hover:border-green-400 transition rounded-2xl px-8 py-6 min-w-[260px]">

            <div className="flex items-center gap-4">

              <FaEnvelope className="text-green-400 text-2xl" />

              <div className="text-left">

                <p className="text-green-400 font-semibold">
                  Email
                </p>

                <p className="text-white mt-1">
                  sales@cutsordering.com
                </p>

              </div>

            </div>

          </div>

          {/* LOCATION */}

          <div className="bg-black border border-green-900 hover:border-green-400 transition rounded-2xl px-8 py-6 min-w-[260px]">

            <div className="flex items-center gap-4">

              <FaMapMarkerAlt className="text-green-400 text-2xl" />

              <div className="text-left">

                <p className="text-green-400 font-semibold">
                  Location
                </p>

                <p className="text-white mt-1">
                  Bengaluru (Whitefield)
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* SOCIAL ICONS */}

       <div className="flex justify-center gap-8 mt-12">

  {/* INSTAGRAM */}

  <a
    href="https://www.instagram.com/cuts_yourwakeupmeal?igsh=MTFhZWF5MXBjMjA4NA%3D%3D&utm_source=qr"
    target="_blank"
    rel="noopener noreferrer"
    className="text-green-400 text-4xl hover:scale-110 transition"
  >
    <FaInstagram />
  </a>

  {/* WHATSAPP */}

  <a
    href="https://wa.me/917989991066"
    target="_blank"
    rel="noopener noreferrer"
    className="text-green-400 text-4xl hover:scale-110 transition"
  >
    <FaWhatsapp />
  </a>

  {/* EMAIL */}

  <a
    href="mailto:sales@cutsordering.com"
    className="text-green-400 text-4xl hover:scale-110 transition"
  >
    <FaEnvelope />
  </a>

</div>
<div className="mt-8 flex justify-center gap-6">

  <Link to="/privacy">
    Privacy Policy
  </Link>

  <Link to="/terms">
    Terms & Conditions
  </Link>

  <Link to="/refund-policy">
    Refund Policy
  </Link>

</div>
      </div>

    </div>

  </div>

</section>
 </div>
);
}
