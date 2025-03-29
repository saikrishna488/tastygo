"use client"
import { Pizza, Drumstick, UtensilsCrossed } from "lucide-react";
import { useRouter } from "next/navigation";

const dishes = [
  { name: "Pizza", icon: <Pizza size={18} className="text-red-500" /> },
  { name: "Biryani", icon: <Drumstick size={18} className="text-yellow-500" /> },
  { name: "Chinese", icon: <UtensilsCrossed size={18} className="text-orange-500" /> },
  { name: "Burger", icon: <Pizza size={18} className="text-green-500" /> },
  { name: "Pasta", icon: <Drumstick size={18} className="text-blue-500" /> },
  { name: "Sushi", icon: <UtensilsCrossed size={18} className="text-purple-500" /> },
  { name: "Tacos", icon: <Pizza size={18} className="text-pink-500" /> },
  { name: "Noodles", icon: <Drumstick size={18} className="text-indigo-500" /> }
];

const Dishes = () => {
  const router = useRouter();

  return (
    <section className="relative w-full lg:max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Popular Dishes
        </h2>
        <button 
          onClick={() => router.push("/dishes")}
          className="bg-red-500 text-white text-sm px-2 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
        >
          More Dishes
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {dishes.map((dish, index) => (
          <div
            key={index}
            onClick={() => router.push("/dishes/" + dish.name)}
            className="flex flex-col cursor-pointer items-center min-w-[80px] bg-white dark:bg-gray-800 shadow-md rounded-lg p-2 transition-transform duration-300 hover:scale-105"
          >
            {dish.icon}
            <p className="text-xs font-medium mt-1 text-gray-800 dark:text-white text-center">
              {dish.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dishes;
