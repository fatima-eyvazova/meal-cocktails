import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { MEAL_BASE_URL } from "../config/apiConstants";
export const mealSlice = createApi({
  reducerPath: "meal",
  baseQuery: fetchBaseQuery({
    baseUrl: MEAL_BASE_URL,
  }),
  endpoints: (builder) => ({
    fetchMeals: builder.query({
      query: (searchQuery = "") => `search.php?s=${searchQuery}`,
    }),

    fetchMealById: builder.query({
      query: (id) => `lookup.php?i=${id}`,
    }),

    fetchRandomMeal: builder.query({
      query: () => `random.php`,
    }),

    fetchMealCategories: builder.query({
      query: () => `categories.php`,
    }),
  }),
});

export const {
  useFetchMealsQuery,
  useFetchMealByIdQuery,
  useFetchRandomMealQuery,
  useFetchMealCategoriesQuery,
} = mealSlice;
