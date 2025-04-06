"use client"
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

const RestaurantPage = () => {
  const { id } = useParams<any>()
  const router = useRouter()

  const [restaurant, setRestaurant] = useState<any>({})
  const [items, setItems] = useState<any>([])

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/restaurant/${id}`);
      const data = res.data;

      if (data.res) {
        setRestaurant(data.restaurant)
        setItems(data.items)
      }
    } catch (err) {
      console.log(err);
      toast.error("Client error")
    }
  }

  useEffect(() => {
    fetchItems()
  }, [])

  return (
    <div className="pt-24 max-w-6xl mx-auto px-4">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-6 inline-flex items-center gap-2 text-red-600 hover:text-red-700 transition font-medium"
      >
        ← Back
      </button>

      {/* Restaurant Header */}
      <div className="mb-10 flex items-center space-x-6">
        {restaurant?.image_url && (
          <img
            src={restaurant.image_url}
            alt={restaurant.name}
            className="w-20 h-20 object-cover rounded-full border border-gray-300"
          />
        )}
        <div>
          <h1 className="text-4xl font-bold text-gray-800 mb-1">{restaurant?.name || 'Loading...'}</h1>
          <p className="text-gray-600 text-lg">{restaurant?.description || 'Fetching Description...'}</p>
        </div>
      </div>

      {/* Items */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Menu</h2>

        {items.length === 0 ? (
          <p className="text-gray-600">No items found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {items.map((item: any) => (
              <div key={item._id} className="bg-white rounded-xl shadow-md p-4 border hover:shadow-lg transition-all">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{item.description || "No description"}</p>
                <div className="mt-3 flex justify-between items-center">
                  <p className="text-red-600 font-bold text-md">₹ {item.price}</p>
                  <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default RestaurantPage;
