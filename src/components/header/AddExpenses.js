import React, { Fragment, useRef } from "react";
import classes from "./AddExpenses.module.css";
// import { useHistory } from "react-router-dom";


const AddExpenses = (props) => {
  // const history = history();

  const inputPricRef = useRef();
  const inputDesRef = useRef();
  const inputCatRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    const enteredPrice = inputPricRef.current.value;
    const enteredDes = inputDesRef.current.value;
    const enteredCat = inputCatRef.current.value;

    const newExpense = {
      money: enteredPrice,
      description: enteredDes,
      category: enteredCat,
    };

    props.onSaveData(newExpense);
    console.log(newExpense);

    const response = await fetch(
  
      "https://expensetracker-react-ff227-default-rtdb.firebaseio.com/expense.json",
      {
        method: "POST",
        body: JSON.stringify(newExpense),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <Fragment>
      <div className={classes.expenses}>
        <form onSubmit={submitHandler}>
          <div className={classes.expenses1}>
            <label htmlFor="money">Money</label>
            <input type="number" id="money" ref={inputPricRef} />
          </div>
          <div className={classes.expenses2}>
            <label htmlFor="description">Description</label>
            <input type="text" id="description" ref={inputDesRef} />
          </div>
          <div className={classes.expenses3}>
            <label htmlFor="category">
              Category
            </label>
            <input type="text" id="category" ref={inputCatRef}/>
          </div>
        
          <button type="submit" className={classes.button}>
            Add Expenses
          </button>
        </form>
      </div>

      <div className={classes.expenses}>
    {props.items.length > 0 && (
        <div className={classes.expensesList}>
          <h2>Expenses List</h2>
          <ul>
            {props.items.map((expense, index) => (
              <li key={index}>
                <strong>Money:</strong> {expense.money},
                <strong> Description:</strong> {expense.description},
                <strong> Category:</strong> {expense.category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </Fragment>
  );
};

export default AddExpenses;