import { createContext, useState } from 'react';
import { authService } from '../../services/auth.service';
import { IUser } from '../../types/user';

export const UserContext = createContext<IUserProvider>({} as IUserProvider);

export interface IUserProvider {
	user: IUser | null;
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

const UserProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<IUser | null>(authService.getLoggedInUser());

	const value: IUserProvider = { user, setUser };

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
