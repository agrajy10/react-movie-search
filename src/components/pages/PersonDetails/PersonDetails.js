import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { getPersonDetails } from "../../../utils/utility";
import Loader from "../../Loader";
import MovieCard from "../../MovieCard";
import Pagination from "./Pagination";
import PersonCard from "./PersonCard";

export default function PersonDetails() {
  const [creditType, setCreditType] = useState("cast");
  const [postsPerPage] = useState(16);
  const [currentPage, setCurrentPage] = useState(1);
  let currentPosts, indexOfFirstPost, indexOfLastPost;
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
    setCurrentPage(1);
  }

  if (isSuccess) {
    indexOfLastPost = postsPerPage * currentPage;
    indexOfFirstPost = indexOfLastPost - postsPerPage;
    if (creditType === "cast") {
      currentPosts = personDetails.movie_credits.cast.slice(
        indexOfFirstPost,
        indexOfLastPost
      );
    } else {
      currentPosts = personDetails.movie_credits.crew.slice(
        indexOfFirstPost,
        indexOfLastPost
      );
    }
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
            <PersonCard {...personDetails} />
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
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {currentPosts.map((movie) => {
                return <MovieCard key={movie.id} {...movie} />;
              })}
            </div>
            <div className="text-center">
              {creditType === "cast" ? (
                <Pagination
                  totalPosts={personDetails.movie_credits.cast.length}
                  postsPerPage={postsPerPage}
                  currentPage={currentPage}
                  paginate={setCurrentPage}
                />
              ) : (
                <Pagination
                  totalPosts={personDetails.movie_credits.crew.length}
                  postsPerPage={postsPerPage}
                  currentPage={currentPage}
                  paginate={setCurrentPage}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
