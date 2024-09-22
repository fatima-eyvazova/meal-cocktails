import React from "react";
import { Stack } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";
import { ProductListStack } from "../../constants";
import { ProductListProps } from "../../types/productTypes";

const ProductList: React.FC<ProductListProps> = ({
  data,
  favorites,
  addFavorite,
  removeFavorite,
}) => {
  return (
    <Stack sx={ProductListStack}>
      {data.map((item) => {
        const type = item.idMeal ? "meal" : "cocktail";
        return (
          <ProductCard
            key={item.idMeal || item.idDrink}
            item={item}
            type={type}
            favorites={favorites}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
          />
        );
      })}
    </Stack>
  );
};

export default ProductList;
