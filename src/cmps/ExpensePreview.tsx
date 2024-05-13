import { LuPen, LuTrash } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { utilService } from '../services/util.service';
import { IExpense } from '../types/expense';
import CategoryPreview from './CategoryPreview';
import ScrollableContent from './ScrollableContent';

interface PropTypes {
	expense: IExpense;
	onRemoveExpense: (expenseId: string) => Promise<void>;
}

const ExpensePreview = ({ expense, onRemoveExpense }: PropTypes) => {
	return (
		<li className="group flex gap-2 items-center border-b pb-2 justify-between group w-full">
			<div className="flex flex-col w-40">
				<span className="text-lg font-semibold truncate">{expense.title}</span>
				<span>{utilService.formatTimestamp(expense.createdAt)}</span>
			</div>
			<ScrollableContent>
				{expense.categories.map(category => (
					<CategoryPreview key={category.id} category={category} />
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
