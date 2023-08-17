import React, { useState } from "react";
import classes from "./AddExpenses.module.css";
import { useHistory } from "react-router-dom";

function AddExpenses() {
  const [money, setMoney] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [expensesList, setExpensesList] = useState([]);

  const history = useHistory();

  const submitHandler = (event) => {
    event.preventDefault();

    const newExpense = {
      money: money,
      description: description,
      category: category,
    };

    // Update the expenses list with the new expense entry
    setExpensesList((prevExpensesList) => [...prevExpensesList, newExpense]);

    // Reset the form fields after submission
    setMoney("");
    setDescription("");
    setCategory("");

    // Redirect to the desired route
  
  };

    const moneyChangeHandler = (event) => {
      setMoney(event.target.value);
    };

    const descriptionChangeHandler = (event) => {
      setDescription(event.target.value);
    };

    const categoryChangeHandler = (event) => {
      setCategory(event.target.value);
    };

  return (
   <React.Fragment>
    <div className={classes.expenses}>
      <form onSubmit={submitHandler}>
        <div className={classes.expenses1}>
          <label htmlFor="money">Money:</label>
          <input
            type="number"
            id="money"
            value={money}
            onChange={moneyChangeHandler}
          />
        </div>
        <div className={classes.expenses2}>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={descriptionChangeHandler}
          />
        </div>
        <div className={classes.expenses3}>
          <label htmlFor="category">Category:</label>
          <input
          type="text"
          id="description"
          placeholder="for eg. food,petrol,salary"
          value={category}
          onChange={categoryChangeHandler}
        />
        </div>
        <button type="submit" className={classes.button}>
          Add Expenses
        </button>
      </form>
    </div>

    <div className={classes.expenses}>
    {expensesList.length > 0 && (
        <div className={classes.expensesList}>
          <h2>Expenses List</h2>
          <ul>
            {expensesList.map((expense, index) => (
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
    </React.Fragment>
  );
}

export default AddExpenses;