const BreadCrumb = ({ title }) => {
	return (
		<div className="w-full px-3 sm:px-8 mt-5">
			<div className="w-full bg-[#D8F4E9] rounded-lg py-4 text-xl lg:text-2xl font-medium flex justify-center items-center capitalize">
				{title}
			</div>
		</div>
	);
};

export default BreadCrumb;
