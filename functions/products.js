require('dotenv').config()
const { StatusCodes } = require('http-status-codes')
const Product = require('../server/models/Product')
const connectDB = require('../server/db/connect')

exports.handler = async (event, context) => {
	await connectDB(process.env.MONGO_URI)

	if (event.httpMethod === 'GET') {
		try {
			const products = await Product.find({})
			return {
				statusCode: StatusCodes.OK,
				body: JSON.stringify({ products }),
			}
		} catch (error) {
			console.log(error)
			return {
				statusCode: 500,
				body: JSON.stringify(error),
			}
		}
	}
}
