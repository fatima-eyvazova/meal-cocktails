import React, { useCallback } from "react";
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
import { IngredientSelectProps } from "../../types/productTypes";

const IngredientSelect: React.FC<IngredientSelectProps> = React.memo(
  ({ ingredients, selectedIngredients, setSelectedIngredients }) => {
    const handleChange = useCallback(
      (event: any) => {
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
      },
      [setSelectedIngredients]
    );

    const renderSelectedValue = (selected: string[]) => {
      if (selected.includes("all")) return "All";
      return selected.length === 0 ? "None" : selected.join(", ");
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
            renderValue={renderSelectedValue}
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
  }
);

export default IngredientSelect;
