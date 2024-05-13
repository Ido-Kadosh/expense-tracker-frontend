import { useEffect, useRef } from 'react';
import { useMsg } from '../contexts/MsgContext/useMsg';

const UserMsg = () => {
	const timeoutIdRef = useRef<ReturnType<typeof setTimeout> | null>();

	const { msg, setMsg } = useMsg();

	const closeMsg = () => {
		setMsg(null);
	};

	useEffect(() => {
		if (msg !== null) {
			if (timeoutIdRef.current) {
				clearTimeout(timeoutIdRef.current);
				timeoutIdRef.current = null;
			}
			timeoutIdRef.current = setTimeout(closeMsg, 3000);
		}
	}, [msg]);
	return (
		<>
			{msg && (
				<section
					className={`text-white flex gap-2 items-center justify-center fixed p-3 min-w-max h-12 bottom-6 left-6 z-[9999] ${
						msg.type === 'success' ? 'bg-success' : 'bg-error'
					}`}
				>
					{msg.txt}
					<button onClick={closeMsg}>X</button>
				</section>
			)}
		</>
	);
};

export default UserMsg;
