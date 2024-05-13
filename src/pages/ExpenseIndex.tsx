import { useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryChart from '../cmps/CategoryChart';
import ExpenseFilter from '../cmps/ExpenseFilter';
import ExpenseList from '../cmps/ExpenseList';
import Loader from '../cmps/Loader';
import { useMsg } from '../contexts/useMsg';
import useUpdateEffect from '../hooks/useUpdateEffect';
import { expenseService } from '../services/expense.service';
import { ICategoryCount, IExpense, IExpenseFilter } from '../types/expense';

const ExpenseIndex = () => {
	const [expenses, setExpenses] = useState<IExpense[]>([]);
	const [filterBy, setFilterBy] = useState<IExpenseFilter>(expenseService.getDefaultFilter());
	const [ranges, SetRanges] = useState<{ min: number; max: number }>({ min: 1, max: 1000 });
	const [categoryCounts, setCategoryCounts] = useState<ICategoryCount[] | null>(null);
	const { showErrorMsg } = useMsg();

	useUpdateEffect(() => {
		const getRanges = async () => {
			try {
				const ranges = await expenseService.getPriceRanges();
				SetRanges(ranges);
			} catch {
				SetRanges({ min: 1, max: 1000 }); // issue with ranges shouldn't mess up app flow
			}
		};

		const getCategoryCount = async () => {
			try {
				const categoryCounts = await expenseService.getCategoryCounts();
				console.log('categoryCounts:', categoryCounts, expenses);
				setCategoryCounts(categoryCounts);
			} catch {
				setCategoryCounts([]);
			}
		};
		getCategoryCount();
		getRanges();
	}, [expenses]);

	useUpdateEffect(() => {
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
			<div>
				<div className="flex justify-between items-center mb-5">
					<ExpenseFilter filterBy={filterBy} onSetFilterBy={setFilterBy} ranges={ranges} />
					<Link className="primary-button" to="/edit">
						Add new
					</Link>
				</div>
				<ExpenseList expenses={expenses} onRemoveExpense={onRemoveExpense} />
			</div>
			<CategoryChart categoryCounts={categoryCounts} />
		</section>
	);
};

export default ExpenseIndex;
