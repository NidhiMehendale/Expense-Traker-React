import React, { useRef } from "react";
import classes from './Profile.module.css';
import AuthContext from "../store/auth-context";
import { useContext } from "react";

function Profile() {
  const inputNameRef = useRef();
  const inputProfileRef = useRef();

  const ctx = useContext(AuthContext);
console.log('ctx.idtoken',ctx.idtoken)
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = inputNameRef.current.value;
    const enteredProfile = inputProfileRef.current.value;

    //optional:add validation

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAjnoOONhbal4-8ybz17138o-5U25hPyxM",
      {
        method: "POST",
        body: JSON.stringify({
          idToken: ctx.idToken,
          displayName: enteredName,
          photoUrl: enteredProfile,
          returnSecureToken: true,
        }),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            console.log(data);
            if (data.error.message) {
              alert(data.error.message);
            }
          });
        }
      })
      .then((data) => {
        console.log("recieved data", data);
      })
      .catch((error) => {
        console.log(error);
        alert("failed to update profile");
      });
  };

  return (
    <section className={classes.head}>
      <div className={classes.control}>
        <h4>Winners never quite , Quitteres never win</h4>
        <span>
          Your profile is 69% completed. A complete profile has <br /> higher
          chances of landing a job. <button>Complete now</button>
        </span>
      </div>

      <div className={classes.control1}>
        <h3>
          Contact Details <button className={classes.cancel}>Cancel</button>
        </h3>
        <form onSubmit={submitHandler}>
          <label htmlFor="name"> Full Name</label>
          <input type="text" id="name" required ref={inputNameRef} />
          <label htmlFor="profile">Profile Photo URL</label>
          <input type="url" id="url" required ref={inputProfileRef} /> <br />
          <br />
          <button type="submit">Update</button>
        </form>
      </div>
    </section>
  );
}

export default Profile;