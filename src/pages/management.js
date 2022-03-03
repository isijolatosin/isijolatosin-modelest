import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import Heading from '../components/Heading'
import Inventory from '../components/Inventory'
import Layout from '../components/shared/Layout'
import Shippment from '../components/Shippment'
import { BsFillArrowUpSquareFill } from 'react-icons/bs'
import AllInventories from '../components/AllInventories'
import { UserContext } from '../context/user-context'
import { db } from '../firebase'
import { AUTHORIZED_ID } from '../constant'

function Management() {
	const [section, setSection] = React.useState('all-inventory')
	const { user } = useContext(UserContext)
	const [hitRate, setHitRate] = React.useState('')

	const toggleSection = (e) => {
		setSection(e.target.id)
	}

	const SectionComp = () => {
		if (section === 'all-inventory') {
			return <AllInventories />
		}
		if (section === 'inventory') {
			return <Inventory />
		}
		if (section === 'shipping') {
			return <Shippment />
		}
	}

	React.useEffect(() => {
		db.collection('admin')
			.doc(`${AUTHORIZED_ID.id_one}/`)
			.collection('Hit')
			.onSnapshot((snapshot) => {
				const results = snapshot?.docs?.map((doc) => ({
					data: doc.data(),
				}))
				setHitRate(results?.[0]?.data?.no)
			})
	}, [])

	const hitRateStyle = () => {
		if (hitRate < 20) {
			return 'tw-text-xs tw-text-red-700'
		} else if (hitRate > 20) {
			return 'tw-text-xs tw-text-green-700'
		} else if (hitRate > 50) {
			return 'tw-text-xs tw-text-blue-700'
		}
	}

	return (
		<>
			<Helmet>
				<title>Admin Portal</title>
			</Helmet>
			<Layout>
				<div className="tw-mt-[70px] tw-pt-20 md:tw-pt-10 tw-flex tw-flex-col tw-w-[100%] tw-items-center tw-bg-neutral-300">
					<span className={hitRateStyle(hitRate)}>Hit Rate: {hitRate}</span>
					<Heading>Admin portal</Heading>
					<div className="tw-my-5 tw-w-[100%] tw-text-violet-700">
						<ul className="tw-flex tw-text-xs tw-flex-row tw-items-center tw-justify-between tw-w-[90%] lg:tw-w-[50%] tw-mx-auto">
							<li
								id="all-inventory"
								className="hover:tw-cursor-pointer tw-bg-violet-50 tw-px-4 tw-py-2 tw-rounded-full hover:tw-bg-violet-100 tw-ease-in tw-duration-300"
								onClick={toggleSection}>
								All Inventories
							</li>
							<li
								id="inventory"
								className="hover:tw-cursor-pointer tw-bg-violet-50 tw-px-4 tw-py-2 tw-rounded-full hover:tw-bg-violet-100 tw-ease-in tw-duration-300"
								onClick={toggleSection}>
								Add to Inventory
							</li>
							<li
								id="shipping"
								className="hover:tw-cursor-pointer tw-bg-violet-50  tw-px-4 tw-py-2 tw-rounded-full hover:tw-bg-violet-100 tw-ease-in tw-duration-300"
								onClick={toggleSection}>
								Shipment
							</li>
						</ul>
					</div>
					{user && (
						<div className="tw-w-[100%]">
							<SectionComp />
						</div>
					)}
					{!section && (
						<div className="tw-flex tw-flex-col tw-items-center tw-my-20 ">
							<div className="tw-text-2xl tw-text-stone-600">
								<BsFillArrowUpSquareFill />
							</div>
							<span className="tw-text-stone-600 tw-my-5 tw-capitalize tw-font-light">
								Action Required!
							</span>
						</div>
					)}
				</div>
			</Layout>
		</>
	)
}

export default Management
