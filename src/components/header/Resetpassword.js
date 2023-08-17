import React, { useRef } from "react";
import classes from "./ResetPassword.module.css";

function Resetpassword() {
  const inputEmailRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('reset')
    const enteredEmail = inputEmailRef.current.value;
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAjnoOONhbal4-8ybz17138o-5U25hPyxM",
      {
        method: "POST",
        body: JSON.stringify({
          requestType: "PASSWORD_RESET",
          email: enteredEmail,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        console.log(res);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => alert(data.error.message));
        }
      })
      .then((data) => {
        console.log("received data ", data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.reset}>
      <form action="" onSubmit={submitHandler} className={classes.form}>
        <h1>Reset Password</h1>
        <label htmlFor="">Enter the Email Which You Have Registered:</label>
        <input type="text" ref={inputEmailRef} id="email" required />
        <button type="submit">Send Link</button>
      </form>
    </div>
  );
}

export default Resetpassword;