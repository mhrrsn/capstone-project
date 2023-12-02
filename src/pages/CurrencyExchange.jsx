import { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyExchange = () => {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [selectedCurrency, setSelectedCurrency] = useState('SGD');

  useEffect(() => {
    const fetchExchangeRates = async () => {
       try {
         const response = await axios.get('https://api.currencyapi.com/v3/latest', {
           params: {
             apikey: 'cur_live_kogObsuEFqYLTVOCG4bcsrKqk6jgaDLcNdoQPUB4',
             currencies: 'EUR,CHF,USD,GBP,SGD',
             base_currency: 'SGD',
           },
         });
   
         const rates = {
           SGD: 1,
           EUR: response.data.data['SGD_EUR'],
           CHF: response.data.data['SGD_CHF'],
           GBP: response.data.data['SGD_GBP'],
           USD: response.data.data['SGD_USD'],
         };
   
         setExchangeRates(rates);
       } catch (error) {
         console.error('Error fetching exchange rates:', error);
       }
    };
   
    fetchExchangeRates();
   }, []);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  return (
    <div>
      {exchangeRates ? (
        <div>
          <label>Select Currency: </label>
          <select value={selectedCurrency} onChange={handleCurrencyChange}>
            {Object.keys(exchangeRates).map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>

          <ul>
            {Object.keys(exchangeRates).map((currency) => (
              <li key={currency}>
                {currency}: {typeof exchangeRates[currency] === 'number'
                  ? exchangeRates[currency].toFixed(4)
                  : 'N/A'}{' '}
                (1 {selectedCurrency} = {typeof exchangeRates[currency] === 'number'
                  ? (1 / exchangeRates[currency]).toFixed(4)
                  : 'N/A'}{' '}
                {currency})
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{exchangeRates === null ? 'Loading exchange rates...' : 'Failed to fetch exchange rates.'}</p>
      )}
    </div>
  );
};

export default CurrencyExchange;
