"use client";
import { useState } from "react";
import clsx from "clsx";
import Image from "next/image";

const ImageLoader = ({ src, style, className, alt, width, height }) => {
	const [isLoading, setIsLoading] = useState(true);
	const defaultPlaceholder = `${process.env.VITE_APP_API_URL.VITE_APP_CLOUD_FRONT_URL}/placeholder.webp`;

	return (
		<div className="relative w-full h-full flex z-50">
			{isLoading && <div className={clsx("absolute inset-0 animate-pulse bg-gray-200", className)} style={style} />}
			<Image
				src={!src?.includes("undefined") ? src : defaultPlaceholder}
				onLoad={() => setIsLoading(false)}
				className={clsx(className, "transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100")}
				width={width}
				height={height}
				style={style}
				alt={alt}
			/>
		</div>
	);
};

export default ImageLoader;
