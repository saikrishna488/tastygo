"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft, FaPizzaSlice, FaDrumstickBite, FaUtensils, FaBurger, FaLeaf, FaBowlFood, FaBreadSlice, FaFish, FaMugHot } from "react-icons/fa6";

const moreDishes = [
  { name: "Margherita Pizza", category: "pizza", icon: <FaPizzaSlice size={40} className="text-red-400" /> },
  { name: "Pepperoni Pizza", category: "pizza", icon: <FaPizzaSlice size={40} className="text-red-500" /> },
  { name: "Hyderabadi Biryani", category: "biryani", icon: <FaDrumstickBite size={40} className="text-yellow-400" /> },
  { name: "Lucknowi Biryani", category: "biryani", icon: <FaDrumstickBite size={40} className="text-yellow-500" /> },
  { name: "Chow Mein", category: "chowmein", icon: <FaUtensils size={40} className="text-orange-400" /> },
  { name: "Manchurian", category: "manchurian", icon: <FaBowlFood size={40} className="text-orange-500" /> },
  { name: "Pasta Alfredo", category: "pasta", icon: <FaLeaf size={40} className="text-green-400" /> },
  { name: "Sushi Roll", category: "sushi", icon: <FaFish size={40} className="text-blue-400" /> },
  { name: "Tacos", category: "tacos", icon: <FaBreadSlice size={40} className="text-pink-400" /> },
  { name: "Cheeseburger", category: "cheeseburger", icon: <FaBurger size={40} className="text-green-500" /> },
  { name: "Fried Rice", category: "friedrice", icon: <FaBowlFood size={40} className="text-yellow-600" /> },
  { name: "Ramen", category: "ramen", icon: <FaMugHot size={40} className="text-red-600" /> }
];

const MoreDishes = () => {
  const router = useRouter();

  return (
    <section className="max-w-7xl pt-20 mx-auto px-6 py-12">
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.back()}
          className=""
        >
          <FaArrowLeft size={24} className="text-blue-600 hover:text-blue-200 dark:text-white" />
        </button>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mx-auto">More Dishes</h2>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {moreDishes.map((dish, index) => (
          <div
            key={index}
            onClick={() => router.push(`/dishes/${dish.category}`)}
            className="cursor-pointer bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md transition-transform hover:scale-105 hover:shadow-lg flex flex-col items-center text-center space-y-3 border border-gray-200 dark:border-gray-700"
          >
            {dish.icon}
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{dish.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoreDishes;