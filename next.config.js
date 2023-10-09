/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.imgur.com",
            }
        ]
    },
    env: {
        NEXT_API_BASE_URL: process.env.NEXT_API_BASE_URL,
    }
}

module.exports = nextConfig
