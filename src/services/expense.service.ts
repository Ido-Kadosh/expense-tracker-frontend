import { IExpense, IExpenseFilter } from '../types/expense';
import { httpService } from './http.service';

const BASE_URL = 'expense/';

const query = async (filterBy: IExpenseFilter): Promise<IExpense[]> => {
	return httpService.get(BASE_URL, filterBy);
};

const getById = async (expenseId: string): Promise<IExpense> => {
	return httpService.get(BASE_URL + expenseId);
};

const update = async (expense: IExpense): Promise<IExpense> => {
	return httpService.put(BASE_URL + expense._id, expense);
};

const add = async (expense: IExpense): Promise<IExpense> => {
	return httpService.post(BASE_URL, expense);
};

const remove = async (expenseId: string): Promise<string> => {
	return httpService.delete(BASE_URL + expenseId);
};

const getDefaultFilter = (): IExpenseFilter => {
	return { title: '', minAmount: 0 };
};

export const expenseService = {
	query,
	getById,
	update,
	add,
	remove,
	getDefaultFilter,
};
