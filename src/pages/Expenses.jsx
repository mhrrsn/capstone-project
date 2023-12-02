import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [currencySum, setCurrencySum] = useState([]);

  useEffect(() => {
    // Fetch individual expenses
    fetch(`http://127.0.0.1:2412/api/expenses/`)
      .then((res) => res.json())
      .then((info) => {
        setExpenses(info.data);
      });

    // Fetch total amounts grouped by currency
    fetch(`http://127.0.0.1:2412/api/expenses/sum`)
      .then((res) => res.json())
      .then((info) => {
        setCurrencySum(info.data);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Expense Breakdown</h1>
      {currencySum && currencySum.length > 0 && (
        <div className="mb-3">
          <h4>Your Expenses So Far!</h4>
          <ul>
            {currencySum.map((sum, index) => (
              <li key={index}>
                {sum.currency}: {sum.totalAmount.toFixed(2)} {/* Ensure the total amount is displayed with two decimal places */}
              </li>
            ))}
          </ul>
        </div>
      )}

      {expenses.length === 0 && <p>Loading...</p>}
      <ul className="list-group">
        {expenses.map((expense) => (
          <li key={expense.id} className="list-group-item">
            <Link to={`/expenses/${expense.id}`}>{expense.name} </Link>
            <p>
              <em>
                {expense.currency}
                {expense.amount.toFixed(2)} {/* Ensure the amount is displayed with two decimal places */}
              </em>
            </p>
          </li>
        ))}
      </ul>
      <Link to="/expenses/new" className="btn btn-success mt-3 me-4" >
        Create New Expense
      </Link>
      <Link to="/homepage" className="btn btn-primary mt-3">Back to Homepage</Link>
    </div>
  );
}

export default Expenses;
