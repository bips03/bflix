import React, { useEffect, useState } from "react";
import Plans from "../Plans/Plans";
import Navbar from "../Navbar/Navbar";
import "./Payment.css";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../Alert/Alert";
import { Redirect, useHistory } from "react-router";
import { auth } from "../../firebase";
import logout from "../../actions/logout";
import Loading from "../Loading/Loading";

function Payment() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory()
  const payment = useSelector((state) => state.payment);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  const logoutUser = () => {
    auth.signOut();
    dispatch(logout());
    history.push('/')
  };


  return loading ? (
    <Loading />
  ) : payment ? (
    <Redirect to="/" />
  ) : (
    <div className="payment">
      {console.log(payment)}
      <Navbar showIcon={false} />
      <div className="payment_content">
        {error && <Alert msg={error} />}
        <h1>Choose a plan to proceed.</h1>
        <Plans setError={setError} />
        <button className="payment_btn" onClick={logoutUser}>
          Choose another account?{" "}
        </button>
      </div>
    </div>
  );
}

export default Payment;
