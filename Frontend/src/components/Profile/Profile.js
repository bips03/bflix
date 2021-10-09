import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../firebase";
import Navbar from "../Navbar/Navbar";
import Alert from '../Alert/Alert'
import logout from "../../actions/logout";
import "./Profile.css";
import { useHistory } from "react-router";
import Plans from "../Plans/Plans";


function Profile() {
  const user = useSelector((state) => state.user);
  const [error,setError] = useState('')
  const dispatch = useDispatch();
  const history = useHistory();
  const logoutUser = (e) => {
    auth.signOut();
    dispatch(logout());
    history.push("/login");
  };

  return (
    <div className="profile">
      <Navbar showIcon = {false} />
      <div className="profile_body">
        {error && <Alert msg={error} />}
        <h1>Edit Profile</h1>
        <div className="profile_info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt="avatar"
          />
          <div className="profile_details">
            <h2>Account email : {user.email}</h2>
            <div className="profile_plans">
              <Plans setError={setError} />
              <button className="profile_logout box_btn" onClick={logoutUser}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
