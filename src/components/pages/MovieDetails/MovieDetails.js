import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import Loader from "../../Loader";
import {
  addMovieInFavourites,
  removeMovieFromFavourites,
  formatDate,
  getMovieDetails,
  getMovieRatings,
  isMovieInFavourites,
} from "../../../utils/utility";
import List from "./List";
import SectionHeading from "./SectionHeading";
import IMDBRatings from "./IMDBRatings";
import Alert from "../../Alert";
import FavouriteButton from "./FavouriteButton";
import { AuthContext } from "../../../contexts/authContext";
import MainContainer from "../../MainContainer";

export default function MovieDetails({ openLoginModal }) {
  const [isFavourite, setIsFavourite] = useState(false);
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const {
    data: movieDetails,
    isLoading,
    isError,
    isSuccess,
  } = useQuery(["movie-details", id], () => getMovieDetails(id), {
    enabled: !!id,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  useEffect(() => {
    if (isLoading) {
      document.title = "Loading...";
    } else {
      document.title = isSuccess
        ? `${movieDetails.original_title} - Movie Search`
        : "An error occurred";
    }
  }, [movieDetails, isLoading, isSuccess]);

  useEffect(() => {
    if (user && movieDetails) {
      const favouriteMovieCheck = async () => {
        const isMovieFavourite = await isMovieInFavourites(
          user.uid,
          movieDetails.id
        );
        if (isMovieFavourite) setIsFavourite(true);
      };
      favouriteMovieCheck();
    }
  }, [user, movieDetails]);

  async function toggleFavourite() {
    const data = {
      id: movieDetails.id,
      original_title: movieDetails.original_title,
      release_date: movieDetails.release_date,
      poster_path: movieDetails.poster_path,
    };
    if (!isFavourite) {
      const res = await addMovieInFavourites(user.uid, data);
      if (res) setIsFavourite(true);
    } else {
      const res = await removeMovieFromFavourites(user.uid, data);
      if (res) setIsFavourite(false);
    }
  }

  return (
    <>
      <main>
        <MainContainer className="py-14">
          {isLoading && <Loader />}
          {isError && (
            <Alert className="danger">
              An error occurred. Try again later.
            </Alert>
          )}
          {isSuccess && (
            <div className="relative items-start sm:grid grid-cols-2 gap-7">
              <div className="col-span-2 mb-4 sm:mb-0">
                <Link
                  to="/"
                  className="inline-flex items-center justify-content font-semibold text-primary-color hover:text-gray-900 transition-colors duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back
                </Link>
              </div>
              <div className="relative bg-white rounded-lg overflow-hidden shadow lg:p-14 md:p-10 p-7 mb-4">
                {getMovieRatings(movieDetails.release_dates) && (
                  <span className="inline-block px-4 py-2 font-bold text-white bg-secondary-color rounded mb-6">
                    {getMovieRatings(movieDetails.release_dates)}
                  </span>
                )}
                {user ? (
                  <FavouriteButton
                    handleClick={toggleFavourite}
                    isFavourite={isFavourite}
                    className="absolute lg:top-14 lg:right-14 md:top-10 md:right-10 top-7 right-7 z-10"
                  />
                ) : (
                  <FavouriteButton
                    handleClick={openLoginModal}
                    isFavourite={false}
                    className="absolute lg:top-14 lg:right-14 md:top-10 md:right-10 top-7 right-7 z-10"
                  />
                )}
                <h1 className=" text-gray-800 md:text-6xl text-5xl font-bold mb-8">
                  {movieDetails.original_title}
                </h1>
                <div className="sm:flex sm:items-center sm:justify-start sm:flex-wrap mb-8">
                  {!!movieDetails.vote_average && (
                    <IMDBRatings
                      imdbID={movieDetails.external_ids.imdb_id}
                      vote_average={movieDetails.vote_average}
                    />
                  )}
                  {!!movieDetails.runtime && (
                    <span className="text-primary-color font-semibold flex items-center justify-start mr-4 mb-4 whitespace-nowrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>{" "}
                      {`${movieDetails.runtime} min`}
                    </span>
                  )}
                  {!!movieDetails.release_date && (
                    <span className="text-primary-color font-semibold flex items-center justify-start mr-4 mb-4 whitespace-nowrap">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {formatDate(movieDetails.release_date)}
                    </span>
                  )}
                </div>
                {!!movieDetails.overview && (
                  <div className="mb-7">
                    <SectionHeading>Plot</SectionHeading>
                    <p>{movieDetails.overview}</p>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {!!movieDetails.genres && (
                    <div>
                      <SectionHeading>Genres</SectionHeading>
                      <ul className="font-medium text-md">
                        {movieDetails.genres.map((genre) => {
                          return (
                            <li className="mb-2" key={genre.id}>
                              {genre.name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                  {!!movieDetails.credits.cast && (
                    <div>
                      <SectionHeading>Actors</SectionHeading>
                      <List items={movieDetails.credits.cast} />
                    </div>
                  )}
                  {!!movieDetails.credits.crew && (
                    <div>
                      <SectionHeading>Directors</SectionHeading>
                      <List
                        items={movieDetails.credits.crew.filter(
                          (member) => member.department === "Directing"
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                {movieDetails.poster_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w780${movieDetails.poster_path}`}
                    alt={`Post of movie ${movieDetails.original_title}`}
                    className="w-full rounded-lg"
                  />
                ) : (
                  <img
                    src="https://fakeimg.pl/500x750/?text=No%20Poster"
                    alt={`Post of movie ${movieDetails.original_title}`}
                    className="w-full rounded-lg"
                  />
                )}
              </div>
            </div>
          )}
        </MainContainer>
      </main>
    </>
  );
}
