import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import Loading from "../Loading/Loading";
import Navbar from "../Navbar/Navbar";
import axios from "../../axios/axios";
import YouTube from "react-youtube";
import "./Player.css";

function Player() {
  const location = useLocation();
  const [movie, setMovie] = useState();
  const [ytid, setytId] = useState("");
  const [loading, setLoading] = useState(true);
  const API_KEY = process.env.REACT_APP_TMDBAPI;
  const opts = {
    height: "480",
    width: "100%",
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    const movie = location.state;
    const getMovie = async () => {
      let data;
      try {
        const res = await axios.get(
          `/movie/${movie.id}/videos?api_key=${API_KEY}`
        );
        // data there but maybe empty array
        data = res.data.results;
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
        setLoading(false)
      } catch (error) {
          setMovie('')
          setLoading(false)
      }
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
        <h1 style={{ fontSize: "26px", textDecoration: "underline" }}>
          {movie.name ||
            movie.title ||
            movie.original_name ||
            movie.original_title}{" "}
          {movie.adult ? "(A)" : "(U/A)"}
        </h1>
        <div className="video_player">
          <YouTube videoId={ytid} opts={opts} />
        </div>
        <div className="video_desc">
          <h3>Description</h3>
          <p>{movie.overview}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className='error'>
      <Navbar showIcon={false} />{" "}
      <h1>
        Movie not available :(
      </h1>
    </div>
  );
}

export default Player;
