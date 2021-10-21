import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { formatDate, getPersonDetails } from "../../../utils/utility";
import Loader from "../../Loader";
import MovieCard from "../../MovieCard";
import Info from "./Info";
export default function PersonDetails() {
  const [creditType, setCreditType] = useState("cast");
  const { id: personID } = useParams();
  const {
    data: personDetails,
    isLoading,
    isSuccess,
    isError,
  } = useQuery(["person-details", personID], () => getPersonDetails(personID), {
    refetchOnWindowFocus: false,
    refetchOnmount: false,
    refetchOnReconnect: false,
    enabled: !!personID,
    retry: false,
    staleTime: Infinity,
  });
  function handleChange(e) {
    setCreditType(e.target.value);
  }
  return (
    <main className="max-w-screen-xl mx-auto px-4 py-14">
      {isLoading && <Loader />}
      {isError && (
        <div className="px-4 py-3 text-base text-red-600 bg-red-100 rounded-md border border-red-600">
          An error occurred. Try again later.
        </div>
      )}
      {isSuccess && (
        <div className="grid grid-cols-12 gap-6 items-start">
          <aside className="col-span-12 lg:col-span-4 md:col-span-5 sm:col-span-6 bg-white rounded-lg overflow-hidden shadow text-gray-600 text-sm">
            <div className="h-96 w-full mb-3">
              {personDetails.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${personDetails.profile_path}`}
                  alt={personDetails.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="https://fakeimg.pl/450x450/"
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <div className="p-5">
              <h1 className="text-primary-color text-3xl font-bold mb-3">
                {personDetails.name}
              </h1>
              {!!personDetails.birthday && (
                <p className="mb-3 text-base">
                  Date of birth : {formatDate(personDetails.birthday)}
                </p>
              )}
              {!!personDetails.biography && (
                <Info biography={personDetails.biography} />
              )}
            </div>
          </aside>
          <div className="col-span-12 lg:col-span-8 md:col-span-7 sm:col-span-6">
            <div className="text-right">
              <select
                value={creditType}
                onChange={handleChange}
                aria-label="Movie credit type"
                className="w-36 ml-auto bg-transparent border-primary-color border font-bold rounded p-2 text-sm mb-4 focus:outline-none focus:ring-1 focus:ring-primary-color"
              >
                <option value="cast">Acted on</option>
                <option value="crew">Directed</option>
              </select>
            </div>
            {creditType === "cast" ? (
              personDetails.movie_credits.cast.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {personDetails.movie_credits.cast.map((movie) => {
                    return <MovieCard key={movie.id} {...movie} />;
                  })}
                </div>
              ) : (
                <p className="px-4 py-3  text-blue-600 bg-blue-100 rounded-md border border-blue-600">
                  No movies to show
                </p>
              )
            ) : personDetails.movie_credits.crew.length > 0 ? (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {personDetails.movie_credits.crew.map((movie) => {
                  return <MovieCard key={movie.id} {...movie} />;
                })}
              </div>
            ) : (
              <p className="px-4 py-3  text-blue-600 bg-blue-100 rounded-md border border-blue-600">
                No movies to show
              </p>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
