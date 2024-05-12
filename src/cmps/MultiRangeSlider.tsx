import { useCallback, useEffect, useRef, useState } from 'react';

interface PropTypes {
	min: number;
	max: number;
	onChange: (min: number, max: number) => void;
}
const MultiRangeSlider = ({ min, max, onChange }: PropTypes) => {
	const [minVal, setMinVal] = useState(min);
	const [maxVal, setMaxVal] = useState(max);

	const range = useRef<HTMLInputElement>(null);

	// Convert to percentage
	const getPercent = useCallback((value: number) => Math.round(((value - min) / (max - min)) * 100), [min, max]);

	// Set width of the range to decrease from the left side
	useEffect(() => {
		const minPercent = getPercent(Math.max(minVal, min));
		const maxPercent = getPercent(Math.min(maxVal, max));
		if (range.current) {
			range.current.style.left = `${minPercent}%`;
			range.current.style.width = `${maxPercent - minPercent}%`;
		}
	}, [minVal, getPercent]);

	// Set width of the range to decrease from the right side
	useEffect(() => {
		const minPercent = getPercent(Math.max(minVal, min));
		const maxPercent = getPercent(Math.min(maxVal, max));

		if (range.current) {
			range.current.style.width = `${maxPercent - minPercent}%`;
		}
	}, [maxVal, getPercent]);

	useEffect(() => {
		onChange(minVal, maxVal);
	}, [minVal, maxVal]);

	useEffect(() => {
		setMinVal(min);
	}, [min]);

	useEffect(() => {
		setMaxVal(max);
	}, [max]);

	return (
		<div className="flex items-center justify-center">
			<input
				type="range"
				min={min}
				max={max}
				value={minVal}
				onChange={event => {
					const value = Math.min(Number(event.target.value), maxVal - 1);
					setMinVal(value);
				}}
				className={`thumb pointer-events-none absolute h-0 w-[12.5rem] outline-none  ${
					minVal > max - 100 ? 'z-[5]' : 'z-[3]'
				}`}
			/>
			<input
				type="range"
				min={min}
				max={max}
				value={maxVal}
				onChange={event => {
					const value = Math.max(Number(event.target.value), minVal + 1);
					setMaxVal(value);
				}}
				className="thumb z-[4] pointer-events-none absolute h-0 w-[12.5rem] outline-none"
			/>

			<div className="relative w-[12.5rem]">
				<div className="absolute rounded-sm h-1 z-[1] w-full bg-[#ced4da]" />
				<div ref={range} className="absolute rounded-sm h-1 bg-[#9fe5e1] z-[2]" />
				<div className="absolute text-black text-xs mt-5 left-0">{minVal}</div>
				<div className="absolute text-black text-xs mt-5 right-0">{maxVal}</div>
			</div>
		</div>
	);
};

export default MultiRangeSlider;
