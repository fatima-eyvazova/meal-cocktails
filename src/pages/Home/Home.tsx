import React, { useState } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: mealCategoriesData } = useFetchMealCategoriesQuery("");
  const { data: cocktailCategoriesData } = useFetchCocktailCategoriesQuery("");

  const {
    data: mealsData,
    isLoading: mealsLoading,
    refetch: refetchMeals,
  } = useFetchMealsQuery(searchQuery);

  const { data: cocktailsData, isLoading: cocktailsLoading } =
    useFetchCocktailsQuery(searchQuery);

  const combinedData = [
    ...(mealsData?.meals || []),
    ...(cocktailsData?.drinks || []),
  ];

  const combinedCategories = [
    ...(mealCategoriesData?.categories || []),
    ...(cocktailCategoriesData?.drinks || []),
  ];

  const filteredData = combinedData.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.strCategory === selectedCategory;
  });

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

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

      <Button
        variant="contained"
        color="primary"
        onClick={() => refetchMeals()}
        sx={{ marginBottom: 2 }}
      >
        Get Random Meal
      </Button>

      {mealsLoading || cocktailsLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <ProductList data={currentItems} />
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Box>
      )}
    </Box>
  );
};

export default Home;
