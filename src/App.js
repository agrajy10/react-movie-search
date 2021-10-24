import { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home/Home";
import MovieDetails from "./components/pages/MovieDetails/MovieDetails";
import SearchPage from "./components/pages/SearchPage/SearchPage";
import "./styles/style.css";
import PersonDetails from "./components/pages/PersonDetails/PersonDetails";
import Modal from "./components/Modal";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

function App() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  return (
    <Router>
      <div className="App">
        <Header setIsLoginOpen={setIsLoginOpen} />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/movie/:id">
            <MovieDetails />
          </Route>
          <Route path="/person/:id">
            <PersonDetails />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
        </Switch>
        <Footer />
        <Modal open={isLoginOpen} close={() => setIsLoginOpen(false)}>
          <LoginForm openSignupModal={() => setIsSignupOpen(true)} closeLoginModal={() => setIsLoginOpen(false)} />
        </Modal>
        <Modal open={isSignupOpen} close={() => setIsSignupOpen(false)}>
          <SignupForm closeSignupModal={() => setIsSignupOpen(false)} openLoginModal={() => setIsLoginOpen(true)} />
        </Modal>
      </div>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </Router>
  );
}

export default App;
