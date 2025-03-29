"use client"
import Image from "next/image";
import { Star } from "lucide-react"; // Using Lucide icons for the star rating
import Header from "../components/Header";

interface Restaurant {
  id: number;
  name: string;
  image: string;
  minPrice: number;
  distance: string;
  rating: number; // Added rating field
}

const restaurants: Restaurant[] = [
  { id: 1, name: "Spicy Bites", image: "/ramen.avif", minPrice: 150, distance: "2.4 km", rating: 4.5 },
  { id: 2, name: "Tandoori Treats", image: "/dosa.jpg", minPrice: 120, distance: "3.1 km", rating: 4.2 },
  { id: 3, name: "Biryani House", image: "/biryani.jpg", minPrice: 180, distance: "1.8 km", rating: 4.8 },
  { id: 4, name: "Burger Hub", image: "/burger.webp", minPrice: 100, distance: "2.9 km", rating: 4.3 },
  { id: 5, name: "Sushi Express", image: "/sushi.jpg", minPrice: 200, distance: "4.2 km", rating: 4.6 },
];

const Restaurants = () => {
  return (
    <div className="w-full px-4 pt-20 mx-auto lg:w-[80%]">
      <Header/>
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Popular Restaurants</h2>

      {/* Grid Layout for Responsive Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            {/* Restaurant Image */}
            <div className="relative w-full h-40">
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                layout="fill"
                objectFit="cover"
                className="rounded-t-md"
              />
            </div>

            {/* Restaurant Details */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{restaurant.name}</h3>
              <p className="text-gray-500 dark:text-gray-300 text-sm">Min Order: Γé╣{restaurant.minPrice}</p>
              <p className="text-gray-500 dark:text-gray-300 text-sm">Distance: {restaurant.distance}</p>

              {/* Ratings Section */}
              <div className="flex items-center mt-2">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={
                      index < Math.floor(restaurant.rating)
                        ? "text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }
                    fill={index < restaurant.rating ? "currentColor" : "none"}
                  />
                ))}
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                  {restaurant.rating.toFixed(1)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
