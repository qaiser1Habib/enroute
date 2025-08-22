import HeroSlider from "@/styles/sliders/HeroSlider";
import TypeWriterCard from "@/styles/cards/TypeWriterCard";
import PartnersSlider from "@/styles/sliders/PartnersSlider";
import LightSection from "@/styles/containers/LightSection";
import Title from "@/styles/text/Title";
import Text from "@/styles/text/Text";
import FiltersSlider from "@/styles/sliders/FiltersSlider";
import GuideCard from "@/styles/cards/GuideCard";
import Image from "next/image";
import TestimonialsSlider from "@/styles/sliders/TestimonialsSlider";
import Link from "next/link";
import ImageLoader from "@/styles/loaders/ImageLoader";

export default function Home() {
	return (
		<div className="w-full animate-fadeIn">
			<section className="relative">
				<HeroSlider />
				<div className="w-full xl:container px-3 sm:px-8 2xl:px-0">
					<div className="w-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 flex justify-center ">
						<div className="w-full md:w-auto text-center flex flex-col items-center px-8 2xl:px-0">
							<div className="text-white">
								<h1 className="text-xl font-bold leading-normal sm:text-2xl md:text-4xl lg:text-5x">
									Your Dream Trip Starts Here
								</h1>
								<h2 className="text-lg font-normal leading-normal md:text-xl lg:text-2xl mt-3 mb-8">
									Plan the perfect getaway with AI-powered recommendations
								</h2>
							</div>
							<TypeWriterCard showInHome={true} />
						</div>
					</div>
				</div>
			</section>
			<section className="w-full xl:container mt-12 lg:mt-16 px-3 sm:px-8 2xl:px-0 text-center">
				<Title bold={false}>
					Powered by The Biggest <span className="text-success">Travel Names</span>
				</Title>
				<div className="sm:pt-4">
					<PartnersSlider />
				</div>
			</section>
			<LightSection>
				<div className="w-full text-center space-y-4 flex justify-center flex-col items-center">
					<Title bold={false}>
						Guides for your Next <span className="text-success">Vacation</span>
					</Title>
					<div className="w-full xl:w-[60%] text-[#8C8C8C]">
						<Text bold={false}>
							Not sure where to go next? Explore our expertly curated travel guides to find the perfect destination for
							your dream getaway.
						</Text>
					</div>
					<FiltersSlider />
				</div>
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-16">
					<GuideCard
						title="Top Tropical Beaches"
						description="Discover the most stunning beaches with crystal-clear waters and white sand."
						img="/assets/home/places/1.webp"
					/>
					<GuideCard
						title="Best Hiking Destinations"
						description="Explore breathtaking trails and scenic landscapes for your next adventure."
						img="/assets/home/places/2.webp"
					/>
					<GuideCard
						title="Immersive Cultural Experiences"
						description="Step into history and tradition with these must-visit cultural hotspots."
						img="/assets/home/places/3.webp"
					/>
					<GuideCard
						title="Top Family Friendly Spots"
						description="Plan a trip everyone will love with these kid-friendly destinations."
						img="/assets/home/places/4.webp"
					/>
					<GuideCard
						title="Best Resorts & Cruises"
						description="Indulge in top-tier hospitality, fine dining, and breathtaking views."
						img="/assets/home/places/5.webp"
					/>
					<GuideCard
						title="Affordable Destinations"
						description="Travel smart with these wallet-friendly vacation ideas."
						img="/assets/home/places/6.webp"
					/>
					<GuideCard
						title="Best Culinary Destinations"
						description="Experience world-class cuisine, wine tastings, and street food delights."
						img="/assets/home/places/7.webp"
					/>
					<GuideCard
						title="Top Destinations for Solo Travelers"
						description="Safe, exciting, and unforgettable places to explore on your own."
						img="/assets/home/places/8.webp"
					/>
				</div>
				<div className="flex items-center justify-center">
					<a className="px-4 py-1 mt-5 sm:mt-14 text-white hover:text-secondary hover:bg-transparent border border-transparent hover:border-secondary bg-secondary rounded-3xl lg:text-base font-medium transition duration-200 ease-in-out flex items-center cursor-pointer">
						<span>See More</span> <i className="fa-solid fa-angle-right ml-1 "></i>
					</a>
				</div>
			</LightSection>
			<LightSection>
				<div className="grid lg:grid-cols-[54%,_45%] gap-y-10 lg:gap-y-0 lg:gap-x-4">
					<div className="flex items-center">
						<div className="w-full h-full">
							<Title bold={false}>
								Simplify travel planning with En Route, your AI-powered{" "}
								<span className="text-success">Travel Assistant.</span>
							</Title>
							<div className="my-5 text-[#8C8C8C]">
								<Text>
									Meet En Route, your new travel sidekick. Whether you’re dreaming of exotic getaways, searching for the
									best places to stay, or planning scenic road trips, En Route has you covered. Forget juggling multiple
									apps and websites – just chat with En Route for personalized recommendations.
								</Text>
							</div>
							<ul className="space-y-5">
								<li className="flex space-x-2 items-center">
									<div className="size-6 rounded-sm bg-primary text-white flex items-center justify-center p-1 lg:p-0">
										<i className="fa-solid fa-check text-base" />
									</div>
									<Text>Ask En Route for tailored destination suggestions.</Text>
								</li>
								<li className="flex space-x-2 items-center">
									<div className="size-6 rounded-sm bg-primary text-white flex items-center justify-center p-1 lg:p-0">
										<i className="fa-solid fa-check text-base" />
									</div>
									<Text>
										En Route AI chat integrates with sites like{" "}
										<a className="text-success cursor-pointer hover:underline">Booking.com</a> for real-time travel data
										& easy booking.
									</Text>
								</li>
								<li className="flex space-x-2 items-center">
									<div className="size-6 rounded-sm bg-primary text-white flex items-center justify-center p-1 lg:p-0">
										<i className="fa-solid fa-check text-base" />
									</div>
									<Text>Receive a customized itinerary to make the most of your vacation days.</Text>
								</li>
								<li className="flex space-x-2 items-center">
									<div className="size-6 rounded-sm bg-primary text-white flex items-center justify-center p-1 lg:p-0">
										<i className="fa-solid fa-check text-base" />
									</div>
									<Text>
										To get the most out of the En Route, please check out the{" "}
										<Link href="/help-center" className="text-success cursor-pointer hover:underline">
											Help Centre
										</Link>{" "}
										questions.
									</Text>
								</li>
							</ul>
							<div className="flex mt-8">
								<Link
									href="/chats"
									className="px-4 py-1  text-white hover:text-secondary hover:bg-transparent border border-transparent hover:border-secondary bg-secondary rounded-3xl lg:text-base font-medium transition duration-200 ease-in-out flex items-center cursor-pointer"
								>
									<span>Plan a new trip</span> <i className="fa-solid fa-angle-right ml-1 "></i>
								</Link>
							</div>
						</div>
					</div>
					<div className="relative flex items-center">
						<div className="absolute inset-0 w-full h-full text-white p-4 flex items-end bg-[#000] bg-opacity-20 z-[51] rounded-xl">
							<h5 className="text-[24px] sm:text-[30px] capitalize">Over 100,000 trips planned & counting!</h5>
						</div>
						<ImageLoader
							src="/assets/home/4.webp"
							className="w-full h-full object-cover rounded-xl"
							width="800"
							height="400"
							alt="Simplify travel"
						/>
					</div>
				</div>
			</LightSection>
			<LightSection>
				<div className="py-5">
					<div className="bg-[#D8F4E9] rounded-xl flex flex-wrap">
						<div className="py-7 px-5 w-full md:w-[60%]">
							<h4 className="text-[34px] font-medium text-success">Ready to Plan Your Perfect Trip?</h4>
							<div className="w-full text-[#8C8C8C]">
								<Text bold={false}>
									Start your journey with En Route today! Let our AI travel assistant create a personalized itinerary
									just for you. No more stress, no more hassle – just amazing trips waiting to happen.
								</Text>
							</div>
							<div className="flex mt-8">
								<Link
									href="/chats"
									className="px-4 py-1  text-white hover:text-success hover:bg-transparent border border-transparent hover:border-success bg-success rounded-3xl lg:text-base font-medium transition duration-200 ease-in-out flex items-center cursor-pointer"
								>
									<span>Chat with En Route Now</span> <i className="fa-solid fa-angle-right ml-1 "></i>
								</Link>
							</div>
						</div>
						<div className="py-2 px-4 w-full md:w-[40%]">
							<Image
								src="/assets/home/cta.webp"
								width={500}
								height={400}
								className="w-full h-full object-cover rounded-xl"
								alt="hero"
							/>
						</div>
					</div>
				</div>
			</LightSection>

			<div className="w-full text-center space-y-4 flex justify-center flex-col items-center my-12 lg:my-40">
				<Title bold={false}>
					What Travelers Are Saying About <span className="text-success">En Route</span>
				</Title>
				<div className="w-full xl:w-[60%] text-[#8C8C8C]">
					<Text bold={false}>
						See why travelers love using En Route to plan their perfect trips. Real stories from real users who’ve
						discovered how easy and exciting travel planning can be with the help of our AI-powered assistant.
					</Text>
				</div>
				<TestimonialsSlider />
			</div>
		</div>
	);
}
