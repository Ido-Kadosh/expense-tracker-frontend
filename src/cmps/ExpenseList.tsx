import { IExpense } from '../types/expense';
import ExpensePreview from './ExpensePreview';

interface PropTypes {
	expenses: IExpense[];
	onRemoveExpense: (expenseId: string) => Promise<void>;
}
const ExpenseList = ({ expenses, onRemoveExpense }: PropTypes) => {
	if (!expenses.length) return <div>No expenses found matching this criteria</div>;
	return (
		<div>
			<h2 className="text-2xl font-bold mb-5  border-b">Expenses</h2>
			<ul className="space-y-2">
				{expenses.map(expense => (
					<li key={expense._id}>{<ExpensePreview expense={expense} onRemoveExpense={onRemoveExpense} />}</li>
				))}
			</ul>
		</div>
	);
};

export default ExpenseList;
