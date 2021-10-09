import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const user = useSelector((state) => state.user);
  const payment = useSelector((state) => state.payment);
  return (
    <Route
      {...rest}
      render={(props) => {
        return user ? payment? <Component {...props} /> : <Redirect to = '/payment' />  : <Redirect to="/login" />;
      }}
    ></Route>
  );
}

export default PrivateRoute;
