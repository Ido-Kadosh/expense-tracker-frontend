import Axios from 'axios';
import { STORAGE_KEY_LOGGED_IN_USER } from './auth.service';

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/';

var axios = Axios.create({
	withCredentials: true,
});

export const httpService = {
	get(endpoint: string, data?: object) {
		return ajax(endpoint, 'GET', data);
	},
	post(endpoint: string, data?: object) {
		return ajax(endpoint, 'POST', data);
	},
	put(endpoint: string, data?: object) {
		return ajax(endpoint, 'PUT', data);
	},
	delete(endpoint: string, data?: object) {
		return ajax(endpoint, 'DELETE', data);
	},
};

const ajax = async (endpoint: string, method: string, data?: object) => {
	try {
		const res = await axios({
			url: `${BASE_URL}${endpoint}`,
			method,
			data,
			params: method === 'GET' ? data : null,
		});
		return res.data;
	} catch (err: any) {
		console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `, data);
		console.dir(err);
		if (err.response?.status === 401) {
			if (localStorage.getItem(STORAGE_KEY_LOGGED_IN_USER)) {
				localStorage.removeItem(STORAGE_KEY_LOGGED_IN_USER);
				window.location.reload();
			}
		}
		throw err;
	}
};
