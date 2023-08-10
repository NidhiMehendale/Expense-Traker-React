import React from "react";

 import classes from "./Welcome.module.css";

 const Header = () => {
   return (
     <div>
       <h1 className={classes.navbar}>
       Welcome To Expense Tracker
       </h1>
     </div>
   );
 }

 export default Header;