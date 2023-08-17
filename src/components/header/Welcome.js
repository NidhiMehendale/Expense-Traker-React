import React, { useState,useCallback,useEffect} from "react";
import classes from "./Welcome.module.css";
import { NavLink ,useHistory} from "react-router-dom";
import { Fragment } from "react";
import AddExpenses from "./AddExpenses";
//import ExpensesList from "./ExpensesList";


function Welcome() {
  const history = useHistory();

  const storedName = localStorage.getItem("enteredName");
  const storedImageUrl = localStorage.getItem("imageUrl");
  const isProfileIncomplete = storedName || storedImageUrl;
  const [items, setItems] = useState([]);

  console.log(isProfileIncomplete)

  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('enteredName');
    localStorage.removeItem('imageUrl');
    history.replace('/signup');
  };
  
  const saveExpenseDataHandler = (expense) => {
    setItems((prev) => [...prev, expense]);
  };

  const getExpense = useCallback(async () => {
    const response = await fetch(
      "https://expensetracker-react-ff227-default-rtdb.firebaseio.com/expense.json"
    );

    const data = await response.json();

    console.log(data);

    const loadedExpenses = [];

    for (const key in data) {
      loadedExpenses.push({
        id: key,
        amount: data[key].amount,
        description: data[key].description,
        category: data[key].category,
      });
    }
    setItems(loadedExpenses);
  }, []);

  useEffect(() => {
    getExpense();
  }, [getExpense]);

  return (
    <Fragment>
      <div className={classes.main}>
        <div>Welcome to the expense tracker!!!!</div>
        {!isProfileIncomplete && <div className={classes.right}>     
            <div>
              Your profile is incomplete.
              <NavLink to="/welcome/profile">Complete now</NavLink>
            </div>
        </div> }
       {isProfileIncomplete && <div>Welcome, {storedName}</div>}
       <button className={classes.logout} onClick={logoutHandler}>Logout</button>
      </div>
      <AddExpenses onSaveData={saveExpenseDataHandler}  items={items} />
    
    </Fragment>
  );
}

export default Welcome;
