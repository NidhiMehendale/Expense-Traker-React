import SignUp from "./components/SignUp";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"; // Import correct components
import Welcome from "./components/header/Welcome";
import Profile from "./components/header/Profile";

function App() {
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
          <Route path="/welcome" exact>
            <Welcome />
          </Route>
          <Route path="/welcome/profile">
            <Profile />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
