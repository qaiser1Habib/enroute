"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import { useRef } from "react";
import { motion } from "framer-motion";
import ImageLoader from "../loaders/ImageLoader";

const buttonVariants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.5, delay: 2.2 },
	},
};
const CustomButton = ({ onClick, direction, className }) => {
	return (
		<motion.button
			variants={buttonVariants}
			initial="hidden"
			animate="visible"
			onClick={onClick}
			className={`custom-button absolute size-[40px] rounded-full bg-secondary ${className} hidden lg:block`}
		>
			{direction === "next" ? (
				<i className="fa-solid fa-arrow-right text-white"></i>
			) : (
				<i className="fa-solid fa-arrow-left text-white"></i>
			)}
		</motion.button>
	);
};
const PartnersSlider = () => {
	const swiperRef = useRef(null);

	const swiperParams = {
		modules: [Autoplay, Pagination],
		spaceBetween: 20,
		autoplay: true,
		grabCursor: true,
		loop: true,
		breakpoints: {
			0: {
				slidesPerView: 2,
			},
			568: {
				slidesPerView: 3,
			},
			768: {
				slidesPerView: 4,
			},
			992: {
				slidesPerView: 5,
			},
		},
	};

	return (
		<div className="relative w-full py-3 xl:container lg:py-6">
			<div className="mx-auto w-full lg:w-[90%]">
				<Swiper
					ref={swiperRef}
					{...swiperParams}
					navigation={{
						prevEl: ".custom-button.prev",
						nextEl: ".custom-button.next",
					}}
					autoplay={true}
					pagination={{
						clickable: true,
					}}
					className="TestimonialSlider"
				>
					{[...Array(6)].map((_, index) => (
						<SwiperSlide key={index}>
							<div className="w-[100%] h-[55px] py-1 px-2">
								<ImageLoader
									src={`/assets/home/partners/client${index + 1}.png`}
									className="w-[100%] h-[100%] object-contain"
									alt="slide"
									width="200"
									height="70"
								/>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
			<CustomButton onClick={() => swiperRef.current.swiper.slidePrev()} className="prev bottom-8 left-0" direction="prev" />
			<CustomButton onClick={() => swiperRef.current.swiper.slideNext()} className="next bottom-8 right-0" direction="next" />
		</div>
	);
};

export default PartnersSlider;
