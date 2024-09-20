import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  OutlinedInput,
} from "@mui/material";

interface IngredientSelectProps {
  ingredients: { strIngredient: string }[];
  selectedIngredients: string[];
  setSelectedIngredients: (ingredients: string[]) => void;
}

const IngredientSelect: React.FC<IngredientSelectProps> = ({
  ingredients,
  selectedIngredients,
  setSelectedIngredients,
}) => {
  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;

    if (value.includes("all")) {
      setSelectedIngredients(["all"]);
    } else {
      setSelectedIngredients(
        typeof value === "string" ? value.split(",") : value
      );
    }
  };

  return (
    <Box sx={{ width: "10vw" }}>
      <FormControl fullWidth>
        <InputLabel>Ingredients</InputLabel>
        <Select
          multiple
          value={selectedIngredients}
          onChange={handleChange}
          input={<OutlinedInput label="Ingredients" />}
          renderValue={(selected) => selected.join(", ")}
        >
          <MenuItem value="all">
            <Checkbox checked={selectedIngredients.includes("all")} />
            <ListItemText primary="All" />
          </MenuItem>

          {ingredients.map((ingredient, index) => (
            <MenuItem
              key={index}
              value={ingredient.strIngredient}
              disabled={selectedIngredients.includes("all")}
            >
              <Checkbox
                checked={
                  selectedIngredients.indexOf(ingredient.strIngredient) > -1
                }
              />
              <ListItemText primary={ingredient.strIngredient} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default IngredientSelect;
