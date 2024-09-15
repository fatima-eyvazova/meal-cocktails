import React, { useState } from "react";
import {
  useFetchMealsQuery,
  useFetchCocktailsQuery,
} from "../../features/apiSlice";
import ProductList from "../../components/ProductList/ProductList";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Home.css";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const itemsPerPage = 10;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = combinedData.slice(startIndex, endIndex);

  return (
    <div className="home-container">
      <SearchBar onSearch={setSearchQuery} />
      <button className="random-button" onClick={() => refetchMeals()}>
        Get Random Meal
      </button>
      {mealsLoading && <p>Loading meals...</p>}
      {cocktailsLoading && <p>Loading cocktails...</p>}
      <div className="product-list-container">
        <ProductList data={currentItems} type="meal" />
      </div>
    </div>
  );
};

export default Home;
