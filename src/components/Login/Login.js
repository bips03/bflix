import React, { useRef, useState } from "react";
import LoginBox from "./LoginBox";
import Signup from "./Signup";
import "./Login.css";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

function Login() {
  const newUserRef = useRef();
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [error, setError] = useState(false);

  const user = useSelector((state) => state.user);
  const payment = useSelector((state) => state.payment);
  const signUp = (e) => {
    e.preventDefault();
    if (newUserRef.current.value === "") {
      setError(true);
      return;
    }
    setShowSignup(true);
  };

  const loginUser = (e) => {
    setShowLogin(true);
  };
  return user ? (
    payment ? (
      <Redirect to="/payment" />
    ) : (
      <Redirect to="/" />
    )
  ) : (
    <div className="login">
      <div className="login_nav">
        <img
          className="login_navlogo"
          src="https://www.freepnglogos.com/uploads/netflix-logo-text-emblem-31.png"
          alt="logo"
        />
        {!showLogin
          ? !showSignup && (
              <button onClick={loginUser} className="login_btn">
                Sign In
              </button>
            )
          : ""}
      </div>

      <div className="bg_gradient" />

      {showLogin ? (
        <LoginBox setShowLogin={setShowLogin} />
      ) : showSignup ? (
        <Signup
          newUser={newUserRef.current.value}
          setShowSignup={setShowSignup}
        />
      ) : (
        <div className="login_content">
          <>
            <h1>Unlimited movies, TV shows and more.</h1>
            <h2>Watch anywhere. Cancel anytime.</h2>
            <p>
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>
            <form className="login_invite" onSubmit={signUp}>
              <input
                className="invite_email"
                placeholder="Email address"
                type="text"
                ref={newUserRef}
              />
              <button type="submit" className="invite_btn">
                Get Started {">"}
              </button>
            </form>
            {error && (
              <p
                style={{
                  fontSize: "14px",
                  textAlign: "start",
                  color: "#e50914",
                  marginBottom: "0px",
                  paddingTop: "5px",
                }}
              >
                Email is required
              </p>
            )}
          </>
        </div>
      )}
    </div>
  );
}

export default React.memo(Login);
