import CurrencyExchange from './CurrencyExchange'; // Adjust the path based on your project structure
import Expenses from './Expenses'; // Assuming you have an Expenses.jsx component

const Homepage = () => {
  return (
    <div className='container m-3 mt-4'>
      <h1 className='mb-4'>TaskRight!</h1>
      <h2><em>Your Currency Exchange Rates Today</em></h2>
      <CurrencyExchange />
      <Expenses />
    </div>
  );
};

export default Homepage;
