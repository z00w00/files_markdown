const path = require('path');
const ExtractTextPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = (env, argv) => ({
	devtool: 'source-map',
	entry: "./js/editor.ts",
	output: {
		filename: "editor.js",
		path: path.resolve(__dirname, "build"),
		jsonpFunction: 'webpackJsonpMarkdown'
	},
	resolve: {
		extensions: [".ts", ".js"]
	},
	plugins: [
		new CleanWebpackPlugin(['build']),
		new ExtractTextPlugin({
			filename: "styles.css",
			allChunks: true
		}),
	],
	module: {
		rules: [
			{
				test: /\.ts/,
				loader: "ts-loader"
			},
			{
				test: /\.js$/,
				include: [
					path.resolve(__dirname, "js"),
					path.resolve(__dirname, "node_modules/markdown-it-anchor"),
					path.resolve(__dirname, "node_modules/markdown-it-texmath"),
					path.resolve(__dirname, "node_modules/markdown-it-highlightjs"),
					path.resolve(__dirname, "node_modules/markdown-it-github-preamble")
				],
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.css$/,
				use: [
					argv.mode !== 'production'
						? 'style-loader'
						: ExtractTextPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)$/,
				use: [
					{
						loader: 'file-loader',
						options: {}
					}
				]
			}
		]
	},
	node: {
		fs: 'empty'
	}
});
