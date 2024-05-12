import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md';

interface PropTypes {
	children: React.ReactNode;
}

const ScrollableContent = ({ children }: PropTypes) => {
	const scrollRef = useRef<HTMLUListElement>(null);
	const [showArrows, setShowArrows] = useState<boolean>(false);

	useEffect(() => {
		const checkOverflow = () => {
			const container = scrollRef.current;
			const hasOverflow = container ? container.scrollWidth > container.clientWidth : false;
			setShowArrows(hasOverflow);
		};

		checkOverflow();
		window.addEventListener('resize', checkOverflow);

		return () => window.removeEventListener('resize', checkOverflow);
	}, []);

	const scrollLeft = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
		}
	};

	const scrollRight = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
		}
	};

	return (
		<div className="relative flex flex-1 overflow-hidden">
			{showArrows && (
				<button
					onClick={scrollLeft}
					className="absolute left-0 z-10 top-1/2 -translate-y-1/2 p-2 button-scroll-left h-full"
				>
					<MdOutlineArrowBackIos />
				</button>
			)}
			<ul className="flex  gap-2 px-8 scroll-smooth whitespace-nowrap no-scrollbar overflow-auto" ref={scrollRef}>
				{children}
			</ul>
			{showArrows && (
				<button
					onClick={scrollRight}
					className="absolute right-0 z-10 top-1/2 -translate-y-1/2 p-2 button-scroll-right h-full"
				>
					<MdOutlineArrowForwardIos />
				</button>
			)}
		</div>
	);
};

export default ScrollableContent;
