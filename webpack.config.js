module.exports = {
	entry: "./src/index.js",
	module: {
		rules: [
			{
				test: /\.css$/,
				use: "css-loader",
			},
		],
	},
};
