import UserInfo from './UserInfo';

const AppHeader = () => {
	return (
		<div className="w-screen h-10 bg-primary text-white">
			<div className="max-w-7xl h-full m-auto flex items-center justify-between 2xl:px-0 px-5">
				<div className="flex items-center gap-2">
					<img src="/favicon.png" alt="logo" className="w-8 h-8" />
					<span className="text-xl">Expense Tracker</span>
				</div>
				<UserInfo />
			</div>
		</div>
	);
};

export default AppHeader;
