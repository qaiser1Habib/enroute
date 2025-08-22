import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	const date = new Date();
	const year = date.getFullYear();
	const currentYear = year.toString();

	return (
		<footer className="w-full px-3 sm:px-5 py-8 mt-5 lg:mt-8 bg-[#D8F4E9]">
			<div className="xl:container">
				<div className="grid grid-cols-2 md:grid-cols-4   gap-y-10 lg:gap-y-0 gap-x-14">
					<div className="col-span-2 md:col-span-4 lg:col-auto mb-7 lg:mb-0">
						<div className="flex flex-col space-y-4 lg:space-y-4">
							<Link href="/">
								<Image
									src="/assets/transparent-logo.png"
									className="h-[40px] w-[144px] object-contain"
									alt="En-Route Logo"
									width="150"
									height="50"
									priority
								/>
								<p className="text-sm font-normal text-[#878787] mt-2">Your Personal AI Travel Assistant</p>
							</Link>
						</div>
					</div>
					<div className="space-y-4">
						<h3 className="text-base xl:text-lg font-bold">EN ROUTE</h3>
						<ul className="space-y-3">
							<li>
								<Link
									className="text-sm xl:text-base font-medium text-[#878787] hover:text-success transition duration-200 "
									href="/"
								>
									Home
								</Link>
							</li>
							<li>
								<Link
									className="text-sm xl:text-base font-medium text-[#878787] hover:text-success transition duration-200 "
									href="/help-center"
								>
									Contact us
								</Link>
							</li>
						</ul>
					</div>
					<div className="space-y-4">
						<h3 className="text-base xl:text-lg font-bold">Helpful Links</h3>

						<ul className="space-y-3">
							<li>
								<Link
									className="text-sm xl:text-base font-medium text-[#878787] hover:text-success transition duration-200 "
									href="/help-center"
								>
									Help Center
								</Link>
							</li>
							<li>
								<Link
									className="text-sm xl:text-base font-medium text-[#878787] hover:text-success transition duration-200 "
									href="/privacy-policy"
								>
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link
									className="text-sm xl:text-base font-medium text-[#878787] hover:text-success transition duration-200 "
									href="/terms-service"
								>
									Terms of Service
								</Link>
							</li>
						</ul>
					</div>
					<div className="space-y-4">
						<h3 className="text-base xl:text-lg font-bold">Social Links</h3>
						<div className="flex items-center space-x-1">
							<a
								href="https://www.facebook.com/"
								className="size-[30px] cursor-pointer hover:text-success transition duration-200"
							>
								<i className="fa-brands fa-facebook-f text-xl" />
							</a>
							<a
								href="https://www.linkedin.com/"
								className="size-[30px] cursor-pointer hover:text-success transition duration-200"
							>
								<i className="fa-brands fa-linkedin-in  text-xl" />
							</a>
							<a
								href="https://www.instagram.com/"
								className="size-[30px] cursor-pointer hover:text-success transition duration-200"
							>
								<i className="fa-brands fa-instagram text-xl" />
							</a>
							<a href="https://x.com/" className="size-[30px] cursor-pointer hover:text-success transition duration-200">
								<i className="fa-brands fa-x-twitter text-xl" />
							</a>
						</div>
					</div>
				</div>
				<div className="hidden md:block w-full h-[1px] mt-12 bg-[#D0D0D0] rounded-full" />
				<div className="w-full pt-7 text-center">
					<p className="text-[12px] sm:text-base font-light">
						Copyright © {currentYear + " "}
						<span className="hover:text-secondary transition-all duration-200 font-medium cursor-pointer">EN ROUTE</span>.
						All Rights Reserved. Design by{" "}
						<a
							href="https://single-solution.com/"
							className="hover:text-red-500 transition-all duration-200 font-medium"
							target="_blank"
							rel="noopener noreferrer"
						>
							Single Solution.
						</a>
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
