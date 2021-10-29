import { useContext, useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { useQueryClient } from "react-query";
import { AuthContext } from "../../contexts/authContext";
import { firebaseAuth } from "../../lib/firebase";
import SearchForm from "../Header/SearchForm";
import Logo from "./Logo";
import UserButton from "./UserButton";
import MainContainer from "../MainContainer";

export default function Header({ openLoginModal }) {
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState("");
  const history = useHistory();
  const location = useLocation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (location.pathname === "/") {
      setValue("");
    }
  }, [location.pathname]);

  function handleSubmit(e) {
    e.preventDefault();
    if (value !== "") {
      history.push(`/search?q=${value}`);
      queryClient.removeQueries("search-movies");
    }
  }

  return (
    <header className="bg-white py-4 shadow">
      <MainContainer className="flex md:items-center md:justify-between md:gap-4 flex-wrap">
        <Logo />
        <div className="md:order-3 ml-auto md:ml-0">
          <UserButton
            user={user}
            signOut={() => signOut(firebaseAuth)}
            openLoginModal={openLoginModal}
          />
        </div>
        <div className="md:order-2 py-4 md:py-0 flex-shrink lg:w-4/12 md:w-5/12 w-full">
          <SearchForm
            value={value}
            handleChange={(e) => setValue(e.target.value)}
            handleSubmit={handleSubmit}
          />
        </div>
      </MainContainer>
    </header>
  );
}
