"use client";
import React from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const demoItem = {
  id: "231647123",
  name: "Spicy Chicken Burger",
  restaurant: "Burger Hub",
  image: "/burger.webp",
  price: 150,
  description: "A delicious spicy chicken burger with fresh lettuce, cheese, and a special sauce.",
  distance: "2.5 km",
  rating: 4.5,
};

const ItemPage = () => {
  const { id } = useParams();
  const router = useRouter();

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 pt-20 relative">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className=" bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        <ArrowLeft size={20} className="text-gray-900 dark:text-white" />
      </button>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">{demoItem.name}</h2>

      {/* Image */}
      <div className="relative w-full h-64 rounded-lg overflow-hidden">
        <Image src={demoItem.image} alt={demoItem.name} layout="fill" objectFit="cover" />
      </div>

      {/* Details */}
      <div className="mt-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          <span className="text-gray-900 dark:text-white">{demoItem.restaurant}</span>
        </p>
        <p className="text-lg font-semibold text-red-500">Rs.{demoItem.price}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{demoItem.description}</p>
        
        <div className="flex items-center justify-between mt-4">
          <p className="text-gray-600 dark:text-gray-400">Distance: {demoItem.distance}</p>
          <p className="text-yellow-500 font-semibold">{demoItem.rating}</p>
        </div>

        {/* Add to Cart Button */}
        <button className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ItemPage;
