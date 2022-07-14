import React from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'
import { getDatabase, ref, onValue } from 'firebase/database'
import BundleCard from '../components/BundleCard'

function IndianDeal() {
	// const { user } = useContext(UserContext)
	const database = getDatabase()
	const [dealPriceBodyWaveFrontal, setDealPriceBodyWaveFrontal] =
		React.useState(null)
	const [dealPriceBodyWaveClosure, setDealPriceBodyWaveClosure] =
		React.useState(null)

	const [dealPriceCurlyFrontal, setDealPriceCurlyFrontal] = React.useState(null)
	const [dealPriceCurlyClosure, setDealPriceCurlyClosure] = React.useState(null)
	const [bodyWaveFrontal, setBodyWaveFrontal] = React.useState(null)
	const [CurlyFrontal, setCurlyFrontal] = React.useState(null)
	const [bodyWaveClosure, setBodyWaveClosure] = React.useState(null)
	const [CurlyClosure, setCurlyClosure] = React.useState(null)
	const [bundleDealsPercentage, setBundleDealsPercentage] = React.useState(12)

	async function fetchProducts() {
		try {
			const {
				data: { products },
			} = await axios.get('/api/v1/products')

			const filtered = []
			let price = 0
			let price2 = 0
			let price3 = 0
			let price4 = 0
			// eslint-disable-next-line array-callback-return
			products.filter((product) => {
				if (product.name.toLowerCase() === 'body wave') {
					filtered.push(product)
					setBodyWaveFrontal(product)
					const length18 = product?.price + 20
					const length20 = product?.price + 30
					const length22 = product?.price + 40
					price += length18 + length20 + length22
				}
				if (product.name.toLowerCase() === 'natural curly') {
					filtered.push(product)
					setCurlyClosure(product)
					const length16 = product?.price + 10
					const length18 = product?.price + 20
					const length20 = product?.price + 30
					price2 += length16 + length18 + length20
				}
				if (product.name.toLowerCase() === 'body wave') {
					filtered.push(product)
					setBodyWaveClosure(product)
					const length18 = product?.price + 20
					const length20 = product?.price + 30
					const length22 = product?.price + 40
					price3 += length18 + length20 + length22
				}
				if (product.name.toLowerCase() === 'natural curly') {
					filtered.push(product)
					setCurlyFrontal(product)
					const length16 = product?.price + 10
					const length18 = product?.price + 20
					const length20 = product?.price + 30
					price4 += length16 + length18 + length20
				}
				// Body wave frontal 18inch
				if (product.type.toLowerCase() === 'frontal') {
					filtered.push(product)
					price += product?.price + 20
				}
				// Natural curly frontal 16inch
				if (product.type.toLowerCase() === 'frontal') {
					filtered.push(product)
					price2 += product?.price + 10
				}
				// Body wave closure 18inch
				if (product.type.toLowerCase() === 'closure') {
					filtered.push(product)
					price3 += product?.price + 20
				}
				// Natural curly closure 16inch
				if (product.type.toLowerCase() === 'closure') {
					filtered.push(product)
					price4 += product?.price + 10
				}
				const discount = price * (bundleDealsPercentage / 100)
				const discount2 = price2 * (bundleDealsPercentage / 100)
				const discount3 = price3 * (bundleDealsPercentage / 100)
				const discount4 = price4 * (bundleDealsPercentage / 100)
				setDealPriceBodyWaveFrontal((price - discount).toFixed(2))
				setDealPriceCurlyFrontal((price2 - discount2).toFixed(2))
				setDealPriceBodyWaveClosure((price3 - discount3).toFixed(2))
				setDealPriceCurlyClosure((price4 - discount4).toFixed(2))
			})
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		const starCountRef = ref(database, 'bundle deals')
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val()

			setBundleDealsPercentage(data.no)
		})
		fetchProducts()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="home">
			<Helmet>
				<title>Indian-Hair-Bundle-Deals</title>
			</Helmet>
			<Layout sales={bundleDealsPercentage}>
				<div className="tw-w-full tw-bg-[rgba(255,255,255,0.5)] tw-mt-[50px] md:tw-mt-[0px]">
					<div className="xl:tw-w-[80%] lg:tw-w-[70%] tw-mx-auto tw-py-[70px] tw-px-5 tw-grid xl:tw-grid-cols-3 lg:tw-grid-cols-2 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-5">
						<div className="tw-w-full tw-flex tw-justify-center">
							{bodyWaveFrontal && (
								<BundleCard
									dealPrice={dealPriceBodyWaveFrontal}
									product={bodyWaveFrontal}
									sales={bundleDealsPercentage}
									frontalClosure="frontal"
									texture="bodywave"
								/>
							)}
						</div>
						<div className="tw-w-full tw-flex tw-justify-center">
							{CurlyFrontal && (
								<BundleCard
									dealPrice={dealPriceCurlyFrontal}
									product={CurlyFrontal}
									sales={bundleDealsPercentage}
									frontalClosure="frontal"
									texture="naturalcurly"
								/>
							)}
						</div>
						<div className="tw-w-full tw-flex tw-justify-center">
							{bodyWaveClosure && (
								<BundleCard
									dealPrice={dealPriceBodyWaveClosure}
									product={bodyWaveClosure}
									sales={bundleDealsPercentage}
									frontalClosure="closure"
									texture="bodywave"
								/>
							)}
						</div>
						<div className="tw-w-full tw-flex tw-justify-center">
							{CurlyClosure && (
								<BundleCard
									dealPrice={dealPriceCurlyClosure}
									product={CurlyClosure}
									sales={bundleDealsPercentage}
									frontalClosure="closure"
									texture="naturalcurly"
								/>
							)}
						</div>
					</div>
				</div>
			</Layout>
		</div>
	)
}

export default IndianDeal
