import React, { Fragment, useRef,useEffect } from "react";
import classes from "./AddExpenses.module.css";
// import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { expenseActions } from "../store/Expense";

const AddExpenses = (props) => {
  // const history = history();
  const dispatch = useDispatch();
  const inputPricRef = useRef();
  const inputDesRef = useRef();
  const inputCatRef = useRef();

  const totalExpenses = props.items.reduce(
    (total, expense) => total + parseFloat(expense.money),
    0
  );

  useEffect(() => {
    const fetchExpensedData = async () => {
      if (props.editingId) {
        const response = await fetch(
          `https://expensetracker-react-ff227-default-rtdb.firebaseio.com/expense/${props.editingId.id}.json`
        );

        const data = await response.json();
      
        dispatch(expenseActions.recivedData(data));
        if(data){
            console.log('useEffect data',data)
            inputPricRef.current.value = data.money;
            inputDesRef.current.value = data.description;
           inputCatRef.current.value = data.category;
        }
    
      }
    };
   
    fetchExpensedData();
  }, [props.editingId,dispatch]);

  const deleteHandler = async (id) => {
    const response = await fetch(
      `https://expensetracker-react-ff227-default-rtdb.firebaseio.com/expense/${id}.json`,
      {
        method: "DELETE",
      }
    )
    const data = await response.json();
    props.onDelete(id);
    console.log(data);
    console.log('delete in addexpense');
  };

  const editHandler = async (item) => {
    const response = await fetch(
      `https://expensetracker-react-ff227-default-rtdb.firebaseio.com/expense/${item.id}.json`

    );
    const data = await response.json();
    props.onEdit(item);
    console.log(data);
    deleteHandler(item.id);
    console.log('edit in addexpense');
  };

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
    
    inputPricRef.current.value='';
    inputDesRef.current.value='';
    inputCatRef.current.value='';
        
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
            <input type="text" id="category" placeholder="Food , Cloths , Movies " ref={inputCatRef}/>
          </div>
        
          <button type="submit" className={classes['add-button']}>
            Add Expenses
          </button>
        </form>
      </div>

      <div className={classes.expenses}>
    {props.items.length > 0 && (
      <div className={classes.expensesList}>
      <h2>Expenses List</h2>
      <table>
        <thead>
          <tr>
            <th>Money</th>
            <th>Description</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((expense, index) => (
            <tr key={index}>
              <td>{expense.money}</td>
              <td>{expense.description}</td>
              <td>{expense.category}</td>
              <td>
                <button
                  className={classes.delete}
                  onClick={() => {
                    deleteHandler(expense.id);
                  }}
                >
                  Delete
                </button>
                <button
                  className={classes.edit}
                  onClick={() => {
                    editHandler(expense);
                  }}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={classes.total}>Total Amount: {totalExpenses.toFixed(2)}</div>
      {totalExpenses > 10000 && (
        <button className={classes.premiumButton}>Activate Premium</button>
      )}
    </div>
    
      )}
    </div>
    </Fragment>
  );
};

export default AddExpenses;