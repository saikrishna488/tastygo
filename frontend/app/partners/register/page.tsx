"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Using React Icons

const Register = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password,setPassword] = useState("")
  const [email, setEmail] = useState("")
  const router = useRouter();
  const [name,setName] = useState("")

  const userRegister = async (e: any) => {
    e.preventDefault();

    try {
      if (password.length < 6) {
        toast.error("Password should be at least 6 characters");
        return;
      }

      const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+"/pregister", {
        name,
        email,
        password,
      });

      const data = res.data;

      if (data.res) {
        toast.success("Thank you for registering");
        router.push("/partners/login");
      }
    } catch (err) {
      toast.error("Registration failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-red-600 text-center mb-6">Register</h2>

        <form onSubmit={userRegister}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <label className="block text-gray-700 font-semibold">Password</label>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-9 text-gray-600"
            >
              {passwordVisible ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
            </button>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
          >
            Register
          </button>

          
        </form>
        {/* Login Link */}
        <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/partners/login" className="text-red-600 font-semibold hover:underline">
              Login here
            </Link>
          </p>
      </div>
    </div>
  );
};

export default Register;
