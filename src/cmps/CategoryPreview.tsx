import { ICategory } from '../types/expense';

interface PropTypes {
	category: ICategory;
}
const CategoryPreview = ({ category }: PropTypes) => {
	return (
		<li className="rounded-full border-slate-300 border py-1 px-4 flex items-center flex-shrink-0">
			<img src={category.imgUrl} alt="category" className="w-8 h-8 object-contain" />
			{category.txt}
		</li>
	);
};

export default CategoryPreview;
