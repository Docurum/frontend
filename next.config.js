/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.dicebear.com",
        port: "",
        pathname: "/api/personas/**",
      },
    ],
  },
};

module.exports = nextConfig;
