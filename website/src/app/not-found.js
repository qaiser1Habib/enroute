import LightSection from "@/styles/containers/LightSection";
import Text from "@/styles/text/Text";
import Title from "@/styles/text/Title";
import Link from "next/link";

const ErrorPage = () => {
	return (
		<div className="w-full animate-fadeIn flex flex-col">
			<LightSection>
				<div className="w-full flex justify-center">
					<div className="w-full xl:w-[50%] text-center space-y-6">
						<span className="text-base sm:text-lg xl:text-2xl text-success font-normal">404 Page Not Found</span>
						<Title>Oops!</Title>
						<div>
							<Text>
								The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
							</Text>
						</div>
						<div className="mt-10 flex justify-center">
							<Link
								href="/"
								className="font-normal text-base lg:text-lg border border-transparent rounded-md md:rounded-lg px-5 py-1 transition duration-300 ease-in-out hover:bg-transparent bg-success hover:border-success hover:text-success text-white"
							>
								Go to Home Page
							</Link>
						</div>
					</div>
				</div>
			</LightSection>
		</div>
	);
};

export default ErrorPage;
