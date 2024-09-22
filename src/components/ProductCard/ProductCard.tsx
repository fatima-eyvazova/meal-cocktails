import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FavoriteType, ProductCardProps } from "../../types/productTypes";
import {
  ProductCardBox,
  ProductCardContent,
  ProductCardLink,
  ProductCardMedia,
} from "../../constants";

const ProductCard: React.FC<ProductCardProps> = ({
  item,
  type,
  favorites,
  addFavorite,
  removeFavorite,
}) => {
  const isFavorite = !!favorites.find(
    (fav: FavoriteType) =>
      (type === "meal" && fav.idMeal === item.idMeal) ||
      (type === "cocktail" && fav.idDrink === item.idDrink)
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFavorite) {
      removeFavorite(item.idMeal || item.idDrink);
    } else {
      addFavorite(item);
    }
  };

  return (
    <Box sx={ProductCardBox}>
      <Card sx={{ height: "100%" }}>
        <Link
          to={`/product/${type}/${item.idMeal || item.idDrink}`}
          style={ProductCardLink}
        >
          <CardMedia
            component="img"
            sx={ProductCardMedia}
            image={item.strMealThumb || item.strDrinkThumb}
            alt={item.strMeal || item.strDrink}
          />
        </Link>

        <CardContent sx={ProductCardContent}>
          <Typography variant="h6" noWrap>
            <Link
              to={`/product/${type}/${item.idMeal || item.idDrink}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              {item.strMeal || item.strDrink}
            </Link>
          </Typography>

          <Box onClick={handleFavoriteClick} sx={{ cursor: "pointer" }}>
            {isFavorite ? <FaHeart color="red" /> : <FaRegHeart />}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ProductCard;
