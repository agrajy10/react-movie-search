import { useContext } from "react";
import { Link } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { UserContext } from "../lib/context";
import { firebaseAuth } from "../lib/firebase";
import SearchForm from "./SearchForm";

export default function Header({ setIsLoginOpen }) {
  const { user } = useContext(UserContext);
  return (
    <header className="bg-white py-4 shadow">
      <div className="max-w-screen-xl px-4 mx-auto flex md:items-center md:justify-between md:gap-4 flex-wrap">
        <Link
          to="/"
          className="md:order-1 font-bold text-lg text-primary-color text-center block hover:text-gray-900 transition-colors duration-300"
        >
          MovieSearch
        </Link>
        {user ? (
          <div className="md:order-3 ml-auto md:ml-0 flex items-center">
            <Link
              to="/favourites"
              className="text-base mr-5 font-bold bg-secondary-color hover:bg-gray-900 text-white rounded px-4 py-2 transition-colors"
            >
              My favourites
            </Link>
            <button
              className="hover:text-secondary-color transition-colors"
              type="button"
              onClick={() => signOut(firebaseAuth)}
              title="Logout"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsLoginOpen(true)}
            type="button"
            title="Login or Signup"
            className="hover:text-secondary-color w-8 h-8 md:order-3 ml-auto md:ml-0"
            aria-label="Login into your account"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 transition duration-200 ease-in-out"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        )}
        <div className="md:order-2 py-4 md:py-0 flex-shrink lg:w-4/12 md:w-5/12 w-full">
          <SearchForm />
        </div>
      </div>
    </header>
  );
}
