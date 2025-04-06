"use client"
import React, { useState } from 'react'

const dummyOrders = [
    {
        id: 'ORD123456',
        customerName: 'Rahul Sharma',
        items: ['Paneer Biryani', 'Lassi'],
        totalAmount: 340,
        status: 'Pending',
        orderedAt: '2025-04-05 14:23',
    },
    {
        id: 'ORD123457',
        customerName: 'Sneha Reddy',
        items: ['Chicken 65', 'Butter Naan'],
        totalAmount: 420,
        status: 'Delivered',
        orderedAt: '2025-04-04 19:10',
    },
    {
        id: 'ORD123458',
        customerName: 'Anil Kumar',
        items: ['Veg Thali'],
        totalAmount: 180,
        status: 'Cancelled',
        orderedAt: '2025-04-02 13:45',
    },
]

const statusColors: Record<string, string> = {
    Pending: 'text-yellow-600 bg-yellow-100',
    Delivered: 'text-green-600 bg-green-100',
    Cancelled: 'text-red-600 bg-red-100',
}

const OrdersPage = () => {
    const [orders] = useState(dummyOrders)

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => window.history.back()}
                    className="text-red-600 hover:underline text-sm sm:text-base"
                >
                    ← Back
                </button>
                <h2 className="text-2xl sm:text-3xl font-bold text-red-600 text-center w-full">
                    Orders
                </h2>
                <div className="w-14" /> {/* For spacing balance */}
            </div>

            {orders.length === 0 ? (
                <p className="text-center text-gray-500">No orders yet.</p>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white border rounded-xl shadow-md p-6 hover:shadow-lg transition-all duration-200">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-800">Order ID: {order.id}</h3>
                                    <p className="text-sm text-gray-500 mt-1">Customer: {order.customerName}</p>
                                    <p className="text-sm text-gray-500 mt-1">Ordered at: {order.orderedAt}</p>
                                    <ul className="mt-2 list-disc list-inside text-gray-700">
                                        {order.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                    <p className="text-red-600 font-semibold mt-3">₹ {order.totalAmount}</p>
                                </div>

                                <span className={`text-sm font-medium px-3 py-1 rounded-full ${statusColors[order.status]}`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default OrdersPage
