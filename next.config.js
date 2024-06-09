/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: [
            "canvas",
            "prism",
            "gray-matter",
            "remark",
            "remark-html",
            "remark-prism",
        ],
    },
};

module.exports = nextConfig;
