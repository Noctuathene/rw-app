import React from "react";
import { useEffect, useState } from "react";
import { API_KEY_3, API_URL } from "../../api/api";

function Genres(props) {

  const [genresList, setGenresList] = useState([])

  useEffect(() => {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=ru-RU`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setGenresList(data.genres);
      });
  });

  const onChange = event => {
    props.onChangeFilters({
      target: {
        name: "with_genres",
        value: event.target.checked
          ? [...props.with_genres, event.target.value]
          : props.with_genres.filter(genre => genre !== event.target.value)
      }
    });
  };

  const resetGenres = () => {
    props.onChangeFilters({
      target: {
        name: "with_genres",
        value: []
      }
    });
  };

  const { with_genres } = props

  return (
    <React.Fragment>
      <div>
        <button
          type="button"
          className="btn btn-outline-dark mb-2"
          onClick={resetGenres}
        >
          Показать все жанры
        </button>
      </div>
      {genresList.map(genre => (
        <div key={genre.id} className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={genre.id}
            id={`genre${genre.id}`}
            onChange={onChange}
            checked={with_genres.includes(String(genre.id))}
          />
          <label className="form-check-label" htmlFor={`genre${genre.id}`}>
            {genre.name}
          </label>
        </div>
      ))}
    </React.Fragment>
  );
}

export default Genres;
