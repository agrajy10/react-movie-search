import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/pages/Home/Home";
import MovieDetails from "./components/pages/MovieDetails/MovieDetails";
import SearchPage from "./components/pages/SearchPage/SearchPage";
import "./styles/style.css";
import PersonDetails from "./components/pages/PersonDetails/PersonDetails";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
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
      </div>
      <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
    </Router>
  );
}

export default App;
