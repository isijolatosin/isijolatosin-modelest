import React from 'react'
import { Helmet } from 'react-helmet'
// import { getDatabase, ref, onValue } from 'firebase/database'
import Layout from '../components/shared/Layout'
import { fetchSalesPercentage } from '../utils/salesPercentageNuumber'
// import { UserContext } from '../context/user-context'

function VirginClosureFrontal() {
	const [sales, setSales] = React.useState(null)
	React.useEffect(() => {
		setSales(fetchSalesPercentage())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	// 	const { user } = useContext(UserContext)
	// 	const database = getDatabase()
	// 	const [bundleDeals, setBundleDeals] = React.useState(null)
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
				<title>Virgin-Hair-Closure&Frontal</title>
			</Helmet>
			<Layout>
				<div
					className={`${
						sales
							? 'tw-pt-[160px] md:tw-pt-[150px]'
							: 'tw-pt-[50px] md:tw-pt-[0px]'
					} tw-w-full tw-bg-[rgba(255,255,255,0.1)] tw-pb-10 home tw-text-white tw-text-center`}>
					{name} coming soon. We got you covered...
				</div>
			</Layout>
		</>
	)
}

export default VirginClosureFrontal
