import React, { useRef } from "react";
import classes from './Profile.module.css';
import AuthContext from "../store/auth-context";
import { useContext } from "react";
import { useHistory } from 'react-router-dom';

function Profile() {
  const history = useHistory();
  const inputNameRef = useRef();
  const imageInputRef = useRef();
  const ctx = useContext(AuthContext);
  console.log('ctx.idtoken',ctx.idtoken);


  const submitHandler = async (event) => {
    event.preventDefault();
  
    const enteredName = inputNameRef.current.value;
    const imageUrl = imageInputRef.current.value;

     // Save data to localStorage
     localStorage.setItem('enteredName', enteredName);
     localStorage.setItem('imageUrl', imageUrl);

    console.log(enteredName);
    console.log(imageUrl);
  
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAjnoOONhbal4-8ybz17138o-5U25hPyxM",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: ctx.idtoken,
            displayName: enteredName,
            photoUrl: imageUrl,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type' : 'application/json',
          },
        }
      );
    
      const data = await response.json(); // Parse the response body once
    
      if (response.ok) {
        ctx.login(data.idToken);
        history.replace('/welcome');
        console.log('then', data);
      } else {
        let errorMessage = "Authentication failed";
        if (data && data.error && data.error.message) {
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
      }
    } catch (err) {
      alert(err.message);
    }
    
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
          <input type="url" id="url" required ref={imageInputRef} /> <br />
          <br />
          <button type="submit">Update</button>
        </form>
      </div>
    </section>
  );
};

export default Profile;