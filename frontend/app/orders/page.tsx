"use client";

import React from "react";

const OrdersPage = () => {
  const dummyOrders = [
    {
      id: "#ORD123456",
      date: "April 5, 2025",
      status: "Delivered",
      total: "₹ 599",
      items: ["Chicken Biryani", "Butter Naan", "Paneer Tikka"],
    },
    {
      id: "#ORD123457",
      date: "April 1, 2025",
      status: "On the Way",
      total: "₹ 399",
      items: ["Veg Fried Rice", "Manchurian"],
    },
    {
      id: "#ORD123458",
      date: "March 28, 2025",
      status: "Cancelled",
      total: "₹ 249",
      items: ["Idli", "Vada", "Coffee"],
    },
  ];

  return (
    <div className="pt-24 max-w-5xl mx-auto px-4">
      {/* Under Construction Banner */}
      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-6 py-4 rounded-xl mb-8">
        <h2 className="text-xl font-semibold">🚧 This page is under construction</h2>
      </div>

      {/* Orders List */}
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Your Orders</h3>

      <div className="space-y-6">
        {dummyOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white shadow-md rounded-xl p-6 border hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-semibold text-gray-700">{order.id}</h4>
              <span
                className={`text-sm px-3 py-1 rounded-full font-medium ${
                  order.status === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.status === "On the Way"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-sm text-gray-500 mb-1">Date: {order.date}</p>
            <p className="text-sm text-gray-500 mb-2">Total: {order.total}</p>
            <p className="text-gray-600 text-sm">
              Items: {order.items.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
