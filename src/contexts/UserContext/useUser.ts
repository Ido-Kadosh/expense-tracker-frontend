import { useContext } from 'react';
import { IUserProvider, UserContext } from './UserProvider';

export const useUser = (): IUserProvider => {
	return useContext<IUserProvider>(UserContext);
};
