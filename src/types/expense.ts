export interface IExpense {
	_id: string;
	title: string;
	amount: number;
	categories: ICategory[];
	createdAt: number;
}

export interface IExpenseFilter {
	title?: string;
	minAmount?: number;
	maxAmount?: number;
}

export interface ICategory {
	id: string;
	txt: string;
}
