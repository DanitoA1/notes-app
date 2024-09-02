import React from "react";

interface SideNavProps {
  filterNotesByColor: (color: string | null) => void;
}

const SideNav: React.FC<SideNavProps> = ({ filterNotesByColor }) => {
  const colors = [
    "bg-yellow-400",
    "bg-orange-400",
    "bg-purple-400",
    "bg-blue-400",
    "bg-green-400",
  ];

  return (
    <div className="w-full md:w-20 bg-gray-100 flex md:flex-col items-center justify-center md:justify-normal py-4 md:py-8 space-x-4 md:space-x-0 md:space-y-8">
      <div className="w-14 h-14 bg-gray-400 rounded-full flex items-center justify-center">
        <span>Notes</span>
      </div>
      <div className="flex md:flex-col space-x-4 md:space-x-0 md:space-y-4">
        {colors.map((color) => (
          <div
            key={color}
            className={`w-6 h-6 ${color} rounded-full cursor-pointer`}
            onClick={() => filterNotesByColor(color)}
          ></div>
        ))}
      </div>
      <div
        className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white cursor-pointer"
        onClick={() => filterNotesByColor("")}
      >
        <span>All</span>
      </div>
    </div>
  );
};

export default SideNav;
