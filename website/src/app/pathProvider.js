"use client";
import Footer from "@/views/partials/Footer";
import { usePathname } from "next/navigation";

export default function PathProvider({ children }) {
	const pathname = usePathname();
	const isChatsRoute = pathname.startsWith("/chats");
	return (
		<>
			{children}
			{!isChatsRoute && <Footer />}
		</>
	);
}
