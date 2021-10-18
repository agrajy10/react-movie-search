import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import Loader from "../../Loader";
import {
  formatReleaseDate,
  getMovieDetails,
  getMovieRatings,
} from "../../../utils/utility";

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

  useEffect(() => {
    document.title = isLoading
      ? "Loading..."
      : `${movieDetails.original_title} - Movie Search`;
  }, [movieDetails, isLoading]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

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
              {getMovieRatings(movieDetails.release_dates) && (
                <span className="inline-block px-4 py-2 font-bold text-white bg-secondary-color rounded mb-6">
                  {getMovieRatings(movieDetails.release_dates)}
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
                {movieDetails.vote_average && (
                  <a
                    href={`https://imdb.com/title/${movieDetails.external_ids.imdb_id}/`}
                    className="rounded-lg border-gray-300 border inline-flex items-center mr-3 mb-4"
                  >
                    <img
                      src="../../imdb.svg"
                      alt=""
                      className="rounded-lg w-11"
                    />
                    <span className="px-4 font-semibold whitespace-nowrap">
                      {`${movieDetails.vote_average}/10`}
                    </span>
                  </a>
                )}
                {movieDetails.runtime && (
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
                {movieDetails.release_date && (
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
                )}
              </div>
              {movieDetails.overview && (
                <div className="mb-7">
                  <h2 className="text-lg font-bold text-primary-color opacity-90 mb-3">
                    Plot
                  </h2>
                  <p>{movieDetails.overview}</p>
                </div>
              )}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {movieDetails.genres.length && (
                  <div>
                    <h2 className="text-lg font-bold text-primary-color opacity-90 mb-3">
                      Genres
                    </h2>
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
                {movieDetails.credits.cast.length && (
                  <div>
                    <h2 className="text-lg font-bold text-primary-color opacity-90 mb-3">
                      Actors
                    </h2>
                    <ul className="font-medium text-md">
                      {movieDetails.credits.cast.map((actor) => {
                        const imageURL = actor.profile_path
                          ? `https://image.tmdb.org/t/p/w45${actor.profile_path}`
                          : "";
                        return (
                          <li
                            className="mb-4 flex items-center justify-start"
                            key={actor.id}
                          >
                            {imageURL && (
                              <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                <img
                                  src={imageURL}
                                  alt={`Actor ${actor.original_name}`}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            )}
                            {actor.original_name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                {movieDetails.credits.crew.length && (
                  <div>
                    <h2 className="text-lg font-bold text-primary-color opacity-90 mb-3">
                      Directors
                    </h2>
                    <ul className="font-medium text-md">
                      {movieDetails.credits.crew
                        .filter((member) => member.department === "Directing")
                        .map((member) => {
                          const imageURL = member.profile_path
                            ? `https://image.tmdb.org/t/p/w45${member.profile_path}`
                            : "";
                          return (
                            <li
                              className="mb-4 flex items-center justify-start"
                              key={member.id}
                            >
                              {imageURL && (
                                <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                                  <img
                                    src={imageURL}
                                    alt={`Actor ${member.original_name}`}
                                    className="object-cover w-full h-full"
                                  />
                                </div>
                              )}
                              {member.name}
                            </li>
                          );
                        })}
                    </ul>
                  </div>
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
