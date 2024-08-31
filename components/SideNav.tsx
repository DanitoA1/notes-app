// components/SideNav.js
import React from "react";

const SideNav = () => {
  return (
    <div className="w-20 bg-gray-100 flex flex-col items-center py-8 space-y-8">
      <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
        <span>Notes</span>
      </div>
      <div className="space-y-4">
        <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
        <div className="w-6 h-6 bg-orange-400 rounded-full"></div>
        <div className="w-6 h-6 bg-purple-400 rounded-full"></div>
        <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
        <div className="w-6 h-6 bg-green-400 rounded-full"></div>
      </div>
      <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
        <span>+</span>
      </div>
    </div>
  );
};

export default SideNav;
