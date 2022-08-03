import React from 'react'
import axios from 'axios'
import InventoryForm from './InventoryForm'

function Inventory() {
	const [isOnSales, setIsOnSales] = React.useState(false)
	const [isInstock, setIsInstock] = React.useState(false)
	const [postError, setPostError] = React.useState('')
	const [formData, setFormData] = React.useState({
		title: '',
		brand: '',
		density: '',
		texture: '',
		capsize: '',
		type: '',
		color: '',
		availablecolor: '',
		length: '',
		dealLength: '',
		availablelength: '',
		price: '',
		description: '',
	})
	const [imageFile, setImageFile] = React.useState('')

	const handleformDataChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const toggleSales = () => {
		setIsOnSales(!isOnSales)
	}
	const toggleInstock = () => {
		setIsInstock(!isInstock)
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		try {
			const product = {
				name: formData.title,
				brand: formData.brand,
				density: formData.density,
				texture: formData.texture,
				capsize: formData.capsize,
				type: formData.type,
				color: formData.color,
				price: formData.price,
				length: formData.length,
				availablelength: formData.availablelength,
				availablecolor: formData.availablecolor,
				dealLength: formData.dealLength,
				description: formData.description,
				sales: isOnSales,
				instock: isInstock,
				image: imageFile,
			}

			await axios.post('/api/v1/products', product)
		} catch (error) {
			setPostError(error.message)
			console.log(error)
		}

		setFormData({
			title: '',
			brand: '',
			density: '',
			texture: '',
			capsize: '',
			type: '',
			color: '',
			availablecolor: '',
			price: '',
			length: '',
			dealLength: '',
			availablelength: '',
			description: '',
		})
		setIsOnSales(false)
	}

	const inputTypes = [
		{
			id: '1',
			name: 'title',
			type: 'text',
			value: formData.title,
			placeholder: 'Product Name...',
		},
		{
			id: '2',
			name: 'brand',
			type: 'text',
			value: formData.brand,
			placeholder: 'Product Brand...',
		},
		{
			id: '3',
			name: 'density',
			type: 'text',
			value: formData.density,
			placeholder: 'Product Density...',
		},
		{
			id: '4',
			name: 'texture',
			type: 'text',
			value: formData.texture,
			placeholder: 'Product Texture...',
		},
		{
			id: '5',
			name: 'capsize',
			type: 'text',
			value: formData.capsize,
			placeholder: 'Product Capsize...',
		},
		{
			id: '6',
			name: 'type',
			type: 'text',
			value: formData.type,
			placeholder: 'Product Type...',
		},
		{
			id: '7',
			name: 'color',
			type: 'text',
			value: formData.color,
			placeholder: 'Product Color...',
		},
		{
			id: '8',
			name: 'availablecolor',
			type: 'text',
			value: formData.availablecolor,
			placeholder: 'Available Color...',
		},
		{
			id: '9',
			name: 'length',
			type: 'number',
			value: formData.length,
			placeholder: 'Length...',
		},
		{
			id: '10',
			name: 'dealLength',
			type: 'text',
			value: formData.dealLength,
			placeholder: 'Bundle Deals Length...',
		},
		{
			id: '11',
			name: 'availablelength',
			type: 'text',
			value: formData.availablelength,
			placeholder: 'Available Lengths...',
		},
		{
			id: '12',
			name: 'price',
			type: 'number',
			value: formData.price,
			placeholder: 'Price CA($)...',
		},
	]

	const uploadFile = async (e) => {
		const imageFile = e.target.files[0]
		const formData = new FormData()
		formData.append('image', imageFile)
		try {
			const {
				data: {
					image: { src },
				},
			} = await axios.post('/api/v1/products/uploads', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})

			setImageFile(src)
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<InventoryForm
			handleSubmit={handleSubmit}
			inputTypes={inputTypes}
			handleformDataChange={handleformDataChange}
			formData={formData}
			isOnSales={isOnSales}
			isInstock={isInstock}
			toggleSales={toggleSales}
			toggleInstock={toggleInstock}
			postError={postError}
			buttonText="Add to Inventory"
			uploadFile={uploadFile}
		/>
	)
}

export default Inventory
