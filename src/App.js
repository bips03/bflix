import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Homescreen from "./components/Homescreen/Homescreen";
import Payment from "./components/Payment/Payment";
import PrivateRoute from "./PrivateRoute";
import UserRoute from './UserRoute';
import Player from "./components/Player/Player";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import { useDispatch } from "react-redux";
import login from "./actions/login";
import { subscribePlan } from "./actions/subscribePlan";
import { unsubscribePlan } from "./actions/unsubscribePlan";
import { auth } from "./firebase";
import db from "./firebase";
import Loading from "./components/Loading/Loading";
import Unavailable from "./components/Unavailable/Unavailable";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cleanup = auth.onAuthStateChanged((user) => {
      const loadData = async () => {
        dispatch(login(user));
        //user exists so fetch data and get in global state on loading

        if (user) {
          try {
            const snapshot = await db
              .collection("payments")
              .doc(user.uid)
              .get();
            const paymentData = snapshot.data();
            dispatch(subscribePlan(paymentData));

            setTimeout(() => {
              setLoading(false);
            }, 1500);
          } catch (error) {
            console.log(error.message);
          }
        } else {
          dispatch(unsubscribePlan());
          setLoading(false);
        }
      };

      loadData();
    });
    return cleanup;
  }, [dispatch]);

  return (
    loading? <Loading /> : (
      <div className="app">
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Homescreen} />
            <Route path="/login" component={Login} />
            <UserRoute path="/payment" component={Payment} />
            <PrivateRoute path='/play' component={Player} />
            <PrivateRoute path="/profile" component={Profile} />
            <Route path="*" component={Unavailable} />
          </Switch>
        </Router>
      </div>
    )
  );
}

export default React.memo(App);
