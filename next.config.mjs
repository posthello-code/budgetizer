/** @type {import('next').NextConfig} */
import CopyWebpackPlugin from "copy-webpack-plugin";
import path from "path";
import fs from "fs";

const CWD_PATH = fs.realpathSync(process.cwd());

const nextConfig = {
  webpack: (config) => {
    if (!config.plugins) {
      config.plugins = [];
    }
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(
              CWD_PATH,
              "node_modules",
              "wasm-themis/src/libthemis.wasm"
            ),
            to: "static/chunks/app",
          },
        ],
      })
    );
    config.resolve.fallback = {
      crypto: false,
      fs: false,
      http: false,
      https: false,
      net: false,
      path: false,
      stream: false,
      tls: false,
      util: false,
      url: false,
      zlib: false,
      ws: false,
    };

    return config;
  },
};

export default nextConfig;
