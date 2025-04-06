"use client"
import { useAtom } from 'jotai'
import { useState, useRef, useEffect } from 'react'
import { userAtom } from '@/states/global_states'
import Link from 'next/link'
import toast from 'react-hot-toast'

const Navbar = () => {
  const [user, setUser] = useAtom(userAtom)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])


  const handleLogout = () => {
    setUser({})
    setDropdownOpen(false)
  }

  return (
    <nav className="w-full bg-white shadow-md px-4 py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-lg sm:text-xl font-bold text-red-600">TastyGo Partners</h1>

        <div className="flex items-center gap-3 sm:gap-4 relative">
          {user?.name ? (
            <div ref={dropdownRef} className="relative flex items-center gap-2 cursor-pointer select-none" onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-red-600 text-white font-semibold rounded-full">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm sm:text-base font-medium text-gray-800">{user.name}</span>

              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-44 sm:w-48 bg-white shadow-lg rounded-md py-2 border z-20">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Profile</li>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm">Notifications</li>
                    <li
                      onClick={handleLogout}
                      className="px-4 py-2 text-red-600 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/partners/login"
              className="bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium"
            >
              Get Started
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
