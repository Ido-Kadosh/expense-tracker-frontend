import { ICategory } from '../types/expense';

interface PropTypes {
	category: ICategory;
	onClick?: (category: ICategory) => void;
}
const CategoryPreview = ({ category, onClick }: PropTypes) => {
	return (
		<li
			onClick={() => {
				onClick?.(category); // only run onClick if exists
			}}
			className={`rounded-full border-slate-300 border py-1 px-4 flex items-center flex-shrink-0 ${
				onClick ? 'cursor-pointer' : 'cursor-auto'
			}`}
		>
			<img src={category.imgUrl} alt="category" className="w-8 h-8 object-contain" />
			{category.txt}
		</li>
	);
};

export default CategoryPreview;
