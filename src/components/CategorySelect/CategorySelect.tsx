import React, { useCallback, useMemo } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
} from "@mui/material";
import { CategorySelectProps } from "../../types/productTypes";

const renderSelectedValue = (selected: string[]) => {
  return selected.length === 0 ? "None" : selected.join(", ");
};

const CategorySelect: React.FC<CategorySelectProps> = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  const handleCategoryChange = useCallback(
    (event: any) => {
      const value = event.target.value as string[];

      if (value.includes("all")) {
        setSelectedCategory(["all"]);
      } else {
        setSelectedCategory(value);
      }
    },
    [setSelectedCategory]
  );

  const allSelected = selectedCategory.includes("all");

  const renderedCategories = useMemo(() => {
    return categories.map((category) => (
      <MenuItem
        key={category.strCategory}
        value={category.strCategory}
        disabled={allSelected}
      >
        <Checkbox checked={selectedCategory.includes(category.strCategory)} />
        {category.strCategory}
      </MenuItem>
    ));
  }, [categories, selectedCategory, allSelected]);

  return (
    <FormControl sx={{ width: "200px" }}>
      <InputLabel id="category-select-label">Category</InputLabel>
      <Select
        labelId="category-select-label"
        multiple
        value={selectedCategory}
        onChange={handleCategoryChange}
        renderValue={renderSelectedValue}
      >
        <MenuItem value="all">
          <Checkbox checked={allSelected} />
          All
        </MenuItem>
        {renderedCategories}
      </Select>
    </FormControl>
  );
};

export default CategorySelect;
