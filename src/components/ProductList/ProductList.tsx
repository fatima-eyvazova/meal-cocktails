import React, { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination/Pagination";
import "./ProductList.css";

interface ProductListProps {
  data: any[];
  type: "meal" | "cocktail";
}

const ProductList: React.FC<ProductListProps> = ({ data, type }) => {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  return (
    <div className="product-list-container">
      <div className="product-list">
        {currentItems.map((item) => (
          <div key={item.idMeal || item.idDrink} className="product">
            <Link
              to={`/product/${type}/${item.idMeal || item.idDrink}`}
              className="product-link"
            >
              <img
                src={item.strMealThumb || item.strDrinkThumb}
                alt={item.strMeal || item.strDrink}
                className="product-image"
              />
              <h3 className="product-name">{item.strMeal || item.strDrink}</h3>
            </Link>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ProductList;
