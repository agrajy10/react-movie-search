import Alert from "../../Alert";
export default function Pagination({
  currentPage,
  postsPerPage,
  totalPosts,
  paginate,
}) {
  const pageNumbers = [];

  if (totalPosts > 0) {
    for (let i = 1; i < Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <ul className="mt-9 inline-flex items-center justify-center flex-wrap bg-white rounded overflow-hidden shadow">
        {pageNumbers.map((number) => {
          return (
            <li key={number}>
              <a
                onClick={() => paginate(number)}
                className={`inline-block px-3 py-2 font-medium transition-colors duration-300 ${
                  currentPage === number
                    ? "bg-secondary-color text-white pointer-events-none"
                    : "text-primary-color hover:bg-gray-300"
                }`}
                href="#!"
              >
                {number}
              </a>
            </li>
          );
        })}
      </ul>
    );
  }

  return <Alert className="info">No movies to show</Alert>;
}
