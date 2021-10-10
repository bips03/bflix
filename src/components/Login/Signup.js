import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import Alert from "../Alert/Alert";

function Signup({ newUser, setShowSignup }) {
  let history = useHistory();
  const pwRef = useRef();
  const confPw = useRef();
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const signUp = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setError("");

    if (pwRef.current.value !== confPw.current.value) {
      setError("Credentials not matching");
      setDisabled(false);
      return;
    }

    try {
      await auth.createUserWithEmailAndPassword(newUser, pwRef.current.value);

      history.push("/payment");
    } catch (error) {
      setError(error.message);
    }

    setDisabled(false);
  };
  return (
    <div className="login_content loginBox_content">
      <form className="box_content" onSubmit={signUp}>
        {error && <Alert msg={error} />}
        <h1>Sign Up</h1>
        <input
          readOnly={true}
          className="box_email"
          value={newUser}
          type="email"
        />
        <input
          className="box_pw"
          ref={pwRef}
          placeholder="Enter Password"
          type="password"
        />
        <input
          className="box_pw"
          ref={confPw}
          placeholder="Confirm Password"
          type="password"
        />
        <button disabled={disabled} className="box_btn" type="submit">
          Sign Up
        </button>
        <button className="box_btn" onClick = {() => setShowSignup(false)}>
          Go Back
        </button>
      </form>
      <h4 className="box_link">
        <span style={{ color: "gray" }}>Already have an account? </span>
        <span onClick={() => setShowSignup(false)} className="span_link">
          Sign In
        </span>
      </h4>
    </div>
  );
}

export default React.memo(Signup);
