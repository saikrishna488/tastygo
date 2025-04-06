"use client"
import React, { useState } from "react"

const earningsSummary = {
    totalEarnings: 28450,
    totalOrders: 123,
    lastPayout: "2025-04-02",
    upcomingPayout: "2025-04-10",
}

const dailyEarnings = [
    {
        date: "2025-04-05",
        orders: 12,
        amount: 2500,
    },
    {
        date: "2025-04-04",
        orders: 18,
        amount: 3740,
    },
    {
        date: "2025-04-03",
        orders: 15,
        amount: 3120,
    },
    {
        date: "2025-04-02",
        orders: 10,
        amount: 2100,
    },
    {
        date: "2025-04-01",
        orders: 8,
        amount: 1890,
    },
]

const EarningsPage = () => {
    const [summary] = useState(earningsSummary)
    const [daily] = useState(dailyEarnings)

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
                    Earnings
                </h2>
                <div className="w-14" />
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                <div className="bg-white shadow-md rounded-xl p-6">
                    <p className="text-gray-500 text-sm">Total Earnings</p>
                    <p className="text-2xl font-bold text-green-600">₹ {summary.totalEarnings}</p>
                </div>
                <div className="bg-white shadow-md rounded-xl p-6">
                    <p className="text-gray-500 text-sm">Total Orders</p>
                    <p className="text-2xl font-bold text-blue-600">{summary.totalOrders}</p>
                </div>
                <div className="bg-white shadow-md rounded-xl p-6">
                    <p className="text-gray-500 text-sm">Last Payout</p>
                    <p className="text-xl font-semibold text-gray-800">{summary.lastPayout}</p>
                    <p className="text-sm text-gray-500 mt-1">Next: {summary.upcomingPayout}</p>
                </div>
            </div>

            {/* Daily Breakdown */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-800">Daily Earnings</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-xs uppercase bg-gray-50 text-gray-600">
                            <tr>
                                <th className="px-4 py-3">Date</th>
                                <th className="px-4 py-3">Orders</th>
                                <th className="px-4 py-3">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {daily.map((entry, idx) => (
                                <tr
                                    key={idx}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3">{entry.date}</td>
                                    <td className="px-4 py-3">{entry.orders}</td>
                                    <td className="px-4 py-3 text-green-600 font-medium">₹ {entry.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EarningsPage
