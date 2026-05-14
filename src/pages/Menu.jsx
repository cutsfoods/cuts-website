import React from "react";
import {
  CartContext,
} from "../context/CartContext";

import abcJuice from "../images/abc-juice.jpeg";
import bananaJuice from "../images/banana-juice.jpeg";
import chiaPudding from "../images/chia-pudding.jpeg";
import coconutJuice from "../images/coconut-juice.jpeg";
import detoxJuice from "../images/detox-juice.jpeg";
import dryfruitJuice from "../images/dryfruit-juice.jpeg";
import greenSalad from "../images/green-salad.jpeg";
import individualFruitBowl from "../images/individual-fruit-bowl.jpeg";
import mixedFruitBowl from "../images/mixed-fruit-bowl.jpeg";
import mosambiJuice from "../images/mosambi-juice.jpeg";
import museliOats from "../images/museli-oats.jpeg";
import orangeGlow from "../images/orange-glow.jpeg";
import pineappleBoost from "../images/pineapple- boost.jpeg";
import watermelonFresh from "../images/watermelon-fresh.jpeg";
import { db } from "../firebase";

import {
  collection,
  onSnapshot,
} from "firebase/firestore";
export default function Menu() {

 const [
  selectedCategory,
  setSelectedCategory,
] = React.useState("Fruit Bowls");
const {
  cart,
  addToCart,
  removeFromCart,
} = React.useContext(CartContext);
const [showCustomizer, setShowCustomizer] =
  React.useState(false);

const [fruitQuantities, setFruitQuantities] =
  React.useState({});
  const fruitOptions = [

  { name: "Papaya", price: 59 },

  { name: "Watermelon", price: 49 },

  { name: "Pomegranate", price: 129 },

  { name: "Grapes (Green)", price: 79 },

  { name: "Grapes (Black)", price: 89 },

  { name: "Pine Apple", price: 79 },

  { name: "Apple", price: 99 },

  { name: "Kiwi", price: 69 },

  { name: "Dragon Fruit", price: 89 },

  { name: "Guava", price: 69 },

  { name: "Mango", price: 89 },

  { name: "Muskmelon", price: 59 },

  { name: "Oranges", price: 79 },

  { name: "Banana", price: 39 },

];
  const categories = [
    
    "Fruit Bowls",
    "Juices",
    "Quick Breakfast",
  ];
const updateFruitQty = (fruit, change) => {

  setFruitQuantities((prev) => {

    const currentQty =
      prev[fruit.name]?.qty || 0;

    const newQty = Math.max(
      0,
      currentQty + change
    );

    const updated = { ...prev };

    if (newQty === 0) {

      delete updated[fruit.name];

    } else {

      updated[fruit.name] = {
        ...fruit,
        qty: newQty,
      };

    }

    return updated;

  });

};
const addCustomizedBowl = () => {

  const selectedFruits =
    Object.values(fruitQuantities);

  if (selectedFruits.length === 0) {

    alert(
      "Please select at least one fruit"
    );

    return;

  }

  const totalPrice =
    selectedFruits.reduce(
      (sum, fruit) =>
        sum +
        fruit.price * fruit.qty,
      0
    );

  const customBowl = {

    id: "custom-bowl",

    name: "Individual Fruit Bowl",

    price: totalPrice,

    quantity: 1,

    selectedFruits,

  };

  addToCart(customBowl);

  setShowCustomizer(false);

};
const [menuItems, setMenuItems] =
  React.useState([]);
React.useEffect(() => {

  const unsubscribe =
    onSnapshot(
      collection(db, "products"),
      (snapshot) => {

        const fetchedProducts =
          snapshot.docs.map((doc) => ({

            id: doc.id,

            ...doc.data(),

          }));

        setMenuItems(
          fetchedProducts
        );

      }
    );

  return () => unsubscribe();

}, []);
  return (

    <div className="bg-black text-white min-h-screen px-8 py-20">

      <div className="max-w-7xl mx-auto">

        <div className="text-center">

          <p className="text-green-400 font-bold text-xl">
            OUR MENU
          </p>

          <h1 className="text-6xl font-black mt-4">
            Fresh & Healthy
          </h1>

          <p className="text-gray-400 text-xl mt-6">
            Premium fruit bowls, juices & healthy breakfasts
          </p>

        </div>

        {/* CATEGORY */}

        <div className="flex flex-wrap justify-center gap-5 mt-10">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() =>
                setSelectedCategory(category)
              }
              className={`px-8 py-4 rounded-2xl font-semibold transition ${
                selectedCategory === category
                  ? "bg-green-500 text-black"
                  : "bg-[#161616] text-white"
              }`}
            >
              {category}
            </button>

          ))}

        </div>

        {/* PRODUCTS */}

      <div className="flex flex-wrap justify-center gap-8 mt-10">

          {menuItems
            .filter(
              (item) =>
               item.category === selectedCategory
            )
            .map((item) => (

              <div
                key={item.id}
                className="bg-[#111] border border-green-900 rounded-3xl overflow-hidden shadow-2xl hover:scale-[1.02] transition"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover"
                />

                <div className="p-6">

                  <h3 className="text-2xl font-bold">
                    {item.name}
                  </h3>
{item.name === "Individual Fruit Bowl" && (

  <div className="mt-5">

    <button
      onClick={() =>
        setShowCustomizer(
          !showCustomizer
        )
      }
      className="w-full bg-[#1b1b1b] border border-green-800 text-green-400 py-3 rounded-2xl font-bold"
    >

      Customize Bowl

    </button>
<button
  onClick={addCustomizedBowl}
  className="w-full mt-5 bg-green-500 hover:bg-green-600 text-black py-3 rounded-2xl font-bold text-base"
>

  Add Bowl

</button>
    {showCustomizer && (

      <div className="mt-4 bg-black border border-green-900 rounded-2xl p-4 space-y-3 max-h-80 overflow-y-auto">

        {fruitOptions.map((fruit) => {

          const qty =
            fruitQuantities[
              fruit.name
            ]?.qty || 0;

          return (

            <div
  key={fruit.name}
  className="flex items-center justify-between bg-[#111] rounded-2xl px-4 py-3"
>

  <div className="flex flex-col">

    <p className="font-semibold text-white text-sm">
      {fruit.name}
    </p>

    <p className="text-xs text-gray-400 mt-1">
      ₹{fruit.price}
    </p>

  </div>

  <div className="flex items-center gap-3">

    <button
      onClick={() =>
        updateFruitQty(
          fruit,
          -1
        )
      }
      className="w-7 h-7 rounded-full bg-red-500 text-white font-bold flex items-center justify-center"
    >
      -
    </button>

    <span className="text-white font-bold text-sm w-5 text-center">
      {qty}
    </span>

    <button
      onClick={() =>
        updateFruitQty(
          fruit,
          1
        )
      }
      className="w-7 h-7 rounded-full bg-green-500 text-black font-bold flex items-center justify-center"
    >
      +
    </button>

  </div>

</div>

          );

        })}

      </div>

    )}

  </div>

)}
              
{item.name !== "Individual Fruit Bowl" ? (

  <p className="text-green-400 text-2xl font-black mt-3">
    ₹{item.price}
  </p>

) : null}


              {item.name !== "Individual Fruit Bowl" && (

  cart.find((c) => c.id === item.id) ? (

    <div className="flex items-center justify-center gap-4 mt-6">

      <button
        onClick={() => removeFromCart(item.id)}
        className="w-12 h-12 rounded-xl bg-red-500 text-white text-2xl font-bold"
      >
        -
      </button>

      <span className="text-2xl font-bold">

        {
          cart.find((c) => c.id === item.id)
            ?.quantity
        }

      </span>

      <button
        onClick={() => addToCart(item)}
        className="w-12 h-12 rounded-xl bg-green-500 text-black text-2xl font-bold"
      >
        +
      </button>

    </div>

  ) : (

   !item.inStock ? (

  <div className="mt-6 bg-red-500 text-white py-4 rounded-2xl font-bold text-center">

    Out Of Stock

  </div>

) : (

  <button
    onClick={() => addToCart(item)}
    className="w-full mt-6 bg-green-500 hover:bg-green-600 text-black py-4 rounded-2xl font-bold text-lg"
  >

    Add to Cart

  </button>

)
  )

)}

                </div>

              </div>

            ))}

        </div>

      </div>

    </div>
  );
}