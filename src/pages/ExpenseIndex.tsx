import { useEffect, useState } from 'react';
import ExpenseList from '../cmps/ExpenseList';
import Loader from '../cmps/Loader';
import { expenseService } from '../services/expense.service';
import { IExpense, IExpenseFilter } from '../types/expense';
import ExpenseFilter from '../cmps/ExpenseFilter';

const ExpenseIndex = () => {
	const [expenses, setExpenses] = useState<IExpense[] | null>();
	const [filterBy, setFilterBy] = useState<IExpenseFilter>(expenseService.getDefaultFilter());

	useEffect(() => {
		const loadExpenses = async () => {
			try {
				const newExpenses = await expenseService.query(filterBy);
				setExpenses(newExpenses);
			} catch (err) {
				console.log('error loading expenses', err);
			}
		};

		loadExpenses();
	}, [filterBy]);

	if (!expenses) return <Loader />;
	return (
		<section className="mt-5">
			<ExpenseFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
			<ExpenseList expenses={expenses} />
		</section>
	);
};

export default ExpenseIndex;
