import React, { useState, useEffect, useCallback } from "react";
import useDebounce from "../../hooks/useDebounce";
import { Box, TextField } from "@mui/material";
import { SearchBarProps } from "../../types/productTypes";

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounce(query, 1000);

  const handleSearch = useCallback(() => {
    if (debouncedQuery === "") {
      onSearch("");
    } else {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery, onSearch]);

  useEffect(() => {
    handleSearch();
  }, [debouncedQuery, handleSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Box sx={{ width: "15vw" }}>
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
