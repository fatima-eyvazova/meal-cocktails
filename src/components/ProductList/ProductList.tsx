import React from "react";
import { Stack } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";

interface ProductListProps {
  data: any[];
}

const ProductList: React.FC<ProductListProps> = ({ data }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      flexWrap="wrap"
      sx={{
        justifyContent: "center",
        marginBottom: 4,
        direction: "row",
        spacing: 2,
        flexWrap: "wrap",
        gap: 8,
      }}
    >
      {data.map((item) => {
        const type = item.idMeal ? "meal" : "cocktail";
        return (
          <ProductCard
            key={item.idMeal || item.idDrink}
            item={item}
            type={type}
          />
        );
      })}
    </Stack>
  );
};

export default ProductList;
