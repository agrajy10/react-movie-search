import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useQueryClient } from "react-query";
import { useLocation } from "react-router";
export default function SearchForm() {
  const [value, setValue] = useState("");
  const history = useHistory();
  const queryClient = useQueryClient();
  const location = useLocation();
  function handleSubmit(e) {
    e.preventDefault();
    if (value !== "") {
      history.push(`/search?q=${value}`);
      queryClient.removeQueries("search-movies");
    }
  }

  useEffect(() => {
    if (location.pathname === "/") {
      console.log('---');
      setValue("");
    }
  }, [location.pathname]);

  return (
    <form
      onSubmit={handleSubmit}
      className="md:order-2 relative text-primary-color py-4 md:py-0 flex-shrink lg:w-4/12 md:w-5/12 w-full"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 absolute top-2/4 left-4 transform -translate-y-1/2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        className="w-full h-11 border border-form-field-bg text-sm font-medium bg-form-field-bg rounded-full text-primary-color placeholder-primary-color pr-5 pl-12 outline-none focus:bg-white focus:border-primary-color transition-colors duration-300"
        type="search"
        placeholder="Search any movies or tv shows"
        aria-label="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
}
