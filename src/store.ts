import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./features/favoritesSlice";
import { cocktailSlice } from "./features/cocktailSlice";
import { mealSlice } from "./features/mealSlice";

export const store = configureStore({
  reducer: {
    favorites: favoritesReducer,
    [cocktailSlice.reducerPath]: cocktailSlice.reducer,
    [mealSlice.reducerPath]: mealSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(mealSlice.middleware)
      .concat(cocktailSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
