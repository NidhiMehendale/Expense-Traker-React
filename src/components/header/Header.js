import React from "react";

 import classes from "./Header.module.css";

 const Header = () => {
   return (
     <div>
       <nav className={classes.navbar}>
         <ul>
           <li>Home</li>
           <li>Products</li>
           <li>About Us</li>
         </ul>
       </nav>
     </div>
   );
 }

 export default Header;