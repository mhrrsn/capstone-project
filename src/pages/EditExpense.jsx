import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function EditExpense() {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const [description, setDescription] = useState('');
    const {id} = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://127.0.0.1:2412/api/expenses/${id}`)
        .then(res => res.json())
        .then(info => {
            setName(info.data.name);
            setAmount(info.data.amount);
            setCurrency(info.data.currency);
            setDescription(info.data.description);
        })
    }, [id])

    function handleSubmit(e) {
        e.preventDefault();
        fetch(`http://127.0.0.1:2412/api/expenses/${id}`,
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                amount,
                currency,
                description
            }),
        })
        .then(res => res.json())
        .then(info => {
            if (info.results === 200) {
                navigate('/expenses/' + id);
            }
            console.log(info)
        })
        .catch(err => {
            console.log(err);
        })
    }
    
    return (
        <div className='container m-3 mt-4'>
            <h1 className='mb-4'>Edit Expense</h1>
            <form onSubmit = {handleSubmit}>
                <div className='mb-3 input-wrapper'>
                    <label htmlFor='name'>Expense Name</label>
                    <input className="form-control"type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='mb-3 input-wrapper'>
                    <label htmlFor='amount'>Amount</label>
                    <input className="form-control" type='number' id='amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className='mb-3 input-wrapper'>
                    <label htmlFor='currency'>Currency</label>
                    <input className="form-control" type='text' id='currency' value={currency} onChange={(e) => setCurrency(e.target.value)} />
                </div>
                <div className='mb-3 input-wrapper'>
                    <label htmlFor='description'>Description</label>
                    <textarea className='form-control' id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type='submit' className="btn btn-primary mt-3">Update Expense</button>
            </form>
            <Link to = "/expenses" className="btn btn-secondary mt-3">Back to Expenses</Link>
        </div>
    )
}

export default EditExpense;