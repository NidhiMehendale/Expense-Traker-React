import React, { useState } from "react";

const AuthContext = React.createContext({
   idtoken: '',
   isLoggedIn:false,
   login: (token) => {} ,
   logout : () => {},
   email: '',
});

export const AuthContextProvider = (props) => {
  const IntitialToken = localStorage.getItem('token'); 
    const [token,setToken] = useState(IntitialToken);
    const [email,setEmail] = useState('');
    console.log('auth',token);

    const userIsLoggedIn = !!token; 

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
        setEmail(email);
        localStorage.setItem('email', email);
    };

    const logoutHandler = () => {
        setToken(null); 
        localStorage.removeItem('token');
        localStorage.removeItem('email');
    };

    const contextValue = {
        idtoken : token,
        isLoggedIn :userIsLoggedIn,
        login :loginHandler,
        logout :logoutHandler,
        email: email,
    };
    
    return (
        <AuthContext.Provider value={contextValue}>
          {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
