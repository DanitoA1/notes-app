import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { searchNotes } from "@/utils/api/notes";

interface Note {
  id: string;
  title: string;
  text: string;
  color: string;
  timestamp: string;
}

interface HeaderProps {
  onSearch: (notes: Note[]) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const debouncedFetchNotes = useCallback(
    debounce(async (query: string) => {
      try {
        const data = await searchNotes(query);
        onSearch(data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    }, 300), // Adjust the debounce delay as needed
    [onSearch]
  );

  useEffect(() => {
    debouncedFetchNotes(query);
  }, [query]);

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl text-black font-bold">Note App</h1>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border text-black rounded-full px-4 py-1"
      />
    </div>
  );
};

export default Header;
