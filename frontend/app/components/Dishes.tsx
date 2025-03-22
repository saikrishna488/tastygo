"use client"
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Pizza, Drumstick, UtensilsCrossed, Salad, Soup, Sandwich, IceCream2, CupSoda, Fish } from "lucide-react";

const dishes = [
  { name: "Pizza", icon: <Pizza size={24} className="text-red-500" /> },
  { name: "Biryani", icon: <Drumstick size={24} className="text-yellow-500" /> },
  { name: "Chinese", icon: <UtensilsCrossed size={24} className="text-orange-500" /> },
  { name: "Burgers", icon: <Sandwich size={24} className="text-green-500" /> },
  { name: "South Indian", icon: <Salad size={24} className="text-blue-500" /> },
  { name: "Soups", icon: <Soup size={24} className="text-purple-500" /> },
  { name: "Ice Cream", icon: <IceCream2 size={24} className="text-pink-500" /> },
  { name: "Drinks", icon: <CupSoda size={24} className="text-cyan-500" /> },
  { name: "Seafood", icon: <Fish size={24} className="text-indigo-500" /> },
];

const Dishes = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (offset: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
    }
  };

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">
        Popular Dishes
        
      </h2>

      {/* Left Scroll Button */}
      <button
        className="absolute left-0 top-1/2  bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 z-10"
        onClick={() => scroll(-200)}
      >
        <ChevronLeft className="text-gray-900 dark:text-white" size={24} />
      </button>

      {/* Scrollable Dish List */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide space-x-4 px-10 py-2 no-scrollbar"
      >
        {dishes.map((dish, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[80px] sm:min-w-[90px] md:min-w-[100px] bg-white dark:bg-gray-800 shadow-md rounded-lg p-2 transition-transform duration-300 hover:scale-105"
          >
            {dish.icon}
            <p className="text-xs sm:text-sm font-medium mt-1 text-gray-800 dark:text-white text-center">
              {dish.name}
            </p>
          </div>
        ))}
      </div>

      {/* Right Scroll Button */}
      <button
        className="absolute right-0 top-1/2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 z-10"
        onClick={() => scroll(200)}
      >
        <ChevronRight className="text-gray-900 dark:text-white" size={24} />
      </button>

      {/* Hide scrollbar for smooth appearance */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </section>
  );
};

export default Dishes;
