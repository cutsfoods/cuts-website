import React from "react";

export const CartContext =
  React.createContext();

export function CartProvider({ children }) {

  const [cart, setCart] = React.useState([]);
const [isCartOpen, setIsCartOpen] =
  React.useState(false);
  const addToCart = (item) => {

    const existing = cart.find(
      (c) => c.id === item.id
    );

    if (existing) {

      setCart(
        cart.map((c) =>
          c.id === item.id
            ? {
                ...c,
                quantity: c.quantity + 1,
              }
            : c
        )
      );

    } else {

      setCart([
        ...cart,
        {
          ...item,
          quantity: 1,
        },
      ]);

    }

  };

  const removeFromCart = (id) => {

    const existing = cart.find(
      (c) => c.id === id
    );

    if (!existing) return;

    if (existing.quantity === 1) {

      setCart(
        cart.filter((c) => c.id !== id)
      );

    } else {

      setCart(
        cart.map((c) =>
          c.id === id
            ? {
                ...c,
                quantity: c.quantity - 1,
              }
            : c
        )
      );

    }

  };

  const totalItems = cart.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );

  const totalPrice = cart.reduce(
    (sum, item) =>
      sum +
      item.price * item.quantity,
    0
  );

  return (

    <CartContext.Provider
     value={{
  cart,
  addToCart,
  removeFromCart,
  totalItems,
  totalPrice,
  isCartOpen,
  setIsCartOpen,
}}
    >

      {children}

    </CartContext.Provider>

  );
}