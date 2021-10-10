import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function UserRoute({ component: Component, ...rest }) {
  const user = useSelector((state) => state.user);
  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    ></Route>
  );
}

export default UserRoute;
