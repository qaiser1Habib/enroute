"use client";
import ImageLoader from "../loaders/ImageLoader";
import { useRouter } from "next/navigation";

const GuideCard = ({ title, description, img }) => {
	const router = useRouter();
	const handleNavigate = (prompt) => {
		router.push(`/chats?query=${encodeURIComponent(JSON.stringify(prompt))}`);
	};
	return (
		<div className="bg-[#D6F2E7] w-full flex flex-col px-1 py-1 rounded-[10px] border border-[#CFCFCF]">
			<div className="w-full h-[230px]">
				<ImageLoader src={img} className="w-full h-full rounded-xl object-cover" width="300" height="200" alt={title} />
			</div>
			<div className="bg-white bg-opacity-50 backdrop-blur-xl py-2 rounded-[10px] px-2 flex flex-col -mt-7 pt-10">
				<div className="text-[18px] text-[#393939] font-medium line-clamp-1 mb-1">{title}</div>
				<p className="text-[14px] mb-2 text-[#8c8c8c] line-clamp-3">{description}</p>
				<div className="flex items-center justify-between mt-4 mb-1">
					<a
						onClick={() => handleNavigate(description)}
						className="text-[#888888] group-hover:text-[#393939] text-sm font-medium flex items-center cursor-pointer"
					>
						Learn More <i className="fa-solid fa-angle-right ml-1" />
					</a>
				</div>
			</div>
		</div>
	);
};

export default GuideCard;
