import { Link } from "react-router-dom";
import { formatDate } from "../utils/utility";
export default function MovieCard({
  id,
  original_title,
  poster_path,
  release_date,
}) {
  return (
    <article className="relative">
      <Link to={`/movie/${id}`} aria-label={original_title}>
        {poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
            className="w-full rounded-md transform transition duration-500 hover:scale-105"
            alt={original_title}
          />
        ) : (
          <img
            src="https://fakeimg.pl/500x750/?text=No%20Poster"
            className="w-full rounded-md transform transition duration-500 hover:scale-105"
            alt={original_title}
          />
        )}
        <div className="pt-4">
          <h3 className="text-gray-900 font-bold text-lg leading-normal">
            {original_title}
          </h3>
          {!!formatDate(release_date) && (
            <span className="text-gray-500 text-sm">
              {formatDate(release_date)}
            </span>
          )}
        </div>
      </Link>
    </article>
  );
}
