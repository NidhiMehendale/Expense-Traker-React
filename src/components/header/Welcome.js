import React, { } from "react";
import classes from "./Welcome.module.css";
import { NavLink ,useHistory} from "react-router-dom";
import { Fragment } from "react";


function Welcome() {
  const history = useHistory();

  const storedName = localStorage.getItem("enteredName");
  const storedImageUrl = localStorage.getItem("imageUrl");
  const isProfileIncomplete = storedName || storedImageUrl;
  console.log(isProfileIncomplete)

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('enteredName');
    localStorage.removeItem('imageUrl');
    history.replace('/signup');
  };

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
       {isProfileIncomplete && <div>Welcome, {storedName}</div>}
       <button className={classes.logout} onClick={logoutHandler}>Logout</button>
      </div>
    </Fragment>
  );
}

export default Welcome;
