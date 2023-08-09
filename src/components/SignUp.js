import React from "react";
 import { useRef, useState } from "react";
 import classes from "./SignUp.module.css";

 function Signup() {
   const emailInputRef = useRef();
   const passwordInputRef = useRef();
   const confirmpasswordInputRef = useRef();
   const [isLogin, setIsLogin] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const switchAuthModeHandler = () => {
     setIsLogin((prevState) => !prevState);
   };

   const submitHandler = (event) => {
     event.preventDefault();

     const enteredEmail = emailInputRef.current.value;
     const enteredPassword = passwordInputRef.current.value;
     const enteredConfirmPassword = confirmpasswordInputRef.current.value;

     setIsLoading(true);
     let url;

     if (isLogin) {
       url =
         "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGFwS9sVAtyTS7hLCpP0SXbyDrC_YLKcg";
     } else {
       url =
         "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGFwS9sVAtyTS7hLCpP0SXbyDrC_YLKcg";
     }

     fetch(url, {
       method: "POST",
       body: JSON.stringify({
         email: enteredEmail,
         pasword: enteredPassword,
         confirmpassword: enteredConfirmPassword,
       }),
       headers: {
         "Content-type": "appliction/json",
       },
     }).then((res) => {
       if (res.ok) {
         return res.json();
       } else {
         throw new Error("Something Went Wrong");
       }
     });
     alert("Succefull Login");
   };

   return (
    <section className={classes.auth}>
     
    <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' required ref={emailInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          required
          ref={passwordInputRef}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor='password'>Confirm Password</label>
        <input
          type='password'
          id='password'
          required
          ref={passwordInputRef}
        />
      </div>
      <div className={classes.actions}>
       {!isLoading && <button>{isLogin ? 'Login' : 'Sign Up'}</button> }
       {isLoading && <p>Sending request...</p>}
        <button
          type='button'
          className={classes.toggle}
          onClick={switchAuthModeHandler}
        >
          {isLogin ? 'Create new account' : 'Login with existing account'}
        </button>
      </div>
    </form>
  </section>
   );
 }

 export default Signup;
