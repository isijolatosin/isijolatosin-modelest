import React from 'react'
import axios from 'axios'
import { RiSearch2Line } from 'react-icons/ri'
import { FaArrowUp } from 'react-icons/fa'
import { getDatabase, ref, onValue } from 'firebase/database'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'
import Products from '../components/Products'

function HomePage() {
	// const [hideRegionSet, setHideRegionSet] = React.useState(true)
	const [inputValue, setInputValue] = React.useState('')
	const [searchControl, setSearchControl] = React.useState(false)
	const [toBottom, setToBottom] = React.useState(false)
	const [searchError, setSearchError] = React.useState(false)
	const [allProducts, setAllproducts] = React.useState([])
	const [filtered, setFiltered] = React.useState([])
	const [sales, setSales] = React.useState(null)
	const database = getDatabase()

	React.useEffect(() => {
		const starCountRef = ref(database, 'sales')
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val()

			setSales(data.no)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	async function fetchProducts() {
		try {
			const {
				data: {
					products,
					//  curUser
				},
			} = await axios.get('/api/v1/products')

			// if (products.every((product) => product.sales)) {
			// 	localStorage.setItem('isSales', true)
			// }
			setTimeout(() => {
				setAllproducts(products.sort((a, b) => a.name.localeCompare(b.type)))
			}, 3000)
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		fetchProducts()
	}, [])

	React.useEffect(() => {
		setTimeout(() => {
			// setHideRegionSet(false)
		}, 10000)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleSubmit = () => {
		setInputValue('')
		setSearchControl(!searchControl)

		if (inputValue) {
			const returnFiltered = []
			// eslint-disable-next-line array-callback-return
			allProducts.filter((product) => {
				if (product?.name.toLowerCase().includes(inputValue.toLowerCase())) {
					returnFiltered.push(product)
				} else if (
					product?.brand.toLowerCase().includes(inputValue.toLowerCase())
				) {
					returnFiltered.push(product)
				} else {
					setSearchError(true)
				}
			})
			if (returnFiltered.length > 0) {
				window.scrollTo(0, 0)
				setFiltered(returnFiltered)
			}
		}
	}
	React.useEffect(() => {
		if (searchError) {
			setTimeout(() => {
				setSearchError(false)
			}, 5000)
		}
	}, [searchError])

	window.onscroll = function (ev) {
		if (
			window.innerHeight + window.scrollY >=
			document.body.offsetHeight - (window.innerHeight + window.scrollY)
		) {
			setToBottom(true)
		} else {
			setToBottom(false)
		}
	}

	return (
		<div className="tw-bg-neutral-200 relative home">
			<Helmet>
				<title>Home</title>
			</Helmet>
			<Layout>
				<div
					className={
						allProducts.every((product) => product.sales)
							? `tw-flex tw-flex-col tw-items-center ${
									allProducts.length === 0 ? 'tw-pt-[230px]' : 'tw-pt-[120px]'
							  } tw-pb-10 md:tw-py-[50px] lg:tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[80%] lg:tw-mx-auto`
							: `tw-flex tw-flex-col tw-items-center ${
									allProducts.length === 0 && 'tw-pt-[230px]'
							  } ${
									sales !== 0
										? 'md:tw-pt-[75px] tw-pt-[95px]'
										: 'md:tw-pt-[35px] tw-pt-[50px]'
							  } md:tw-pb-[50px] lg:tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[80%] lg:tw-mx-auto`
					}>
					<div
						onClick={() => window.scrollTo(0, 0)}
						className={`${
							toBottom ? 'tw-opacity-1' : 'tw-opacity-0'
						} tw-fixed tw-bottom-[50px] tw-right-[50px] tw-bg-[rgba(0,0,0,0.85)] tw-text-white tw-p-5 tw-rounded-[30px] tw-z-20 hover:tw-cursor-pointer hover:tw-bg-white hover:tw-text-neutral-900 tw-shadow-lg tw-shadow-[rgba(255,255,255,0.3)] tw-ease-in tw-duration-300 `}>
						<FaArrowUp />
					</div>
					<div className="tw-flex tw-items-center content tw-w-[100vw] lg:tw-w-[50vw] tw-fixed tw-top-[90px] md:tw-top-[60px] tw-left-[-20px] md:tw-left-0 tw-z-20 md:tw-ml-8">
						<div
							className={`${
								searchControl ? 'search bg-blur __search' : 'search bg-blur'
							}`}>
							<input
								type="text"
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								className={`${
									searchControl
										? 'search__input tw-placeholder-neutral-900 tw-text-neutral-900 tw-text-[14px] __search__input placeholder:tw-text-xs'
										: 'search__input tw-placeholder-neutral-900 tw-text-neutral-900 tw-text-[14px]'
								}`}
								aria-label="search"
								placeholder="Search..."
							/>
							<button
								onClick={handleSubmit}
								className="search__submit tw-z-10"
								aria-label="submit search">
								<RiSearch2Line />
							</button>
						</div>
						{filtered?.length > 0 && (
							<div
								onClick={() => {
									setFiltered([])
									setSearchError(false)
								}}
								className="tw-ml-5 tw-text-neutral-800 tw-tracking-wide tw-font-light tw-text-xs tw-border-[2px] tw-border-neutral-800 tw-rounded-full tw-px-3 tw-bg-neutral-200 hover:tw-bg-neutral-900 hover:tw-text-neutral-200 hover:tw-border-neutral-200 tw-ease-in tw-duration-300 hover:tw-cursor-pointer">
								<span>Reset</span>
							</div>
						)}
						{filtered?.length === 0 && searchError && (
							<div
								className={`${
									searchError
										? 'tw-ml-5 tw-tracking-widest tw-text-xs tw-text-red-500 tw-opacity-1'
										: 'tw-ml-5 tw-tracking-widest tw-text-xs tw-text-red-500 tw-opacity-0 tw-ease-in tw-duration-300'
								}`}>
								<span>!!! No Search Result</span>
							</div>
						)}
					</div>
					{allProducts.length !== 0 ? (
						<div className="tw-relative tw-flex tw-flex-col tw-items-center">
							{/* {hideRegionSet && (
								<div className="tw-relative tw-mt-20 md:tw-mt-10 tw-flex tw-flex-col tw-items-center">
									<span className="tw-mb-2 tw-text-sm tw-text-neutral-50 tw-opacity-[0.4]">
										Set your Country/Region below
									</span>
									<div
										onClick={scrollToTop}
										className="arrows-wrapper tw-rounded-lg tw-absolute tw-top-[-30px] hover:tw-cursor-pointer">
										<span className="arrow"></span>
										<span className="arrow"></span>
										<span className="arrow"></span>
									</div>
								</div>
							)} */}

							<Products
								sales={sales}
								allProducts={filtered?.length < 1 ? allProducts : filtered}
							/>
						</div>
					) : (
						<div className="tw-bg-neutral-300 tw-py-[100px] tw-flex tw-justify-center">
							<div className="tw-rounded-full progress">
								<div className="inner"></div>
							</div>
						</div>
					)}
				</div>
			</Layout>
		</div>
	)
}

export default HomePage
