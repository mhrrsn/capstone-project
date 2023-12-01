import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function Expense() {
    const [expense, setExpense] = useState({});
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:2412/api/expenses/${id}`)
        .then(res => res.json())
        .then(info => setExpense(info.data))
    }, [id]);

    function handleDelete() {
        fetch(`http://127.0.0.1:2412/api/expenses/${id}`, 
        {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(info => {
            if (info.results === 200) {
                navigate('/expenses');
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    function formatDate(dateString) {
        const options = {
          weekday: 'long',
          year: 'numeric',
          month: 'numeric',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        };
      
        return new Date(dateString).toLocaleDateString(undefined, options);
      }
    
    return (
        <div className='container mt-5'>
            <h1 className='mb-4'>{expense.name}</h1>
            <h2>{expense.currency},{expense.amount}</h2>
            <p>{expense.description}</p>
            <br/>
            <small className='mt-4'><em>Created on: {formatDate(expense.createdAt)}</em></small>
            <div>
                <Link to = {`/expenses/${expense.id}/edit`} className='btn btn-info mt-5 me-3'>Edit Expense</Link>
                <Link to = "/expenses/new" className="btn btn-primary mt-5">Create New Expense</Link>
            </div>
            <button onClick = {handleDelete} className='btn btn-danger mt-3'>Delete Expense</button>
            <div>
                <Link to = "/expenses" className='btn btn-secondary mt-5'>Back to Expenses</Link>
            </div>
            <div>
            <Link to = {`/expenses/${expense.id-1}`} className='btn btn-light prev-expense-btn'>Previous Expense</Link>
                <Link to = {`/expenses/${expense.id+1}`} className='btn btn-light next-expense-btn'>Next Expense</Link>
            </div>
        </div>
    )
}

export default Expense;