import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface CategorySelectProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  categories: any[];
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  return (
    <FormControl sx={{ width: "200px", marginBottom: 2 }}>
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        value={selectedCategory}
        label="Category"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <MenuItem value="all">All</MenuItem>
        {categories.map((category) => (
          <MenuItem
            key={category.strCategory || category.strDrink}
            value={category.strCategory || category.strDrink}
          >
            {category.strCategory || category.strDrink}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
