import FaqAccordion from "@/styles/accordion/FaqAccordion";
import LightSection from "@/styles/containers/LightSection";
import Text from "@/styles/text/Text";
import Title from "@/styles/text/Title";
import BreadCrumb from "@/views/partials/BreadCrumb";

const page = () => {
	return (
		<div className="w-full animate-fadeIn">
			<BreadCrumb title="help center" />
			<LightSection>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
					<div>
						<div className="space-y-3">
							<Title Title>Get in Touch with Us</Title>

							<Text>
								We’re Here to Help Whether you have questions about our services, need assistance with your account.
							</Text>
						</div>
						<div className="space-y-7 mt-10">
							<div className="w-full p-4 text-left text-white bg-secondary rounded-lg transition duration-200 hover:shadow-xl">
								<i className="fa-solid fa-location-dot text-lg me-2" />1 Kingsbury Mews, Windsor, Berkshire, SL4 5GS{" "}
							</div>
							<div className="w-full p-4 text-left text-white bg-secondary rounded-lg transition duration-200 hover:shadow-xl">
								<i className="fa-regular fa-envelope text-lg me-2" />
								Info@enroute2.co
							</div>
						</div>
					</div>
					<div>
						<div className="border border-[#B8B8B8] bg-[#F6F6F6] w-full flex flex-col py-5 px-4 sm:px-8 rounded-2xl hover:shadow-xl hover:cursor-pointer transition-shadow duration-300 h-full">
							<div className="w-ful h-full">
								<p className="block text-lg xl:text-xl font-normal leading-6 text-[#535353]">Contact Form</p>
								<h1 className="text-xl xl:text-2xl text-black font-bold my-10">
									Fill out the form below with any questions you have!
								</h1>
								<form className="w-full">
									<div className="mb-5">
										<label htmlFor="name" className="block text-lg xl:text-xl font-medium leading-6 text-gray-900">
											Full Name
										</label>
										<div className="relative mt-3 rounded-md shadow-sm">
											<input
												type="text"
												name="name"
												id="name"
												className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#2C83E9] focus:outline-none sm:text-sm sm:leading-6"
												placeholder="Full Name*"
											/>
										</div>
									</div>
									<div className="mb-5">
										<label htmlFor="email" className="block text-lg xl:text-xl font-medium leading-6 text-gray-900">
											Email
										</label>
										<div className="relative mt-3 rounded-md shadow-sm">
											<input
												type="mail"
												name="email"
												id="email"
												className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#2C83E9] focus:outline-none sm:text-sm sm:leading-6"
												placeholder="email@example.com*"
											/>
										</div>
									</div>
									<div>
										<label htmlFor="message" className="block text-lg xl:text-xl font-medium leading-6 text-gray-900">
											Message
										</label>
										<div className="relative mt-3 rounded-md shadow-sm">
											<textarea
												name="message"
												id="message"
												rows={5}
												className="block w-full rounded-md border-0 py-2 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#2C83E9] focus:outline-none sm:text-sm sm:leading-6"
												placeholder="Additional Message"
												defaultValue={""}
											/>
										</div>
									</div>
									<div className="w-full flex justify-center my-5">
										<a className="px-6 py-1 mt-5 sm:mt-14 text-white hover:text-secondary hover:bg-transparent border border-transparent hover:border-secondary bg-secondary rounded-3xl lg:text-base font-medium transition duration-200 ease-in-out flex items-center cursor-pointer">
											Submit
										</a>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</LightSection>
			<LightSection>
				<div className="grid grid-cols-1 lg:grid-cols-[60%,_35%] mt-16 gap-y-12 lg:gap-y-0 gap-x-12">
					<div>
						<div className="space-y-5 lg:space-y-12 h-full">
							<FaqAccordion
								title="Is it free to use?"
								text="Yes, En Route is free to use for planning and getting travel recommendations. While booking flights, accommodations, or activities through third-party services may involve fees, the AI tool itself does not charge for providing suggestions or helping you plan your trip."
							/>
							<FaqAccordion
								title="How does the AI know my travel preferences?"
								text="The AI learns your preferences through interactions with you, such as the destinations you search for, the types of activities you enjoy, and feedback you provide. It tailors future suggestions based on these inputs to make your travel planning more personalized"
							/>
							<FaqAccordion
								title="How does the AI integrate with Booking.com or GetYourGuide?"
								text="En Route is integrated with leading travel sites like Booking.com and GetYourGuide, meaning you can access real-time data for bookings, activities, and attractions all in one place. You can easily view more details or click to book directly from the AI’s suggestions."
							/>
							<FaqAccordion
								title="Will the AI suggest budget-friendly options?"
								text="Yes, En Route can provide suggestions within your preferred budget. Whether you're looking for budget accommodations, affordable activities, or cheap flights, the AI helps you find the best options that match your price range."
							/>
							<FaqAccordion
								title="Can I customize the travel plan to suit my preferences?"
								text="Absolutely! You can customize your itinerary by adjusting preferences such as budget, travel dates, types of activities, and even special requests like dietary needs or accessibility requirements."
							/>
							<FaqAccordion
								title="How accurate is the AI in recommending destinations and activities?"
								text="Our AI uses real-time data and advanced algorithms to provide personalized recommendations based on your preferences, past trips, and popular destinations. However, we always recommend reviewing suggestions to ensure they match your specific interests."
							/>
							<FaqAccordion
								title="How can I get the best responses from the AI?"
								text="To get the best responses, be as specific as possible when describing your travel preferences. Let the AI know your budget, preferred destinations, types of activities you enjoy, and any special requests. The more details you provide, the more personalized and relevant the recommendations will be!"
							/>
						</div>
					</div>
					<div>
						<div className="border bg-[#F6F6F6] border-[#B8B8B8] w-full flex flex-col py-5 px-4 sm:px-8 rounded-2xl hover:shadow-xl hover:cursor-pointer transition-shadow duration-300 h-full">
							<div className="w-ful h-full">
								<h1 className="text-xl xl:text-2xl text-black font-bold">Contact Info</h1>
								<div className="text-base lg:text-lg xl:text-xl border-b border-[#D0CECE] py-5">
									<i className="fa-solid fa-location-dot text-[#696969] text-base me-2"></i> 1 Kingsbury Mews, Windsor,
									Berkshire, SL4 5GS{" "}
								</div>
								<div className="text-base lg:text-lg xl:text-xl border-b border-[#D0CECE] py-5">
									<i className="fa-regular fa-envelope text-[#696969] text-base me-2"></i> Info@enroute2.co
								</div>

								<div className="my-8">
									<h1 className="text-xl xl:text-2xl text-black font-bold">Social Links</h1>
									<div className="flex items-center space-x-1  sm:space-x-5 mt-6">
										<a
											href="https://www.facebook.com/"
											className="w-[50px] h-[50px] bg-secondary hover:bg-success text-white  transition duration-200 cursor-pointer rounded-full flex justify-center items-center hover:shadow-xl hover:shadow-black/15"
										>
											<i className="fa-brands fa-facebook-f text-base xl:text-lg"></i>
										</a>
										<a
											href="https://www.linkedin.com"
											className="w-[50px] h-[50px] bg-secondary hover:bg-success text-white transition duration-200 cursor-pointer  rounded-full flex justify-center items-center hover:shadow-xl hover:shadow-black/15"
										>
											<i className="fa-brands fa-linkedin-in text-base xl:text-lg "></i>
										</a>
										<a
											href="https://www.instagram.com"
											className="w-[50px] h-[50px] bg-secondary  hover:bg-success text-white transition duration-200 cursor-pointer rounded-full flex justify-center items-center hover:shadow-xl hover:shadow-black/15"
										>
											<i className="fa-brands fa-instagram text-base xl:text-lg"></i>
										</a>
										<a
											href="https://x.com/"
											className="w-[50px] h-[50px] bg-secondary hover:bg-success text-white  transition duration-200 cursor-pointer  rounded-full flex justify-center items-center hover:shadow-xl hover:shadow-black/15"
										>
											<i className="fa-brands fa-x-twitter text-base xl:text-lg"></i>
										</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</LightSection>
		</div>
	);
};

export default page;
