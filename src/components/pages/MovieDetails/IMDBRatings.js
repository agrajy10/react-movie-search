export default function IMDBRatings({ imdbID, vote_average }) {
  return (
    <a
      href={`https://imdb.com/title/${imdbID}/`}
      className="rounded-lg border-gray-300 border inline-flex items-center mr-3 mb-4"
    >
      <img src="../../imdb.svg" alt="" className="rounded-lg w-11" />
      <span className="px-4 font-semibold whitespace-nowrap">
        {`${vote_average}/10`}
      </span>
    </a>
  );
}
