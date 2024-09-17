import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { addFavorite, removeFavorite } from "../../features/favoritesSlice";
import { RootState } from "../../store";
import { ProductCardProps } from "../../types/productTypes";

const ProductCard: React.FC<ProductCardProps> = ({ item, type }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const isFavorite = !!favorites.find(
    (fav) =>
      (type === "meal" && fav.idMeal === item.idMeal) ||
      (type === "cocktail" && fav.idDrink === item.idDrink)
  );

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFavorite) {
      dispatch(removeFavorite(item.idMeal || item.idDrink));
    } else {
      dispatch(addFavorite(item));
    }
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "48%", md: "30%", lg: "22%" },
        p: 1,
        boxSizing: "border-box",
        maxWidth: "300px",
        flex: "1 1 auto",
      }}
    >
      <Card sx={{ height: "100%" }}>
        <Link
          to={`/product/${type}/${item.idMeal || item.idDrink}`}
          style={{
            textDecoration: "none",
            color: "inherit",
            display: "block",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: { xs: "200px", sm: "250px", md: "270px" },
              objectFit: "cover",
            }}
            image={item.strMealThumb || item.strDrinkThumb}
            alt={item.strMeal || item.strDrink}
          />
        </Link>

        <CardContent
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
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
