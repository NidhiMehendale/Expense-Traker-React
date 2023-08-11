import React, { useState } from "react";

const AuthContext = React.createContext({
   idtoken: '',
   isLoggedIn:false,
   login: (token) => {} ,
   logout : () => {},
  
});

export const AuthContextProvider = (props) => {
  const IntitialToken = localStorage.getItem('token'); 
    const [token,setToken] = useState(IntitialToken);
   
    console.log('auth',token);

    const userIsLoggedIn = !!token; 

    const loginHandler = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
      
    };

    const logoutHandler = () => {
        setToken(null); 
        localStorage.removeItem('token');
       
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
