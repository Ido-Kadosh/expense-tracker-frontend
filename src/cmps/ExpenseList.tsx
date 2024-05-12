import { IExpense } from '../types/expense';
import ExpensePreview from './ExpensePreview';

interface PropTypes {
	expenses: IExpense[];
	onRemoveExpense: (expenseId: string) => Promise<void>;
}
const ExpenseList = ({ expenses, onRemoveExpense }: PropTypes) => {
	if (!expenses.length) return <div>No expenses found matching this criteria</div>;
	return (
		<ul className="space-y-2">
			{expenses.map(expense => (
				<li key={expense._id}>{<ExpensePreview expense={expense} onRemoveExpense={onRemoveExpense} />}</li>
			))}
		</ul>
	);
};

export default ExpenseList;
