import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useMsg } from '../contexts/MsgContext/useMsg';
import { authService } from '../services/auth.service';
import { useUser } from '../contexts/UserContext/useUser';

export function LoginSignUp() {
	const [credentials, setCredentials] = useState(authService.getEmptyCredentials());
	const [isSignUp, setIsSignUp] = useState(false);
	const location = useLocation();
	const navigate = useNavigate();
	const { showErrorMsg, showSuccessMsg } = useMsg();
	const { setUser } = useUser();

	useEffect(() => {
		setIsSignUp(location.pathname.includes('signup'));
	}, [location]);

	function handleChange({ target }: React.ChangeEvent<HTMLInputElement>) {
		const field = target.name;
		const value = target.value;
		setCredentials(prev => ({ ...prev, [field]: value }));
	}

	const onSubmit = async (ev: React.FormEvent) => {
		ev.preventDefault();
		try {
			const authFunction = isSignUp ? 'signup' : 'login';
			const user = await authService[authFunction](credentials);
			setUser(user);
			const successMsg = `${isSignUp ? 'signup' : 'login'} successful`;
			showSuccessMsg(successMsg);
			navigate('/');
		} catch (err: any) {
			const errorMsg = err.response?.data?.msg || 'Something went wrong';
			showErrorMsg(errorMsg);
		}
	};

	const { email, password } = credentials;

	return (
		<section className="flex flex-col items-center w-full">
			<h1 className="mt-20 text-4xl font-extralight mb-2 text-center">
				{isSignUp ? 'Sign up' : 'Log in to your account'}
			</h1>
			<form onSubmit={onSubmit} className="flex flex-col w-full max-w-96 mt-6 gap-5">
				<div className="flex flex-col">
					<label className="text-[#333333] self-center mb-1 font-medium" htmlFor="email">
						Enter your email address
					</label>
					<input
						type="email"
						id="email"
						name="email"
						value={email}
						onChange={handleChange}
						placeholder="Example@mail.com"
						className="px-1 py-3 border border-[#c3c6d4] rounded-sm hover:border-[#323338] focus:border-primary outline-none text-[#555] font-light"
					/>
				</div>
				<div className="flex flex-col">
					<label className="text-[#333333] self-center mb-1 font-medium" htmlFor="password">
						Enter your password
					</label>
					<input
						type="password"
						id="password"
						name="password"
						value={password}
						onChange={handleChange}
						placeholder="Enter at least 8 characters"
						className="px-1 py-3 border border-[#c3c6d4] rounded-sm hover:border-[#323338] focus:border-primary outline-none text-[#555] font-light"
					/>
				</div>
				<button className="mb-8 text-lg text-[#fcfcfc] bg-primary px-1 py-2 rounded-sm">
					<span>
						<span>{isSignUp ? 'Sign up' : 'Login'}</span>
					</span>
				</button>
			</form>

			{!isSignUp ? (
				<div className="font-light ">
					<span>Don't have an account yet? </span>
					<Link className="text-primary hover:underline" to="/auth/signup">
						Sign up
					</Link>
				</div>
			) : (
				<div className="font-light ">
					<span>Already have an account? </span>
					<Link className="text-primary hover:underline" to="/auth/login">
						Log in
					</Link>
				</div>
			)}
		</section>
	);
}
