"use client"
import React from "react"
import {
    LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip,
    BarChart, Bar, ResponsiveContainer
} from "recharts"

const kpis = [
    { label: "Total Visits", value: "12.4K", color: "text-blue-600" },
    { label: "Signups", value: "2,315", color: "text-green-600" },
    { label: "Revenue", value: "₹ 45,800", color: "text-purple-600" },
]

const revenueData = [
    { day: "Mon", revenue: 3200 },
    { day: "Tue", revenue: 4100 },
    { day: "Wed", revenue: 3900 },
    { day: "Thu", revenue: 4600 },
    { day: "Fri", revenue: 5300 },
    { day: "Sat", revenue: 4900 },
    { day: "Sun", revenue: 5200 },
]

const categoryData = [
    { category: "Pizza", orders: 45 },
    { category: "Burger", orders: 32 },
    { category: "Drinks", orders: 27 },
    { category: "Desserts", orders: 20 },
    { category: "Others", orders: 15 },
]

const AnalyticsPage = () => {
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
                    Analytics
                </h2>
                <div className="w-14" />
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                {kpis.map((kpi, idx) => (
                    <div key={idx} className="bg-white shadow-md rounded-xl p-6">
                        <p className="text-sm text-gray-500">{kpi.label}</p>
                        <p className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</p>
                    </div>
                ))}
            </div>

            {/* Revenue Line Chart */}
            <div className="bg-white shadow-md rounded-xl p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Weekly Revenue</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={revenueData}>
                            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                            <XAxis dataKey="day" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="revenue" stroke="#8B5CF6" strokeWidth={3} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Orders by Category Bar Chart */}
            <div className="bg-white shadow-md rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Orders by Category</h3>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={categoryData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="category" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="orders" fill="#34D399" barSize={40} radius={[8, 8, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsPage
