"use client";

import { useRouter } from "next/navigation";
import { FaArrowLeft, FaPizzaSlice, FaDrumstickBite, FaUtensils, FaBurger, FaLeaf, FaBowlFood, FaBreadSlice, FaFish, FaMugHot } from "react-icons/fa6";

const moreDishes = [
  { name: "Margherita Pizza", icon: <FaPizzaSlice size={40} className="text-red-500 mx-auto" /> },
  { name: "Pepperoni Pizza", icon: <FaPizzaSlice size={40} className="text-red-600 mx-auto" /> },
  { name: "Hyderabadi Biryani", icon: <FaDrumstickBite size={40} className="text-yellow-500 mx-auto" /> },
  { name: "Lucknowi Biryani", icon: <FaDrumstickBite size={40} className="text-yellow-600 mx-auto" /> },
  { name: "Chow Mein", icon: <FaUtensils size={40} className="text-orange-500 mx-auto" /> },
  { name: "Manchurian", icon: <FaBowlFood size={40} className="text-orange-600 mx-auto" /> },
  { name: "Pasta Alfredo", icon: <FaLeaf size={40} className="text-green-500 mx-auto" /> },
  { name: "Sushi Roll", icon: <FaFish size={40} className="text-blue-500 mx-auto" /> },
  { name: "Tacos", icon: <FaBreadSlice size={40} className="text-pink-500 mx-auto" /> },
  { name: "Cheeseburger", icon: <FaBurger size={40} className="text-green-600 mx-auto" /> },
  { name: "Fried Rice", icon: <FaBowlFood size={40} className="text-yellow-700 mx-auto" /> },
  { name: "Ramen", icon: <FaMugHot size={40} className="text-red-700 mx-auto" /> }
];

const MoreDishes = () => {
  const router = useRouter();

  return (
    <section className="relative pt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <button
        onClick={() => router.back()}
        className=" bg-gray-200 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        <FaArrowLeft size={24} className="text-gray-900 dark:text-white" />
      </button>
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">
        More Dishes
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {moreDishes.map((dish, index) => (
          <div
            key={index}
            onClick={() => router.push(`/dishes/${dish.name}`)}
            className="cursor-pointer bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md transition-transform hover:scale-105 flex flex-col items-center"
          >
            {dish.icon}
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mt-2 text-center">{dish.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MoreDishes;
