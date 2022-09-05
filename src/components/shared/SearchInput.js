import React from 'react'
import { MdOutlineClose } from 'react-icons/md'
import { RiSearch2Fill } from 'react-icons/ri'

const SearchInput = ({
	allProducts,
	searchControl,
	setFiltered,
	setSearchControl,
	setSearchError,
	inputValue,
	setInputValue,
}) => {
	const handleChange = (e) => {
		setInputValue(e)

		if (inputValue) {
			const returnFiltered = []
			setSearchError(false)
			// eslint-disable-next-line array-callback-return
			allProducts.filter((product) => {
				if (product?.brand?.toLowerCase().includes(inputValue.toLowerCase())) {
					if (product?.type?.toLowerCase().includes('virgin wig')) {
						const obj = {
							name: product?.name,
							image: product?.image,
							price: product?.price,
							route: '/virgin-wigs',
						}
						returnFiltered.push(obj)
					}
					if (product?.type?.toLowerCase().includes('hair bundle')) {
						const obj = {
							name: product?.name,
							image: product?.image,
							price: product?.price,
							route: '/all-bundles',
						}
						returnFiltered.push(obj)
					}
					if (product?.type?.toLowerCase().includes('frontal')) {
						const obj = {
							name: product?.name,
							image: product?.image,
							price: product?.price,
							route: '/closure-frontal/indian',
						}
						returnFiltered.push(obj)
					}
					if (product?.type?.toLowerCase().includes('closure')) {
						const obj = {
							name: product?.name,
							image: product?.image,
							price: product?.price,
							route: '/closure-frontal/indian',
						}
						returnFiltered.push(obj)
					}
				}

				if (product?.name?.toLowerCase().includes(inputValue.toLowerCase())) {
					if (product?.type?.toLowerCase().includes('virgin wig')) {
						const obj = {
							name: product?.name,
							image: product?.image,
							price: product?.price,
							route: '/virgin-wigs',
						}
						returnFiltered.push(obj)
					}
					if (product?.type?.toLowerCase().includes('hair bundle')) {
						const obj = {
							name: product?.name,
							image: product?.image,
							price: product?.price,
							route: '/all-bundles',
						}
						returnFiltered.push(obj)
					}
					if (product?.type?.toLowerCase().includes('frontal')) {
						const obj = {
							name: product?.name,
							image: product?.image,
							price: product?.price,
							route: '/closure-frontal/indian',
						}
						returnFiltered.push(obj)
					}
					if (product?.type?.toLowerCase().includes('closure')) {
						const obj = {
							name: product?.name,
							image: product?.image,
							price: product?.price,
							route: '/closure-frontal/indian',
						}
						returnFiltered.push(obj)
					}
				}
			})

			if (returnFiltered.length > 0) {
				// window.scrollTo(0, 0)
				setFiltered(returnFiltered.sort((a, b) => a.name.localeCompare(b.name)))
			} else {
				setSearchError(true)
				returnFiltered.push([])
			}
		}
	}

	return (
		<div
			className={`${
				searchControl
					? '_search tw-bg-white __search'
					: '_search tw-bg-white tw-rounded-r-[30px]'
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
			<button className="search__submit tw-z-10" aria-label="submit search">
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
