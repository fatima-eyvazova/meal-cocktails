export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
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
  favorites: FavoriteType[];
  addFavorite: (item: any) => void;
  removeFavorite: (id: string | number) => void;
}

export interface FavoriteType {
  idMeal?: string;
  idDrink?: string;
  strMealThumb?: string;
  strDrinkThumb?: string;
  strMeal?: string;
  strDrink?: string;
}

export interface AreaSelectProps {
  areas: { strArea?: string }[];
  selectedAreas: string[];
  setSelectedAreas: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface CategorySelectProps {
  selectedCategory: string[];
  setSelectedCategory: (category: string[]) => void;
  categories: any[];
}

export interface HeaderProps {
  onSearch: (query: string) => void;
  selectedCategory: string[];
  setSelectedCategory: React.Dispatch<React.SetStateAction<string[]>>;
  categories: any[];
  areas: { strArea: string }[];
  ingredients: { strIngredient: string }[];
  selectedAreas: string[];
  setSelectedAreas: React.Dispatch<React.SetStateAction<string[]>>;
  selectedIngredients: string[];
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}

export interface IngredientSelectProps {
  ingredients: { strIngredient: string }[];
  selectedIngredients: string[];
  setSelectedIngredients: (ingredients: string[]) => void;
}
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ProductListProps {
  data: any[];
  favorites: any[];
  addFavorite: (item: any) => void;
  removeFavorite: (id: string | number) => void;
}

export interface RandomMealCocktailModalProps {
  open: boolean;
  onClose: () => void;
  meal: any;
  cocktail: any;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
}

export interface Meal {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealResponse {
  meals: Meal[];
}

export interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export interface CocktailResponse {
  drinks: Cocktail[];
}
