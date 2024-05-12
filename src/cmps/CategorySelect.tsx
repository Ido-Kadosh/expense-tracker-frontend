import { useEffect, useRef, useState } from 'react';
import { ICategory } from '../types/expense';
import { expenseService } from '../services/expense.service';
import CategoryPreview from './CategoryPreview';

const categories = expenseService.getCategories();

interface PropTypes {
	selectedCategories: ICategory[];
	onChange: (category: ICategory, isChecked: boolean) => void;
}
const CategorySelect = ({ selectedCategories, onChange }: PropTypes) => {
	const [isExpanded, setIsExpanded] = useState<boolean>(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (ev: MouseEvent) => {
			if (containerRef.current && !containerRef.current.contains(ev.target as Node)) {
				setIsExpanded(false);
			}
		};
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, []);

	return (
		<div ref={containerRef} className="relative">
			<ul className="primary-input flex flex-wrap gap-3" onClick={() => setIsExpanded(prev => !prev)}>
				{selectedCategories.map(category => (
					<CategoryPreview key={category.id} category={category} />
				))}
				{!selectedCategories.length && <div>No Categories Selected</div>}
			</ul>
			{isExpanded && (
				<ul className="absolute bg-white w-full border p-4">
					{categories.map(category => {
						const isChecked = selectedCategories.findIndex(c => c.id === category.id) !== -1;
						return (
							<li
								key={category.id}
								className="flex items-center justify-between hover:bg-gray-50 cursor-pointer"
								onClick={() => onChange(category, isChecked)}
							>
								<div className="flex items-center">
									<img src={category.imgUrl} alt="category image" className="w-8 h-8" />
									<span>{category.txt}</span>
								</div>
								<input type="checkbox" checked={isChecked} readOnly />
							</li>
						);
					})}
				</ul>
			)}
		</div>
	);
};

export default CategorySelect;
