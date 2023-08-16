import React, { useContext } from "react";
import classes from "./Welcome.module.css";
import { NavLink } from "react-router-dom";
import { Fragment } from "react";
import AuthContext from "../store/auth-context";

function Welcome() {
  const storedName = localStorage.getItem("enteredName");
  const storedImageUrl = localStorage.getItem("imageUrl");
  const isProfileIncomplete = storedName || storedImageUrl;
  console.log(isProfileIncomplete)

  return (
    <Fragment>
      <div className={classes.main}>
        <div>Welcome to the expense tracker!!!!</div>
        {!isProfileIncomplete && <div className={classes.right}>     
            <div>
              Your profile is incomplete.
              <NavLink to="/welcome/profile">Complete now</NavLink>
            </div>
        </div> }
        <div>Welcome, {storedName}</div>
      </div>
    </Fragment>
  );
}

export default Welcome;
