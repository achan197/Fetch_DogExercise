import React from "react";
import "./Pagination.css";

const Pagination = ({
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  hasNext,
  hasPrev,
}: {
  currentPage: number;
  totalPages: number;
  nextPage: () => void;
  prevPage: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}) => {
  return (
    <div className="page font_large">
      <button
        className="font_large page_button"
        onClick={prevPage}
        disabled={!hasPrev}
      >
        {`< Previous`}
      </button>
      <span className="font_large page_number">{`${currentPage} / ${totalPages}`}</span>
      <button
        className="font_large page_button"
        onClick={nextPage}
        disabled={!hasNext}
      >
        {`Next > `}
      </button>
    </div>
  );
};

export default Pagination;
