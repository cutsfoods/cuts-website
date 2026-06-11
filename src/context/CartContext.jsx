import React from "react";

export const CartContext =
  React.createContext();

export function CartProvider({
  children,
}) {

 const [cart, setCart] =
  React.useState(() => {

    const savedCart =
      localStorage.getItem(
        "cart"
      );

    return savedCart
      ? JSON.parse(savedCart)
      : [];

  });

  const [
    isCartOpen,
    setIsCartOpen,
  ] = React.useState(false);

  // ADD TO CART

  const addToCart = (item) => {

    const existingItem =
      cart.find(
        (cartItem) =>
          cartItem.id === item.id
      );

    if (existingItem) {

      setCart(
        cart.map((cartItem) =>

          cartItem.id === item.id

            ? {
                ...cartItem,

                quantity:
                  cartItem.quantity + 1,
              }

            : cartItem

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

  // REMOVE FROM CART

  const removeFromCart = (
    id
  ) => {

    const existingItem =
      cart.find(
        (item) =>
          item.id === id
      );

    if (!existingItem) return;

    if (
      existingItem.quantity === 1
    ) {

      setCart(
        cart.filter(
          (item) =>
            item.id !== id
        )
      );

    } else {

      setCart(
        cart.map((item) =>

          item.id === id

            ? {
                ...item,

                quantity:
                  item.quantity - 1,
              }

            : item

        )
      );

    }

  };

  // TOTAL ITEMS

  const totalItems =
    cart.reduce(

      (total, item) =>

        total +
        item.quantity,

      0

    );

  // TOTAL PRICE

  const totalPrice =
    cart.reduce(

      (total, item) =>

        total +

        item.price *
          item.quantity,

      0

    );
React.useEffect(() => {

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

}, [cart]);
  return (

    <CartContext.Provider
      value={{

        cart,
        setCart,

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