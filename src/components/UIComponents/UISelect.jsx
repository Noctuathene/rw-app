import React from "react";

function UISelect(props) {
  const { id, name, value, onChange, labelText, children } = props;

  return (
    <div className="form-group">
      <label htmlFor={id}>{labelText}</label>;
      <select
        id={id}
        className="form-control"
        name={name}
        value={value}
        onChange={onChange}
      >
        {children}
      </select>
    </div>
  );
}

export default UISelect