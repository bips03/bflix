import React from "react";
import "./Dialog.css";
import { Modal } from "@mui/material";
import { useHistory } from "react-router";

function Dialog({ movie, show, showDialog }) {
  const baseUrl = "https://image.tmdb.org/t/p/original/";
  const history = useHistory()
  const playMovie = () => {
    history.push('/play', movie)
  }
  return (
    <Modal open={show} onClose={showDialog}>
      <div className="dialog">
        <div onClick={() => console.log(movie)} className="dialog_content">
          <div className="dialog_content_header">
            <h1 style={{ fontSize: "36px" }}>
              {movie.name || movie.title ||  movie.original_name || movie.original_title}{" "}
              {movie.adult ? "(A)" : "(U/A)"}
            </h1>
            <h3 style={{ margin: "10px 0px"}}>Rating: {movie.vote_average}</h3>
          </div>
          <div className="dialog_content_body">
            <h2 className='dialog_about'>About</h2>
            <div className='dialog_desc'>
              <article className='dialog_overview'>{movie.overview}</article>
              <button onClick={playMovie} className='banner_btn'>Play</button>
            </div>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url('${baseUrl}${movie.poster_path}')`,
          }}
          className="dialog_img"
        ></div>
      </div>
    </Modal>
  );
}

export default Dialog;
