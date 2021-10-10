import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import Dialog from "../Dialog/Dialog";
import "./Movie.css";

function Movie({ movie, img, alt, isLargeRow }) {
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  useEffect(() => setLoading(false), []);
  const showDialog = () => setShow(!show);
  return loading ? (
    <Loading />
  ) : (
    <>
      <img
        src={img}
        alt={alt}
        onClick={showDialog}
        className={`movie row_poster ${isLargeRow && "row_backdrop"}`}
      />

      <Dialog
        show={show}
        showDialog={showDialog}
        movie={movie}
      />
    </>
  );
}

export default Movie;
