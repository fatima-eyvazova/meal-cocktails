import React, { useState, useEffect, useMemo } from "react";
import {
  useFetchMealsQuery,
  useFetchMealCategoriesQuery,
  useFetchMealAreasQuery,
  useFetchMealIngredientsQuery,
  useFetchRandomMealQuery,
} from "../../features/mealSlice";
import {
  useFetchCocktailsQuery,
  useFetchRandomCocktailQuery,
  useFetchCocktailCategoriesQuery,
  useFetchCocktailAreasQuery,
  useFetchCocktailIngredientsQuery,
} from "../../features/cocktailSlice";

import ProductList from "../../components/ProductList/ProductList";
import Paginate from "../../components/Pagination/Pagination";
import Header from "../../components/Header/Header";
import { Button, CircularProgress, Box } from "@mui/material";
import RandomModal from "../../components/RandomModal/RandomModal";
import { HomeBox } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { addFavorite, removeFavorite } from "../../features/favoritesSlice";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [randomMeal, setRandomMeal] = useState<any>(null);
  const [randomCocktail, setRandomCocktail] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string[]>(["all"]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>(["all"]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([
    "all",
  ]);

  const dispatch = useDispatch();
  const favorites = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const { data: mealCategoriesData } = useFetchMealCategoriesQuery("");
  const { data: cocktailCategoriesData } = useFetchCocktailCategoriesQuery("");
  const { data: mealAreasData } = useFetchMealAreasQuery("");
  const { data: cocktailAreasData } = useFetchCocktailAreasQuery("");
  const { data: mealIngredientsData } = useFetchMealIngredientsQuery("");
  const { data: cocktailIngredientsData } =
    useFetchCocktailIngredientsQuery("");

  const mealsQuery = useFetchMealsQuery(searchQuery, {
    skip: selectedCategory.length === 0 && selectedAreas.length === 0,
  });
  const cocktailsQuery = useFetchCocktailsQuery(searchQuery, {
    skip: selectedCategory.length === 0 && selectedAreas.length === 0,
  });
  const randomMealQuery = useFetchRandomMealQuery("");
  const randomCocktailQuery = useFetchRandomCocktailQuery("");

  const combinedData = useMemo(() => {
    const meals = mealsQuery.data?.meals || [];
    const cocktails = cocktailsQuery.data?.drinks || [];
    return [...meals, ...cocktails];
  }, [mealsQuery.data, cocktailsQuery.data]);

  const handleGetRandom = async () => {
    setOpenModal(true);
    setRandomMeal(null);
    setRandomCocktail(null);

    await randomMealQuery.refetch();
    await randomCocktailQuery.refetch();

    if (randomMealQuery.data) {
      setRandomMeal(randomMealQuery.data.meals[0]);
    }
    if (randomCocktailQuery.data) {
      setRandomCocktail(randomCocktailQuery.data.drinks[0]);
    }
  };

  const combinedCategories = useMemo(() => {
    return [
      ...(mealCategoriesData?.categories || []),
      ...(cocktailCategoriesData?.drinks || []),
    ];
  }, [mealCategoriesData, cocktailCategoriesData]);

  const combinedIngredients = useMemo(() => {
    const mealIngredients =
      mealIngredientsData?.meals?.map((item: { strIngredient: string }) => ({
        strIngredient: item.strIngredient,
      })) || [];

    const cocktailIngredients =
      cocktailIngredientsData?.drinks?.map(
        (item: { strIngredient1: string }) => ({
          strIngredient: item.strIngredient1,
        })
      ) || [];

    return [...mealIngredients, ...cocktailIngredients];
  }, [mealIngredientsData, cocktailIngredientsData]);

  const combinedAreas = useMemo(() => {
    const mealAreas = mealAreasData?.meals || [];
    const cocktailAreas = cocktailAreasData?.drinks || [];
    return ["all", ...mealAreas, ...cocktailAreas];
  }, [mealAreasData, cocktailAreasData]);

  const filteredData = useMemo(() => {
    let data = combinedData;

    if (!selectedCategory.includes("all") && selectedCategory.length > 0) {
      data = data.filter((item) =>
        selectedCategory.includes(item.strCategory!)
      );
    }
    if (!selectedAreas.includes("all") && selectedAreas.length > 0) {
      data = data.filter((item) => selectedAreas.includes(item.strArea!));
    }
    if (
      !selectedIngredients.includes("all") &&
      selectedIngredients.length > 0
    ) {
      data = data.filter((item) =>
        selectedIngredients.includes(item.strIngredient1!)
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
    mealsQuery.refetch();
    cocktailsQuery.refetch();
  }, [selectedCategory, selectedAreas, selectedIngredients]);

  const handleAddFavorite = (item: any) => {
    dispatch(addFavorite(item));
  };

  const handleRemoveFavorite = (id: string | number) => {
    dispatch(removeFavorite(id));
  };

  return (
    <Box sx={HomeBox}>
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleGetRandom}
        sx={{ marginBottom: 2 }}
      >
        Get Random Meal
      </Button>
      {mealsQuery.isLoading || cocktailsQuery.isLoading ? (
        <CircularProgress />
      ) : (
        <Box>
          <ProductList
            data={currentItems}
            favorites={favorites}
            addFavorite={handleAddFavorite}
            removeFavorite={handleRemoveFavorite}
          />
          <Paginate
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </Box>
      )}
      <RandomModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        meal={randomMeal}
        cocktail={randomCocktail}
      />
    </Box>
  );
};

export default Home;
