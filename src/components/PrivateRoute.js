import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { Route, Redirect } from "react-router-dom";
export default function PrivateRoute({ component: Component, ...rest }) {
  const { user, isUserLoading } = useContext(AuthContext);
  if (!isUserLoading) {
    return (
      <Route
        {...rest}
        render={(props) => {
          return user ? <Component {...props} /> : <Redirect to="/" />;
        }}
      ></Route>
    );
  }
  return null;
}
