import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CategoryChart from '../cmps/CategoryChart';
import ExpenseFilter from '../cmps/ExpenseFilter';
import ExpenseList from '../cmps/ExpenseList';
import Loader from '../cmps/Loader';
import { useMsg } from '../contexts/MsgContext/useMsg';
import useUpdateEffect from '../hooks/useUpdateEffect';
import { expenseService } from '../services/expense.service';
import { ICategoryCount, IExpense, IExpenseFilter } from '../types/expense';
import {
	SOCKET_EMIT_REMOVE_EXPENSE,
	SOCKET_EVENT_EXPENSE_ADDED,
	SOCKET_EVENT_EXPENSE_REMOVED,
	SOCKET_EVENT_EXPENSE_UPDATED,
	socketService,
} from '../services/socket.service';

const ExpenseIndex = () => {
	const [expenses, setExpenses] = useState<IExpense[]>([]);
	const [filterBy, setFilterBy] = useState<IExpenseFilter>(expenseService.getDefaultFilter());
	const [ranges, SetRanges] = useState<{ min: number; max: number }>({ min: 1, max: 1000 });
	const [categoryCounts, setCategoryCounts] = useState<ICategoryCount[] | null>(null);
	const { showErrorMsg } = useMsg();

	useEffect(() => {
		const onExpenseAdded = (expense: IExpense) => {
			setExpenses(prev => [expense, ...prev]);
		};

		const onExpenseUpdated = (expense: Partial<IExpense>) => {
			setExpenses(prev => prev.map(e => (e._id === expense._id ? { ...e, ...expense } : e)));
		};

		const onExpenseRemoved = (expenseId: string) => {
			setExpenses(prev => prev.filter(e => e._id !== expenseId));
		};

		socketService.on(SOCKET_EVENT_EXPENSE_ADDED, onExpenseAdded);
		socketService.on(SOCKET_EVENT_EXPENSE_UPDATED, onExpenseUpdated);
		socketService.on(SOCKET_EVENT_EXPENSE_REMOVED, onExpenseRemoved);
		return () => {
			socketService.off(SOCKET_EVENT_EXPENSE_ADDED, onExpenseAdded);
			socketService.off(SOCKET_EVENT_EXPENSE_UPDATED, onExpenseUpdated);
			socketService.off(SOCKET_EVENT_EXPENSE_REMOVED, onExpenseRemoved);
		};
	}, []);

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
				setCategoryCounts(categoryCounts);
			} catch {
				setCategoryCounts([]);
			}
		};
		getCategoryCount();
		getRanges();
	}, [expenses]);

	useEffect(() => {
		const loadExpenses = async () => {
			try {
				const newExpenses = await expenseService.query(filterBy);
				setExpenses(newExpenses);
			} catch (err: any) {
				const errorMsg = err.response?.data?.msg || 'Cannot load expenses';
				showErrorMsg(errorMsg);
			}
		};

		loadExpenses();
	}, [filterBy]);

	const onRemoveExpense = async (expenseId: string) => {
		try {
			await expenseService.remove(expenseId);
			socketService.emit(SOCKET_EMIT_REMOVE_EXPENSE, expenseId);
			setExpenses(prev => prev!.filter(e => e._id !== expenseId));
		} catch (err: any) {
			const errorMsg = err.response?.data?.msg || 'Cannot delete expense';
			showErrorMsg(errorMsg);
		}
	};

	const onSetFilterBy = (newFilterBy: Partial<IExpenseFilter> | ((prev: IExpenseFilter) => IExpenseFilter)) => {
		if (typeof newFilterBy === 'function') return setFilterBy(newFilterBy);
		setFilterBy(prev => ({ ...prev, ...newFilterBy }));
	};

	if (!expenses) return <Loader />;
	return (
		<section>
			<div>
				<div className="flex justify-between items-center mb-5">
					<ExpenseFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} ranges={ranges} />
					<Link className="primary-button" to="/edit">
						Add new
					</Link>
				</div>
				<ExpenseList expenses={expenses} onRemoveExpense={onRemoveExpense} onSetFilter={onSetFilterBy} />
			</div>
			<CategoryChart categoryCounts={categoryCounts} />
		</section>
	);
};

export default ExpenseIndex;
