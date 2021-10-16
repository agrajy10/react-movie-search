import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../Loader";
import MovieCard from "../MovieCard";
import { useEffect } from "react";

async function getMovies() {
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&page=1`
  );
  return data;
}

export default function Home() {
  const { isLoading, isSuccess, isError, data } = useQuery(
    "movies",
    getMovies,
    {
      retry: false,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    document.title = "Movie Search";
  }, []);

  return (
    <>
      <main className="min-h-screen px-4 py-14 max-w-screen-xl mx-auto">
        {isLoading && <Loader />}
        {isError && (
          <div className="px-4 py-3 text-base text-red-600 bg-red-100 rounded-md border border-red-600">
            An error occurred. Try again later.
          </div>
        )}
        {isSuccess && (
          <div className="grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 md:gap-4 gap-2">
            {data.results.map((movie) => {
              return <MovieCard key={movie.id} {...movie} />;
            })}
          </div>
        )}
      </main>
    </>
  );
}
