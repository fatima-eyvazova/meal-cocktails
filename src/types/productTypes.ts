export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export type FavoriteItem = Meal | Cocktail;

export interface ProductCardProps {
  item: any;
  type: "meal" | "cocktail";
}

export interface FavoriteType {
  idMeal?: string;
  idDrink?: string;
}
