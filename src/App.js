import SignUp from "./components/SignUp";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Import correct components
import Welcome from "./components/header/Welcome";
import Profile from "./components/header/Profile";
import Resetpassword from "./components/header/Resetpassword";
import { useSelector } from "react-redux";

function App() {
  const isLoggedIn = useSelector(
    (state) => state.authentication.isAuthenticated
  );

  return (
    <React.Fragment>
      <Router> 
        <Switch>
          <Route path="/" exact>
            <SignUp />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        {isLoggedIn && (
          <Route path="/welcome" exact>
            <Welcome />
          </Route>
        )}  
         {isLoggedIn && (
          <Route path="/welcome/profile">
          <Profile />
        </Route>
         )} 
          <Route path="/resetpassword">
            <Resetpassword />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
