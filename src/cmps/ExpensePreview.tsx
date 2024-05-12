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
		<div className="group flex gap-2 items-center border-b">
			<div className="pb-2 flex justify-between group w-full items-center gap-5">
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
			</div>
		</div>
	);
};

export default ExpensePreview;
