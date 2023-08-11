import React from "react";
import classes from "./Welcome.module.css";
import { NavLink } from "react-router-dom"; // Import NavLink
import { Fragment } from "react";

function Welcome() {
  return (
    <Fragment>
      <div className={classes.main}>
        <div>Welcome to expense tracker!!!!</div>
        <div className={classes.right}>
          Your profile is incomplete.
          <NavLink to="/welcome/profile">Complete now</NavLink>
        </div>
      </div>
    </Fragment>
  );
}

export default Welcome;
