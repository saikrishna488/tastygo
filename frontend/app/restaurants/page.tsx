"use client";

import Header from "../components/Header";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { Star, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_BACKEND_URL + "/restaurants/"
        );
        const data = res.data;

        if (data.res) {
          setRestaurants(data.restaurants);
        } else {
          toast.error("Failed to load items");
          throw new Error("Item not found");
        }
      } catch (err) {
        toast.error("Item not found");
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="w-full px-6 pt-24 mx-auto lg:w-[80%]">
      <Header />
      <h2 className="text-3xl font-extrabold mb-6 text-gray-900 dark:text-white">
        Popular Restaurants
      </h2>

      <div className="space-y-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            onClick={() => router.push('/restaurants/restaurant/' + restaurant._id)}
            className="flex bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer"
          >
            {/* Content Left */}
            <div className="flex-1 p-5 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{restaurant.name}</h3>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {restaurant.description || "No description available."}
                </p>
              </div>

              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {restaurant.distance || "1 km"}
                </div>
                <div className="flex items-center text-yellow-500">
                  <Star className="w-4 h-4 mr-1" />
                  {restaurant.rating || "4.5"}
                </div>
              </div>
            </div>

            {/* Image Right */}
            <div className="w-40 h-full">
              <img
                src={restaurant.image_url || "https://via.placeholder.com/150"}
                alt={restaurant.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
