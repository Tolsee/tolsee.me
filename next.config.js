/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    webpack: (config, { isServer }) => {
        if (isServer) {
        //     config.module.rules.push({
        //         test: /\.node$/,
        //         loader: "node-loader",
        //     });
        //
        //     config.externals["canvas"] = {};
        //     console.log(config.externals);
            config.externals.push("canvas");
            config.externals.push("utf-8-validate");
            config.externals.push("butterutil");
        //         canvas: "commonjs canvas",
        //         "utf-8-validate": "utf-8-validate",
        //         bufferutil: "bufferutil",
        //     });
        }

        return config;
    },
};

module.exports = nextConfig;
