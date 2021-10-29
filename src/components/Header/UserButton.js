import { Link } from "react-router-dom";
export default function UserButton({ user, signOut, openLoginModal }) {
  return (
    <>
      {user ? (
        <div className="flex items-center">
          <Link
            to="/favourites"
            className="text-base mr-5 font-bold bg-secondary-color hover:bg-gray-900 text-white rounded px-4 py-2 transition-colors"
          >
            My favourites
          </Link>
          <button
            className="hover:text-secondary-color transition-colors"
            type="button"
            onClick={signOut}
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
          type="button"
          onClick={openLoginModal}
          title="Login or Signup"
          className="hover:text-secondary-color w-8 h-8"
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
    </>
  );
}
