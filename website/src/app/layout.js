import Header from "@/views/partials/Header";
import { Quicksand } from "next/font/google";
import "./globals.css";
import PathProvider from "./pathProvider";
import { ToastContainer } from "react-toastify";
import StoreProvider from "./StoreProvider";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata = {
	title: "En Route",
	description: "Your Personal AI Travel Assistant",
	image: "https://abc.single-solution.com/assets/home/hero1.webp",
	url: "https://abc.single-solution.com/",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon.png" type="image/png" />

				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
					integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
					crossOrigin="anonymous"
					referrerPolicy="no-referrer"
					precedence="default"
				/>
				<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />

				<meta name="description" content={metadata.description} />
				<meta name="twitter:title" content={metadata.title} />
				<meta name="twitter:description" content={metadata.description} />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:image" content={metadata.image} />
				<meta property="og:url" content={metadata.url} />
				<meta property="og:type" content="website" />
				<meta property="og:title" content={metadata.title} />
				<meta property="og:description" content={metadata.description} />
				<meta property="og:site_name" content={metadata.title} />
				<meta property="og:image" content={metadata.image} />
				<meta property="og:image:alt" content="En Route | Homepage " />
				<meta property="og:image:type" content="image/png" />
				<meta property="og:image:width" content={1200} />
				<meta property="og:image:height" content={630} />
			</head>
			<body className={quicksand.className}>
				<Header />
				<main className="w-full h-full md:pt-14">
					<StoreProvider>
						<ToastContainer />
						<PathProvider>{children}</PathProvider>
					</StoreProvider>
				</main>
			</body>
		</html>
	);
}
