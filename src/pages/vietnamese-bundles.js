import React from 'react'
import { Helmet } from 'react-helmet'
// import { getDatabase, ref, onValue } from 'firebase/database'
import Layout from '../components/shared/Layout'
import {
	fetchSalesPercentage,
	fetchBundlePercentage,
} from '../utils/salesPercentageNumber'
// import { UserContext } from '../context/user-context'

function VietnameseBundles() {
	const [sales, setSales] = React.useState(null)
	const [bundleDeals, setBundleDeals] = React.useState(null)
	React.useEffect(() => {
		setSales(fetchSalesPercentage())
		setBundleDeals(fetchBundlePercentage())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// 	const { user } = useContext(UserContext)
	// 	const database = getDatabase()
	//
	// 	React.useEffect(() => {
	// 		const starCountRef = ref(database, 'bundle deals')
	// 		onValue(starCountRef, (snapshot) => {
	// 			const data = snapshot.val()
	//
	// 			setBundleDeals(data?.no)
	// 		})
	// 		// eslint-disable-next-line react-hooks/exhaustive-deps
	// 	}, [])

	const name = window.location.pathname
		.split('/')
		.filter((x) => x)
		.join(' ')

	return (
		<>
			<Helmet>
				<title>Vietnamese-Hair-Bundle</title>
			</Helmet>
			<Layout>
				<div
					className={`${
						sales
							? 'tw-pt-[160px] md:tw-pt-[150px]'
							: 'tw-pt-[95px] md:tw-pt-[0px]'
					} tw-w-full tw-bg-[rgba(255,255,255,0.1)] tw-pb-10 home tw-text-white tw-text-center`}>
					{name} coming soon. We got you covered... {bundleDeals}
				</div>
			</Layout>
		</>
	)
}

export default VietnameseBundles
