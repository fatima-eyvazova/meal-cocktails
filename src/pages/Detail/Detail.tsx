import React from "react";
import { useParams } from "react-router-dom";
import { useFetchMealByIdQuery } from "../../features/mealSlice";
import { useFetchCocktailByIdQuery } from "../../features/cocktailSlice";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { CardStyle, DetailBoxStyle } from "../../constants";

const Detail: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();

  const { data: mealData, isLoading: mealLoading } = useFetchMealByIdQuery(
    type === "meal" ? id : undefined,
    { skip: type !== "meal" }
  );

  const { data: cocktailData, isLoading: cocktailLoading } =
    useFetchCocktailByIdQuery(type === "cocktail" ? id : undefined, {
      skip: type !== "cocktail",
    });

  if (mealLoading || cocktailLoading) return <CircularProgress />;

  const product = mealData?.meals?.[0] || cocktailData?.drinks?.[0];

  if (!product) return <Typography>Product not found.</Typography>;

  return (
    <Box sx={DetailBoxStyle}>
      <Card sx={CardStyle}>
        <CardMedia
          component="img"
          image={product.strMealThumb || product.strDrinkThumb}
          alt={product.strMeal || product.strDrink}
          sx={{ objectFit: "cover", height: "500px" }}
        />
      </Card>
      <Box
        sx={{
          width: { xs: "100%", md: "50%" },
          padding: 2,
        }}
      >
        <Typography variant="h4" sx={{ mb: 2 }} gutterBottom>
          {product.strMeal || product.strDrink}
        </Typography>
        <Typography>{product.strInstructions}</Typography>
      </Box>
    </Box>
  );
};

export default Detail;
