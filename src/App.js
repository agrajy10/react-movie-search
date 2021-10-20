import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ReactQueryDevtools } from "react-query/devtools";
import Footer from "./components/Footer";

import Header from "./components/Header";
import Home from "./components/pages/Home/Home";
import MovieDetails from "./components/pages/MovieDetails/MovieDetails";
import SearchPage from "./components/pages/SearchPage/SearchPage";
import "./styles/style.css";

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
