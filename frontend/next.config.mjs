import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {

	// Allow the production build to succeed even if ESLint reports problems.
	// This is a temporary guard so Vercel builds don't fail on lint-only issues.
	eslint: {
		ignoreDuringBuilds: true,
	},

	webpack(config) {
		config.resolve = config.resolve || {};
		config.resolve.alias = {
			...(config.resolve.alias || {}),
			'@react-native-async-storage/async-storage': path.resolve(
				process.cwd(),
				'src/shims/async-storage.js'
			),
		};
		return config;
	},
};

export default nextConfig;
