import React from "react";
import Filters from "./Filters/Filters";
import MoviesList from "./Movies/MoviesList";
import Header from "./Header/Header";
import { API_URL, API_KEY_3, fetchApi } from "../api/api";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";

const cookies = new Cookies();
function App(props) {
  const [user, setUser] = useState(null)
  const [session_id, setSessionId] = useState(null)
  const [filters, setFilters] = useState({
    sort_by: "popularity.desc",
    primary_release_year: "2018",
    with_genres: []
  })
  const [page, setPage] = useState(1)
  const [total_pages, setTotalPages] = useState("")

  const updateSessionId = session_id => {
    cookies.set("session_id", session_id, {
      path: "/",
      maxAge: 2592000
    });
    setSessionId(session_id)
  };

  const onChangeFilters = event => {
    const value = event.target.value;
    const name = event.target.name;
    setFilters({...filters, [name]: value});
  };

  const onChangePagination = ({ page, total_pages }) => {
    setPage(page)
    setTotalPages(total_pages)
  };
  useEffect(() => {
    const session_id = cookies.get("session_id");
    if (session_id) {
      fetchApi(
        `${API_URL}/account?api_key=${API_KEY_3}&session_id=${session_id}`
      ).then(user => {
        setUser(user);
      });
    }
  }, [])

  return (
    <div>
      <Header
        user={user}
        updateUser={setUser}
        updateSessionId={updateSessionId}
      />
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card w-100">
              <div className="card-body">
                <h3>Фильтры:</h3>
                <Filters
                  page={page}
                  total_pages={total_pages}
                  filters={filters}
                  onChangeFilters={onChangeFilters}
                  onChangePagination={onChangePagination}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePagination={onChangePagination}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default App