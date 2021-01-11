import "./style.scss";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Router } from "../../../i18n.js";
import getAsString from "../../../helpers/getAsString";

const Pagination = ({ pageCount }: { pageCount: number }) => {
  const { query } = useRouter();
  const [currentPage, setCurrPage] = useState(1);

  useEffect(() => {
    setCurrPage(parseInt(getAsString(Router.query.page || "1"), 10));
  }, []);
  const handlePageClick = (data) => {
    const { selected } = data;
    console.log({ selected });
    Router.push(
      {
        pathname: "/vacancylist",
        query: {
          ...Router.query,
          page: selected + 1 || 1,
        },
      },
      undefined,
      { shallow: true }
    );
  };
  return (
    <div className="pagination__container">
      <ReactPaginate
        marginPagesDisplayed={3}
        forcePage={currentPage - 1}
        previousLabel="← Previous"
        nextLabel="Next →"
        pageRangeDisplayed={10}
        pageCount={pageCount}
        breakLabel="..."
        onPageChange={handlePageClick}
        containerClassName="pagination"
        pageClassName="pagination__number__link"
        previousClassName="pagination__link__prev"
        nextClassName="pagination__link__next"
        disabledClassName="pagination__link--disabled"
        activeClassName="pagination__link--active"
      />
    </div>
  );
};

export default Pagination;
