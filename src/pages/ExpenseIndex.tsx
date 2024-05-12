import { useEffect, useState } from 'react';
import ExpenseList from '../cmps/ExpenseList';
import Loader from '../cmps/Loader';
import { expenseService } from '../services/expense.service';
import { IExpense, IExpenseFilter } from '../types/expense';
import ExpenseFilter from '../cmps/ExpenseFilter';
import { Link } from 'react-router-dom';
import { useMsg } from '../contexts/useMsg';

const ExpenseIndex = () => {
	const [expenses, setExpenses] = useState<IExpense[]>([]);
	const [filterBy, setFilterBy] = useState<IExpenseFilter>(expenseService.getDefaultFilter());
	const [ranges, SetRanges] = useState<{ min: number; max: number }>({ min: 1, max: 1000 });
	const { showErrorMsg } = useMsg();

	useEffect(() => {
		const getRanges = async () => {
			const ranges = await expenseService.getPriceRanges();
			SetRanges(ranges);
		};
		getRanges();
	}, [expenses]);

	useEffect(() => {
		const loadExpenses = async () => {
			try {
				const newExpenses = await expenseService.query(filterBy);
				setExpenses(newExpenses);
			} catch {
				showErrorMsg('Error loading expenses');
			}
		};

		loadExpenses();
	}, [filterBy]);

	const onRemoveExpense = async (expenseId: string) => {
		try {
			await expenseService.remove(expenseId);
			setExpenses(prev => prev.filter(e => e._id !== expenseId));
		} catch {
			showErrorMsg('cannot delete expense');
		}
	};

	if (!expenses) return <Loader />;
	return (
		<section>
			<div className="flex justify-between items-center mb-5">
				<ExpenseFilter filterBy={filterBy} onSetFilterBy={setFilterBy} ranges={ranges} />
				<Link className="primary-button" to="/edit">
					Add new
				</Link>
			</div>
			<ExpenseList expenses={expenses} onRemoveExpense={onRemoveExpense} />
		</section>
	);
};

export default ExpenseIndex;
