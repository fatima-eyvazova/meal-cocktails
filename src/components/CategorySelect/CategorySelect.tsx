import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
} from "@mui/material";

interface CategorySelectProps {
  selectedCategory: string[];
  setSelectedCategory: (category: string[]) => void;
  categories: any[];
}

const renderSelectedValue = (selected: string[]) => {
  return selected.join(", ");
};

const CategorySelect: React.FC<CategorySelectProps> = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  const handleCategoryChange = (event: any) => {
    const value = event.target.value as string[];
    setSelectedCategory(value);
  };

  return (
    <FormControl sx={{ width: "200px", marginBottom: 2 }}>
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        multiple
        value={selectedCategory}
        onChange={handleCategoryChange}
        renderValue={renderSelectedValue}
      >
        <MenuItem value="all">
          <Checkbox checked={selectedCategory.includes("all")} />
          All
        </MenuItem>
        {categories.map((category) => (
          <MenuItem key={category.strCategory} value={category.strCategory}>
            <Checkbox
              checked={selectedCategory.includes(category.strCategory)}
            />
            {category.strCategory}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
