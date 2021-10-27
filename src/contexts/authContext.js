import { useState, createContext } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { firebaseAuth } from "../lib/firebase";
import { getUserMovies } from "../utils/utility";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLoading, setisUserLoading] = useState(true);

  onAuthStateChanged(firebaseAuth, async (user) => {
    if (user) {
      setUser(user);
      setisUserLoading(false);
    } else {
      setUser(null);
    }
  });
  return (
    <AuthContext.Provider value={{ user, isUserLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
