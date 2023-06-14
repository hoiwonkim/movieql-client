// ./src/routes/Movie.js
import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      id
      title
      rating
      medium_cover_image
      isLiked @client
    }
  }
`;

export default function Movie() {
  const { id } = useParams();
  const {
    data,
    loading,
    client: { cache },
  } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });

  const onClick = () => {
    const movieId = `Movie:${id}`;
    const fragment = gql`
      fragment MovieFragment on Movie {
        isLiked
      }
    `;

    const isLiked = cache.readFragment({
      id: movieId,
      fragment,
    });

    cache.writeFragment({
      id: movieId,
      fragment,
      data: {
        isLiked: !isLiked,
      },
    });
  };

  return (
    <div style={{ display: "flex", alignItems: "center", marginTop: "50px" }}>
      <div style={{ display: "flex", flexDirection: "column", marginLeft: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>
          {loading ? "Loading..." : data?.movie?.title}
        </h1>
        <span style={{ fontSize: "16px", marginBottom: "10px" }}>
          ⭐️ {data?.movie?.rating}
        </span>
        <button onClick={onClick}>
          {data?.movie?.isLiked ? "Unlike" : "Like"}
        </button>
      </div>
      <div
        style={{
          width: "200px",
          height: "300px",
          backgroundImage: `url(${data?.movie?.medium_cover_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      ></div>
    </div>
  );
}
