/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
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
