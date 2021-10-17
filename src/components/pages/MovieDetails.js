import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import Loader from "../Loader";
import {
  formatReleaseDate,
  getMovieDetails,
  getMovieCrew,
  getIMDBRatings,
} from "../../utils/utility";

export default function MovieDetails() {
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
  const imdbID = movieDetails?.imdb_id;

  const {
    data: movieCrew,
    isError: isCrewError,
    isSuccess: isCrewSuccess,
  } = useQuery(["movie-crew", id], () => getMovieCrew(id), {
    enabled: !!id,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const {
    data: imdbRatings,
    isError: isRatingsError,
    isSuccess: isRatingsSuccess,
  } = useQuery(["imdb-ratings", imdbID], () => getIMDBRatings(imdbID), {
    enabled: !!imdbID,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    document.title = isLoading
      ? "Loading..."
      : `${movieDetails.original_title} - Movie Search`;
  }, [movieDetails, isLoading]);
  return (
    <>
      <main className="max-w-screen-xl mx-auto px-4 py-14">
        {isLoading && <Loader />}
        {isError && (
          <div className="px-4 py-3 text-base text-red-600 bg-red-100 rounded-md border border-red-600">
            An error occurred. Try again later.
          </div>
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
              {isRatingsSuccess && (
                <span className="inline-block px-4 py-2 font-bold text-white bg-secondary-color rounded mb-6">
                  {imdbRatings.Rated}
                </span>
              )}

              <button className="inline-flex items-center justify-center bg-gray-900 bg-opacity-7 text-white w-8 h-8 rounded-full absolute lg:top-14 lg:right-14 md:top-10 md:right-10 top-7 right-7 z-10 hover:bg-secondary-color transition-colors ease-in-out duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <h1 className=" text-gray-800 md:text-6xl text-5xl font-bold mb-8">
                {movieDetails.original_title}
              </h1>
              <div className="sm:flex sm:items-center sm:justify-start sm:flex-wrap mb-8">
                {isRatingsSuccess && (
                  <div className="rounded-lg border-gray-300 border inline-flex items-center mr-3 mb-4">
                    <img
                      src="../../imdb.svg"
                      alt=""
                      className="rounded-lg w-11"
                    />
                    <span className="px-4 font-semibold whitespace-nowrap">
                      {imdbRatings.imdbRating === "N/A"
                        ? "N/A"
                        : `${imdbRatings.imdbRating} / 10`}
                    </span>
                  </div>
                )}
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
                  {formatReleaseDate(movieDetails.release_date)}
                </span>
              </div>
              <div className="mb-7">
                <h2 className="text-lg font-bold text-primary-color opacity-90 mb-3">
                  Plot
                </h2>
                <p>{movieDetails.overview}</p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {movieDetails.genres && (
                  <div>
                    <h2 className="text-lg font-bold text-primary-color opacity-90 mb-3">
                      Genres
                    </h2>
                    <ul className="font-medium text-md">
                      {movieDetails.genres.map((genre) => {
                        return (
                          <li className="mb-1" key={genre.id}>
                            {genre.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                {isCrewError && (
                  <div className="px-4 py-3 text-base text-red-600 bg-red-100 rounded-md border border-red-600">
                    An error occurred. Try again later.
                  </div>
                )}
                {isCrewSuccess && (
                  <>
                    <div>
                      <h2 className="text-lg font-bold text-primary-color opacity-90 mb-3">
                        Actors
                      </h2>
                      <ul className="font-medium text-md">
                        {movieCrew.cast.map((actor) => {
                          const imageURL = actor?.profile_path
                            ? `https://image.tmdb.org/t/p/w45${actor.profile_path}`
                            : "https://fakeimg.pl/50x50/";
                          return (
                            <li
                              className="mb-4 flex items-center justify-start"
                              key={actor.id}
                            >
                              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                <img
                                  src={imageURL}
                                  alt={`Actor ${actor.original_name}`}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              {actor.original_name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="col-span-2">
                      <h2 className="text-lg font-bold text-primary-color opacity-90 mb-3">
                        Crew
                      </h2>
                      <ul className="font-medium text-md">
                        {movieCrew.crew.map((crew_member) => {
                          return (
                            <li className="mb-1" key={crew_member.id}>
                              {crew_member.original_name}
                              <span className="opacity-80 text-sm ml-2">
                                ({crew_member.job})
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div>
              <img
                src={`https://image.tmdb.org/t/p/w780${movieDetails.poster_path}`}
                alt=""
                className="w-full rounded-lg"
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
}
