"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import { useRef } from "react";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import ImageLoader from "../loaders/ImageLoader";

const buttonVariants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.5, delay: 0.6 },
	},
};
const CustomButton = ({ onClick, direction, className }) => {
	return (
		<motion.button
			variants={buttonVariants}
			initial="hidden"
			animate="visible"
			onClick={onClick}
			className={`custom-button absolute z-30 size-[40px] top-1/2 rounded-md bg-success ${className} hidden lg:block`}
		>
			{direction === "next" ? (
				<i className="fa-solid fa-chevron-right text-white"></i>
			) : (
				<i className="fa-solid fa-chevron-left text-white"></i>
			)}
		</motion.button>
	);
};

const HeroSlider = () => {
	const swiperRef = useRef(null);

	const swiperParams = {
		modules: [EffectFade, Autoplay, Navigation, Pagination],
		spaceBetween: 20,
		effect: "fade",
		autoplay: true,
		grabCursor: true,
		loop: true,
	};

	return (
		<div className="group relative w-full xl:container px-3 sm:px-8 2xl:px-0 mt-8">
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
				className="rounded-2xl"
			>
				<div className="absolute inset-0 bg-[#000] bg-opacity-20 z-[51]" />
				<SwiperSlide>
					<ImageLoader
						src={`/assets/home/3.webp`}
						className="h-[530px] w-full object-cover rounded-2xl"
						width="2000"
						height="1000"
						alt="slide"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<ImageLoader
						src={`/assets/home/5.jpg`}
						className="h-[530px] w-full object-cover rounded-2xl"
						width="2000"
						height="1000"
						alt="slide"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<ImageLoader
						src={`/assets/home/6.jpg`}
						className="h-[530px] w-full object-cover rounded-2xl"
						width="2000"
						height="1000"
						alt="slide"
					/>
				</SwiperSlide>
				<SwiperSlide>
					<ImageLoader
						src={`/assets/home/7.jpg`}
						className="h-[530px] w-full object-cover rounded-2xl"
						width="2000"
						height="1000"
						alt="slide"
					/>
				</SwiperSlide>
			</Swiper>
			<CustomButton
				onClick={() => swiperRef.current.swiper.slidePrev()}
				className="prev left-10 2xl:left-5"
				direction="prev"
			/>
			<CustomButton
				onClick={() => swiperRef.current.swiper.slideNext()}
				className="next right-10 2xl:right-5"
				direction="next"
			/>
		</div>
	);
};

export default HeroSlider;
