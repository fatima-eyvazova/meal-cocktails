import React from "react";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="pagination">
      {totalPages > 1 && (
        <>
          {currentPage > 1 && (
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className="pagination-button"
            >
              &lt;
            </button>
          )}
          {Array.from({ length: totalPages }, (_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => onPageChange(pageNumber)}
                className={`pagination-button ${
                  currentPage === pageNumber ? "active" : ""
                }`}
                style={{
                  display: pageNumber === currentPage ? "inline" : "none",
                }}
              >
                {pageNumber}
              </button>
            );
          })}
          {currentPage < totalPages && (
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className="pagination-button"
            >
              &gt;
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Pagination;
