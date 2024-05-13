import { createContext, useState } from 'react';

import { IUser } from '../../types/user';
import { authService } from '../../services/auth.service';

export const UserContext = createContext<IUserProvider>({} as IUserProvider);

export interface IUserProvider {
	user: IUser | null;
	setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<IUser | null>(authService.getLoggedInUser());

	const value: IUserProvider = { user, setUser };

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
