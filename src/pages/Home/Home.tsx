import React, { useState, useEffect, useMemo } from "react";
import {
  useFetchMealsQuery,
  useFetchMealCategoriesQuery,
  useFetchMealAreasQuery,
  useFetchMealIngredientsQuery,
} from "../../features/mealSlice";
import {
  useFetchCocktailsQuery,
  useFetchCocktailCategoriesQuery,
  useFetchCocktailAreasQuery,
  useFetchCocktailIngredientsQuery,
} from "../../features/cocktailSlice";

import ProductList from "../../components/ProductList/ProductList";
import Paginate from "../../components/Pagination/Pagination";
import Header from "../../components/Header/Header";
import { Button, CircularProgress, Box } from "@mui/material";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCategory, setSelectedCategory] = useState<string[]>(["all"]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>(["all"]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    "all",
  ]);

  const { data: mealCategoriesData } = useFetchMealCategoriesQuery("");
  const { data: cocktailCategoriesData } = useFetchCocktailCategoriesQuery("");
  const { data: mealAreasData } = useFetchMealAreasQuery();
  const { data: mealIngredientsData } = useFetchMealIngredientsQuery();
  const { data: cocktailIngredientsData } = useFetchCocktailIngredientsQuery();
  const { data: cocktailAreasData } = useFetchCocktailAreasQuery();

  const mealsQuery = useFetchMealsQuery(searchQuery, {
    skip: selectedCategory.length === 0 && selectedAreas.length === 0,
  });
  const cocktailsQuery = useFetchCocktailsQuery(searchQuery, {
    skip: selectedCategory.length === 0 && selectedAreas.length === 0,
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

  const combinedIngredients = useMemo(() => {
    return [
      ...(mealIngredientsData?.meals || []),
      ...(cocktailIngredientsData?.drinks || []),
    ];
  }, [mealIngredientsData, cocktailIngredientsData]);

  const combinedAreas = useMemo(() => {
    const mealAreas = mealAreasData?.meals || [];
    const cocktailAreas = cocktailAreasData?.drinks || [];
    return ["all", ...mealAreas, ...cocktailAreas];
  }, [mealAreasData, cocktailAreasData]);

  const filteredData = useMemo(() => {
    let data = combinedData;

    if (!selectedCategory.includes("all") && selectedCategory.length > 0) {
      data = data.filter((item) => selectedCategory.includes(item.strCategory));
    }
    if (!selectedAreas.includes("all") && selectedAreas.length > 0) {
      data = data.filter((item) => selectedAreas.includes(item.strArea));
    }
    if (
      !selectedIngredients.includes("all") &&
      selectedIngredients.length > 0
    ) {
      data = data.filter((item) =>
        selectedIngredients.includes(item.strIngredient1)
      );
    }

    return data;
  }, [combinedData, selectedCategory, selectedAreas, selectedIngredients]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    if (selectedCategory.length > 0 || selectedAreas.length > 0) {
      mealsQuery.refetch();
      cocktailsQuery.refetch();
    }
    if (selectedIngredients.length > 0) {
      mealsQuery.refetch();
      cocktailsQuery.refetch();
    }
  }, [selectedCategory, selectedAreas, selectedIngredients]);

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
        areas={combinedAreas}
        ingredients={combinedIngredients}
        selectedAreas={selectedAreas}
        setSelectedAreas={setSelectedAreas}
        selectedIngredients={selectedIngredients}
        setSelectedIngredients={setSelectedIngredients}
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
