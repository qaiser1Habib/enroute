"use client";
import clsx from "clsx";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";

const FaqAccordion = ({ title, text, dark = false }) => {
	return (
		<div className="w-full bg-white rounded-2xl">
			<Disclosure>
				<DisclosureButton
					className={clsx(
						"relative group z-1 flex justify-between items-center w-full p-4 text-left text-white  bg-secondary rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-opacity-75 transition duration-200 hover:shadow-lg",
						dark && "dark:bg-[radial-gradient(ellipse_at_bottom,_#35363A,_#35363A,_#35363A)]"
					)}
				>
					<span className="text-sm sm:text-lg font-medium truncate">{title}</span>

					<div
						className={`flex justify-center items-center w-5 h-5 transition-transform duration-300 ease-out  transform group-data-[open]:-rotate-180`}
					>
						<i className={`fa-solid fa-chevron-down text-white text-sm sm:text-base`}></i>
					</div>
				</DisclosureButton>
				<DisclosurePanel
					className={clsx(
						"px-4 pt-4 pb-2 text-gray-500 transition-[height,opacity] duration-500 ease-in-out border rounded-b-lg border-[#B8B8B8] -mt-2 shadow-lg",
						dark && "dark:bg-dark-400 dark:text-white  dark:border-dark-300"
					)}
				>
					<p className="text-base sm:text-lg px-2 py-3 sm:py-8">{text}</p>
				</DisclosurePanel>
			</Disclosure>
		</div>
	);
};

export default FaqAccordion;
