import { configureStore } from "@reduxjs/toolkit";
import { cocktailSlice } from "./features/cocktailSlice";
import { mealSlice } from "./features/mealSlice";

export const store = configureStore({
  reducer: {
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
