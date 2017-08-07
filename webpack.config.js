module.exports = {
	entry: "./jsx/app.jsx",
	output: { filename: "./out.js" },
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
				loader: ['style-loader', 'css-loader', 'sass-loader'] // first read scss file
			}
		]
	}
}
