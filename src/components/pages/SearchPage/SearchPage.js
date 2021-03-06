import { useEffect } from "react";
import { useLocation } from "react-router";
import { useInfiniteQuery } from "react-query";
import { getSearchQuery, getSearchMovies } from "../../../utils/utility";
import Loader from "../../Loader";
import MovieCard from "../../MovieCard";
import Alert from "../../Alert";
import MainContainer from "../../MainContainer";

export default function SearchPage() {
  const { search } = useLocation();
  const searchQuery = getSearchQuery(search);

  const {
    isLoading,
    isSuccess,
    isError,
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    "search-movies",
    ({ pageParam = 1, query = searchQuery }) =>
      getSearchMovies(pageParam, query),
    {
      enabled: !!searchQuery,
      retry: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      getNextPageParam: (lastPage) => {
        if (lastPage.page !== lastPage.total_pages) {
          return lastPage.page + 1;
        }
        return undefined;
      },
    }
  );

  useEffect(() => {
    document.title = `Search results - ${searchQuery}`;
  }, [searchQuery]);

  return (
    <main>
      <MainContainer className="min-h-screen py-14">
        {isLoading && <Loader />}
        {isError && (
          <Alert className="danger">An error occurred. Try again later.</Alert>
        )}
        {isSuccess &&
          (data.pages[0].total_results === 0 ? (
            <Alert className="danger">
              No results found. Try a different keyword
            </Alert>
          ) : (
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
                  className={`block mt-8 mx-auto bg-secondary-color text-white font-bold rounded px-7 py-3 hover:bg-primary-color transition-colors duration-300 ${
                    isFetchingNextPage ? "opacity-60" : ""
                  }`}
                >
                  {isFetchingNextPage ? "Loading...." : "Load more"}
                </button>
              )}
            </>
          ))}
      </MainContainer>
    </main>
  );
}
