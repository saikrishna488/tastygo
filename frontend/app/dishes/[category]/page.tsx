"use client";

import { useRef, useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

const items = [
  { name: "Margherita", image: "/pizza.webp", restaurant: "Pizza Palace", rating: 4.5, price: "$12.99", category: "Pizza" },
  { name: "Pepperoni", image: "/pizza.webp", restaurant: "Pizza Hub", rating: 4.3, price: "$14.99", category: "Pizza" },
  { name: "Hyderabadi Biryani", image: "/biryani.jpg", restaurant: "Spice Kitchen", rating: 4.7, price: "$10.99", category: "Biryani" },
  { name: "Lucknowi Biryani", image: "/biryani.jpg", restaurant: "Royal Biryani", rating: 4.6, price: "$11.99", category: "Biryani" },
  { name: "Noodles", image: "/ramen.jpg", restaurant: "Dragon Wok", rating: 4.2, price: "$8.99", category: "Chinese" },
  { name: "Manchurian", image: "/ramen.jpg", restaurant: "Chinese Delight", rating: 4.4, price: "$9.99", category: "Chinese" }
];

const Dishes = () => {
  const { category } = useParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<any>(category || "Pizza");

  useEffect(() => {
    if (category) {
      setSelectedCategory(category);
    }
  }, [category]);

  const filteredItems = items.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section className="relative pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center mb-4">
        <button onClick={() => router.back()} className="flex items-center text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-400">
          <ArrowLeft size={20} className="mr-2" /> Back
        </button>
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6 capitalize">
        {category || "Dishes"}
      </h2>
      {filteredItems.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.map((dish, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md transition-transform hover:scale-105">
              <Image src={dish.image} alt={dish.name} width={150} height={100} className="w-full h-28 object-cover rounded-md" />
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mt-2">{dish.name}</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">{dish.restaurant}</p>
              <p className="text-xs text-yellow-500">⭐ {dish.rating}</p>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">{dish.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 mt-6 text-lg">No items found.</p>
      )}
    </section>
  );
};

export default Dishes;
