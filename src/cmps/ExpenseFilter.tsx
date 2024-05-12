import { SetStateAction, useCallback, useEffect, useState } from 'react';
import { utilService } from '../services/util.service';
import { IExpenseFilter } from '../types/expense';
import MultiRangeSlider from './MultiRangeSlider';

interface PropTypes {
	filterBy: IExpenseFilter;
	onSetFilterBy: React.Dispatch<SetStateAction<IExpenseFilter>>;
	ranges: { min: number; max: number };
}
const ExpenseFilter = ({ filterBy, onSetFilterBy, ranges }: PropTypes) => {
	const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
	const debouncedOnSetFilterBy = useCallback(utilService.debounce(onSetFilterBy), []);

	useEffect(() => {
		debouncedOnSetFilterBy(filterByToEdit);
	}, [filterByToEdit]);

	const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
		const field = target.name;
		let value: number | string = target.value;
		switch (target.type) {
			case 'number':
			case 'range':
				value = +value || '';
				break;
		}
		setFilterByToEdit(prev => ({ ...prev, [field]: value }));
	};

	const handlePriceChange = (minAmount: number, maxAmount: number) => {
		setFilterByToEdit(prev => ({ ...prev, maxAmount, minAmount }));
	};

	return (
		<form className="flex items-center gap-3">
			<div>
				<input
					type="text"
					placeholder="Title"
					name="title"
					value={filterByToEdit.title}
					onChange={handleChange}
					className="primary-input"
				/>
			</div>
			<MultiRangeSlider min={ranges.min} max={ranges.max} onChange={handlePriceChange} />
		</form>
	);
};

export default ExpenseFilter;
