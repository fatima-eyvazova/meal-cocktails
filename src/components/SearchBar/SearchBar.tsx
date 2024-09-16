import React, { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";
import { Box, TextField } from "@mui/material";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery === "") {
      onSearch("");
    } else {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Box sx={{ width: "30vw", marginBottom: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        value={query}
        onChange={handleInputChange}
        placeholder="Search: meals or cocktails..."
      />
    </Box>
  );
};

export default SearchBar;
