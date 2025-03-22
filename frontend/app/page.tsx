"use client"
import { useEffect, useState } from "react";
import Dishes from "./components/Dishes";
import Hero from "./components/Hero";
import NewItems from "./components/NewItems";
import toast from "react-hot-toast";
import axios from "axios";


export default function Home() {

  const [location, setLocation] = useState<any>([])

  const getLocation = async ()=>{
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });

          console.log(position.coords)
        },
        (error) => {
          toast.error("GPS permission declined")
        }
      );
    } else {
      toast.error("Geolocation is not supported by your browser.");
    }
  }

  useEffect(()=>{
    getLocation();
  },[])

  useEffect(() => {

    if(!location) return;

    const getPlace = async()=>{
      const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${location.lat}&lon=${location.lng}`)
      console.log(res.data.display_name)
    }

    getPlace()
  }, [location]);

  
  return (
    <main>
      <Hero />
      <Dishes />
      <NewItems />
    </main>
  );
}
