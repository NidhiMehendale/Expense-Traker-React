import React, { useState,useCallback,useEffect} from "react";
import classes from "./Welcome.module.css";
import { NavLink ,useHistory} from "react-router-dom";
import { Fragment } from "react";
import AddExpenses from "./AddExpenses";
//import ExpensesList from "./ExpensesList";
import { useDispatch,useSelector } from "react-redux";
import { authActions } from "../store/Authentication";


function Welcome() {
  const history = useHistory();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authentication.token);

  const storedName = localStorage.getItem("enteredName");
  const storedImageUrl = localStorage.getItem("imageUrl");
  const isProfileIncomplete = storedName || storedImageUrl;
  const [items, setItems] = useState([]);
  const [editingId, setEdit] = useState(null);


  const logoutHandler = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('enteredName');
    localStorage.removeItem('imageUrl');
    dispatch(authActions.logout());
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
        money: data[key].money,
        description: data[key].description,
        category: data[key].category,
      });
    }
    setItems(loadedExpenses);
  }, []);

  useEffect(() => {
    getExpense();
  }, [getExpense]);

  const deleteHandler = (id) => {
    console.log("deleted", id);

    setItems((prev) => {
      const updatedExpense = prev.filter((item) => item.id !== id)
      return updatedExpense;
    })
  }

  const editHandler = (id) => {
    console.log(" recevide edited id", id);
    setEdit(id)
  }

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
      <AddExpenses 
         onSaveData={saveExpenseDataHandler}  
         items={items} 
         editingId={editingId}
         onDelete={deleteHandler}
         onEdit={editHandler}
         />
    
    </Fragment>
  );
}

export default Welcome;
