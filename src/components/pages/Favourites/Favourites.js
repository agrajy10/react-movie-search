import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../../contexts/authContext";
import { firebaseDB } from "../../../lib/firebase";
import Alert from "../../Alert";
import FavouriteMovieCard from "./FavouriteMovieCard";
import Loader from "../../Loader";
import MainContainer from "../../MainContainer";

export default function Favourites() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isUserLoading } = useContext(AuthContext);
  const [userMovies, setUserMovies] = useState([]);

  useEffect(() => {
    let unsub;
    if (user) {
      async function getMovies() {
        try {
          unsub = onSnapshot(
            doc(firebaseDB, "favourite-movies", user.uid),
            (doc) => {
              const movies = doc.data().movies;
              setUserMovies(movies);
              setIsLoading(false);
            }
          );
        } catch (error) {
          console.log(error.message);
        }
      }
      getMovies();
    }
    return () => {
      unsub();
    };
  }, [user, isUserLoading]);

  return (
    <main>
      <MainContainer className="py-14 min-h-screen">
        {isLoading && <Loader />}
        {!!userMovies.length ? (
          <div className="grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 md:gap-4 gap-2">
            {userMovies.map((movie) => {
              return (
                <FavouriteMovieCard
                  userID={user.uid}
                  {...movie}
                  key={movie.id}
                />
              );
            })}
          </div>
        ) : (
          <Alert className="info">You have no movies in favourites</Alert>
        )}
      </MainContainer>
    </main>
  );
}
