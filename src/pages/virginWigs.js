import React from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'
import WigsCard from '../components/WigsCard'
import { getDatabase, ref, onValue } from 'firebase/database'

function VirginWigs() {
	const [wigs, setWigs] = React.useState([])
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
				data: { products },
			} = await axios.get('/api/v1/products')

			const filtered = []
			// eslint-disable-next-line array-callback-return
			products.filter((product) => {
				if (product.type.toLowerCase().includes('virgin wig')) {
					filtered.push(product)
				}
			})
			setWigs(filtered)
		} catch (error) {
			console.log(error)
		}
	}

	React.useEffect(() => {
		setTimeout(() => {
			fetchProducts()
		}, 3000)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="home">
			<Helmet>
				<title>Virgin-wigs</title>
			</Helmet>
			<Layout>
				<div
					className={`${
						sales
							? 'tw-pt-[140px] md:tw-pt-[110px]'
							: 'tw-pt-[50px] md:tw-pt-[0px]'
					} tw-w-full tw-bg-[rgba(255,255,255,0.1)] tw-pb-10`}>
					{wigs?.length === 0 ? (
						<div className="tw-w-full tw-flex tw-justify-center tw-pt-[100px] tw-pb-[50px]">
							<div className="tw-rounded-full progress">
								<div className="inner"></div>
							</div>
						</div>
					) : (
						<div className="tw-w-full tw-flex tw-flex-wrap tw-justify-center tw-mx-auto">
							{wigs &&
								wigs?.map((wig) => (
									<div key={wig.id}>
										<WigsCard product={wig} dealPrice={wig?.price} />
									</div>
								))}
						</div>
					)}
				</div>
			</Layout>
		</div>
	)
}

export default VirginWigs
