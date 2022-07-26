import React from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { RiSearch2Fill } from 'react-icons/ri'

const SearchInput = ({
	allProducts,
	searchControl,
	setFiltered,
	setSearchControl,
	setSearchError,
}) => {
	const [inputValue, setInputValue] = React.useState('')

	const handleChange = (e) => {
		setInputValue(e)

		if (inputValue === '') {
			setSearchError(false)
		}
		if (inputValue) {
			const returnFiltered = []
			// eslint-disable-next-line array-callback-return
			allProducts.filter((product) => {
				if (
					product?.name.toLowerCase().includes(inputValue.toLowerCase()) ||
					product?.brand.toLowerCase().includes(inputValue.toLowerCase()) ||
					product?.type.toLowerCase().includes(inputValue.toLowerCase())
				) {
					if (
						product?.name.toLowerCase() === 'body wave' ||
						product?.name.toLowerCase() === 'natural straight' ||
						product?.name.toLowerCase() === 'natural wavy' ||
						product?.name.toLowerCase() === 'natural curly'
					) {
						const obj = {
							name: product?.name,
							image: product?.image,
							price: product?.price,
							route: '/bundles/indian',
						}
						returnFiltered.push(obj)
					}
					if (
						product?.name.toLowerCase().includes('body wave jet blk') ||
						product?.name.toLowerCase().includes('body wave blonde') ||
						product?.name
							.toLowerCase()
							.includes('natural straight blonde 613') ||
						product?.name.toLowerCase().includes('natural wavy blonde 613') ||
						product?.name.toLowerCase().includes('natural straight jet blk')
					) {
						const obj = {
							name: product?.name,
							image: product?.image,
							price: product?.price,
							route: '/jet-black-&-blonde/indian',
						}
						returnFiltered.push(obj)
					}
					if (product?.name.toLowerCase().includes('closure')) {
						const obj = {
							name: product?.name,
							image: product?.image,
							price: product?.price,
							route: '/closure-frontal/indian',
						}
						returnFiltered.push(obj)
					}
					if (product?.name.toLowerCase().includes('frontal')) {
						const obj = {
							name: product?.name,
							image: product?.image,
							price: product?.price,
							route: '/closure-frontal/indian',
						}
						returnFiltered.push(obj)
					}
					if (product?.name.toLowerCase().includes('natural virgin wig')) {
						const obj = {
							name: product?.name,
							image: product?.image,
							price: product?.price,
							route: '/virgin-wigs',
						}
						returnFiltered.push(obj)
					}
				}

				if (returnFiltered.length === 0) {
					setSearchError(true)
				}
			})
			if (returnFiltered.length > 0) {
				// window.scrollTo(0, 0)
				setFiltered(returnFiltered.sort((a, b) => a.name.localeCompare(b.name)))
			}
		}
	}
	return (
		<div
			className={`${
				searchControl ? '_search bg-blur __search' : '_search bg-blur'
			}`}>
			<input
				type="text"
				value={inputValue}
				onChange={(e) => handleChange(e.target.value)}
				className={`${
					searchControl
						? 'search__input tw-placeholder-neutral-900 tw-text-neutral-900 tw-text-[14px] __search__input placeholder:tw-text-xs'
						: 'search__input tw-placeholder-neutral-900 tw-text-neutral-900 tw-text-[14px]'
				}`}
				aria-label="search"
				placeholder="Search..."
			/>
			<button
				className="search__submit tw-z-10 tw-text-[#bba371]"
				aria-label="submit search">
				{searchControl ? (
					<MdOutlineClose
						onClick={() => {
							setInputValue('')
							setFiltered([])
							setSearchControl(false)
							setSearchError(false)
						}}
					/>
				) : (
					<RiSearch2Fill onClick={() => setSearchControl(true)} />
				)}
			</button>
		</div>
	)
}

export default SearchInput
