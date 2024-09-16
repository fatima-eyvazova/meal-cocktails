import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";

interface ProductCardProps {
  item: any;
  type: "meal" | "cocktail";
}

const ProductCard: React.FC<ProductCardProps> = ({ item, type }) => {
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
          <CardContent>
            <Typography variant="h6" noWrap>
              {item.strMeal || item.strDrink}
            </Typography>
          </CardContent>
        </Link>
      </Card>
    </Box>
  );
};

export default ProductCard;
