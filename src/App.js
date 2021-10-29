import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/pages/Home/Home";
import MovieDetails from "./components/pages/MovieDetails/MovieDetails";
import SearchPage from "./components/pages/SearchPage/SearchPage";
import "./styles/style.css";
import PersonDetails from "./components/pages/PersonDetails/PersonDetails";
import Favourites from "./components/pages/Favourites/Favourites";
import PrivateRoute from "./components/PrivateRoute";
import Modal from "./components/Modal";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

function App() {
  const [loginModal, setLoginModal] = useState(false);
  const [signupModal, setIssignupModal] = useState(false);
  const closeLoginModal = () => setLoginModal(false);
  const openLoginModal = () => setLoginModal(true);
  const closeSignupModal = () => setIssignupModal(false);
  const openSignupModal = () => setIssignupModal(true);
  return (
    <Router>
      <div className="App">
        <Header openLoginModal={openLoginModal} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/movie/:id">
            <MovieDetails openLoginModal={openLoginModal} />
          </Route>
          <Route path="/person/:id">
            <PersonDetails />
          </Route>
          <PrivateRoute component={Favourites} path="/favourites" />
          <Route path="/search">
            <SearchPage />
          </Route>
        </Switch>
        <Footer />
        <Modal open={loginModal} close={closeLoginModal}>
          <LoginForm
            openSignupModal={openSignupModal}
            closeLoginModal={closeLoginModal}
          />
        </Modal>
        <Modal open={signupModal} close={closeSignupModal}>
          <SignupForm
            closeSignupModal={closeSignupModal}
            openLoginModal={openLoginModal}
          />
        </Modal>
      </div>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </Router>
  );
}

export default App;
