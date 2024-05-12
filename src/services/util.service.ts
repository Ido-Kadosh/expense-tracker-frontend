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

export const utilService = {
	formatTimestamp,
};
