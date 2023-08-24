import React, { useState } from "react";

const AuthContext = React.createContext({
   idtoken: '',
   isLoggedIn:false,
   login: (token) => {} ,
   logout : () => {},
   userEmail: "",
  
});

export const AuthContextProvider = (props) => {
  const IntitialToken = localStorage.getItem('token'); 
    const [token,setToken] = useState(IntitialToken);

    const intialEmail = localStorage.getItem('email')
    const[userEmail,setUserEmail] = localStorage.useState(intialEmail);
   
    console.log('auth',token);

    const userIsLoggedIn = !!token; 

    const loginHandler = (token) => {
        setToken(token);
        setUserEmail(userEmail);
        localStorage.setItem('token', token);
        localStorage.setItem('email',userEmail);
      
    };

    const logoutHandler = () => {
        setToken(null); 
        localStorage.removeItem('token');
        localStorage.removeItem('email')
       
    };

    const contextValue = {
        idtoken : token,
        isLoggedIn :userIsLoggedIn,
        login :loginHandler,
        logout :logoutHandler,
      
    };
    
    return (
        <AuthContext.Provider value={contextValue}>
          {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
