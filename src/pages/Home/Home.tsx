import {
  useFetchMealsQuery,
  useFetchCocktailsQuery,
} from "../../features/apiSlice";
import ProductList from "../../components/ProductList/ProductList";

import "./Home.css";

const Home: React.FC = () => {
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

  return (
    <div className="home-container">
      <button className="random-button" onClick={() => refetchMeals()}>
        Get Random Meal
      </button>
      {mealsLoading && <p>Loading meals...</p>}
      {cocktailsLoading && <p>Loading cocktails...</p>}
      <div className="product-list-container">
        <ProductList type="meal" />
      </div>
    </div>
  );
};

export default Home;
