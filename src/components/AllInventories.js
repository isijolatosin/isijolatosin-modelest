import React from 'react'
import axios from 'axios'
import Heading from './Heading'
import InventoryCard from './InventoryCard'
import Button from './shared/Button'

function AllInventories() {
	const [fetchAllData, setFetchAllData] = React.useState([])
	const [singleProduct, setSingleProduct] = React.useState()
	const [postError, setPostError] = React.useState('')
	const [isTrue, setIsTrue] = React.useState(false)
	// const [imageFile, setImageFile] = React.useState('')

	const togglePassword = () => {
		setIsTrue(!isTrue)
	}

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')
			setFetchAllData(products)
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		fetchProducts()
	}, [])

	const handleInputName = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: e.target.value,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			dealLength: singleProduct.dealLength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputBrand = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: e.target.value,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			dealLength: singleProduct.dealLength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputType = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: e.target.value,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			dealLength: singleProduct.dealLength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputColor = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: e.target.value,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			dealLength: singleProduct.dealLength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputAvailableColor = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: e.target.value,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			dealLength: singleProduct.dealLength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputLen = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: e.target.value,
			availablelength: singleProduct.availablelength,
			dealLength: singleProduct.dealLength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputAvailableLen = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: e.target.value,
			dealLength: singleProduct.dealLength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputDealLen = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelengthe,
			dealLength: e.target.value,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputPrice = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: e.target.value,
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			dealLength: singleProduct.dealLength,
			description: singleProduct.description,
			sales: singleProduct.sales,
		})
	}
	const handleInputDesc = (e) => {
		setSingleProduct({
			id: singleProduct.id,
			name: singleProduct.name,
			brand: singleProduct.brand,
			type: singleProduct.type,
			color: singleProduct.color,
			availablecolor: singleProduct.availablecolor,
			price: Number(singleProduct.price),
			length: Number(singleProduct.length),
			availablelength: singleProduct.availablelength,
			dealLength: singleProduct.dealLength,
			sales: singleProduct.sales,
			description: e.target.value,
		})
	}

	async function updateSingleProduct(e) {
		e.preventDefault()
		const id = singleProduct?.id
		try {
			const product = {
				name: singleProduct.name,
				brand: singleProduct.brand,
				type: singleProduct.type,
				color: singleProduct.color,
				availablecolor: singleProduct.availablecolor,
				price: singleProduct.price,
				length: singleProduct.length,
				availablelength: singleProduct.availablelength,
				dealLength: singleProduct.dealLength,
				description: singleProduct.description,
				sales: isTrue,
				// image: imageFile,
			}
			if (
				product.name === '' ||
				product.brand === '' ||
				product.type === '' ||
				product.color === '' ||
				product.price === null ||
				product.length === null ||
				product.dealLength === null ||
				product.description === ''
			) {
				return setPostError('Missing Credentials')
			}
			await axios.patch(`/api/v1/products/${id}`, product)
			setPostError('')
		} catch (error) {
			setPostError(error.message)
			console.log(error)
		}

		setSingleProduct()

		fetchProducts()
	}

	return (
		<div>
			{!singleProduct ? (
				<div className="tw-flex tw-flex-col tw-items-center tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[85%] tw-mx-auto tw-mt-5">
					<Heading children="All Inventories" isBold={true} size2={true} />
					<div className="tw-grid tw-grid-cols-1 tw-w-full md:tw-grid-cols-2 xl:tw-grid-cols-3 2xl:tw-grid-cols-4 tw-gap-5 tw-p-5 lg:tw-p-10">
						{fetchAllData.map((product) => (
							<InventoryCard
								key={product._id}
								product={product}
								fetchProducts={fetchProducts}
								setSingleProduct={setSingleProduct}
							/>
						))}
					</div>
				</div>
			) : (
				<div className="tw-w-[100%]">
					<span className=" tw-text-xl tw-text-neutral-800 tw-flex tw-flex-col tw-items-center tw-mt-10">
						Edit Product
					</span>
					<span className="tw-text-neutral-500 tw-text-xs tw-flex tw-flex-col tw-items-center tw-mb-5 tw-mt-2">{`ProductID: ${singleProduct.id}`}</span>
					<span className="tw-flex tw-flex-col tw-items-center tw-mb-5 tw-mt-2 tw-capitalize tw-text-xs tw-text-red-800">
						Please ensure to edit all field for better performance
					</span>
					<form onSubmit={updateSingleProduct}>
						<div className="tw-flex tw-flex-col tw-items-center">
							<div className="lg:tw-w-[50%] tw-mx-auto tw-w-[90%] tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-gap-x-2">
								<input
									type="text"
									name="title"
									id="title"
									value={singleProduct.name}
									onChange={handleInputName}
									placeholder="Product Name..."
									className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="text"
									name="brand"
									id="brand"
									value={singleProduct.brand}
									onChange={handleInputBrand}
									placeholder="Product Brand..."
									className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="text"
									name="type"
									id="type"
									value={singleProduct.type}
									onChange={handleInputType}
									placeholder="Product Type..."
									className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="text"
									name="color"
									id="color"
									value={singleProduct.color}
									onChange={handleInputColor}
									placeholder="Product Color..."
									className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="text"
									name="availablecolor"
									id="availablecolor"
									value={singleProduct.availablecolor}
									onChange={handleInputAvailableColor}
									placeholder="Available Color..."
									className="tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="number"
									name="length"
									id="length"
									value={singleProduct.length}
									onChange={handleInputLen}
									placeholder="Length..."
									className="tw-rounded tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="text"
									name="availablelength"
									id="availablelength"
									value={singleProduct.availablelength}
									onChange={handleInputAvailableLen}
									placeholder="Available Lengths..."
									className="tw-rounded tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="text"
									name="dealLength"
									id="dealLeangth"
									value={singleProduct.dealLength}
									onChange={handleInputDealLen}
									placeholder="Bundle Deal Lengths..."
									className="tw-rounded tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
								<input
									type="number"
									name="price"
									id="price"
									value={singleProduct.price}
									onChange={handleInputPrice}
									placeholder="Price..."
									className="tw-rounded tw-mt-1 tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
								/>
							</div>
							<textarea
								value={singleProduct.description}
								name="description"
								onChange={handleInputDesc}
								rows={5}
								cols={50}
								placeholder="Description..."
								className="tw-rounded tw-mt-1 tw-block lg:tw-w-[50%] tw-mx-auto tw-w-[90%] tw-px-3 tw-py-2 tw-border-none tw-text-sm tw-shadow-xl tw-placeholder-gray-400 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5 placeholder:tw-font-light placeholder:tw-text-xs tw-text-gray-700 tw-font-light"
							/>
							<div className="tw-rounded tw-flex tw-flex-row tw-items-center tw-mt-5 tw-shadow-xl tw-p-2">
								<label className="tw-mr-3 tw-text-gray-500 tw-text-sm">
									Sales
								</label>
								<input
									type="checkbox"
									checked={isTrue}
									className={
										isTrue
											? 'tw-ml-2 tw-rounded-full tw-bg-violet-400'
											: 'tw-ml-2 tw-rounded-full tw-bg-none tw-border-violet-200'
									}
									onChange={togglePassword}
								/>
							</div>
							{postError && (
								<span className="tw-text-xs tw-text-red-700 tw-mt-5">{`Error: ${postError}`}</span>
							)}
							<div className="tw-my-10">
								<Button type="submit">Update Inventory</Button>
							</div>
						</div>
					</form>
				</div>
			)}
		</div>
	)
}
export default AllInventories
