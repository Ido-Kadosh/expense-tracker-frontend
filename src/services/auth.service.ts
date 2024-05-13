import { ICredentials, IUser } from '../types/user';
import { httpService } from './http.service';

export const STORAGE_KEY_LOGGED_IN_USER = 'loggedInUser';
const BASE_URL = 'auth/';

const login = async (credentials: ICredentials) => {
	const user = await httpService.post(BASE_URL + 'login', credentials);
	return _saveLocalUser(user);
};

const signup = async (credentials: ICredentials) => {
	const user = await httpService.post(BASE_URL + 'signup', credentials);
	return _saveLocalUser(user);
};

const logout = async (): Promise<{ msg: any }> => {
	const result = await httpService.post(BASE_URL + 'logout');
	localStorage.removeItem(STORAGE_KEY_LOGGED_IN_USER);
	return result;
};

const changePassword = (credentials: ICredentials): Promise<{ msg: string }> => {
	return httpService.post(BASE_URL + 'change', credentials);
};

const _saveLocalUser = (user: IUser) => {
	localStorage.setItem(STORAGE_KEY_LOGGED_IN_USER, JSON.stringify(user));
	return user;
};

const getEmptyCredentials = () => {
	return {
		email: '',
		password: '',
	};
};

const getLoggedInUser = () => {
	const user = localStorage.getItem(STORAGE_KEY_LOGGED_IN_USER);
	if (user) return JSON.parse(user);
	return null;
};

export const authService = {
	login,
	logout,
	signup,
	changePassword,
	getEmptyCredentials,
	getLoggedInUser,
};
