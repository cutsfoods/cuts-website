import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CartSidebar from "./components/CartSidebar";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";
import Admin from "./pages/Admin";
import TrackOrder from "./pages/TrackOrder";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import Payment from "./pages/Payment";



export default function App() {
  return (

    <CartProvider>
  <BrowserRouter>

      <Navbar />
      <CartSidebar />

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

       <Route
  path="/menu"
  element={
    <ProtectedRoute>
      <Menu />
    </ProtectedRoute>
  }
/>

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
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
  element={<Payment />}
/>
<Route
  path="/success"
  element={<Success />}
/>
<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <Admin />
    </ProtectedRoute>
  }
/>
<Route
  path="/track-order"
  element={<TrackOrder />}
/>
<Route
  path="/signup"
  element={<Signup />}
/>

      </Routes>

    </BrowserRouter>
</CartProvider>

  );
}