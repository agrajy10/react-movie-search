import { useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { AuthContext } from "../../../contexts/authContext";
import { firebaseDB } from "../../../lib/firebase";
import MovieCard from "../../MovieCard";
import Loader from "../../Loader";
import MainContainer from "../../MainContainer";
export default function Favourites() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, isUserLoading } = useContext(AuthContext);
  const [userMovies, setUserMovies] = useState([]);
  useEffect(() => {
    console.log("---");
    if (user) {
      async function getMovies() {
        const docRef = doc(firebaseDB, "favourite-movies", user.uid);
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const movies = docSnap.data().movies;
            if (movies.length) setUserMovies(movies);
            setIsLoading(false);
          }
        } catch (error) {
          console.log(error.message);
        }
      }
      getMovies();
    }
  }, [user, isUserLoading]);
  return (
    <main>
      <MainContainer className="py-14">
        {isLoading && <Loader />}
        {!!userMovies.length && (
          <div className="grid grid-cols-2 xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 md:gap-4 gap-2">
            {userMovies.map((movie) => {
              return <MovieCard {...movie} key={movie.id} />;
            })}
          </div>
        )}
      </MainContainer>
    </main>
  );
}
