import { ICategoryCount, IExpense, IExpenseFilter } from '../types/expense';
import { httpService } from './http.service';

const categories = [
	{ id: 'j6jeCg7JIdVz9sEwEak88Z4m', txt: 'food', imgUrl: '/food.png' },
	{ id: 'UfG1SUshHVikQVahgQ63Q3ql', txt: 'social life', imgUrl: '/social-life.png' },
	{ id: '2ZwVLKFh0Y9Cd88wqXoPiPZo', txt: 'pets', imgUrl: '/pets.png' },
	{ id: 'db5fIo4qjyNo2d9ns2B0Lm7x', txt: 'transport', imgUrl: '/transport.png' },
	{ id: 'gvetnHcVd0NqQsb8H2FjwNU9', txt: 'culture', imgUrl: '/culture.png' },
	{ id: 'hnHnosLE0yiPqoZICxobMZcZ', txt: 'household', imgUrl: '/household.png' },
	{ id: 'JuhtltNGpIS8E87ToBN4r6h5', txt: 'apparel', imgUrl: '/apparel.png' },
	{ id: 'KgW7XxU0Yzwmg3Va5UlCAoyx', txt: 'beauty', imgUrl: '/beauty.png' },
	{ id: 'Aa3gKZjHQWQU2ck40KOUfSUW', txt: 'health', imgUrl: '/health.png' },
	{ id: 'uSSZjPtmnJcZfxeQfDmhH1cC', txt: 'education', imgUrl: '/education.png' },
	{ id: 'UAW5y2GY3NvADdDej7NkoLqD', txt: 'gift', imgUrl: '/gift.png' },
	{ id: 'FgCR3Hi2jiCqcH6l5HtlzQB5', txt: 'other', imgUrl: '/other.png' },
];

const BASE_URL = 'expense/';

const query = async (filterBy: IExpenseFilter): Promise<IExpense[]> => {
	return httpService.get(BASE_URL, filterBy);
};

const getById = async (expenseId: string): Promise<IExpense> => {
	return httpService.get(BASE_URL + expenseId);
};

const save = async (expense: IExpense): Promise<IExpense> => {
	if (expense._id) {
		return httpService.put(BASE_URL + expense._id, expense);
	}
	return httpService.post(BASE_URL, expense);
};

const remove = async (expenseId: string): Promise<string> => {
	return httpService.delete(BASE_URL + expenseId);
};

const getPriceRanges = async (): Promise<{ min: number; max: number }> => {
	return httpService.get(BASE_URL + '/range');
};

const getCategoryCounts = async (): Promise<ICategoryCount[]> => {
	return httpService.get(BASE_URL + '/category-counts');
};

const getDefaultFilter = (): IExpenseFilter => {
	return { title: '', minAmount: 0, maxAmount: 1000 };
};

const getEmptyExpense = (): IExpense => {
	return {
		_id: '',
		title: '',
		amount: 0,
		categories: [],
		createdAt: 0,
	};
};

const getCategories = () => {
	return categories;
};

export const expenseService = {
	query,
	getById,
	save,
	remove,
	getDefaultFilter,
	getEmptyExpense,
	getCategories,
	getPriceRanges,
	getCategoryCounts,
};
