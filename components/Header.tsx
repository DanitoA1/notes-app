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
    }, 300),
    [onSearch]
  );

  useEffect(() => {
    debouncedFetchNotes(query);
  }, [query]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6">
      <h1 className="text-xl md:text-2xl text-black font-bold mb-4 md:mb-0">
        Note App
      </h1>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border text-black rounded-full px-4 py-1 w-full md:w-auto"
      />
    </div>
  );
};

export default Header;
