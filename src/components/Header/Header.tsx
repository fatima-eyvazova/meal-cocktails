import React from "react";
import { Box, Link } from "@mui/material";
import SearchBar from "../../components/SearchBar/SearchBar";
import CategorySelect from "../CategorySelect/CategorySelect";
import AreaSelect from "../AreaSelect/AreaSelect";
import IngredientSelect from "../IngredientSelect/IngredientSelect";

interface HeaderProps {
  onSearch: (query: string) => void;
  selectedCategory: string[];
  setSelectedCategory: (category: string[]) => void;
  categories: any[];
  areas: { strArea: string }[];
  ingredients: { strIngredient1: string }[];
  selectedAreas: string[];
  setSelectedAreas: (areas: string[]) => void;
  selectedIngredients: string[];
  setSelectedIngredients: (ingredients: string[]) => void;
}

const Header: React.FC<HeaderProps> = ({
  onSearch,
  selectedCategory,
  setSelectedCategory,
  categories,
  areas,
  ingredients,
  selectedAreas,
  setSelectedAreas,
  selectedIngredients,
  setSelectedIngredients,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 4,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 4,
        width: "80vw",
      }}
    >
      <SearchBar onSearch={onSearch} />

      <CategorySelect
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />
      <AreaSelect
        areas={areas}
        selectedAreas={selectedAreas}
        setSelectedAreas={setSelectedAreas}
      />
      <IngredientSelect
        ingredients={ingredients}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
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
