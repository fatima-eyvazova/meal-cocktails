import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import ProductCard from "../../components/ProductCard/ProductCard";
import { RootState } from "../../store";
import { FavoritesContainerStyle, FavoritesListStyle } from "../../constants";

const FavoritesPage: React.FC = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  if (favorites.length === 0) {
    return <Typography variant="h6">No favorite products!</Typography>;
  }

  return (
    <Box sx={FavoritesContainerStyle}>
      <Box sx={FavoritesListStyle}>
        {favorites.map((item: any) => (
          <ProductCard
            key={item.idMeal || item.idDrink}
            item={item}
            type={item.idMeal ? "meal" : "cocktail"}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FavoritesPage;
