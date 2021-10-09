import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
import Loading from "../Loading/Loading";
import Movie from "../Movie/Movie";
import "./Row.css";

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = "https://image.tmdb.org/t/p/original/";
  useEffect(() => {
    const getMovies = async () => {
      const req = await axios.get(fetchUrl);
      setMovies(req.data.results);
      setLoading(false);
      return req;
    };

    getMovies();
  }, [fetchUrl]);

  return loading ? (
    <Loading />
  ) : (
    <div className="row">
      <h2> {title} </h2>
      <div className="list">
        {movies.map(
          (m) =>
            ((isLargeRow && m.poster_path) ||
              (!isLargeRow && m.backdrop_path)) && (
              <Movie
                key={m.id}
                isLargeRow={isLargeRow}
                img={`${baseUrl}${
                  isLargeRow ? m?.poster_path : m?.backdrop_path
                }`}
                movie = {m}
                alt={m.title}
                onClick = {() => console.log(m.id)}
              />
            )
        )}
      </div>
    </div>
  );
}

export default Row;
