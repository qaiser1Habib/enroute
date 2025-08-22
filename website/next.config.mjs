/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "export",
	images: {
		unoptimized: true,
	},
	env: {
		VITE_APP_CLOUD_FRONT_URL: "https://dg9ijve7xmj07.cloudfront.net",
		VITE_APP_API_URL: "http://localhost:5010",
	},
};

export default nextConfig;
