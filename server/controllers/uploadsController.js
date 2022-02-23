const path = require('path')
const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors')

const uploadProductImage = async (req, res) => {
	if (!req.files) {
		throw new CustomAPIError.BadRequestError('No File Uploaded')
	}

	// console.log(req.files.image)
	let productImage = req.files.image

	if (!productImage.mimetype.startsWith('image')) {
		throw new CustomAPIError.BadRequestError('Please Upload Image')
	}

	// console.log(productImage.size)
	const maxSize = 624576
	if (productImage.size > maxSize) {
		throw new CustomAPIError.BadRequestError(
			'Please upload image smaller than 2MB'
		)
	}

	const imagePath = path.join(
		__dirname,
		'../public/uploads/' + `${productImage.name}`
	)
	await productImage.mv(imagePath)
	return res
		.status(StatusCodes.OK)
		.json({ image: { src: `/uploads/${productImage.name}` } })
}

module.exports = { uploadProductImage }
