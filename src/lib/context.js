import { useState, createContext } from "react";
import { onAuthStateChanged } from "@firebase/auth";
import { firebaseAuth } from "./firebase";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isUserLoading, setisUserLoading] = useState(true);
  onAuthStateChanged(firebaseAuth, (user) => {
    if (user) {
      setUser(user);
      setisUserLoading(false);
    } else {
      setUser(null);
    }
  });
  return (
    <UserContext.Provider value={{ user, isUserLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
