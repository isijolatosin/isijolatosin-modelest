import React from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'
import WigsCard from '../components/WigsCard'

function VirginWigs() {
	const [wigs, setWigs] = React.useState(null)

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
		fetchProducts()

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className="home">
			<Helmet>
				<title>Virgin-wigs</title>
			</Helmet>
			<Layout>
				<div className="tw-w-full tw-bg-[rgba(255,255,255,0.5)] tw-mt-[50px] md:tw-mt-[0px]">
					<div className="xl:tw-w-[80%] lg:tw-w-[70%] tw-mx-auto tw-py-[70px] tw-px-5 tw-grid xl:tw-grid-cols-3 lg:tw-grid-cols-2 md:tw-grid-cols-2 tw-grid-cols-1 tw-gap-5">
						<div className="tw-w-full tw-flex tw-justify-center">
							{wigs &&
								wigs?.map((wig) => (
									<div key={wig.id}>
										<WigsCard product={wig} dealPrice={wig?.price} />
									</div>
								))}
						</div>
					</div>
				</div>
			</Layout>
		</div>
	)
}

export default VirginWigs
