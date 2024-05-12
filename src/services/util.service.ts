const formatTimestamp = (timestamp: number) => {
	const date = new Date(timestamp);
	const options: Intl.DateTimeFormatOptions = {
		month: 'short', // abbreviated month name (e.g., 'Feb')
		day: '2-digit', // two-digit day
		hour: 'numeric', // numeric hour
		minute: '2-digit', // two-digit minute
		hour12: true, // use 12-hour clock
	};

	const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
	return formattedDate;
};

const makeId = (length = 24) => {
	var txt = '';
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (var i = 0; i < length; i++) {
		txt += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return txt;
};

const capitalizeFirstLetter = (str: string): string => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};
export const utilService = {
	formatTimestamp,
	capitalizeFirstLetter,
	makeId,
};
