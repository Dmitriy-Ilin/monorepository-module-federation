import webpack from "webpack";
import path from 'path';
import {buildWebpack, BuildMode, BuildPaths, BuildPlatform, BuildOptions} from '@packages/build-config'
import packageJson from './package.json';

interface EnvVariables {
  mode?: BuildMode;
  analyzer?: boolean;
  port?: number;
  platform?: BuildPlatform;
}

// "start": "node index.js",

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, 'build'),
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public')
  }
  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 3002,
    mode: env.mode ?? 'development',
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? 'desctop'
  })

  config.plugins.push(new webpack.container.ModuleFederationPlugin({
    name: 'admin',
    filename: 'remoteEntry.js',
    exposes: {
      // './App': path.resolve(paths.src, 'components', 'App', 'Router.tsx'),
      './Router': './src/router/Router.tsx'
    },
    shared: {
      ...packageJson.dependencies,
      react: {
        eager: true,
        requiredVersion: packageJson.dependencies['react']
      },
      'react-router-dom': {
        eager: true,
        requiredVersion: packageJson.dependencies['react-router-dom']
      },
      'react-dom': {
        eager: true,
        requiredVersion: packageJson.dependencies['react-dom']
      }
    }
  }))

  return config
}

// "build": "webpack"



// import path from 'path';
// import webpack from 'webpack';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
// import MiniCssExtractPlugin from "mini-css-extract-plugin";

// type Mode = 'production' | 'development'

// interface EnvVariables {
//   mode: Mode;
//   port: number;
// }

// "start": "node index.js",

// export default (env: EnvVariables) => {
//     const isDev = env.mode === 'development';
//     const isProd = env.mode === 'production';

//     const config: webpack.Configuration = {
//       mode: env.mode ?? 'development',
//       entry: path.resolve(__dirname, 'src', 'index.tsx'),
//       output: {
//           path: path.resolve(__dirname, 'build'),
//           filename: '[name].[contenthash].js',
//           clean: true
//       },
//       plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') }),
//       isDev && new webpack.ProgressPlugin(),
//       isProd && new MiniCssExtractPlugin({
//         filename: 'css/[name].[contenthash:8].css',
//         chunkFilename: 'css/[name].[contenthash:8].css'
//       })
//       ].filter(Boolean),
//       module: {
//           rules: [
//             {
//               test: /\.s[ac]ss$/i,
//               use: [
//                 // Creates `style` nodes from JS strings
//                 isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
//                 // Translates CSS into CommonJS
//                 "css-loader",
//                 // Compiles Sass to CSS
//                 "sass-loader",
//               ],
//             },
//             {
//               test: /\.tsx?$/,
//               use: 'ts-loader',
//               exclude: /node_modules/,
//             },
//           ],
//         },
//         resolve: {
//           extensions: ['.tsx', '.ts', '.js'],
//       },
//       devtool: isDev && 'inline-source-map',
//       devServer: isDev ? {
//         port: env.port ?? 3000,
//         open: true
//       } : undefined
//     }
//   return config
// }