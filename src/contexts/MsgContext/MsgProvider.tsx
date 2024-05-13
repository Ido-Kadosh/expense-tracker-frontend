import { createContext, useState } from 'react';
import { IMsg } from '../../types/msg';

export const MsgContext = createContext<IMsgProvider>({} as IMsgProvider);

export interface IMsgProvider {
	msg: IMsg | null;
	setMsg: React.Dispatch<React.SetStateAction<IMsg | null>>;
	showErrorMsg: (...args: any[]) => void;
	showSuccessMsg: (...args: any[]) => void;
}

const MsgProvider = ({ children }: { children: React.ReactNode }) => {
	const [msg, setMsg] = useState<IMsg | null>(null);

	const showErrorMsg = (...args: any[]) => {
		const txt = args.join(' ');
		setMsg({ type: 'error', txt });
	};

	const showSuccessMsg = (...args: any[]) => {
		const txt = args.join(' ');
		setMsg({ type: 'success', txt });
	};

	const value: IMsgProvider = { msg, setMsg, showErrorMsg, showSuccessMsg };

	return <MsgContext.Provider value={value}>{children}</MsgContext.Provider>;
};

export default MsgProvider;
