import React from "react";
import { Link } from "@curi/react-dom";

const Movie = ({ response }) => {
  const movie = response.data;
  return (
    <div>
      <h1>{movie.title}</h1>
      <Link to="Home">Home</Link>
    </div>
  );
};

export default Movie;
