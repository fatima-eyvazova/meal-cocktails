import { createSlice } from "@reduxjs/toolkit";
import { FavoriteType } from "../types/productTypes";

const initialFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    favorites: initialFavorites,
  },
  reducers: {
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (item: FavoriteType) =>
          item.idMeal !== action.payload && item.idDrink !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
