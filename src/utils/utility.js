import axios from "axios";

export async function getMovies({ pageParam = 1 }) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&page=${pageParam}`
  );
  return data;
}

export async function getMovieDetails(movieID) {
  const { data } = await axios(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&append_to_response=release_dates,external_ids,credits,content_ratings`
  );
  return data;
}

export function getMovieRatings(release_dates = {}) {
  return (
    release_dates?.results?.find((x) => x.iso_3166_1 === "US")?.release_dates[0]
      ?.certification || null
  );
}

export function formatReleaseDate(releaseDate) {
  const date = new Date(releaseDate);
  return `${date.getDate()} ${date.toLocaleString("en-us", {
    month: "long",
  })} ${date.getFullYear()}`;
}
