import axios from "axios";

export async function getMovies({ pageParam = 1 }) {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&page=${pageParam}`
  );
  return data;
}

export async function getMovieDetails(movieID) {
  const { data } = await axios(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&append_to_response=people`
  );
  return data;
}

export async function getMovieCrew(movieID) {
  const { data } = await axios(
    `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`
  );
  return data;
}

export async function getIMDBRatings(imdbID) {
  const options = {
    method: "GET",
    url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
    params: { r: "json", i: imdbID },
    headers: {
      "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
      "x-rapidapi-key": "ccadeb9ceemsh2710b0890ca8553p1da814jsn22705398e947",
    },
  };

  const res = await axios.request(options);
  console.log(res);
  return res.data;
}

export function formatReleaseDate(releaseDate) {
  const date = new Date(releaseDate);
  return `${date.getDate()} ${date.toLocaleString("en-us", {
    month: "long",
  })} ${date.getFullYear()}`;
}
