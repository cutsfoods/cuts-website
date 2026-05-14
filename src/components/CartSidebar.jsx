import React from "react";
import { useNavigate } from "react-router-dom";

import {
  CartContext,
} from "../context/CartContext";

export default function CartSidebar() {
const navigate = useNavigate();
  const {
    cart,
    totalPrice,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
  } = React.useContext(CartContext);

  return (

    <>

      {/* BACKDROP */}

      {isCartOpen && (

        <div
          onClick={() =>
            setIsCartOpen(false)
          }
          className="fixed inset-0 bg-black/60 z-40"
        />

      )}

      {/* SIDEBAR */}

      <div
        className={`fixed top-0 right-0 h-full w-[400px] bg-[#0d0d0d] border-l border-green-900 z-50 transform transition-transform duration-300 overflow-y-auto ${
          isCartOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        <div className="p-6">

          {/* HEADER */}

          <div className="flex items-center justify-between">

            <h2 className="text-3xl font-black text-green-400">
              Your Cart
            </h2>

            <button
              onClick={() =>
                setIsCartOpen(false)
              }
              className="text-white text-3xl"
            >
              ×
            </button>

          </div>

          {/* EMPTY */}

          {cart.length === 0 ? (

            <div className="mt-20 text-center">

              <p className="text-gray-400 text-xl">
                Your cart is empty
              </p>

            </div>

          ) : (

            <div className="mt-10 space-y-6">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="bg-black border border-green-900 rounded-3xl p-5"
                >

                  <div className="flex items-start justify-between gap-4">

                    <div>

  <h3 className="text-xl font-bold text-white">
    {item.name}
  </h3>

  {/* SELECTED FRUITS */}

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

  <p className="text-green-400 font-bold mt-3">
    ₹{item.price}
  </p>

</div>

                    <div className="flex items-center gap-3">

                      <button
                        onClick={() =>
                          removeFromCart(
                            item.id
                          )
                        }
                        className="w-8 h-8 rounded-full bg-red-500 text-white font-bold"
                      >
                        -
                      </button>

                      <span className="font-bold text-lg">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() =>
                          addToCart(item)
                        }
                        className="w-8 h-8 rounded-full bg-green-500 text-black font-bold"
                      >
                        +
                      </button>

                    </div>

                  </div>

                </div>

              ))}

              {/* TOTAL */}

              <div className="border-t border-green-900 pt-6">

                <div className="flex items-center justify-between">

                  <p className="text-2xl font-bold">
                    Total
                  </p>

                  <p className="text-3xl font-black text-green-400">
                    ₹{totalPrice}
                  </p>

                </div>

               <button
  onClick={() => {

    setIsCartOpen(false);

    navigate("/checkout");

  }}
  className="w-full mt-8 bg-green-500 hover:bg-green-600 text-black py-5 rounded-3xl text-xl font-black transition"
>

                  Proceed to Checkout

                </button>

              </div>

            </div>

          )}

        </div>

      </div>

    </>

  );
}