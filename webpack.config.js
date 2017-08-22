const webpack = require('webpack');

module.exports = {
	entry: "./src/components/app.jsx",
	output: { filename: "./src/out.js" },
	// devServer:	{
	// 			inline:	false,
	// 			contentBase:	'./public/',
	// 			port:	3001
	// 	},
	watch: true,
	module: {
		loaders: [
			{
				test: /\.jsx$/,  exclude: /node_modules/,
				loader: 'babel-loader',
				query: { presets: ['es2015', 'stage-2', 'react'] }
			},
			{
				test: /\.scss$/,
				loader: ['style-loader', 'css-loader', 'sass-loader']
			}
		]
	},
	plugins: [
		new webpack.SourceMapDevToolPlugin({
			filename: './out.js',
			exclude: ['/node_modules/','vendor.js']
		})
	]
}
