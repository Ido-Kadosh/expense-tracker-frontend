import { utilService } from '../services/util.service';
import { IExpense } from '../types/expense';

interface PropTypes {
	expense: IExpense;
}

const ExpensePreview = ({ expense }: PropTypes) => {
	return (
		<div className="flex gap-4">
			<div className="flex flex-col">
				<span className="text-lg font-semibold">{expense.title}</span>
				<span>{utilService.formatTimestamp(expense.createdAt)}</span>
			</div>
			<span className="self-end font-semibold">${expense.amount}</span>
		</div>
	);
};

export default ExpensePreview;
