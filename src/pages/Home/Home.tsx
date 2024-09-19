import React, { useState, useEffect, useMemo } from "react";
import {
  useFetchMealsQuery,
  useFetchMealCategoriesQuery,
} from "../../features/mealSlice";
import {
  useFetchCocktailsQuery,
  useFetchCocktailCategoriesQuery,
} from "../../features/cocktailSlice";

import ProductList from "../../components/ProductList/ProductList";
import Paginate from "../../components/Pagination/Pagination";
import Header from "../../components/Header/Header";
import { Button, CircularProgress, Box } from "@mui/material";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string[]>(["all"]);

  const { data: mealCategoriesData } = useFetchMealCategoriesQuery("");
  const { data: cocktailCategoriesData } = useFetchCocktailCategoriesQuery("");

  const mealsQuery = useFetchMealsQuery(searchQuery, {
    skip: selectedCategory.length === 0,
  });
  const cocktailsQuery = useFetchCocktailsQuery(searchQuery, {
    skip: selectedCategory.length === 0,
  });

  const combinedData = useMemo(() => {
    const meals = mealsQuery.data?.meals || [];
    const cocktails = cocktailsQuery.data?.drinks || [];
    return [...meals, ...cocktails];
  }, [mealsQuery.data, cocktailsQuery.data]);

  const combinedCategories = useMemo(() => {
    return [
      ...(mealCategoriesData?.categories || []),
      ...(cocktailCategoriesData?.drinks || []),
    ];
  }, [mealCategoriesData, cocktailCategoriesData]);

  const filteredData = useMemo(() => {
    if (selectedCategory.includes("all") || selectedCategory.length === 0) {
      return combinedData;
    }
    return combinedData.filter((item) =>
      selectedCategory.includes(item.strCategory)
    );
  }, [combinedData, selectedCategory]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    if (selectedCategory.length > 0) {
      mealsQuery.refetch();
      cocktailsQuery.refetch();
    }
  }, [selectedCategory]);

  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Header
        onSearch={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={combinedCategories}
      />

      <Button variant="contained" color="primary" sx={{ marginBottom: 2 }}>
        Get Random Meal
      </Button>

      {mealsQuery.isLoading || cocktailsQuery.isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <ProductList data={currentItems} />
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Box>
      )}
    </Box>
  );
};

export default Home;
