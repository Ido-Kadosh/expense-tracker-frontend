import { IExpense } from '../types/expense';
import ExpensePreview from './ExpensePreview';

interface PropTypes {
	expenses: IExpense[];
}
const ExpenseList = ({ expenses }: PropTypes) => {
	if (!expenses.length) return <div>No expenses found matching this criteria</div>;
	return (
		<ul>
			{expenses.map(expense => (
				<li key={expense._id}>{<ExpensePreview expense={expense} />}</li>
			))}
		</ul>
	);
};

export default ExpenseList;
