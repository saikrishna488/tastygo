"use client";

import React from "react";
import { Mail, User } from "lucide-react";

const ProfilePage = () => {
  return (
    <div className="pt-24 max-w-4xl mx-auto px-4">
      {/* Under Construction Banner */}
      <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-6 py-4 rounded-xl mb-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold">🚧 This page is under construction</h2>
      </div>

      {/* Profile Card */}
      <div className="bg-white shadow-md rounded-xl p-6 flex flex-col sm:flex-row sm:items-center gap-6">
        <img
          src="https://i.pravatar.cc/150?img=5"
          alt="Profile"
          className="w-24 h-24 rounded-full border object-cover"
        />

        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-1">John Doe</h3>
          <p className="text-gray-600 mb-3">Software Engineer @ Example Corp</p>

          <div className="space-y-2 text-gray-700 text-sm">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2 text-gray-500" />
              <span>Username: johndoe_91</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-gray-500" />
              <span>Email: johndoe@example.com</span>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Placeholder Sections */}
      <div className="mt-10 space-y-6">
        <div className="bg-gray-100 rounded-xl p-6 h-24 animate-pulse" />
        <div className="bg-gray-100 rounded-xl p-6 h-24 animate-pulse" />
      </div>
    </div>
  );
};

export default ProfilePage;
