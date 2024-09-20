import React from "react";
import { Box, Link } from "@mui/material";
import SearchBar from "../../components/SearchBar/SearchBar";
import CategorySelect from "../CategorySelect/CategorySelect";
import AreaSelect from "../AreaSelect/AreaSelect";
import IngredientSelect from "../IngredientSelect/IngredientSelect";
import { HeaderContainer, LinkFavorites } from "../../constants";

interface HeaderProps {
  onSearch: (query: string) => void;
  selectedCategory: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
  categories: any[];
  areas: { strArea: string }[];
  ingredients: { strIngredient: string }[];
  selectedAreas: string[];
  setSelectedAreas: React.Dispatch<React.SetStateAction<string[]>>;
  selectedIngredients: string[];
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
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
  console.log("ALLLingredients", ingredients);

  return (
    <Box sx={HeaderContainer}>
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
      <Link href="/favorites" sx={LinkFavorites}>
        Favorites
      </Link>
    </Box>
  );
};

export default Header;
