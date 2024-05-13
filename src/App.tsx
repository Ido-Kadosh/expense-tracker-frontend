import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import ExpenseIndex from './pages/ExpenseIndex';
import ExpenseEdit from './pages/ExpenseEdit';
import { MsgProvider } from './contexts/MsgContext/MsgProvider';
import { UserMsg } from './cmps/userMsg';
import AppHeader from './cmps/AppHeader';
import { LoginSignUp } from './pages/loginSignup';
import { UserProvider } from './contexts/UserContext/UserProvider';

function App() {
	return (
		<div>
			<Router>
				<UserProvider>
					<MsgProvider>
						<AppHeader />
						<main className="flex flex-col w-full max-w-7xl m-auto pt-5 2xl:px-0 px-5">
							<Routes>
								<Route path="/" element={<ExpenseIndex />} />
								<Route path="/edit/:id" element={<ExpenseEdit />} />
								<Route path="/edit/" element={<ExpenseEdit />} />
								<Route path="/auth/login" element={<LoginSignUp />}></Route>
								<Route path="/auth/signup" element={<LoginSignUp />}></Route>
							</Routes>
							<UserMsg />
						</main>
					</MsgProvider>
				</UserProvider>
			</Router>
		</div>
	);
}

export default App;
