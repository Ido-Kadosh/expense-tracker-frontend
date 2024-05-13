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
	categories?: ICategory[];
}

export interface ICategory {
	id: string;
	txt: string;
	imgUrl: string;
}

export interface ICategoryCount {
	count: number;
	txt: string;
	imgUrl: string;
}
