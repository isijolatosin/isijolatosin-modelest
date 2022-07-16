import React from 'react'
import axios from 'axios'
import { RiSearch2Fill } from 'react-icons/ri'
import { FaArrowUp } from 'react-icons/fa'
import { RiChat1Fill } from 'react-icons/ri'
import { getDatabase, ref, onValue } from 'firebase/database'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'
import Products from '../components/Products'
import { CgClose } from 'react-icons/cg'
import { db } from '../firebase'

function HomePage() {
	// const [hideRegionSet, setHideRegionSet] = React.useState(true)
	const [inputValue, setInputValue] = React.useState('')
	const [searchControl, setSearchControl] = React.useState(false)
	const [toBottom, setToBottom] = React.useState(false)
	const [chat, setChat] = React.useState(true)
	const [showForm, setShowForm] = React.useState(false)
	const [searchError, setSearchError] = React.useState(false)
	const [allProducts, setAllproducts] = React.useState([])
	const [filtered, setFiltered] = React.useState([])
	const [sales, setSales] = React.useState(null)
	const database = getDatabase()
	const [chatDetail, setChatDetail] = React.useState({
		name: '',
		title: '',
		email: '',
		message: '',
	})

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
			setChat(false)
		} else {
			setToBottom(false)
			setChat(true)
		}
	}
	const handleChangeChat = (e) => {
		setChatDetail({ ...chatDetail, [e.target.name]: e.target.value })
	}

	const SubmitInqury = (e) => {
		e.preventDefault()

		db.collection('customer-inqury')
			.add({
				id: `ModelEst${Math.random().toString(36).slice(2)}`,
				name: chatDetail.name,
				title: chatDetail.title,
				message: chatDetail.message,
				email: chatDetail.email,
				timestamp: new Date().valueOf(),
			})
			.then(() => {
				console.log(`SUCCESSFULL`)
			})
			.catch((error) => console.log('Error ' + error.message))

		setChatDetail({
			name: '',
			title: '',
			email: '',
			message: '',
		})
	}

	return (
		<div className="relative home ">
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
							: ` tw-flex tw-flex-col tw-items-center ${
									allProducts.length === 0 && 'tw-pt-[230px]'
							  } ${
									sales !== 0
										? 'md:tw-pt-[75px] tw-pt-[95px]'
										: 'md:tw-pt-[35px] tw-pt-[50px]'
							  } md:tw-pb-[50px] lg:tw-w-[100%] 2xl:tw-px-[40px] lg:tw-mx-auto tw-bg-[rgba(255,255,255,0.4)] tw-relative`
					}>
					<div
						onClick={() => window.scrollTo(0, 0)}
						className={`${
							toBottom ? 'tw-inline' : 'tw-hidden'
						} tw-fixed tw-bottom-[25px] tw-right-[10px] tw-bg-[rgba(0,0,0,0.85)] tw-text-white tw-p-5 tw-rounded-[30px] tw-z-40 hover:tw-cursor-pointer hover:tw-bg-white hover:tw-text-neutral-900 tw-shadow-lg tw-shadow-[rgba(255,255,255,0.3)] tw-ease-in tw-duration-300 `}>
						<FaArrowUp />
					</div>
					<div
						onClick={() => setShowForm(!showForm)}
						className={`${
							chat ? 'tw-inline' : 'tw-hidden'
						} tw-fixed tw-bottom-[25px] tw-right-[10px] tw-bg-[rgba(0,0,0,0.85)] tw-text-white tw-p-5 tw-rounded-[30px] tw-z-40 hover:tw-cursor-pointer hover:tw-bg-white hover:tw-text-neutral-900 tw-shadow-lg tw-shadow-[rgba(255,255,255,0.3)] tw-ease-in tw-duration-300  `}>
						<RiChat1Fill />
					</div>
					<div
						className={`${
							showForm
								? 'tw-right-0 md:tw-right-[8px]'
								: 'tw-right-[-550px] md:tw-right-[-350px]'
						} tw-w-[100%] tw-h-screen tw-px-5 tw-pt-[115px] md:tw-pt-0 md:tw-max-h-[600px] md:tw-w-[350px] tw-fixed tw-z-30 tw-bg-[rgba(255,255,255,0.97)] tw-p-2 tw-rounded-md tw-bottom-0 md:tw-bottom-[50px] tw-text-neutral-900 tw-ease-in tw-duration-300`}>
						<form>
							<div className="tw-flex tw-justify-end tw-mt-5">
								<div
									onClick={() => setShowForm(false)}
									className="tw-text-md tw-text-white tw-bg-neutral-900 tw-w-[30px] tw-h-[30px] tw-p-[8px] tw-flex tw-items-center tw-justify-center tw-rounded-full tw-shadow-lg tw-ease-in tw-duration-300 hover:tw-cursor-pointer hover:tw-bg-white hover:tw-text-neutral-900">
									<CgClose />
								</div>
							</div>
							<p className="tw-text-center tw-leading-5 tw-text-xs tw-my-3 tw-font-bold tw-w-[80%] tw-mx-auto">
								Please fill out the form below and we will get back to you as
								soon as possible
							</p>
							<div>
								<input
									type="text"
									name="name"
									id="name"
									value={chatDetail.name}
									onChange={handleChangeChat}
									placeholder="Name"
									className="tw-bg-transparent tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-text-xs tw-shadow-xl tw-placeholder-neutral-900 placeholder:tw-text-xs focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-1 placeholder:tw-text-neutral-900 tw-font-bold"
								/>
							</div>
							<div>
								<input
									type="text"
									name="title"
									id="title"
									value={chatDetail.title}
									onChange={handleChangeChat}
									placeholder="Topic"
									className="tw-bg-transparent tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-text-xs tw-shadow-xl tw-placeholder-neutral-900 placeholder:tw-text-xs focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-1 placeholder:tw-text-neutral-900 tw-font-bold"
								/>
							</div>
							<div>
								<input
									type="email"
									name="email"
									id="email"
									value={chatDetail.email}
									onChange={handleChangeChat}
									placeholder="Email"
									className="tw-bg-transparent tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-text-xs tw-shadow-xl tw-placeholder-neutral-900 placeholder:tw-text-xs focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-1 placeholder:tw-text-neutral-900 tw-font-bold"
								/>
							</div>
							<div>
								<textarea
									name="message"
									rows={15}
									cols={25}
									value={chatDetail.message}
									onChange={handleChangeChat}
									placeholder="Message..."
									className="tw-bg-transparent tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-text-xs tw-shadow-xl focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-1 placeholder:tw-font-bold placeholder:tw-text-neutral-900 tw-text-neutral-900 tw-font-bold"
								/>
							</div>
							<div
								onClick={SubmitInqury}
								className="tw-bg-neutral-900 tw-text-white tw-text-center tw-text-xs tw-py-2 tw-mt-3 tw-mb-10 tw-cursor-pointer hover:tw-bg-white hover:tw-text-neutral-900 tw-ease-in tw-duration-300">
								<button
									disabled={
										chatDetail?.name === '' &&
										chatDetail?.title === '' &&
										chatDetail?.email === '' &&
										chatDetail?.message === ''
									}>
									Send message
								</button>
							</div>
						</form>
					</div>
					<div
						className={`tw-w-[100%] ${
							searchControl && 'tw-w-[100vw] lg:tw-w-[50vw]'
						} tw-flex tw-items-center content tw-fixed tw-top-[90px] md:tw-top-[60px] tw-left-[-40px] tw-z-10 tw-ease-in tw-duration-300`}>
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
								className="search__submit tw-z-10 tw-text-neutral-400"
								aria-label="submit search">
								<RiSearch2Fill />
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
						<div className="tw-py-[100px] tw-flex tw-justify-center">
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
