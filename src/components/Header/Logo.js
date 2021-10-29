import { Link } from "react-router-dom";
export default function Logo() {
  return (
    <>
      <Link
        to="/"
        className="md:order-1 font-bold text-lg text-primary-color text-center block hover:text-gray-900 transition-colors duration-300"
      >
        MovieSearch
      </Link>
    </>
  );
}
