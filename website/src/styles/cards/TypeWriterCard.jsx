"use client";
import clsx from "clsx";
import Image from "next/image";
 import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const TypeWriterCard = ({ showInHome = false }) => {
	const [message, setMessage] = useState("");

	const router = useRouter();
	const handleNavigate = (e, prompt) => {
		e?.preventDefault();
		router.push(`/chats?prompt=${encodeURIComponent(JSON.stringify(prompt))}`);
	};

	return (
		<div
			className={clsx(
				"bg-white rounded-lg w-full",
				showInHome ? "lg:w-[100%] p-3" : "py-1 px-2 border border-[#8a8a8a29] hidden md:block"
			)}
		>
			{showInHome ? (
				<form onSubmit={(e) => handleNavigate(e, message)}>
					<div className="flex justify-between mb-2">
						<Image
							src="/assets/logo.png"
							className="h-[40px] w-[144px] object-contain"
							alt="En-Route Logo"
							width="150"
							height="50"
							priority
						/>
						<button
							type="submit"
							className="px-4 py-2 bg-secondary hover:bg-success transition duration-200 text-white rounded-md lg:text-base xl:text-lg font-medium space-x-2 group"
						>
							<i className="bi bi-send-fill group-hover:text-success transition duration-200 ease-in-out inline sm:hidden"></i>
							<span className="hidden sm:inline">Ask Anything</span>
						</button>
					</div>
					<div className="px-2 h-[20px] mb-4 md:mb-10 w-full">
						<TypewriterPlaceholder
							setMessage={setMessage}
							placeholders={[
								"Welcome to EN Route.",
								"Suggest a 7 day family friendly road trip through U.S. national parks.",
								"Where can I see the northern lights?",
							]}
						/>
					</div>

					<div className="hidden md:block w-full h-[1px] bg-[#EFEFEF] rounded-full mb-2" />
					<div className="flex space-x-5 py-2 overflow-x-auto">
						<a
							onClick={(e) => handleNavigate(e, "Inspire me where to go")}
							className="bg-[#F5F5F5] hover:bg-transparent hover:shadow-md transition-all duration-200 py-1 px-3 rounded-md cursor-pointer text-nowrap"
						>
							Inspire me where to go
						</a>
						<a
							onClick={(e) => handleNavigate(e, "Create a new Trip")}
							className="bg-[#F5F5F5] hover:bg-transparent hover:shadow-md transition-all duration-200 py-1 px-3 rounded-md cursor-pointer text-nowrap"
						>
							Create a new Trip
						</a>
						<a
							onClick={(e) => handleNavigate(e, "Find family hotels")}
							className="bg-[#F5F5F5] hover:bg-transparent hover:shadow-md transition-all duration-200 py-1 px-3 rounded-md cursor-pointer text-nowrap"
						>
							Find family hotels
						</a>
						<a
							onClick={(e) => handleNavigate(e, "Build 7 day island hopping")}
							className="bg-[#F5F5F5] hover:bg-transparent hover:shadow-md transition-all duration-200 py-1 px-3 rounded-md cursor-pointer text-nowrap"
						>
							Build 7 day island hopping
						</a>
					</div>
				</form>
			) : (
				<form onSubmit={(e) => handleNavigate(e, message)} className="flex space-x-4">
					<Image
						src="/assets/en-logo.png"
						className="size-[35px] object-contain"
						alt="En-Route Logo"
						width="150"
						height="50"
						priority
					/>
					<TypewriterPlaceholder
						placeholders={[
							"Welcome to EN Route.",
							"Suggest a 7 day family friendly road trip through U.S. national parks.",
							"Where can I see the northern lights?",
						]}
						setMessage={setMessage}
					/>
					<button
						type="submit"
						className="size-[35px] rounded-md bg-secondary flex justify-center items-center transition duration-200 text-white hover:bg-success"
					>
						<i className="bi bi-send-fill leading-none" />
					</button>
				</form>
			)}
		</div>
	);
};

const TypewriterPlaceholder = ({ placeholders, typingSpeed = 100, delay = 2000, setMessage }) => {
	const [currentText, setCurrentText] = useState("");
	const [index, setIndex] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	const inputRef = useRef(null);

	useEffect(() => {
		const currentPlaceholder = placeholders[index];
		let timeout;

		if (isDeleting) {
			timeout = setTimeout(() => {
				setCurrentText((prev) => prev.slice(0, -1));
			}, typingSpeed / 2);
		} else {
			timeout = setTimeout(() => {
				setCurrentText((prev) => currentPlaceholder.slice(0, prev.length + 1));
			}, typingSpeed);
		}

		if (!isDeleting && currentText === currentPlaceholder) {
			setTimeout(() => setIsDeleting(true), delay);
		} else if (isDeleting && currentText === "") {
			setIsDeleting(false);
			setIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
		}

		return () => clearTimeout(timeout);
	}, [currentText, isDeleting, index, placeholders, typingSpeed, delay]);

	useEffect(() => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	}, []);

	return (
		<input
			ref={inputRef}
			type="text"
			onChange={(e) => setMessage(e?.target?.value)}
			placeholder={currentText}
			className="w-full text-gray-900 placeholder:text-gray-400 dark:placeholder:text-gray-300 dark:text-white dark:bg-dark-400 focus:outline-none sm:text-base sm:leading-6"
		/>
	);
};

export default TypeWriterCard;
