import React from 'react'
import axios from 'axios'
import { MdOutlineKeyboardArrowUp } from 'react-icons/md'
import { HiChatAlt2 } from 'react-icons/hi'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'
import Products from '../components/Products'
import { db } from '../firebase'
import ContactForm from '../components/shared/ContactForm'
import { Link } from 'react-router-dom'
import SearchInput from '../components/shared/SearchInput'
import PromoCard from '../components/PromoCard'
import { fetchSalesPercentage } from '../utils/salesPercentageNuumber'

function HomePage() {
	const [searchControl, setSearchControl] = React.useState(false)
	const [chatError, setChatError] = React.useState(false)
	const [chatSuccess, setChatSuccess] = React.useState(false)
	const [toBottom, setToBottom] = React.useState(false)
	const [chat, setChat] = React.useState(true)
	const [showForm, setShowForm] = React.useState(false)
	const [searchError, setSearchError] = React.useState(false)
	const [expired, setExpired] = React.useState(false)
	const [allProducts, setAllproducts] = React.useState([])
	const [filtered, setFiltered] = React.useState([])
	const [sales, setSales] = React.useState(null)
	const [similarProductsClosure, setSimilarProductsClosure] =
		React.useState(null)
	const [similarProductsFrontal, setSimilarProductsFrontal] =
		React.useState(null)
	const [chatDetail, setChatDetail] = React.useState({
		name: '',
		title: '',
		email: '',
		message: '',
	})
	const [featuredProduct, setFeaturedProduct] = React.useState([])

	React.useEffect(() => {
		setSales(fetchSalesPercentage())
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

			const array1 = []
			const array2 = []
			// eslint-disable-next-line array-callback-return
			products.filter((prod) => {
				if (prod?.brand?.toLowerCase().includes('virgin hair')) {
					if (prod?.name?.toLowerCase().includes('-closure')) {
						array1.push(prod)
					}
				}
				setSimilarProductsClosure(array1)

				if (prod?.brand?.toLowerCase().includes('virgin hair')) {
					if (prod?.name?.toLowerCase().includes('-frontal')) {
						array2.push(prod)
					}
				}
				setSimilarProductsFrontal(array2)
			})

			const fArray = []
			// eslint-disable-next-line array-callback-return
			products.filter((p) => {
				if (p?.name.toLowerCase().includes('amber')) {
					const obj = {
						name: 'Virgin Wigs',
						price: p?.price,
						brand: p?.brand,
						color: p?.color,
						type: p?.type,
						image: p?.image2,
						route: '/virgin-wigs',
					}
					fArray.push(obj)
				}
				if (p?.name.toLowerCase() === 'body wave') {
					const obj = {
						name: 'Bundles',
						price: p?.price,
						brand: p?.brand,
						color: p?.color,
						type: p?.type,
						image: p?.image2,
						route: '/bundles/indian',
					}
					fArray.push(obj)
				}
				if (p?.type.toLowerCase() === 'frontal') {
					const obj = {
						name: 'Frontals',
						price: p?.price,
						brand: p?.brand,
						color: p?.color,
						type: p?.type,
						image: p?.image2,
						route: '/closure-frontal/indian',
					}
					fArray.push(obj)
				}
				if (p?.type.toLowerCase() === 'closure') {
					const obj = {
						name: 'Closures',
						price: p?.price,
						brand: p?.brand,
						color: p?.color,
						type: p?.type,
						image: p?.image2,
						route: '/closure-frontal/indian',
					}
					fArray.push(obj)
				}
			})
			const reverseFeatured = fArray.reverse()

			setTimeout(() => {
				setFeaturedProduct(reverseFeatured)
				setAllproducts(products.sort((a, b) => a.name.localeCompare(b.type)))
			}, 3000)
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		fetchProducts()
	}, [])

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
		setChatError(false)
		setChatDetail({ ...chatDetail, [e.target.name]: e.target.value })
	}

	const SubmitInqury = (e) => {
		e.preventDefault()

		if (
			chatDetail.name === '' ||
			chatDetail.title === '' ||
			chatDetail.email === '' ||
			chatDetail.message === ''
		) {
			setChatError(true)
		}
		if (
			chatDetail.name === '' &&
			chatDetail.title === '' &&
			chatDetail.email === '' &&
			chatDetail.message === ''
		) {
			setChatError(true)
		} else if (
			chatDetail.name !== '' &&
			chatDetail.title !== '' &&
			chatDetail.email !== '' &&
			chatDetail.message !== ''
		) {
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
			setTimeout(() => {
				setChatSuccess(true)
			}, 1000)
		}
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
							  } md:tw-pb-[50px] lg:tw-w-[100%] lg:tw-mx-auto tw-bg-[rgba(255,255,255,0.1)] tw-relative`
					}>
					<div
						onClick={() => window.scrollTo(0, 0)}
						className={`${
							toBottom ? 'tw-inline' : 'tw-hidden'
						} tw-fixed tw-bottom-[25px] tw-right-[10px] tw-bg-[rgba(0,0,0,0.85)] tw-text-[#bba371] tw-p-2 tw-rounded-[30px] tw-z-40 tw-cursor-pointer hover:md:tw-bg-white hover:md:tw-text-neutral-900 tw-shadow-lg tw-shadow-[rgba(255,255,255,0.3)] tw-ease-in tw-duration-300 `}>
						<MdOutlineKeyboardArrowUp size={33} />
					</div>
					<div
						onClick={() => {
							setShowForm(!showForm)
							setChatError(false)
							setChatSuccess(false)
							setChatDetail({
								name: '',
								title: '',
								email: '',
								message: '',
							})
						}}
						className={`${
							chat ? 'tw-inline' : 'tw-hidden'
						} md:tw-hidden tw-fixed tw-bottom-[25px] tw-right-[10px] tw-bg-[rgba(0,0,0,0.85)] tw-text-[#bba371] tw-p-3 tw-rounded-[30px] tw-z-40 tw-cursor-pointer hover:md:tw-bg-white hover:md:tw-text-neutral-900 tw-shadow-lg tw-shadow-[rgba(255,255,255,0.3)] tw-ease-in tw-duration-300`}>
						<HiChatAlt2 size={25} />
					</div>
					<div
						className={`${searchControl && 'tw-w-[100%] lg:tw-w-[40%]'} ${
							sales
								? 'tw-top-[100px] md:tw-top-[80px]'
								: 'tw-top-[55px] md:tw-top-[24px]'
						} tw-flex tw-flex-col content tw-fixed tw-left-[-6px] md:tw-left-[-6px] tw-z-10 tw-ease-in tw-duration-300 2xl:tw-ml-10 tw-mt-[20px]`}>
						<SearchInput
							allProducts={allProducts}
							searchControl={searchControl}
							setFiltered={setFiltered}
							setSearchControl={setSearchControl}
							setSearchError={setSearchError}
						/>
						{searchError && (
							<div className="tw-bg-white tw-text-black tw-ml-[1px] tw-w-[79.7%] featuredCard tw-shadow-lg tw-rounded-b-[5px] tw-border-[1px] tw-border-t-0 tw-border-neutral-900">
								<p className="tw-text-[13px] md:tw-text-[14px] tw-text-red-700 tw-p-3 tw-pl-5">
									No Result Found !
								</p>
								<Link to="/all-bundles">
									<div className="tw-pr-5 tw-py-3 tw-border-t-[1px] tw-w-[90%] tw-mx-auto">
										<span className="tw-text-[13px] md:tw-text-[14px] tw-text-[#bba371] hover:tw-text-black tw-ease-in tw-duration-300">
											View all bundles
										</span>
									</div>
								</Link>
							</div>
						)}
						{filtered?.length !== 0 && !searchError && (
							<div className="tw-bg-white tw-text-black tw-ml-[1px] tw-w-[79.7%] tw-overflow-y-scroll tw-max-h-[400px] md:tw-max-h-[600px] featuredCard tw-shadow-lg tw-rounded-b-[5px] tw-border-[1px] tw-border-t-0 tw-border-neutral-900">
								{filtered.map((item) => (
									<Link to={item?.route} key={item?._id}>
										<div className="tw-flex tw-items-center tw-p-3 tw-border-b-[1px] tw-w-[100%] tw-mx-auto hover:tw-bg-[rgba(215,191,137,0.3)] tw-ease-in tw-duration-300">
											<div className="tw-mr-3">
												<img
													src={item?.image}
													alt={item?.name}
													className="tw-object-cover tw-w-[40px] tw-h-[40px] tw-rounded-full"
												/>
											</div>
											<div>
												<p className="tw-text-[13px] md:tw-text-[14px]">
													{item?.name}
												</p>
												<p className="tw-text-[13px] md:tw-text-[14px]">
													<span className="tw-text-xs tw-font-light">
														Starting from
													</span>{' '}
													${item?.price}
												</p>
											</div>
										</div>
									</Link>
								))}
								<Link to="/all-bundles">
									<div className="tw-pr-5 tw-py-3 tw-border-b-[1px] tw-w-[90%] tw-mx-auto">
										<span className="tw-text-[13px] md:tw-text-[14px] tw-text-[#bba371] hover:tw-text-black tw-ease-in tw-duration-300">
											View all bundles
										</span>
									</div>
								</Link>
							</div>
						)}
					</div>
					<div
						className={`${
							showForm
								? 'tw-right-0 md:tw-right-[8px]'
								: 'tw-right-[-800px] md:tw-right-[-350px]'
						} tw-w-[100%] tw-h-screen tw-px-5 tw-pt-[110px] md:tw-pt-0 md:tw-max-h-[600px] md:tw-w-[350px] tw-fixed tw-z-30 tw-bg-[rgba(255,255,255,0.97)] tw-p-2 tw-bottom-0 md:tw-bottom-[50px] tw-text-neutral-900 tw-ease-in tw-duration-300`}>
						<ContactForm
							SubmitInqury={SubmitInqury}
							setShowForm={setShowForm}
							setChatError={setChatError}
							setChatSuccess={setChatSuccess}
							setChatDetail={setChatDetail}
							chatDetail={chatDetail}
							handleChangeChat={handleChangeChat}
							chatSuccess={chatSuccess}
							chatError={chatError}
							textColor="tw-text-neutral-900"
							isCancelBtn={true}
						/>
					</div>
					{allProducts.length !== 0 ? (
						<div className="tw-bg-neutral-900 tw-w-[100%]">
							<div className="tw-mb-6 tw-mt-[80px] tw-w-full tw-px-3 ">
								{!expired && (
									<PromoCard setExpired={setExpired} sales={sales} />
								)}
								<Products
									SubmitInqury={SubmitInqury}
									setChatError={setChatError}
									setChatSuccess={setChatSuccess}
									chatDetail={chatDetail}
									handleChangeChat={handleChangeChat}
									chatSuccess={chatSuccess}
									chatError={chatError}
									sales={sales}
									featuredProduct={featuredProduct}
									allProducts={allProducts}
									similarProductsClosure={similarProductsClosure}
									similarProductsFrontal={similarProductsFrontal}
								/>
							</div>
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
