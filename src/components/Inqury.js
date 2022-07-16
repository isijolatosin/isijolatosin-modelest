import React from 'react'
import { db } from '../firebase'
import Heading from './Heading'

const Inqury = () => {
	const [inqury, setInqury] = React.useState([])
	React.useEffect(() => {
		db.collection('customer-inqury')
			.orderBy('timestamp', 'asc')
			.onSnapshot((snapshot) => {
				const results = snapshot.docs.map((doc) => ({
					data: doc.data(),
				}))

				if (results) {
					const rstArry = []
					for (const result of results) {
						rstArry.push(result.data)
					}
					setTimeout(() => {
						setInqury(rstArry)
					}, 3000)
				}
			})
	}, [])

	return (
		<div className="tw-w-[95%] md:tw-w-[90%] tw-mx-auto tw-mb-10">
			<div className="tw-flex tw-justify-center tw-my-5">
				<Heading children="Customers Inquries" isBold={true} />
			</div>
			{inqury.length === 0 ? (
				<div className="tw-w-full tw-flex tw-justify-center">
					<div className="tw-rounded-full progress">
						<div className="inner"></div>
					</div>
				</div>
			) : (
				<div>
					{inqury.map((item) => (
						<div
							key={item?.id}
							className="tw-relative tw-flex tw-flex-col tw-w-full tw-bg-neutral-300 tw-p-5 tw-mb-[2px] tw-rounded-[5px] tw-text-neutral-600 tw-text-sm">
							<span className="">Customer's name: {item?.name}</span>
							<span>Customer's email: {item?.email}</span>
							<span>Title: {item?.title}</span>
							<span className="tw-p-3 tw-bg-neutral-100 tw-mt-1 tw-italic tw-font-light tw-shadow-md tw-pt-[20px]">
								{item?.message}
							</span>
							<div className="tw-bg-neutral-300 tw-rounded-r-full tw-absolute tw-top-[92px] tw-left-[12px] tw-w-[20px] tw-h-[20px]"></div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default Inqury
