const client_Id = process.env.REACT_APP_PAYPAL_CLIENT_ID
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: 'index.js',
	plugins: [
		new HtmlWebpackPlugin({
			inject: false,
			template: './public/index.html',

			// Pass the full url with the key!
			paypalUrl: `https://www.paypal.com/sdk/js?client-id=${client_Id}`,
		}),
	],
}
