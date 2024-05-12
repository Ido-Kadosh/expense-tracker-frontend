import { FormEvent, useEffect, useId, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ICategory, IExpense } from '../types/expense';
import { expenseService } from '../services/expense.service';
import ReactSelect, { MultiValue } from 'react-select';
import { utilService } from '../services/util.service';

const categoryOptions = expenseService.getCategories().map(category => ({
	value: category.id,
	label: utilService.capitalizeFirstLetter(category.txt),
}));

const ExpenseEdit = () => {
	const [expense, setExpense] = useState<IExpense>(expenseService.getEmptyExpense());
	const params = useParams();
	const navigate = useNavigate();
	const titleId = useId();
	const amountId = useId();

	useEffect(() => {
		const loadExpense = async () => {
			try {
				const expenseToEdit = await expenseService.getById(params.id!);
				setExpense(expenseToEdit);
			} catch (err) {
				console.log('error loading expense', err);
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

	const handleCategoryChange = (categories: MultiValue<{ value: string; label: string }>) => {
		const formattedCategories = categories.map(c => ({ id: c.value, txt: c.label }));
		setExpense(prev => ({ ...prev, categories: formattedCategories }));
	};

	const onSaveExpense = async (ev: React.FormEvent) => {
		try {
			ev.preventDefault();
			expenseService.save(expense);
			navigate('/');
		} catch (err) {
			console.log('error saving expense', err);
		}
	};

	return (
		<section>
			<h1>{params.id ? 'Edit expense' : 'Add new expense'}</h1>
			<form className="grid" onSubmit={onSaveExpense}>
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
					value={expense.amount}
					onChange={handleChange}
					type="number"
					placeholder="Amount"
					id={amountId}
					name="amount"
					required
				/>

				<ReactSelect
					isMulti
					name="categories"
					className="basic-multi-select"
					options={categoryOptions}
					onChange={handleCategoryChange}
				/>

				<button>Save</button>
			</form>
		</section>
	);
};

export default ExpenseEdit;
