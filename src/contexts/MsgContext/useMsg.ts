import { useContext } from 'react';
import { IMsgProvider, MsgContext } from './MsgProvider';

export const useMsg = (): IMsgProvider => {
	return useContext<IMsgProvider>(MsgContext);
};
