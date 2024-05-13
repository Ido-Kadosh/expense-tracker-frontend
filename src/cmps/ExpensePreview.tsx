import { LuPen, LuTrash } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { utilService } from '../services/util.service';
import { ICategory, IExpense, IExpenseFilter } from '../types/expense';
import CategoryPreview from './CategoryPreview';
import ScrollableContent from './ScrollableContent';

interface PropTypes {
	expense: IExpense;
	onRemoveExpense: (expenseId: string) => Promise<void>;
	onSetFilter: (newFilterBy: Partial<IExpenseFilter> | ((prev: IExpenseFilter) => IExpenseFilter)) => void;
}

const ExpensePreview = ({ expense, onRemoveExpense, onSetFilter }: PropTypes) => {
	const onCategoryClick = (category: ICategory) => {
		onSetFilter(prev => {
			if (!prev.categories) return prev;
			const categoryExists = prev.categories.find(c => c.id === category.id);
			if (categoryExists) return prev; // don't add category if already exists
			return { ...prev, categories: [...prev.categories, category] };
		});
	};

	return (
		<li className="group flex gap-2 items-center border-b pb-2 justify-between group w-full">
			<div className="flex flex-col w-40">
				<span className="text-lg font-semibold truncate">{expense.title}</span>
				<span>{utilService.formatTimestamp(expense.createdAt)}</span>
			</div>
			<ScrollableContent>
				{expense.categories.map(category => (
					<CategoryPreview key={category.id} category={category} onClick={onCategoryClick} />
				))}
			</ScrollableContent>
			<div className="flex gap-1 group-hover:visible invisible">
				<Link to={`/edit/${expense._id}`}>
					<LuPen />
				</Link>
				<button onClick={() => onRemoveExpense(expense._id)}>
					<LuTrash />
				</button>
			</div>
			<span className=" font-semibold ">${expense.amount}</span>
		</li>
	);
};

export default ExpensePreview;
