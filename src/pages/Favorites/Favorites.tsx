import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import ProductCard from "../../components/ProductCard/ProductCard";
import { RootState } from "../../store";
import { FavoritesContainerStyle, FavoritesListStyle } from "../../constants";
import { addFavorite, removeFavorite } from "../../features/favoritesSlice";

const FavoritesPage: React.FC = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  let dispatch = useDispatch();

  const handleRemoveFavorite = (id: string | number) => {
    dispatch(removeFavorite(id));
  };

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
            favorites={favorites}
            addFavorite={addFavorite}
            removeFavorite={handleRemoveFavorite}
          />
        ))}
      </Box>
    </Box>
  );
};

export default FavoritesPage;
