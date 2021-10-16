import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../Loader";
import { formatReleaseDate } from "../../utils/utility";

async function getMovieDetails(movieID) {
  const { data } = await axios(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`
  );
  return data;
}

export default function MovieDetails() {
  const { id } = useParams();
  const { data, isLoading, isError, isSuccess } = useQuery(
    ["movie-details", id],
    () => getMovieDetails(id),
    {
      enabled: !!id,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );
  useEffect(() => {
    document.title = isLoading
      ? "Loading..."
      : `${data.original_title} - Movie Search`;
  }, [data]);
  return (
    <>
      <main className="max-w-screen-xl min-h-screen mx-auto px-4 py-14">
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
              <span className="inline-block px-4 py-2 font-bold text-white bg-secondary-color rounded mb-6">
                PG - 13
              </span>
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
                {data.original_title}
              </h1>
              <div className="sm:flex sm:items-center sm:justify-start sm:flex-wrap mb-8">
                <div className="rounded-lg border-gray-300 border inline-flex items-center mr-3 mb-4">
                  <img
                    src="../../imdb.svg"
                    alt=""
                    className="rounded-lg w-11"
                  />
                  <span className="px-4 font-semibold whitespace-nowrap">
                    7.7 / 10
                  </span>
                </div>
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
                  {`${data.runtime} min`}
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
                  {formatReleaseDate(data.release_date)}
                </span>
              </div>
              <div className="mb-7">
                <h2 className="text-lg font-bold text-primary-color opacity-90 mb-3">
                  Plot
                </h2>
                <p>{data.overview}</p>
              </div>
              <div className="md:grid grid-cols-2 gap-4">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-lg font-bold text-primary-color opacity-90 mb-2">
                    Actors
                  </h2>
                  <ul className="text-sm">
                    <li className="flex items-center justify-start font-medium mb-2">
                      <div className="w-9 h-9 rounded-full overflow-hidden mr-2">
                        <img
                          src="https://image.tmdb.org/t/p/w45//4SYTH5FdB0dAORV98Nwg3llgVnY.jpg"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      Ryan Reynolds
                    </li>
                    <li className="flex items-center justify-start font-medium mb-2">
                      <div className="w-9 h-9 rounded-full overflow-hidden mr-2">
                        <img
                          src="https://image.tmdb.org/t/p/w45//va8pcuzXodVLYUQLjB1USZVB6gz.jpg"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      Jodie Comer
                    </li>
                  </ul>
                </div>
                {data.genres && (
                  <div className="mb-6 md:mb-0">
                    <h2 className="text-lg font-bold text-primary-color opacity-90 mb-2">
                      Genres
                    </h2>
                    <ul className="text-sm font-medium">
                      {data.genres.map((gener) => {
                        return (
                          <li key={gener.id} className="mb-2">
                            {gener.name}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                <div className="mb-6 md:mb-0">
                  <h2 className="text-lg font-bold text-primary-color opacity-90 mb-2">
                    Directors
                  </h2>
                  <ul className="text-sm">
                    <li className="flex items-center justify-start font-medium mb-2">
                      <div className="w-9 h-9 rounded-full overflow-hidden mr-2">
                        <img
                          src="https://image.tmdb.org/t/p/w45//5PJWCWlKF3kJWOHSqs7l7M7nZK9.jpg"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      Josh McLaglen
                    </li>
                    <li className="flex items-center justify-start font-medium mb-2">
                      <div className="w-9 h-9 rounded-full overflow-hidden mr-2">
                        <img
                          src="https://image.tmdb.org/t/p/w45//b1ulkCHz8biG87LjLQQiMCebEZo.jpg"
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      Shawn Levy
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <img
                src={`https://image.tmdb.org/t/p/w780${data.poster_path}`}
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
