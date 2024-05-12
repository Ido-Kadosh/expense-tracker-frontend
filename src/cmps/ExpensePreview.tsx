import { LuPen, LuTrash } from 'react-icons/lu';
import { Link } from 'react-router-dom';
import { utilService } from '../services/util.service';
import { IExpense } from '../types/expense';

interface PropTypes {
	expense: IExpense;
	onRemoveExpense: (expenseId: string) => Promise<void>;
}

const ExpensePreview = ({ expense, onRemoveExpense }: PropTypes) => {
	return (
		<div className="group flex gap-2 items-center">
			<div className="pb-2 flex justify-between group w-full border-b  ">
				<div className="flex flex-col ">
					<span className="text-lg font-semibold">{expense.title}</span>
					<span>{utilService.formatTimestamp(expense.createdAt)}</span>
				</div>
				<div className="flex gap-5 items-center">
					<ul className="flex gap-2">
						{expense.categories.map(c => (
							<li key={c.id} className=" rounded-full border-slate-300 border py-1 px-4">
								{c.txt}
							</li>
						))}
					</ul>
					<span className=" font-semibold ">${expense.amount}</span>
				</div>
			</div>
			</div>
			<span className="self-end font-semibold">${expense.amount}</span>
		</div>
	);
};

export default ExpensePreview;
