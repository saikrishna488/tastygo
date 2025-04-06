"use client"
import { useEffect, useState } from "react";
import Dishes from "./components/Dishes";
import Hero from "./components/Hero";
import NewItems from "./components/NewItems";
import toast from "react-hot-toast";
import axios from "axios";
import Header from "./components/Header";
import Render from "./components/Render";


export default function Home() {
  
  return (
    <main>
      <Render/>
      <Hero />
      <Header/>
      <Dishes />
      <NewItems />
    </main>
  );
}
