import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

function NewExpense() {
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('');
    const [customCurrency, setCustomCurrency] = useState(''); // New state for custom currency
    const [isOtherCurrency, setIsOtherCurrency] = useState(false); // New state to track if "Other" is selected
    const [description, setDescription] = useState('');

    const navigate = useNavigate();

    const handleCurrencyChange = (e) => {
        const selectedCurrency = e.target.value;

        if (selectedCurrency === 'other') {
            setIsOtherCurrency(true);
        } else {
            setIsOtherCurrency(false);
            setCustomCurrency(''); // Reset customCurrency if a standard currency is selected
        }

        setCurrency(selectedCurrency);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const selectedCurrencyValue = isOtherCurrency ? customCurrency : currency;

        await fetch(`http://127.0.0.1:2412/api/expenses/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                amount,
                currency: selectedCurrencyValue,
                description,
            }),
        })
        .then(res => res.json())
        .then(info => {
            if (info.results === 200) {
                navigate('/expenses');
            }
        })
        .catch(err => {
            console.log(err)
        })
    };

    return (
        <div className="container m-3 mt-4">
            <h1 className="mb-4">New Expense</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3 input-wrapper">
                    <label htmlFor='name'>Expense Name</label>
                    <input className="form-control" type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3 input-wrapper">
                    <label htmlFor='amount'>Amount</label>
                    <input className="form-control" type='number' id='amount' value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="mb-3 input-wrapper">
                    <label htmlFor='currency'>Currency</label>
                    <select
                        className="form-control"
                        id='currency'
                        value={isOtherCurrency ? 'other' : currency}
                        onChange={handleCurrencyChange}
                    >
                        <option value="USED">USD</option>
                        <option value="EUR">EUR</option>
                        <option value="GBP">GBP</option>
                        <option value="SGD">SGD</option>
                        <option value="CHF">CHF</option>
                        <option value="BGN">BGN</option>
                        <option value="TRY">TRY</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                {isOtherCurrency && (
                    <div className="mb-3 input-wrapper">
                        <label htmlFor='customCurrency'>Custom Currency</label>
                        <input
                            className="form-control"
                            type='text'
                            id='customCurrency'
                            value={customCurrency}
                            onChange={(e) => setCustomCurrency(e.target.value)}
                        />
                    </div>
                )}
                <div className="mb-3 input-wrapper">
                    <label htmlFor='description'>Description</label>
                    <textarea className="form-control" id='description' value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <button type='submit' className="btn btn-success mt-3">Create Expense</button>
            </form>
            <Link to = "/expenses" className="btn btn-secondary mt-3">Back to Expenses</Link>
        </div>
    )
}

export default NewExpense;
