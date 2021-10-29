import axios from "axios";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { firebaseDB } from "../lib/firebase";
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

export async function getPersonDetails(personID) {
  const { data } = await axios(
    `https://api.themoviedb.org/3/person/${personID}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&append_to_response=movie_credits,external_ids`
  );
  return data;
}

export function getMovieRatings(release_dates = {}) {
  return (
    release_dates?.results?.find((x) => x.iso_3166_1 === "US")?.release_dates[0]
      ?.certification || null
  );
}

export function getSearchQuery(location) {
  return new URLSearchParams(location).get("q");
}

export async function getSearchMovies(pageParam, query) {
  const { data } = await axios(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&query=${query}&page=${pageParam}&include_adult=false`
  );

  return data;
}

export async function isMovieInFavourites(userID, movieID) {
  const docRef = doc(firebaseDB, "favourite-movies", userID);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data().movies;
      return data.filter((movie) => movie.id === movieID).length;
    }
  } catch (error) {
    console.log(error.message);
  }
}

export async function addMovieInFavourites(userID, movie) {
  const docRef = doc(firebaseDB, "favourite-movies", userID);
  try {
    await updateDoc(docRef, {
      movies: arrayUnion(movie),
    });
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

export async function removeMovieFromFavourites(userID, movie) {
  try {
    const docRef = doc(firebaseDB, "favourite-movies", userID);
    await updateDoc(docRef, {
      movies: arrayRemove(movie),
    });
    return true;
  } catch (error) {
    console.log(error.message);
    return false;
  }
}

export function formatDate(releaseDate) {
  if (releaseDate === "") {
    return null;
  }

  const date = new Date(releaseDate);
  return `${date.getDate()} ${date.toLocaleString("en-us", {
    month: "long",
  })} ${date.getFullYear()}`;
}
