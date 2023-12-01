import { Routes, Route } from 'react-router-dom';

import Expense from '../pages/Expense';
import Expenses from '../pages/Expenses';
import NewExpense from '../pages/NewExpense';
import EditExpense from '../pages/EditExpense';
import PageNotFound from '../pages/PageNotFound';

function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Expenses />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/expenses/new" element={<NewExpense />} />
            <Route path="/expenses/:id" element={<Expense />} />
            <Route path="/expenses/:id/edit" element={<EditExpense />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
}

export default AppRoutes;
