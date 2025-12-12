/** @type {import('next').NextConfig} */
import CopyWebpackPlugin from "copy-webpack-plugin";
import path from "path";
import fs from "fs";

const CWD_PATH = fs.realpathSync(process.cwd());

const nextConfig = {
  outputFileTracingRoot: path.join(CWD_PATH),
  serverExternalPackages: ['wasm-themis'],
  turbopack: {
    resolveAlias: {
      fs: { browser: './empty.ts' },
      path: { browser: './empty.ts' },
      crypto: { browser: './empty.ts' },
      ws: { browser: './empty.ts' },
    },
  },
  webpack: (config, { isServer }) => {
    // Enable async WebAssembly
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

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

    // Completely exclude wasm-themis from server bundle
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('wasm-themis');
    }

    // Force React to resolve from local node_modules only
    config.resolve.alias = {
      ...config.resolve.alias,
      react: path.join(CWD_PATH, "node_modules", "react"),
      "react-dom": path.join(CWD_PATH, "node_modules", "react-dom"),
    };

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
