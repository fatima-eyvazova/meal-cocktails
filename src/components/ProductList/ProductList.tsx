import React from "react";
import { Stack } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";
import { ProductListStack } from "../../constants";

interface ProductListProps {
  data: any[];
}

const ProductList: React.FC<ProductListProps> = ({ data }) => {
  return (
    <Stack sx={ProductListStack}>
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
