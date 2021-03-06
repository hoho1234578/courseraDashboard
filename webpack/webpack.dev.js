const path = require('path');
const paths = require('./paths');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'cheap-module-source-map',
	entry: paths.appIndexJs,
	output: {
		filename: 'static/js/bundle.js',
		chunkFilename: 'static/js/[name].chunk.js',
		path: paths.appBuild,
		pathinfo: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				include: paths.appSrc,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				}
			},
			{
		    test: /\.(css|scss|sass)$/,
		    use: [
		      {
		        loader: 'style-loader'
		      },
		      {
						loader: 'css-loader',
						options: {
							minimize: true,
						}
		      },
		      {
		        loader: 'postcss-loader',
		        options: {
		        	config: {
		        		path: './webpack/postcss.config.js'
		        	}
		        }
					},
					'sass-loader'
		    ]
		  },
		  {
		  	test: /\.(ttf|woff|woff2)$/,
			  use: {
			    loader: "url-loader",
			    options: {
			      limit: 8192,
			    },
			  },
			},
			{
		  	test: /\.svg$/,
			  use: {
			    loader: "url-loader",
			    options: {
			      limit: 8192,
			    },
			  },
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),
	],
	devServer: {
		port: 8080,
		open: true,
		overlay: false,
		contentBase: path.resolve(__dirname, '../')
	},
}
