import { useState, useRef} from 'react';
import { useHistory } from 'react-router-dom';
import classes from './SignUp.module.css';
//import AuthContext from './store/auth-context';
import { useDispatch } from "react-redux";
import { authActions } from "./store/Authentication";


const LoginPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  //const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  
  const resetpasswordHandler = () => {
   let  replace = "/resetpassword"
    history.replace(replace);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
   

    setIsLoading(true);
    let url;
    let replace;
    if(isLogin){
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAjnoOONhbal4-8ybz17138o-5U25hPyxM'
      replace="/welcome";
    }else{
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjnoOONhbal4-8ybz17138o-5U25hPyxM'
      replace="signup";
    }

    fetch(url,
          {
            method: 'POST',
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken :true
            }),
            headers: {
               'Content-Type' : 'application/json'
            }
          }
      ).then(res => {
        setIsLoading(false);
        if(res.ok){
            return res.json();
        }else{
         return res.json().then(data => {
            let errorMessage = 'Authentication failed';
            if(data && data.error && data.error.message){
              errorMessage = data.error.message;
            }
            
            throw new Error(errorMessage);
          });   
        }
      }).then(data => {
           // authCtx.login(data.idToken);
           console.log("getdata", data);
           dispatch(authActions.login({ token: data.idToken, email: data.email }));
            history.replace(replace);
           window.location.reload();
       
      })
      .catch((err) => {
          alert(err.message)
      });
     
     
  };

  return (
 
    <section className={classes.auth}>
     
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label className={classes.signUplabel} htmlFor='email'>Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label className={classes.signUplabel} htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
          <button 
            type='button'
            className={classes.forgotpass}
            onClick={resetpasswordHandler}
          >
          {isLogin ? 'Forgot password?' : ''}
          </button> 
        
        <div className={classes.actions}>
       
         {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button> }
     
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
};



export default LoginPage;
