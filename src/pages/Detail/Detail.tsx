import React from "react";
import { useParams } from "react-router-dom";
import { useFetchMealByIdQuery } from "../../features/mealSlice";
import { useFetchCocktailByIdQuery } from "../../features/cocktailSlice";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../features/favoritesSlice";
import {
  Card,
  CardMedia,
  Typography,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { CardStyle, DetailBoxStyle } from "../../constants";

const Detail: React.FC = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const dispatch = useDispatch();
  const favorites = useSelector((state: any) => state.favorites.favorites);

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

  const isFavorite = favorites.some((fav: any) => {
    if (type === "meal") {
      return fav.idMeal === product.idMeal;
    } else if (type === "cocktail") {
      return fav.idDrink === product.idDrink;
    }
    return false;
  });

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(
        removeFavorite(type === "meal" ? product.idMeal : product.idDrink)
      );
    } else {
      dispatch(addFavorite(product));
    }
  };

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
        <Button
          variant="contained"
          color={isFavorite ? "secondary" : "primary"}
          onClick={handleFavoriteToggle}
          sx={{ mt: 2 }}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
      </Box>
    </Box>
  );
};

export default Detail;
