import clsx from "clsx";

const LightSection = ({ children, verticalSpacing = true }) => {
	return (
		<div className={clsx("w-full xl:container px-3 sm:px-8 2xl:px-0", verticalSpacing && "my-12 lg:my-40")}>{children}</div>
	);
};

export default LightSection;
