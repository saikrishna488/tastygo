"use client";

import React from "react";

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      price: 299,
      quantity: 2,
      image: "https://source.unsplash.com/100x100/?pizza",
    },
    {
      id: 2,
      name: "Cheesy Garlic Bread",
      price: 149,
      quantity: 1,
      image: "https://source.unsplash.com/100x100/?garlic-bread",
    },
    {
      id: 3,
      name: "Pepsi (500ml)",
      price: 49,
      quantity: 3,
      image: "https://source.unsplash.com/100x100/?softdrink",
    },
  ];

  const getTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="pt-24 pb-10 max-w-5xl mx-auto px-4">
      {/* Under Construction Banner */}
      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-6 py-4 rounded-xl mb-8">
        <h2 className="text-xl font-semibold">🛠️ This page is under construction</h2>
      </div>

      {/* Cart Heading */}
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Cart</h3>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-white shadow-md rounded-xl p-4 border"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    ₹{item.price} x {item.quantity}
                  </p>
                </div>
              </div>
              <div className="text-lg font-bold text-red-600">
                ₹{item.price * item.quantity}
              </div>
            </div>
          ))}

          {/* Total Section */}
          <div className="flex justify-between items-center pt-6 border-t mt-8">
            <span className="text-xl font-semibold text-gray-800">Total</span>
            <span className="text-xl font-bold text-red-600">₹{getTotal()}</span>
          </div>

          {/* Checkout Button */}
          <button
            disabled
            className="w-full mt-6 bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition disabled:opacity-50"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
