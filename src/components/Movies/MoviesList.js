import React from "react";
import MovieItem from "./MovieItem";
import { API_URL, API_KEY_3 } from "../../api/api";
import queryString from "query-string";
import { useState, useEffect } from "react";

function MovieList(props) {
  const [movies, setMovies] = useState([]);

  const getMovies = (filters, page) => {
    const { sort_by, primary_release_year, with_genres } = filters;
    const queryStringParams = {
      api_key: API_KEY_3,
      language: "ru-RU",
      sort_by: sort_by,
      page: page,
      primary_release_year: primary_release_year
    };

    if (with_genres.length > 0)
      queryStringParams.with_genres = with_genres.join(",");

    const link = `${API_URL}/discover/movie?${queryString.stringify(
      queryStringParams
    )}`;
    fetch(link)
      .then(response => {
        return response.json();
      })
      .then(data => {
        props.onChangePagination({
          page: data.page,
          total_pages: data.total_pages
        });
        setMovies(data.results)
      });
  };

  useEffect(() => {
    getMovies(props.filters, props.page);
  },[])

  useEffect(() => {
    props.onChangePagination({ page: 1 });
    getMovies(props.filters, 1);
  }, [props.filters])

  useEffect(() => {
    getMovies(props.filters, props.page);
  }, [props.page])

  return (
    <div className="row">
      {movies.map(movie => {
        return (
          <div key={movie.id} className="col-6 mb-4">
            <MovieItem item={movie} />
          </div>
        );
      })}
    </div>
  );
}

export default MovieList;