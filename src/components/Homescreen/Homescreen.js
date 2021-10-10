import React from "react";
import "./Homescreen.css";
import Navbar from "../Navbar/Navbar";
import Banner from "../Banner/Banner";
import Row from "../Row/Row";
import requests from "../../requests/requests";

function Homescreen() {

  return (
    <div className="homescreen">
      <Navbar />
      <Banner />
      <Row title="Trending Now" fetchUrl={requests.fetchTrending} isLargeRow />
      <Row
        title="Netflix Originals"
        fetchUrl={requests.fetchNetflixOriginals}
      />

      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Thriller" fetchUrl={requests.fetchThriller} />
    </div>
  );
}

export default React.memo(Homescreen);
