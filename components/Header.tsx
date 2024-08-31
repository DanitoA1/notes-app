// components/Header.js
import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Notes</h1>
      <input
        type="text"
        placeholder="Search..."
        className="border rounded-full px-4 py-1"
      />
    </div>
  );
};

export default Header;
