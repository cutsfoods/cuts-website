import React, {
  useEffect,
  useState,
} from "react";

import logo
  from "../images/Logo.jpeg";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  CartContext,
} from "../context/CartContext";

import LocationModal
  from "./LocationModal";

import {
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  auth,
} from "../firebase";

export default function Navbar() {

  const navigate =
    useNavigate();

  const [selectedLocation,
    setSelectedLocation] =
    useState(

      sessionStorage.getItem(
        "selectedAddress"
      ) || "Select Location"

    );

  const [isLocationModalOpen,
    setIsLocationModalOpen] =
    useState(false);

  const [user,
    setUser] =
    useState(null);

    const [showAccountMenu,
  setShowAccountMenu] =
  useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const {
    totalItems,
    totalPrice,
    setIsCartOpen,
  } = React.useContext(
    CartContext
  );

  // AUTH STATE

  useEffect(() => {

    const unsubscribe =

      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(
            currentUser
          );

          if (currentUser) {

            localStorage.setItem(
              "cutsUserLoggedIn",
              "true"
            );

          } else {

            localStorage.removeItem(
              "cutsUserLoggedIn"
            );

          }

        }
      );

    return () =>
      unsubscribe();

  }, []);

  // OPEN CART

  const handleCartOpen =
    () => {

      if (!user) {

        navigate(
          "/signup"
        );

        return;

      }

      setIsCartOpen(
        true
      );

    };

  return (

    <nav className="sticky top-0 z-50 bg-black border-b border-green-900">

      <div className="w-full px-14 md:px-28 py-4 flex items-center justify-between">

        {/* LEFT */}

        <div className="flex items-center gap-3">

         <a
  href="/"
  className="flex items-center gap-3"
>

            <img
              src={logo}
              alt="Cuts"
              className="w-12 h-12 rounded-full"
            />

            <h1 className="text-2xl font-black text-green-400 tracking-wide">

              CUTS

            </h1>

          </a>

          {/* LOCATION */}

          <button
            onClick={() =>
              setIsLocationModalOpen(
                true
              )
            }
            className="text-left"
          >

            <p className="text-xs text-gray-400">

              Delivery To

            </p>

            <h2 className="text-sm font-bold text-green-400 truncate max-w-[180px]">

              {selectedLocation}

            </h2>

          </button>

        </div>

        {/* RIGHT */}

        <div className="hidden md:flex items-center gap-10 text-white font-medium">

         <a
  href="/"
  className="hover:text-green-100 transition"
>
  Home
</a>

          <Link
            to={
              user
                ? "/menu"
                : "/signup"
            }
            className="hover:text-green-400 transition"
          >

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

          {/* CART */}

          <button

            onClick={
              handleCartOpen
            }

            className="border border-green-500 text-green-400 px-6 py-3 rounded-2xl font-semibold hover:bg-green-500 hover:text-black transition"

          >

            Cart ({totalItems}) • ₹{totalPrice}

          </button>

          {/* LOGIN / LOGOUT */}

         {user ? (

  <div className="relative">

    <button

      onClick={() =>
        setShowAccountMenu(
          !showAccountMenu
        )
      }

      className="border border-green-500 px-5 py-2 rounded-xl text-green-400 hover:bg-green-500 hover:text-black transition"

    >

      👤 Account

    </button>

    {showAccountMenu && (

      <div className="absolute right-0 mt-3 w-56 bg-[#111111] border border-green-900 rounded-2xl overflow-hidden shadow-xl">

        <button

          onClick={() =>
            navigate("/profile")
          }

          className="w-full text-left px-5 py-4 hover:bg-[#1a1a1a] text-white"

        >

          👤 Profile

        </button>

        <button

          onClick={() =>
            navigate("/orders")
          }

          className="w-full text-left px-5 py-4 hover:bg-[#1a1a1a] text-white"

        >

          📦 Order History

        </button>
<button

  onClick={() =>
    navigate(
      "/saved-addresses"
    )
  }

  className="w-full text-left px-5 py-4 hover:bg-[#1a1a1a] text-white"

>

  📍 Saved Addresses

</button> 
        <button

         onClick={async () => {

  await signOut(auth);

  localStorage.removeItem(
    "selectedAddress"
  );

  localStorage.removeItem(
    "selectedAddressData"
  );

  localStorage.removeItem(
    "cutsUserName"
  );

  localStorage.removeItem(
    "cutsUserPhone"
  );

  localStorage.removeItem(
    "userCoordinates"
  );

  sessionStorage.clear();

  window.location.href = "/";

}}
          className="w-full text-left px-5 py-4 hover:bg-[#1a1a1a] text-red-400"

        >

          🚪 Logout

        </button>

      </div>

    )}

  </div>

) : (

            <Link
              to="/signup"
            >

              <button className="border border-green-500 px-5 py-2 rounded-xl text-green-400 hover:bg-green-500 hover:text-black transition">

                Login

              </button>

            </Link>

          )}

        </div>

      </div>
{/* MOBILE MENU BUTTON */}

<button
  className="md:hidden text-green-400 text-3xl"
  onClick={() =>
    setMobileMenuOpen(!mobileMenuOpen)
  }
>
  ☰
</button>

{/* MOBILE DROPDOWN */}

{mobileMenuOpen && (

  <div className="md:hidden bg-black border-t border-green-900 flex flex-col text-white">

    <Link
      to="/"
      className="px-6 py-4 border-b border-green-900"
    >
      Home
    </Link>

    <Link
      to={user ? "/menu" : "/signup"}
      className="px-6 py-4 border-b border-green-900"
    >
      Menu
    </Link>

    <a
      href="/#about"
      className="px-6 py-4 border-b border-green-900"
    >
      About Us
    </a>

    <a
      href="/#contact"
      className="px-6 py-4 border-b border-green-900"
    >
      Contact
    </a>

    <button
      onClick={handleCartOpen}
      className="px-6 py-4 border-b border-green-900 text-left"
    >
      Cart ({totalItems}) • ₹{totalPrice}
    </button>

    {!user ? (
      <Link
        to="/signup"
        className="px-6 py-4"
      >
        Login
      </Link>
    ) : (
      <button
        onClick={async () => {
          await signOut(auth);
          window.location.href = "/";
        }}
        className="px-6 py-4 text-left text-red-400"
      >
        Logout
      </button>
    )}

  </div>

)}

      {/* LOCATION MODAL */}

      <LocationModal

        isOpen={
          isLocationModalOpen
        }

        onClose={() =>
          setIsLocationModalOpen(
            false
          )
        }

        onSave={(address) =>
          setSelectedLocation(
            address
          )
        }

      />

    </nav>

  );

}