import React, { useState } from "react";

export default function FilterPage() {
  const [active, setActive] = useState("Cake");
  const [showFilter, setShowFilter] = useState(false);
  const [maxPrice, setMaxPrice] = useState(650);

  const products = [
    {
      id: 1,
      name: "Chocolate Cake",
      price: 600,
      img: "/chocolate.avif",
      category: "Cake",
    },
    {
      id: 2,
      name: "Vanilla Cake",
      price: 550,
      img: "/cake2.jpg",
      category: "Cake",
    },
    {
      id: 3,
      name: "Red Velvet Cake",
      price: 700,
      img: "/cake3.jpg",
      category: "Cake",
    },
    {
      id: 4,
      name: "Strawberry Cake",
      price: 450,
      img: "/cake4.jpg",
      category: "Cake",
    },
    {
      id: 5,
      name: "Butterscotch Cake",
      price: 850,
      img: "/cake5.jpg",
      category: "Cake",
    },
    {
      id: 6,
      name: "Pineapple Cake",
      price: 750,
      img: "/cake6.jpg",
      category: "Cake",
    },
    {
      id: 7,
      name: "Black Forest Cake",
      price: 900,
      img: "/cake7.jpg",
      category: "Cake",
    },
    {
      id: 8,
      name: "White Forest Cake",
      price: 900,
      img: "/cake5.jpg",
      category: "Cake",
    },
    {
      id: 9,
      name: " Coffe Cake",
      price: 850,
      img: "/cake5.jpg",
      category: "Cake",
    },
    {
      id: 10,
      name: " Blueberry Cake",
      price: 1000,
      img: "/cake5.jpg",
      category: "Cake",
    },
    {
      id: 11,
      name: " Fruit Cake",
      price: 1150,
      img: "/cake5.jpg",
      category: "Cake",
    },
    {
      id: 12,
      name: " Dry Fruit cake",
      price: 1250,
      img: "/cake5.jpg",
      category: "Cake",
    },

    {
      id: 13,
      name: "Chocolate Glazed Donut",
      price: 600,
      img: "/donut1.jpg",
      category: "Donuts / Cookies",
    },
    {
      id: 14,
      name: "Nutella Donut",
      price: 700,
      img: "/donut1.jpg",
      category: "Donuts / Cookies",
    },
    {
      id: 15,
      name: "Coffee Mocha Donut",
      price: 720,
      img: "/donut1.jpg",
      category: "Donuts / Cookies",
    },
    {
      id: 16,
      name: "Blueberry Filled Donut",
      price: 680,
      img: "/donut1.jpg",
      category: "Donuts / Cookies",
    },
    {
      id: 17,
      name: "Chramel Crunch",
      price: 650,
      img: "/donut1.jpg",
      category: "Donuts / Cookies",
    },
    {
      id: 18,
      name: "Stawbery srinkle Donut",
      price: 620,
      img: "/donut1.jpg",
      category: "Donuts / Cookies",
    },
    {
      id: 19,
      name: "Choco Chip Cookies",
      price: 120,
      img: "/cookies1.jpg",
      category: "Donuts / Cookies",
    },

    {
      id: 20,
      name: "Cheese Pizza",
      price: 650,
      img: "/pizza1.jpg",
      category: "Special Pizza",
    },
    {
      id: 21,
      name: "Paneer Pizza",
      price: 550,
      img: "/pizza2.jpg",
      category: "Special Pizza",
    },
    {
      id: 22,
      name: "Custom Cake",
      price: 550,
      img: "/customcake.jpg",
      category: "Customize Cake",
    },
    {
      id: 23,
      name: "Premium Custom Cake",
      price: 900,
      img: "/customcake2.jpg",
      category: "Customize Cake",
    },
  ];

  const categories = [
    "Cake",
    "Donuts / Cookies",
    "Special Pizza",
    "Customize Cake",
  ];

  // FINAL FILTER LOGIC
  const filteredData = products.filter(
    (item) => item.category === active && item.price <= maxPrice
  );

  return (
    <div className="min-h-screen bg-[#f7efe7] p-6 relative">
      {/* FILTER BUTTON */}
      <button
        onClick={() => setShowFilter(true)}
        className="fixed left-4 top-1/3 z-50 bg-[#a6662e] text-white px-4 py-2 rounded-xl shadow-lg hover:scale-105 transition"
      >
        Filters
      </button>

      {/* LEFT SLIDE FILTER PANEL */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl p-6 z-40 transition-transform duration-300
        ${showFilter ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#a6662e]">Filters</h2>

          {/* CLOSE BUTTON */}
          <button
            onClick={() => setShowFilter(false)}
            className="text-xl font-bold"
          >
            ✖
          </button>
        </div>

        {/* PRICE SLIDER */}
        <label className="font-semibold text-gray-700">Price Range</label>
        <input
          type="range"
          min="600"
          max="1500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full mt-2"
        />
        <p className="mt-2 text-lg font-bold text-[#a6662e]">
          Up to ₹ {maxPrice}
        </p>
      </div>

      {/* BACKDROP OVERLAY */}
      {showFilter && (
        <div
          onClick={() => setShowFilter(false)}
          className="fixed inset-0 bg-black/30 z-30"
        ></div>
      )}

      {/* CATEGORY BUTTONS */}
      <h1 className="text-3xl font-bold text-center mb-6 tracking-wide">
        Our Services
      </h1>

      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-6 py-2 rounded-2xl shadow-md text-lg font-semibold transition-all duration-300 border 
            ${
              active === cat
                ? "bg-[#a6662e] text-white scale-105"
                : "bg-white text-[#a6662e] hover:shadow-lg"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* PRODUCT GRID */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded-2xl shadow-xl hover:scale-105 transition"
            >
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-40 object-cover rounded-xl"
              />
              <h3 className="font-bold text-xl mt-3 text-[#a6662e]">
                {item.name}
              </h3>
              <p className="text-gray-600 text-lg">₹ {item.price}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-600 col-span-3">
            No items found in this price range...
          </p>
        )}
      </div>
    </div>
  );
}
