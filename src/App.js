import SignUp from "./components/SignUp";
import Header from "./components/header/Welcome";
import React,{  } from "react";
import { BrowserRouter as  Route ,Switch} from "react-router-dom/cjs/react-router-dom.min";


function App() {
  

  return (
    <React.Fragment>
    
    <Switch>
    <Route path="/" exact>
      <SignUp/>
    </Route>
    <Route path="/signup">
      <SignUp/>
    </Route>
    <Route path="/Header">
    <Header/>
   </Route>
    </Switch>
     
     
    </React.Fragment>
  );
}

export default App;
