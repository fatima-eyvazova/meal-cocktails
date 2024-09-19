import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { RandomBox } from "../../constants";

interface RandomMealCocktailModalProps {
  open: boolean;
  onClose: () => void;
  meal: any;
  cocktail: any;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const RandomModal: React.FC<RandomMealCocktailModalProps> = ({
  open,
  onClose,
  meal,
  cocktail,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ mt: 2, position: "absolute", right: "15px", top: 0 }}
        >
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
              style={{
                width: "200px",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
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
              style={{
                width: "200px",
                borderRadius: "8px",
                marginBottom: "8px",
              }}
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
