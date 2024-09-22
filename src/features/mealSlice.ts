import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MEAL_BASE_URL } from "../config/apiConstants";
export const mealSlice = createApi({
  reducerPath: "meal",
  baseQuery: fetchBaseQuery({
    baseUrl: MEAL_BASE_URL,
  }),
  tagTypes: ["Meal", "MealCategories", "MealAreas", "MealIngredients"],

  endpoints: (builder) => ({
    fetchMeals: builder.query({
      query: (searchQuery = "") => `search.php?s=${searchQuery}`,
      providesTags: (result) =>
        result?.meals
          ? result.meals.map(({ idMeal }) => ({ type: "Meal", id: idMeal }))
          : [],
    }),

    fetchMealById: builder.query({
      query: (id) => `lookup.php?i=${id}`,
      providesTags: (id) => [{ type: "Meal", id }],
    }),

    fetchRandomMeal: builder.query({
      query: () => `random.php`,
    }),

    fetchMealCategories: builder.query({
      query: () => `categories.php`,
      providesTags: ["MealCategories"],
      keepUnusedDataFor: 60,
    }),
    fetchMealAreas: builder.query({
      query: () => `list.php?a=list`,
      providesTags: ["MealAreas"],
      keepUnusedDataFor: 60,
    }),
    fetchMealIngredients: builder.query({
      query: () => "list.php?i=list",
      providesTags: ["MealIngredients"],
      keepUnusedDataFor: 60,
    }),
  }),
});

export const {
  useFetchMealsQuery,
  useFetchMealByIdQuery,
  useFetchRandomMealQuery,
  useFetchMealCategoriesQuery,
  useFetchMealAreasQuery,
  useFetchMealIngredientsQuery,
} = mealSlice;
