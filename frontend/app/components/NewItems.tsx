"use client"
import Image from "next/image";
import { Star, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

const newItems = [
  { id: 1, name: "Cheese Pizza", price: "$12.99", restaurant: "Pizza House", rating: 4.5, deliveryTime: "30 min", image: "/pizza.webp" },
  { id: 2, name: "Chicken Biryani", price: "$10.99", restaurant: "Biryani Hub", rating: 4.8, deliveryTime: "40 min", image: "/biryani.jpg" },
  { id: 3, name: "Spicy Ramen", price: "$8.99", restaurant: "Tokyo Bites", rating: 4.7, deliveryTime: "25 min", image: "/ramen.jpg" },
  { id: 4, name: "Cheeseburger", price: "$9.99", restaurant: "Burger King", rating: 4.6, deliveryTime: "20 min", image: "/burger.webp" },
  { id: 5, name: "Dosa & Chutney", price: "$7.99", restaurant: "South Flavors", rating: 4.9, deliveryTime: "35 min", image: "/dosa.webp" },
  { id: 6, name: "Cheese Pizza", price: "$12.99", restaurant: "Pizza House", rating: 4.5, deliveryTime: "30 min", image: "/pizza.webp" },
  { id: 7, name: "Chicken Biryani", price: "$10.99", restaurant: "Biryani Hub", rating: 4.8, deliveryTime: "40 min", image: "/biryani.jpg" },
  { id: 8, name: "Spicy Ramen", price: "$8.99", restaurant: "Tokyo Bites", rating: 4.7, deliveryTime: "25 min", image: "/ramen.jpg" },
  { id: 9, name: "Cheeseburger", price: "$9.99", restaurant: "Burger King", rating: 4.6, deliveryTime: "20 min", image: "/burger.webp" },
];

const NewItems = () => {

  const router = useRouter()
  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {/* Grid Layout (Smaller Size) */}
      
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {newItems.map((item) => (
          <div
            key={item.id}
            onClick={()=> router.push('/item/752356')}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
          >
            {/* Smaller Image */}
            <div className="relative w-full h-28 sm:h-32">
              <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
            </div>

            {/* Compact Details */}
            <div className="p-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.restaurant}</p>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-bold text-red-500">{item.price}</span>
                <div className="flex items-center text-xs">
                  <Star size={14} className="text-yellow-400 mr-1" />
                  <span className="text-gray-700 dark:text-gray-300">{item.rating}</span>
                </div>
              </div>

              {/* Delivery Time */}
              <div className="flex items-center mt-1 text-gray-600 dark:text-gray-400 text-xs">
                <Clock size={14} className="mr-1" />
                <span>{item.deliveryTime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-6 text-center">
        <a
          href="/all-items"
          onClick={()=>router.push('/items')}
          className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition"
        >
          View More
        </a>
      </div>
    </section>

  );
};

export default NewItems;
