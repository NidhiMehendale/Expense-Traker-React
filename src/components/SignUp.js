import React, { useContext } from "react";
import { useState } from "react";
import classes from "./SignUp.module.css";
import AuthContext from "./store/auth-context";
import { useHistory } from 'react-router-dom';

const  SignUp = () => {
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conpass, setconfPass] = useState("");

  const ctx = useContext(AuthContext);


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const emailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  const confpasswordChangeHandler = (e) => {
    setconfPass(e.target.value);
    // setisCursorAllow(false);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    //optional:add validation

    setIsLoading(true);
    let url;
    if (!isLogin && password !== conpass) {
      return alert("password is not same");
    } else {
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjnoOONhbal4-8ybz17138o-5U25hPyxM";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjnoOONhbal4-8ybz17138o-5U25hPyxM";
      }

      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json"
        },
      })
        .then((res) => {
          setIsLoading(false);
          
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed";
              if(data && data.error && data.error.message){
                errorMessage = data.error.message;
              }
              
              throw new Error(errorMessage);

            });
          }
        })
        .then((data) => {  
          ctx.login(data.idToken);
         history.replace('/welcome');
    
       
        })
        .catch((err) => {
 
          alert(err.message);
        });
    }
  
  };

  return (
    <section className={classes.head}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            onChange={emailChangeHandler}
            value={email}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="phone">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            required
            id="password"
            value={conpass}
            onChange={confpasswordChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <p>Sending request..!</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default SignUp;

