import React from "react";
import { Box, Link } from "@mui/material";
import SearchBar from "../../components/SearchBar/SearchBar";
import CategorySelect from "../../components/CategorySelect/CategorySelect";
import { BoxStyle } from "../../constands/index";
import { FaRegHeart } from "react-icons/fa";

interface HeaderProps {
  onSearch: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: any[];
}

const Header: React.FC<HeaderProps> = ({
  onSearch,
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  return (
    <Box sx={BoxStyle}>
      <SearchBar onSearch={onSearch} />

      <CategorySelect
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      <Link
        href="/favorites"
        sx={{ underline: "none", color: "black", fontSize: 26 }}
      >
        Favorites
      </Link>
    </Box>
  );
};

export default Header;
