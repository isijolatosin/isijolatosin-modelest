import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { getDatabase, ref, onValue, set } from 'firebase/database'
import Heading from '../components/Heading'
import Inventory from '../components/Inventory'
import Layout from '../components/shared/Layout'
import Shippment from '../components/Shippment'
import { BsFillArrowUpSquareFill } from 'react-icons/bs'
import { RiChat1Line } from 'react-icons/ri'
import { RiSendPlaneLine } from 'react-icons/ri'
import AllInventories from '../components/AllInventories'
import { UserContext } from '../context/user-context'
import Inqury from '../components/Inqury'
import {
	MdAdd,
	MdOutlineInventory,
	MdOutlineLocalShipping,
} from 'react-icons/md'

function Management() {
	const database = getDatabase()
	const [sales, setSales] = React.useState(null)
	const [section, setSection] = React.useState('all-inventory')
	const [percentSale, setPercentSale] = React.useState(null)
	const [bundlePercentSale, setBundlePercentSale] = React.useState(null)
	const { user } = useContext(UserContext)

	React.useEffect(() => {
		const starCountRef = ref(database, 'sales')
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val()

			setSales(data.no)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

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
		if (section === 'inquiry') {
			return <Inqury />
		}
	}
	const handleSubmit = () => {
		if (percentSale !== null || percentSale !== '') {
			set(ref(database, 'sales'), {
				no: percentSale,
			})
		}
		setPercentSale('')
	}
	const handleSubmitBundleDeal = () => {
		if (bundlePercentSale !== null || bundlePercentSale !== '') {
			set(ref(database, 'bundle deals'), {
				no: bundlePercentSale,
			})
		}
		setBundlePercentSale('')
	}

	return (
		<>
			<Helmet>
				<title>Admin Portal</title>
			</Helmet>
			<Layout>
				<div
					className={
						sales
							? 'tw-mt-[100px] lg:tw-mt-[100px] tw-pt-20 md:tw-pt-10 tw-flex tw-flex-col tw-w-[100vw] tw-items-center tw-bg-neutral-200'
							: 'tw-mt-[60px] tw-pt-20 md:tw-pt-10 tw-flex tw-flex-col tw-w-[100vw] tw-items-center tw-bg-neutral-200'
					}>
					<div className="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center tw-justify-between tw-w-[95%] md:tw-w-[85%]">
						<Heading children="Admin portal" isBold={true} />
						<div className="tw-flex tw-flex-col md:tw-flex-row">
							<div className="tw-mr-5 tw-py-[2px] tw-flex tw-items-center tw-justify-end tw-w-[50%] md:tw-w-[30%] tw-rounded-full tw-px-3 tw-text-sm tw-bg-neutral-100 tw-mb-2 md:tw-mb-0">
								<input
									type="number"
									name="percentSale"
									id="number"
									value={percentSale}
									onChange={(e) => setPercentSale(Number(e.target.value))}
									placeholder="sales %"
									className="tw-w-[90%] tw-h-[30px] tw-placeholder-gray-400 focus:tw-outline-none tw-border-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-bg-transparent"
								/>
								<RiSendPlaneLine
									onClick={handleSubmit}
									size={20}
									className="tw-text-violet-700 hover:tw-text-violet-300 tw-ease-in tw-duration-300 tw-w-[10%] tw-mr-2"
								/>
							</div>
							<div className="tw-py-[2px] tw-flex tw-items-center tw-justify-end tw-w-[75%] md:tw-w-[50%] tw-rounded-full tw-px-3 tw-text-sm tw-bg-neutral-100">
								<input
									type="number"
									name="bndlePercentSale"
									id="number"
									value={bundlePercentSale}
									onChange={(e) => setBundlePercentSale(Number(e.target.value))}
									placeholder="bundle-deals sales %"
									className="tw-w-[90%] tw-h-[30px] tw-placeholder-gray-400 focus:tw-outline-none tw-border-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-bg-transparent"
								/>
								<RiSendPlaneLine
									onClick={handleSubmitBundleDeal}
									size={20}
									className="tw-text-violet-700 hover:tw-text-violet-300 tw-ease-in tw-duration-300 tw-w-[10%] tw-mr-2"
								/>
							</div>
						</div>
					</div>
					<div className="tw-my-5 tw-w-full md:tw-w-[90%] tw-text-violet-700">
						<ul className="tw-flex tw-text-[10px] md:tw-text-xs tw-flex-row tw-items-center tw-justify-between tw-w-[95%] lg:tw-w-[50%] tw-mx-auto">
							<li
								id="all-inventory"
								className="tw-flex tw-justify-center tw-items-center hover:tw-cursor-pointer tw-bg-violet-50 tw-px-4 tw-py-2 tw-rounded-full hover:tw-bg-violet-100 tw-ease-in tw-duration-300"
								onClick={toggleSection}>
								<MdOutlineInventory className="tw-mr-1" /> Inventories
							</li>
							<li
								id="inventory"
								className="tw-flex tw-justify-center tw-items-center hover:tw-cursor-pointer tw-bg-violet-50 tw-px-4 tw-py-2 tw-rounded-full hover:tw-bg-violet-100 tw-ease-in tw-duration-300"
								onClick={toggleSection}>
								<MdAdd className="tw-mr-1" /> Inventory
							</li>
							<li
								id="shipping"
								className="tw-flex tw-justify-center tw-items-center hover:tw-cursor-pointer tw-bg-violet-50  tw-px-4 tw-py-2 tw-rounded-full hover:tw-bg-violet-100 tw-ease-in tw-duration-300"
								onClick={toggleSection}>
								<MdOutlineLocalShipping className="tw-mr-1" />
								Shipment
							</li>
							<li
								id="inquiry"
								className="tw-flex tw-justify-center tw-items-center hover:tw-cursor-pointer tw-bg-violet-50  tw-px-4 tw-py-2 tw-rounded-full hover:tw-bg-violet-100 tw-ease-in tw-duration-300"
								onClick={toggleSection}>
								<RiChat1Line className="tw-mr-1" />
								Inquiry
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
