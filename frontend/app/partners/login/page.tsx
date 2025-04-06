"use client"
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Importing icons from lucide-react
import Link from "next/link";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { userAtom } from "@/states/global_states";
import axios from "axios";
import { useRouter } from "next/navigation";
 
const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [user,setUser] = useAtom(userAtom);
  const [password,setPassword] = useState<string>("");
  const [email,setEmail]= useState("");
  const router = useRouter();

  const userLogin = async (e: any) => {
    e.preventDefault();

    try {
      if (password.length < 6) {
        toast.error("Password should be at least 6 characters");
        return;
      }

      const res = await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL+"/plogin", {
        email,
        password,
      },{ withCredentials: true });

      const data = res.data;

      if (data.res) {
        toast.success("Welcome " + data.puser.name);
        setUser(data.puser);
        router.push("/partners");
      }
    } catch (err) {
      console.log(err)
      toast.error("Invalid email or password");
    }

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold text-red-600 text-center mb-6">Login</h2>

        <form onSubmit={userLogin}>
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
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 pr-10"
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-3 top-9 text-gray-600"
            >
              {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition duration-300"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="mt-4 text-center text-gray-600">
            New user?{" "}
            <Link href="/partners/register" className="text-red-600 font-semibold hover:underline">
              Register here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
