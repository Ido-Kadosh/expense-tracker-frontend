export interface IUser {
	_id: string;
	email: string;
	imgUrl: string;
	createdAt: number;
}

export interface ICredentials {
	email: string;
	password: string;
}
