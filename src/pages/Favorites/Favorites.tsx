import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import ProductCard from "../../components/ProductCard/ProductCard";
import { RootState } from "../../store";

const FavoritesPage: React.FC = () => {
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  if (favorites.length === 0) {
    return <Typography variant="h6">No favorite products!</Typography>;
  }

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 5, width: "80vw" }}>
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
