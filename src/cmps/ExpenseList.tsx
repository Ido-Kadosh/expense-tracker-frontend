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
			<h2 className="text-2xl font-bold mb-5 border-b">Expenses</h2>
			<ul className="flex flex-col gap-2 px-4 overflow-auto max-h-[50vh]">
				{expenses.map(expense => (
					<ExpensePreview key={expense._id} expense={expense} onRemoveExpense={onRemoveExpense} />
				))}
			</ul>
		</div>
	);
};

export default ExpenseList;
