import { SetStateAction, useId } from 'react';
import { IExpenseFilter } from '../types/expense';

interface PropTypes {
	filterBy: IExpenseFilter;
	onSetFilterBy: React.Dispatch<SetStateAction<IExpenseFilter>>;
}
const ExpenseFilter = ({ filterBy, onSetFilterBy }: PropTypes) => {
	const titleId = useId();
	const minAmountId = useId();

	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const field = target.name;
		let value: number | string = target.value;
		switch (target.type) {
			case 'number':
			case 'range':
				value = +value || '';
				break;
		}
		onSetFilterBy(prev => ({ ...prev, [field]: value }));
	};

	const { title, minAmount } = filterBy;
	return (
		<form>
			<label htmlFor={titleId}>Title:</label>
			<input type="text" placeholder="Title" id={titleId} name="title" value={title} onChange={handleChange} />
			<label htmlFor={minAmountId}>Min Amount:</label>
			<input
				type="range"
				min="1"
				max="100"
				id={minAmountId}
				name="minAmount"
				value={minAmount}
				onInput={handleChange}
			/>
		</form>
	);
};

export default ExpenseFilter;
