// components/SideNav.tsx
import React from "react";

interface SideNavProps {
  onColorSelect: (color: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({ onColorSelect }) => {
  const colors = [
    "bg-yellow-400",
    "bg-orange-400",
    "bg-purple-400",
    "bg-blue-400",
    "bg-green-400",
  ];

  return (
    <div className="w-20 bg-gray-100 flex flex-col items-center py-8 space-y-8">
      <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
        <span>Notes</span>
      </div>
      <div className="space-y-4">
        {colors.map((color) => (
          <div
            key={color}
            className={`w-6 h-6 ${color} rounded-full cursor-pointer`}
            onClick={() => onColorSelect(color)}
          ></div>
        ))}
      </div>
      <div
        className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white cursor-pointer"
        onClick={() => onColorSelect("")}
      >
        <span>All</span>
      </div>
    </div>
  );
};

export default SideNav;
