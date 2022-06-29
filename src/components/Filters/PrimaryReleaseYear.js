import React from "react";
import UISelect from "../UIComponents/UISelect";

const PrimaryReleaseYear = (props) => {
  const { primary_release_year, onChangeFilters, options } = props;
  return (
    <UISelect
      id="primary_release_year"
      name="primary_release_year"
      value={primary_release_year}
      onChange={onChangeFilters}
      labelText="Год релиза:"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </UISelect>
  );
}

PrimaryReleaseYear.defaultProps = {
  options: [
    {
      label: "2018",
      value: "2018"
    },
    {
      label: "2017",
      value: "2017"
    },
    {
      label: "2016",
      value: "2016"
    },
    {
      label: "2015",
      value: "2015"
    }
  ]
};
export default PrimaryReleaseYear
