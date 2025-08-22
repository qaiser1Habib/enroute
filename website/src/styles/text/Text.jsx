import clsx from "clsx";

const Text = ({ children, bold = false }) => {
	return <p className={clsx("text-[16px]", bold ? "font-bold" : "font-light")}>{children}</p>;
};

export default Text;
