import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Loading from "../Loading/Loading";
import Navbar from "../Navbar/Navbar";
import axios from "../../axios/axios";
import "./Player.css";

function Player() {
  const location = useLocation();
  const [movie, setMovie] = useState();
  const [ytid, setytId] = useState("");
  const [loading, setLoading] = useState(true);
  const API_KEY = process.env.REACT_APP_TMDBAPI;
  useEffect(() => {
    const movie = location.state;
    const getMovie = async () => {
      let data;
      try {
        const res = await axios.get(
          `/movie/${movie.id}/videos?api_key=${API_KEY}`
        );
        data = res.data.results;
        console.log(data);
        if (data.length === 0) {
          throw new Error("not found");
        }
        const ids = data.filter((d) => {
          return d.type === "Trailer" && d.official;
        });
        if (ids.length === 0) {
          throw new Error("not found");
        }
        setytId(ids[0].key);
      } catch (error) {
        
      }
      setLoading(false)
    };

    setMovie(movie);
    getMovie();
  }, [location, API_KEY]);

  return loading ? (
    <Loading />
  ) : movie ? (
    <div className="player">
      <Navbar showIcon={false} />
      <div className="player_info">
        <h1 style={{ fontSize: "26px" }}>
          {movie.name ||
            movie.title ||
            movie.original_name ||
            movie.original_title}{" "}
          {movie.adult ? "(A)" : "(U/A)"}
        </h1>
        <div className="video_player">{console.log(ytid)}</div>
      </div>
    </div>
  ) : (
    <>
      <Navbar showIcon={false} />{" "}
      <h1 style={{ paddingTop: "70px", textAlign: "center", width: "100%" }}>
        Movie not selected
      </h1>
    </>
  );
}

export default Player;
