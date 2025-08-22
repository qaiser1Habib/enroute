"use client";
import React, { useRef, useState, useEffect } from "react";

const filters = [
	"All",
	"Luxury Maldives Trip",
	"U.S. Road Trip",
	"Best Ski Resorts",
	"Romantic Tuscany Getaway",
	"Canadian Rockies Adventure",
	"European Backpacking",
	"Beach Getaways",
	"African Safari",
	"Japan Cherry Blossom Tour",
	"South American Expedition",
	"Himalayan Trek",
	"Australia Outback Adventure",
	"Caribbean Cruise",
	"Dubai Luxury Vacation",
	"Alaskan Wilderness Experience",
];

const TextSlider = () => {
	const scrollRef = useRef(null);
	const [showPrev, setShowPrev] = useState(false);
	const [showNext, setShowNext] = useState(true);

	const checkScroll = () => {
		if (scrollRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
			setShowPrev(scrollLeft > 0);
			setShowNext(scrollLeft + clientWidth < scrollWidth);
		}
	};

	useEffect(() => {
		checkScroll();
		scrollRef.current?.addEventListener("scroll", checkScroll);
		return () => scrollRef.current?.removeEventListener("scroll", checkScroll);
	}, []);

	const scrollNext = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
		}
	};

	const scrollPrev = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
		}
	};

	return (
		<div className="relative flex items-center space-x-2 w-full">
			{showPrev && (
				<button
					onClick={scrollPrev}
					className="absolute text-success cursor-pointer top-0 left-0 h-full flex justify-center items-center "
				>
					<div className="w-[40px] bg-white h-full flex justify-center items-center">
						<i className="fa-solid fa-chevron-left" />
					</div>
					<div className="h-full w-[50px] bg-gradient-to-r from-[#fff] from-[20%] to-[rgba(255,255,255,0)] to-[80%]" />
				</button>
			)}
			<div ref={scrollRef} className="flex space-x-4 overflow-x-auto scrollbar-hide whitespace-nowrap w-full py-2">
				{filters.map((filter, index) => (
					<div
						key={index}
						className="px-4 py-2 bg-[#F5F5F5] text-[#858585] hover:text-white rounded-md text-sm cursor-pointer hover:bg-secondary transition"
					>
						{filter}
					</div>
				))}
			</div>
			{showNext && (
				<button
					onClick={scrollNext}
					className="absolute text-success cursor-pointer top-0 right-0 h-full flex justify-center items-center "
				>
					<div className="h-full w-[50px] bg-gradient-to-l from-[#fff] from-[20%] to-[rgba(255,255,255,0)] to-[80%]" />
					<div className="w-[40px] bg-white h-full flex justify-center items-center">
						<i className="fa-solid fa-chevron-right" />
					</div>
				</button>
			)}
		</div>
	);
};

export default TextSlider;
