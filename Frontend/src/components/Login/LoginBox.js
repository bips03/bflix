import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import Alert from "../Alert/Alert";
import "./LoginBox.css";


function LoginBox({ setShowLogin }) {

  
  const history = useHistory()
  const emailRef = useRef();
  const pwRef = useRef();
  const [error, setError] = useState("");
  const [loadBtn,setLoadBtn] = useState(false)

  const loginUser = async (e) => {
    e.preventDefault();
    setError('')
    setLoadBtn(true)

    if (emailRef.current.value === "" || pwRef.current.value === ""){
      setError("Error! Field is empty.");
      setLoadBtn(false)
      return;
    }

    try {
      await auth.signInWithEmailAndPassword(
        emailRef.current.value,
        pwRef.current.value
      );
      history.push('/')
    } catch (error) {
      setError(error.message);
    }

    setLoadBtn(false)
  };
  return (
    <div className="login_content loginBox_content">
      <form className="box_content" onSubmit={loginUser}>
        {error && <Alert msg={error} />}
        <h1>Sign in</h1>
        <input
          className="box_email"
          ref={emailRef}
          placeholder="Email"
          type="email"
        />
        <input
          className="box_pw"
          ref={pwRef}
          placeholder="Password"
          type="password"
        />
        <button disabled = {loadBtn} className="box_btn" type="submit">
          Sign In
        </button>
      </form>
      <h4 className="box_link">
        <span style={{ color: "gray" }}>New to Netflix? </span>
        <span onClick={() => setShowLogin(false)} className="span_link">
          Sign Up
        </span>
      </h4>
    </div>
  );
}

export default React.memo(LoginBox);
