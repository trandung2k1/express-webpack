const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CompressionPlugin = require('compression-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    const config = {
        stats: {
            colors: true,
            modules: true,
            reasons: true,
            errorDetails: false,
        },
        target: 'node',
        entry: {
            main: ['./src/index.js'],
        },
        output: {
            filename: '[name].bundle.js',
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        devtool: isProduction ? false : 'inline-source-map',
        mode: isProduction ? 'production' : 'development',
        watch: isProduction ? false : true,
        plugins: [new CleanWebpackPlugin(), new webpack.ProgressPlugin(), new Dotenv()],
        devServer: isProduction
            ? {}
            : {
                  static: {
                      directory: path.join(__dirname, 'dist'),
                  },
                  compress: true,
                  open: true,
                  port: 9000,
              },

        optimization: isProduction
            ? {
                  splitChunks: {
                      chunks: 'all',
                  },
              }
            : {},
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
            ],
        },
    };
    if (isProduction) {
        config.plugins = [
            ...config.plugins,
            new CompressionPlugin({
                test: /\.(css|js)$/,
                algorithm: 'brotliCompress',
            }),
            new BundleAnalyzerPlugin(),
        ];
    }
    return config;
};
