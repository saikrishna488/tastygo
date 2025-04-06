"use client"
import { userAtom } from '@/states/global_states'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Dashboard from './components/Dashboard'
import toast from 'react-hot-toast'

const page = () => {

  const [user,setUser] = useAtom(userAtom)
  const router = useRouter()

  return (
    <main>
      <Navbar/>
      <Hero/>
      <Dashboard/>
    </main>
  )
}

export default page;
