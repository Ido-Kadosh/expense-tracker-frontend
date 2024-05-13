import { useEffect, useId, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import CategorySelect from '../cmps/CategorySelect';
import { useMsg } from '../contexts/MsgContext/useMsg';
import { expenseService } from '../services/expense.service';
import { ICategory, IExpense } from '../types/expense';
import { SOCKET_EMIT_ADD_EXPENSE, SOCKET_EMIT_UPDATE_EXPENSE, socketService } from '../services/socket.service';

const ExpenseEdit = () => {
	const [expense, setExpense] = useState<IExpense>(expenseService.getEmptyExpense());
	const params = useParams();
	const navigate = useNavigate();
	const titleId = useId();
	const amountId = useId();
	const { showErrorMsg } = useMsg();

	useEffect(() => {
		const loadExpense = async () => {
			try {
				const expenseToEdit = await expenseService.getById(params.id!);
				setExpense(expenseToEdit);
			} catch (err: any) {
				const errorMsg = err.response?.data?.msg || 'Cannot load expense';
				showErrorMsg(errorMsg);
				navigate('/');
			}
		};

		if (params.id) loadExpense();
	}, [params.id]);

	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const field = target.name;
		let value: number | string = target.value;

		switch (target.type) {
			case 'number':
			case 'range':
				value = +value || '';
				break;
		}

		setExpense(prev => ({ ...prev, [field]: value }));
	};

	const handleCategoryChange = (category: ICategory, isChecked: boolean) => {
		if (isChecked) {
			setExpense(prev => ({ ...prev, categories: prev.categories.filter(c => c.id !== category.id) }));
		} else {
			setExpense(prev => ({ ...prev, categories: [...prev.categories, category] }));
		}
	};

	const onSaveExpense = async (ev: React.FormEvent) => {
		try {
			ev.preventDefault();
			const savedExpense = await expenseService.save(expense);
			if (expense._id) {
				socketService.emit(SOCKET_EMIT_UPDATE_EXPENSE, savedExpense);
			} else {
				socketService.emit(SOCKET_EMIT_ADD_EXPENSE, savedExpense);
			}
			navigate('/');
		} catch (err: any) {
			const errorMsg = err.response?.data?.msg || 'Cannot save expense';
			showErrorMsg(errorMsg);
		}
	};

	return (
		<section>
			<h1>{params.id ? 'Edit expense' : 'Add new expense'}</h1>
			<form className="flex flex-col gap-3" onSubmit={onSaveExpense}>
				<label htmlFor={titleId}>Title: </label>
				<input
					className="primary-input"
					value={expense.title}
					onChange={handleChange}
					type="text"
					placeholder="Title"
					id={titleId}
					name="title"
					required
				/>

				<label htmlFor={amountId}>Amount:</label>
				<input
					className="primary-input"
					value={expense.amount || ''}
					onChange={handleChange}
					type="number"
					placeholder="Amount"
					id={amountId}
					name="amount"
					required
				/>

				<CategorySelect selectedCategories={expense.categories} onChange={handleCategoryChange} />

				<button className="primary-button">Save</button>
			</form>
		</section>
	);
};

export default ExpenseEdit;
