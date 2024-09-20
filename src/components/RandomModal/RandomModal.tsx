import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import {
  ButtonStyle,
  ImageStyle,
  ModalStyle,
  RandomBox,
} from "../../constants";

interface RandomMealCocktailModalProps {
  open: boolean;
  onClose: () => void;
  meal: any;
  cocktail: any;
}

const RandomModal: React.FC<RandomMealCocktailModalProps> = ({
  open,
  onClose,
  meal,
  cocktail,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={ModalStyle}>
        <Button onClick={onClose} variant="outlined" sx={ButtonStyle}>
          X
        </Button>
        <Typography variant="h6" component="h2">
          Random Meal
        </Typography>
        {meal && (
          <Box sx={RandomBox}>
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              style={ImageStyle}
            />
            <Typography sx={{ mt: 2, fontSize: "20px" }}>
              {meal.strMeal} - {meal.strCategory}
            </Typography>
          </Box>
        )}
        <Typography variant="h6" component="h2" sx={{ mt: 4 }}>
          Random Cocktail
        </Typography>
        {cocktail && (
          <Box sx={RandomBox}>
            <img
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              style={ImageStyle}
            />
            <Typography sx={{ mt: 2, fontSize: "20px" }}>
              {cocktail.strDrink} - {cocktail.strCategory}
            </Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default RandomModal;
