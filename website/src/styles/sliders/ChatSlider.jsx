"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import ImageLoader from "../loaders/ImageLoader";

const ChatSlider = () => {
	const swiperParams = {
		modules: [EffectFade, Autoplay, Navigation, Pagination],
		spaceBetween: 20,
		effect: "fade",
		autoplay: true,
		grabCursor: true,
		loop: true,
	};

	return (
		<div className="absolute w-full h-full pt-1">
			<Swiper
				{...swiperParams}
				autoplay={true}
				pagination={{
					clickable: true,
				}}
				className="w-full h-full rounded-s-3xl"
			>
				<SwiperSlide className="w-full">
					<ImageLoader
						src={`/assets/home/1.webp`}
						className="h-full w-full object-cover"
						width="2000"
						height="1000"
						alt="slide"
					/>
				</SwiperSlide>
				<SwiperSlide className="w-full">
					<ImageLoader
						src={`/assets/home/2.webp`}
						className="h-full w-full object-cover"
						width="2000"
						height="1000"
						alt="slide"
					/>
				</SwiperSlide>
			</Swiper>
		</div>
	);
};

export default ChatSlider;
