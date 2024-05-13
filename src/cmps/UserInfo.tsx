import { Link } from 'react-router-dom';
import { useMsg } from '../contexts/MsgContext/useMsg';
import { useUser } from '../contexts/UserContext/useUser';
import { authService } from '../services/auth.service';

const UserInfo = () => {
	const { user, setUser } = useUser();
	const { showSuccessMsg, showErrorMsg } = useMsg();

	const logout = async () => {
		try {
			const res = await authService.logout();
			setUser(null);
			showSuccessMsg(res.msg);
		} catch (err: any) {
			showErrorMsg(err?.response?.data?.msg || 'Error Logging out');
		}
	};

	if (!user) return <Link to="/auth/login">Login</Link>;
	return (
		<div className="flex gap-2 items-center">
			<img src={user.imgUrl} alt="user" className="w-8 h-8" />
			<button onClick={logout}>logout</button>
		</div>
	);
};

export default UserInfo;
