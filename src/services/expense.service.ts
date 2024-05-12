import { IExpense, IExpenseFilter } from '../types/expense';
import { httpService } from './http.service';
import { utilService } from './util.service';

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

const getDefaultFilter = (): IExpenseFilter => {
	return { title: '', minAmount: 0 };
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
	return [
		{ id: utilService.makeId(), txt: 'food' },
		{ id: utilService.makeId(), txt: 'social life' },
		{ id: utilService.makeId(), txt: 'pets' },
		{ id: utilService.makeId(), txt: 'transport' },
		{ id: utilService.makeId(), txt: 'culture' },
		{ id: utilService.makeId(), txt: 'household' },
		{ id: utilService.makeId(), txt: 'apparel' },
		{ id: utilService.makeId(), txt: 'beauty' },
		{ id: utilService.makeId(), txt: 'health' },
		{ id: utilService.makeId(), txt: 'education' },
		{ id: utilService.makeId(), txt: 'gift' },
		{ id: utilService.makeId(), txt: 'other' },
	];
};

export const expenseService = {
	query,
	getById,
	save,
	remove,
	getDefaultFilter,
	getEmptyExpense,
	getCategories,
};
