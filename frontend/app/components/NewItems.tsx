"use client"
import Image from "next/image";
import { Star, Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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

  const router = useRouter();
  const [items,setItems] = useState<any>([])


  useEffect(()=>{

    const fetchItems = async()=>{

      const res = await axios.get(process.env.NEXT_PUBLIC_BACKEND_URL+"/items")
      const data = res.data

      if(data.res){
        setItems(data.items)
      }
      else{
        toast.error("Failed to load items")
        throw new Error("Failed to load items")
        
      }
    }

    fetchItems()

  },[])



  return (
    <section className="max-w-7xl mx-auto px-4 py-6">
      {/* Grid Layout (Smaller Size) */}

      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {items.map((item:any) => (
          <div
            key={item._id}
            onClick={() => router.push('/item/'+item._id)}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
          >
            {/* Smaller Image */}
            <div className="relative w-full h-28 sm:h-32">
              <Image src={item.image_url} alt={item.name} layout="fill" objectFit="cover" />
            </div>

            {/* Compact Details */}
            <div className="p-2">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{item.name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">{item.restaurant_name}</p>

              {/* Price & Rating */}
              <div className="flex items-center justify-between mt-1">
                <span className="text-sm font-bold text-red-500">{item.price}.Rs</span>
                <div className="flex items-center text-xs">
                  <Star size={14} className="text-yellow-400 mr-1" />
                  <span className="text-gray-700 dark:text-gray-300">{item.rating || 5}</span>
                </div>
              </div>

              {/* Delivery Time */}
              <div className="flex items-center mt-1 text-gray-600 dark:text-gray-400 text-xs">
                <Clock size={14} className="mr-1" />
                <span>{item.deliveryTime || "30 mins"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View More Button */}
      <div className="mt-6 text-center">
        <Link
          href={"/items"}
          className="inline-block bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-semibold transition"
        >
          View More
        </Link>
      </div>
    </section>

  );
};

export default NewItems;
