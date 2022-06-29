import React from "react";

const SortBy = (props) => {
  const { sort_by, onChangeFilters, options } = props;

  return (
    <div className="form-group">
      <label htmlFor="sort_by">Сортировать по:</label>
      <select
        id="sort_by"
        className="form-control"
        name="sort_by"
        value={sort_by}
        onChange={onChangeFilters}
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

SortBy.defaultProps = {
  options: [
    {
      label: "Популярные по убыванию",
      value: "popularity.desc",
      image: "/lol.jpg"
    },
    {
      label: "Популярные по возростанию",
      value: "popularity.asc"
    },
    {
      label: "Рейтинг по убыванию",
      value: "vote_average.desc"
    },
    {
      label: "Рейтинг по возростанию",
      value: "vote_average.asc"
    }
  ]
};

export default SortBy