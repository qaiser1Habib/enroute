import clsx from "clsx";

const ModalButton = (props) => {
	return (
		<button
			onClick={props.onClick}
			disabled={props.disabled}
			type={props.type}
			className={clsx(
				`flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition duration-200`,
				props.disabled && "opacity-50 cursor-default",
				props.fullWidth && "w-full",
				props.secondary && "bg-[#F8F8F8] hover:bg-[#F2F2F2] text-black border",
				props.primary && "bg-[#151B37] hover:bg-[#080F2C] text-white",
				props.danger && "bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600 text-white"
			)}
		>
			{props.children}
		</button>
	);
};

export default ModalButton;
