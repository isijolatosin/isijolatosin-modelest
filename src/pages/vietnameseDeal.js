import React from 'react'
import { Helmet } from 'react-helmet'
// import { getDatabase, ref, onValue } from 'firebase/database'
import Layout from '../components/shared/Layout'
// import { UserContext } from '../context/user-context'

function VietnameseDeal() {
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

	return (
		<>
			<Helmet>
				<title>Vietnamese-hair-Bundle-Deals</title>
			</Helmet>
			<Layout>
				<div className="tw-py-[100px] tw-px-5 tw-bg-gray-300 tw-flex tw-flex-col tw-items-center">
					Vietnamese-hair-Bundle-Deals
				</div>
			</Layout>
		</>
	)
}

export default VietnameseDeal
