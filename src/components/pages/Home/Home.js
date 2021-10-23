import { useInfiniteQuery } from "react-query";
import Loader from "../../Loader";
import MovieCard from "../../MovieCard";
import { useEffect } from "react";
import { getMovies } from "../../../utils/utility";

export default function Home() {
  const {
    isLoading,
    isSuccess,
    isError,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery("movies", getMovies, {
    retry: false,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    getNextPageParam: (lastPage) => {
      if (lastPage.page !== lastPage.total_pages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  useEffect(() => {
    document.title = "Movie Search";
  }, []);

  return (
    <>
      <main className="px-4 py-14 max-w-screen-xl mx-auto">
        {isLoading && <Loader />}
        {isError && (
          <div className="px-4 py-3 text-base text-red-600 bg-red-100 rounded-md border border-red-600">
            An error occurred. Try again later.
          </div>
        )}
        {isSuccess && (
          <>
            <div className="grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 md:gap-4 gap-2">
              {data.pages.map((page) => {
                return page.results.map((movie) => {
                  return <MovieCard key={movie.id} {...movie} />;
                });
              })}
            </div>
            {hasNextPage && (
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className={`block mt-8 mx-auto bg-secondary-color text-white font-bold rounded px-7 py-3 hover:bg-gray-900 transition-colors duration-300 ${
                  isFetchingNextPage ? "opacity-60" : ""
                }`}
              >
                {isFetchingNextPage ? "Loading...." : "Load more"}
              </button>
            )}
          </>
        )}
      </main>
    </>
  );
}
