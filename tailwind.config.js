/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				primary: '#54b4d3',
				success: '#29bd49',
				error: '#e44258',
			},
		},
	},
	plugins: [],
};
