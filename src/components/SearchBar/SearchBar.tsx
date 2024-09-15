import React, { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import "./SearchBar.css";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery) {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        className="search-input"
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search: meals or cocktails..."
      />
    </div>
  );
};

export default SearchBar;
