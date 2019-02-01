import React from "react";
import { Link } from "@curi/react-dom";

const Movie = ({ response }) => {
  const { error, movie } = response.data;
  if (error) {
    return (
      <div>
        <p>Sorry, but the movie could not be found.</p>
        <Link to="Home">Home</Link>
      </div>
    );
  }
  return (
    <div>
      <h1>{movie.title}</h1>
      <Link to="Home">Home</Link>
    </div>
  );
};

export default Movie;
