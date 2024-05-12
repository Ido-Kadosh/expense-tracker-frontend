import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';
import ExpenseIndex from './pages/ExpenseIndex';
import ExpenseEdit from './pages/ExpenseEdit';

function App() {
	return (
		<main className="grid w-full h-screen max-w-7xl m-auto">
			<Router>
				<Routes>
					<Route path="/" element={<ExpenseIndex />} />
					<Route path="/edit/:id" element={<ExpenseEdit />} />
					<Route path="/edit/" element={<ExpenseEdit />} />
				</Routes>
			</Router>
		</main>
	);
}

export default App;
