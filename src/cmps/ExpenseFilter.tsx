import { useCallback, useEffect, useState } from 'react';
import { utilService } from '../services/util.service';
import { ICategory, IExpenseFilter } from '../types/expense';
import CategoryPreview from './CategoryPreview';
import MultiRangeSlider from './MultiRangeSlider';
import ScrollableContent from './ScrollableContent';

interface PropTypes {
	filterBy: IExpenseFilter;
	onSetFilterBy: (newFilterBy: Partial<IExpenseFilter> | ((prev: IExpenseFilter) => IExpenseFilter)) => void;
	ranges: { min: number; max: number };
}
const ExpenseFilter = ({ filterBy, onSetFilterBy, ranges }: PropTypes) => {
	const [filterByToEdit, setFilterByToEdit] = useState(() => {
		// remove unnecessary fields from filter before inserting (like categories) to not reset them when filter changes
		const { title, minAmount, maxAmount } = filterBy;
		return { title, minAmount, maxAmount };
	});

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

	const onCategoryClick = (category: ICategory) => {
		onSetFilterBy(prev => {
			if (!prev.categories) return prev;
			return { ...prev, categories: prev?.categories.filter(c => c.id !== category.id) };
		});
	};

	return (
		<>
			<form className="flex gap-3 items-center">
				<input
					type="text"
					placeholder="Title"
					name="title"
					value={filterByToEdit.title}
					onChange={handleChange}
					className="primary-input"
				/>
				<MultiRangeSlider min={ranges.min} max={ranges.max} onChange={handlePriceChange} />
			</form>
			{!!filterBy?.categories?.length && (
				<ScrollableContent>
					{filterBy.categories.map(category => (
						<CategoryPreview key={category.id} category={category} onClick={onCategoryClick} />
					))}
				</ScrollableContent>
			)}
		</>
	);
};

export default ExpenseFilter;
