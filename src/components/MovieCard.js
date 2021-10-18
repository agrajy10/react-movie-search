import { Link } from "react-router-dom";
import { formatReleaseDate } from "../utils/utility";
export default function MovieCard({
  id,
  original_title,
  poster_path,
  release_date,
}) {
  return (
    <article className="relative">
      <Link to={`/movie/${id}`} aria-label={original_title}>
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          className="w-full rounded-md transform transition duration-500 hover:scale-105"
          alt={original_title}
        />
        <div className="pt-4">
          <h3 className="text-gray-900 font-bold text-lg leading-normal">
            {original_title}
          </h3>
          <span className="text-gray-500 text-sm">
            {formatReleaseDate(release_date)}
          </span>
        </div>
      </Link>
      <button className="inline-flex items-center justify-center bg-gray-900 bg-opacity-7 text-white w-8 h-8 rounded-full absolute top-3 right-3 z-10 hover:bg-secondary-color transition-colors ease-in-out duration-300">
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
    </article>
  );
}
