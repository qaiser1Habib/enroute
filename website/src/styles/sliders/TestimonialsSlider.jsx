import Marquee from "react-fast-marquee";
import ImageLoader from "../loaders/ImageLoader";

const testimonialCardData = [
	{
		title: "The Only Travel Assistant I Need!",
		name: "John D",
		userImage: "/assets/home/users/1.png",
		quoteImage: "/assets/home/block-quote.png",
		content:
			"From flights to accommodations, En Route took care of everything. The personalized suggestions were spot on, and I felt like I had a travel expert by my side.",
	},
	{
		title: "Game-Changer for My Travel Plans!",
		name: "Sarah M",
		userImage: "/assets/home/users/2.png",
		quoteImage: "/assets/home/block-quote.png",
		content:
			"I never knew planning a trip could be this easy! En Route helped me find amazing destinations and created a perfect itinerary. I can't imagine traveling without it!",
	},
	{
		title: "Incredible Travel Companion!",
		name: "Mark W",
		userImage: "/assets/home/users/3.png",
		quoteImage: "/assets/home/block-quote.png",
		content:
			"En Route made my vacation planning so much smoother. The tailored recommendations and the helpful chat feature made everything stress-free and fun!",
	},
	{
		title: "Effortless Planning with En Route!",
		name: "James L",
		userImage: "/assets/home/users/4.png",
		quoteImage: "/assets/home/block-quote.png",
		content:
			"En Route made my trip planning a breeze! The AI gave me spot-on destination ideas and the customized itinerary was exactly what I needed. Highly recommend!",
	},
];

const TestimonialsMarquee = () => {
	return (
		<div className="w-full xl:container px-3 sm:px-8 2xl:px-0 space-y-6">
			<div
				style={{
					maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
					WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
				}}
			>
				<Marquee pauseOnHover={true} speed={50} gradient={false}>
					{testimonialCardData.map((testimonial, index) => (
						<Card key={`row1-${index}`} {...testimonial} isEven={index % 2 === 0} />
					))}
				</Marquee>
			</div>

			<div
				style={{
					maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
					WebkitMaskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
				}}
			>
				<Marquee pauseOnHover={true} speed={40} gradient={false} direction="right">
					{testimonialCardData.map((testimonial, index) => (
						<Card key={`row2-${index}`} {...testimonial} isEven={index % 2 === 0} />
					))}
				</Marquee>
			</div>
		</div>
	);
};

const Card = ({ title, userImage, name, content, quoteImage, isEven }) => {
	return (
		<div className="cursor-pointer rounded-[25px] p-5 mx-2 max-w-[580px] min-h-[270px] flex-shrink-0 z-[999] relative border border-[#6F809A] dark:text-white dark:bg-dark-100">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-3 font-medium lg:text-[25px] mb-0">{title}</div>
			</div>
			{isEven && <img src={quoteImage} alt="quote" className="w-[116px] absolute top-3 right-10 -z-10 dark:opacity-5" />}
			<div className="mt-2 text-regular text-gray-400 dark:text-white relative text-start">{content}</div>
			<div className="flex items-center mt-14 gap-3">
				<div>
					<ImageLoader src={userImage} className="max-w-[60px] rounded-full" alt={name} width="60" height="60" />
				</div>
				<p className="font-medium xl:text-[17px]">{name}</p>
			</div>
			{!isEven && <img src={quoteImage} alt="quote" className="w-[116px] absolute bottom-3 right-10 -z-10 dark:opacity-5" />}
		</div>
	);
};

export default TestimonialsMarquee;
