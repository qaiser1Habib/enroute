import clsx from "clsx";

const Title = ({ children, bold = true }) => {
	return (
		<h3 className={clsx("text-[24px] sm:text-[30px] lg:text-[34px] xl:text-[38px] leading-snug", bold ? "font-bold" : "font-medium")}>
			{children}
		</h3>
	);
};

export default Title;
