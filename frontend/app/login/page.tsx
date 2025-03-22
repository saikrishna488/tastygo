"use client";
import { userAtom } from "@/states/global_states";
import axios from "axios";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useAtom(userAtom);
  const router = useRouter();

  const userLogin = async (e: any) => {
    e.preventDefault();

    try {
      if (password.length < 6) {
        toast.error("Password should be at least 6 characters");
        return;
      }

      const res = await axios.post("/api/login", {
        email,
        password,
      });

      const data = res.data;

      if (data.res) {
        toast.success("Welcome " + data.user.name);
        setUser(data.user);
        router.push("/");
      }
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-0">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-800 text-center">Login</h2>

        <form className="mt-6" onSubmit={userLogin}>
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mt-4 relative">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Login Button */}
          <button className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-all">
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-center text-sm text-gray-600">
          New User? <a href="/register" className="text-blue-500 hover:underline">Register Now</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
