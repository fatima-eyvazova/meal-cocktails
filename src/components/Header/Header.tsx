import React from "react";
import { Box, Link } from "@mui/material";
import CategorySelect from "../CategorySelect/CategorySelect";
import AreaSelect from "../AreaSelect/AreaSelect";
import IngredientSelect from "../IngredientSelect/IngredientSelect";
import { HeaderContainer, LinkFavorites } from "../../constants";
import { HeaderProps } from "../../types/productTypes";
import SearchBar from "../SearchBar/SearchBar";

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
