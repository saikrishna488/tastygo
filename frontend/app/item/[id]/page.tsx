"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Star } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const ItemPage = () => {
  const { id } = useParams<any>();
  const router = useRouter();
  const [item, setItem] = useState<any>({});

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/item/${id}`);
        const data = res.data;
        if (data.res) {
          setItem(data.item);
        } else {
          toast.error("Failed to load item");
        }
      } catch (err) {
        toast.error("Item not found");
      }
    };
    fetchItems();
  }, []);

  if (!item.name) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 pt-20">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="mb-4 flex items-center text-sm text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
      >
        <ArrowLeft className="mr-2" size={18} />
        Back
      </button>

      {/* Item Header */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="relative w-full md:w-1/2 h-64 md:h-72 rounded-xl overflow-hidden shadow">
          <Image
            src={item.image_url}
            alt={item.name}
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>

        {/* Info Section */}
        <div className="flex-1 bg-white dark:bg-gray-900 rounded-xl p-6 shadow space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{item.name}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.description}</p>
          </div>

          <div>
            <p className="text-md font-medium text-gray-800 dark:text-gray-300">
              Restaurant:{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {item.restaurant_name || item.restaurant}
              </span>
            </p>
            <p className="text-md font-medium text-gray-800 dark:text-gray-300">
              Distance: <span className="text-gray-600 dark:text-gray-400">{item.location || "2 km"}</span>
            </p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xl font-bold text-red-600">₹{item.price}</span>
            <div className="flex items-center gap-1 text-yellow-500 font-semibold">
              <Star size={18} className="fill-yellow-400" />
              {item.rating || "4.5"}
            </div>
          </div>

          <button className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
