import React, {
  useEffect,
  useState,
} from "react";
import logo from "../images/logo.jpeg";
import { Link } from "react-router-dom";
import {
  CartContext,
} from "../context/CartContext";
import LocationModal from "./LocationModal";
import {
  signOut,
} from "firebase/auth";

import {
  auth,
} from "../firebase";
import {
  onAuthStateChanged,
} from "firebase/auth";

export default function Navbar() {
    const [selectedLocation,
        
  setSelectedLocation] =
  
  useState(
    localStorage.getItem(
      "selectedAddress"
    ) || "Select Location"
  );
  const [isLocationModalOpen,
  setIsLocationModalOpen] =
  useState(false);
  const [user,
  setUser] =
  useState(null);
   const {
  totalItems,
  totalPrice,
  setIsCartOpen,
  
} = React.useContext(CartContext);
useEffect(() => {

  const unsubscribe =
    onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser);

      }
    );

  return () => unsubscribe();

}, []);
useEffect(() => {

  const unsubscribe =
    onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser);

      }
    );

  return () => unsubscribe();

}, []);
  return (
    <nav className="sticky top-0 z-50 bg-black border-b border-green-900">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <img
            src={logo}
            alt="Cuts"
            className="w-12 h-12 rounded-full"
          />

          <h1 className="text-2xl font-black text-green-400 tracking-wide">
            CUTS
          </h1>
<button
  onClick={() =>
    setIsLocationModalOpen(true)
  }
  className="text-left"
>

  <p className="text-xs text-gray-400">
    Delivery To
  </p>

  <h2 className="text-sm font-bold text-green-400">

    {selectedLocation}

  </h2>

</button>
        </div>

        <div className="hidden md:flex items-center gap-10 text-white font-medium">

          <Link to="/" className="hover:text-green-400 transition">
            Home
          </Link>

          <Link to="/menu" className="hover:text-green-400 transition">
            Menu
          </Link>

          <a
  href="/#about"
  className="hover:text-green-400 transition"
>
  About Us
</a>

         <a
  href="/#contact"
  className="hover:text-green-400 transition"
>
  Contact
</a>
<button
  onClick={() => setIsCartOpen(true)}
  className="border border-green-500 text-green-400 px-6 py-3 rounded-2xl font-semibold hover:bg-green-500 hover:text-black transition"
>

  Cart ({totalItems}) • ₹{totalPrice}

</button>


 {user ? (

  <button
    onClick={async () => {

      await signOut(auth);

      localStorage.removeItem(
        "selectedAddress"
      );

      localStorage.removeItem(
        "userCoordinates"
      );

      window.location.href = "/";

    }}
    className="border border-red-500 px-5 py-2 rounded-xl text-red-400"
  >

    Logout

  </button>

) : (

  <Link to="/signup">

    <button className="border border-green-500 px-5 py-2 rounded-xl text-green-400">

      Login

    </button>

  </Link>

)}



        </div>
        

      </div>
<LocationModal
  isOpen={
    isLocationModalOpen
  }
  onClose={() =>
    setIsLocationModalOpen(false)
  }
  onSave={(address) =>
    setSelectedLocation(address)
  }
/>
    </nav>
  );
}