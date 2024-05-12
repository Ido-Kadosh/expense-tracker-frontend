import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import ExpenseIndex from './pages/ExpenseIndex';
import ExpenseEdit from './pages/ExpenseEdit';
import { MsgProvider } from './contexts/MsgProvider';
import { UserMsg } from './cmps/userMsg';

function App() {
	return (
		<main className="grid w-full max-w-7xl m-auto pt-5 2xl:px-0 px-5">
			<MsgProvider>
				<Router>
					<Routes>
						<Route path="/" element={<ExpenseIndex />} />
						<Route path="/edit/:id" element={<ExpenseEdit />} />
						<Route path="/edit/" element={<ExpenseEdit />} />
					</Routes>
				</Router>
				<UserMsg />
			</MsgProvider>
		</main>
	);
}

export default App;
