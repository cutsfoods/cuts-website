import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import {
  CartProvider,
} from "./context/CartContext";

import Navbar
  from "./components/Navbar";

import CartSidebar
  from "./components/CartSidebar";

import ProtectedRoute
  from "./components/ProtectedRoute";

import Home
  from "./pages/Home";

import Menu
  from "./pages/Menu";

import About
  from "./pages/About";

import Contact
  from "./pages/Contact";

import Checkout
  from "./pages/Checkout";

import Success
  from "./pages/Success";

import Admin
  from "./pages/Admin";

import TrackOrder
  from "./pages/TrackOrder";

import Signup
  from "./pages/Signup";

import Payment
  from "./pages/Payment";

  import AdminLogin from "./pages/AdminLogin";

import AdminRoute from "./components/AdminRoute";

import Profile from "./pages/Profile";

import Orders from "./pages/Orders";

import SavedAddresses
  from "./pages/SavedAddresses";

  import PrivacyPolicy
  from "./pages/PrivacyPolicy";

import Terms
  from "./pages/Terms";

import RefundPolicy
  from "./pages/RefundPolicy";

import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";  

export default function App() {
const [showSplash, setShowSplash] =
  useState(
    !sessionStorage.getItem("splashShown")
  );

useEffect(() => {

  if (!showSplash) return;

  const timer =
    setTimeout(() => {

      sessionStorage.setItem(
        "splashShown",
        "true"
      );

      setShowSplash(false);

    }, 3000);

  return () =>
    clearTimeout(timer);

}, [showSplash]);
if (showSplash) {

  return <SplashScreen />;

}
  return (

    <CartProvider>

      <BrowserRouter>

        <Navbar />

        <CartSidebar />

        <Routes>

          {/* HOME */}

          <Route
            path="/"
            element={<Home />}
          />

          {/* LOGIN */}

          <Route
            path="/signup"
            element={<Signup />}
          />

          {/* PROTECTED ROUTES */}

          <Route
            path="/menu"
            element={

              <ProtectedRoute>

                <Menu />

              </ProtectedRoute>

            }
          />

          <Route
            path="/checkout"
            element={

              <ProtectedRoute>

                <Checkout />

              </ProtectedRoute>

            }
          />

          <Route
            path="/payment"
            element={

              <ProtectedRoute>

                <Payment />

              </ProtectedRoute>

            }
          />

          <Route
            path="/success"
            element={

              <ProtectedRoute>

                <Success />

              </ProtectedRoute>

            }
          />

         <Route
  path="/admin-login"
  element={<AdminLogin />}
/>

<Route
  path="/admin"
  element={
    <AdminRoute>
      <Admin />
    </AdminRoute>
  }
/>

          {/* PUBLIC */}

          <Route
            path="/about"
            element={<About />}
          />

          <Route
            path="/contact"
            element={<Contact />}
          />

          <Route
            path="/track-order"
            element={<TrackOrder />}
          />
<Route
  path="/profile"
  element={<Profile />}
/>

<Route
  path="/orders"
  element={
    <ProtectedRoute>
      <Orders />
    </ProtectedRoute>
  }
/>

<Route
  path="/saved-addresses"
  element={
    <ProtectedRoute>
      <SavedAddresses />
    </ProtectedRoute>
  }
/>

<Route
  path="/privacy"
  element={<PrivacyPolicy />}
/>

<Route
  path="/terms"
  element={<Terms />}
/>

<Route
  path="/refund-policy"
  element={<RefundPolicy />}
/>

        </Routes>

      </BrowserRouter>

    </CartProvider>

  );

}