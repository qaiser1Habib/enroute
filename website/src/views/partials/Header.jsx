"use client";
import TypeWriterCard from "@/styles/cards/TypeWriterCard";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const Header = () => {
	const [showTypeWriter, setShowTypeWriter] = useState(false);
	const scrollListener = useRef(null);

	const pathname = usePathname();

	useEffect(() => {
		scrollListener.current = () => {
			const scrolled = window.scrollY > 430;
			if (scrolled !== showTypeWriter) setShowTypeWriter(scrolled);
		};

		window.addEventListener("scroll", scrollListener.current);
		return () => {
			window.removeEventListener("scroll", scrollListener.current);
		};
	}, [showTypeWriter]);

	return (
		<header
			className={clsx(
				"md:fixed w-full h-[61px] bg-white z-[999] top-0 left-0 transition-all duration-200 backdrop-filter backdrop-blur-lg bg-opacity-30 border-b border-gray-200",
				showTypeWriter && "shadow-lg"
			)}
		>
			<nav className="flex items-center justify-between px-3 sm:px-8 w-full h-full">
				{/* <MobileMenu isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} /> */}
				<Link href="/">
					<img src="/assets/transparent-logo.png" className="h-[45px] w-[150px] object-contain" alt="En-Route Logo" />
				</Link>
				{pathname === "/" && (
					<div
						className={`w-[45%] transform transition-all duration-500 ease-in-out ${
							showTypeWriter ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
						}`}
					>
						<TypeWriterCard />
					</div>
				)}

				<div className="space-x-2 xl:space-x-3">
					{pathname.startsWith("/chats") ? (
						<Link
							href="/help-center"
							className="px-4 py-2 bg-secondary text-white hover:bg-success transition duration-200 ease-in-out rounded-md lg:text-base xl:text-lg font-medium sm:space-x-2"
						>
							Help Center
						</Link>
					) : (
						<Link
							href="/chats"
							className="px-4 py-2 bg-secondary text-white hover:bg-success transition duration-200 ease-in-out rounded-md lg:text-base xl:text-lg font-medium sm:space-x-2"
						>
							<span className="hidden sm:inline">New Trip</span>
							<i className="bi bi-send-fill "></i>
						</Link>
					)}
				</div>

				{/* <div className="lg:hidden w-full text-end">
					<a className="text-white text-2xl">
						<i className="fa-solid fa-bars"></i>
					</a>
				</div> */}
			</nav>
		</header>
	);
};

export default Header;
