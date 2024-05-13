import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ICategoryCount } from '../types/expense';
import Loader from './Loader';

interface PropTypes {
	categoryCounts: ICategoryCount[] | null;
}

const colors = [
	'#116384',
	'#FA6384',
	'#36A2EB',
	'#3287BD',
	'#FFCE56',
	'#FAB123',
	'#4BC0C0',
	'#38AFA9',
	'#9966FF',
	'#7748BD',
	'#FF9F40',
	'#CC8331',
];

const ApexChart = ({ categoryCounts }: PropTypes) => {
	const [series, setSeries] = useState<ApexAxisChartSeries>([
		{
			data: [],
		},
	]);
	const [options, setOptions] = useState<ApexOptions>({
		chart: {
			type: 'bar',
			height: '100%',
			width: '100%',
		},

		plotOptions: {
			bar: {
				borderRadius: 4,
				borderRadiusApplication: 'end',
				horizontal: true,
			},
		},
		dataLabels: {
			enabled: false,
		},
		xaxis: {
			categories: [''],
		},
		colors: [],
	});

	useEffect(() => {
		if (!categoryCounts?.length) return;
		setOptions(prevOptions => ({
			...prevOptions,
			xaxis: {
				...prevOptions.xaxis,
				categories: categoryCounts.map(c => c.txt),
			},
		}));

		setSeries([
			{
				name: 'expenses',
				data: categoryCounts.map((c, idx) => ({
					x: c.txt,
					y: +c.count,
					fillColor: colors[idx],
				})),
			},
		]);
	}, [categoryCounts]);

	return (
		<div className="mt-5">
			<div>
				{!categoryCounts && <Loader />}
				{categoryCounts && <ReactApexChart options={options} series={series} type="bar" height={350} />}
			</div>
		</div>
	);
};

export default ApexChart;
