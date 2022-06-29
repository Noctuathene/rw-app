import React from "react";
import classNames from "classnames";

function Pagination(props) { 

  const nextPage = () => {
    props.onChangePagination({
      page: props.page + 1,
      total_pages: props.total_pages
    });
  };

  const prevPage = page => event => {
    props.onChangePagination({
      page: props.page - 1,
      total_pages: props.total_pages
    });
  };
  
  const { page, total_pages } = props
  return (
    <nav className="d-flex align-items-center">
      <ul className="pagination mb-0 mr-3">
        <li
          className={classNames("page-item", {
            disabled: page === 1
          })}
        >
          <span className="page-link" onClick={prevPage(page)}>
             Назад
          </span>
        </li>
        <li className="page-item">
          <span className="page-link" onClick={nextPage}>
            Вперед
          </span>
        </li>
      </ul>
      <span>
        {page} of {total_pages}
      </span>
    </nav>
  );
}

export default Pagination
