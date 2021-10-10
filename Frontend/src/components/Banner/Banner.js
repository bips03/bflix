import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "../../axios/axios";
import requests from "../../requests/requests";
import Dialog from "../Dialog/Dialog";
import Loading from "../Loading/Loading";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const history = useHistory()
  useEffect(() => {
    const fetchMovie = async () => {
      const response = await axios.get(
        requests.fetchNetflixOriginals +
          `&page=${Math.floor(Math.random() * 20)}`
      );
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );
      setLoading(false);
      return response;
    };
    fetchMovie();
  }, []);
  const trunc = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  };
  const showDialog = () => setShow(!show);
  const playMovie = () => {
    history.push('/play', movie)
  }
  return loading ? (
    <Loading />
  ) : movie?.backdrop_path ? (
    <>
      <header
        className="banner container-fluid"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center top 40%",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {movie?.title || movie?.name || movie?.original_name}
          </h1>
          <div className="banner_btns">
            <button onClick={playMovie} className="banner_btn">Play</button>
            <button onClick={showDialog} className="banner_btn">
              More
            </button>
          </div>
          <h2 className="banner_desc">{trunc(movie?.overview, 300)}</h2>
        </div>

        <div className="banner-fade" />
      </header>
      <Dialog show={show} showDialog={showDialog} movie={movie} />
    </>
  ) : (
    <div style={{ minHeight: "70px", backgroundColor: "black" }}></div>
  );
}

export default Banner;