// .src/routes/Movies.js
import React from "react";
import { gql, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const ALL_MOVIES = gql`
  query getMovies {
    allMovies {
      id
      title
    }
  }
`;

export default function Movies() {
  const { data, loading, error } = useQuery(ALL_MOVIES);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Could not fetch :(</h1>;
  }

  return (
    <div>
      <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Movies</h1>
      <ul>
        {data.allMovies.map((movie) => (
          <li
            key={movie.id}
            style={{ marginBottom: "10px", listStyle: "none" }}
          >
            <Link
              to={`/movies/${movie.id}`}
              style={{
                fontSize: "16px",
                color: "#333",
                textDecoration: "none",
              }}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
