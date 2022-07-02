import React from 'react'
import { MdMoneyOff } from 'react-icons/md'
import { Link } from 'react-router-dom'

const DealsCard = ({ lengthArray, brand }) => {
	return (
		<div className="tw-bg-white tw-w-full lg:tw-h-[170px] tw-mt-10 tw-rounded-lg">
			<div className="tw-flex tw-flex-col lg:tw-flex-row tw-w-[100%] tw-h-full">
				<div className="tw-rounded-t-lg lg:tw-rounded-bl-lg lg:tw-rounded-t-lg lg:tw-rounded-r-[0px] tw-text-center tw-bg-neutral-200 tw-flex tw-flex-col tw-justify-center lg:tw-items-center tw-px-5 tw-mb-5 lg:tw-mb-0 tw-py-5 lg:tw-py-2 lg:tw-w-[25%] tw-border-r-[1px] tw-border-neutral-300 tw-h-full">
					<span className="tw-leading-7 tw-text-[22px] tw-mb-[-10px]">
						{brand} Bundle
					</span>
					<span className="tw-text-[50px] tw-font-light tw-text-green-700 tw-uppercase">
						Deals
					</span>
				</div>
				<div className="tw-flex tw-flex-col tw-items-center md:tw-flex-row md:tw-items-center md:tw-justify-between md:tw-w-[75%] sm:tw-mx-[10px] md:tw-mx-[100px] lg:tw-mx-[30px] xl:tw-mx-[80px] 2xl:tw-mx-[120px] md:tw-mb-10 lg:tw-mb-0 sm:tw-mb-0">
					<div className="md:tw-grid lg:tw-grid-cols-2 lg:tw-gap-2 tw-w-[80%]">
						{lengthArray.map((item) => (
							<div
								className={`tw-mb-2 lg:tw-mb-0 tw-text-center tw-text-white tw-bg-neutral-400 tw-px-5 tw-py-2 tw-ease-in tw-duration-300 tw-rounded-sm tw-w-[100%] md:tw-w-[220px] lg:tw-w-[250px]`}>
								<span>{item}</span>
							</div>
						))}
					</div>
					<div className="tw-flex-col tw-text-xs">
						<Link
							to="/virgin-bundles-deals"
							className="tw-flex tw-items-center tw-justify-center tw-mx-10 md:tw-mx-0 tw-py-1 tw-px-[20px] tw-w-[250px] md:tw-w-[200px] tw-bg-neutral-900 tw-text-white hover:tw-cursor-pointer hover:tw-bg-neutral-300 hover:tw-text-neutral-900 tw-ease-in tw-duration-300 tw-rounded-[3px] tw-my-2">
							<button className="tw-font-light">Virgin - Deal</button>
							<div className="tw-text-[26px]">
								<MdMoneyOff className="tw-ml-2 tw-text-green-700" />
							</div>
						</Link>
						<Link
							to="/indian-bundles-deals"
							className="tw-flex tw-items-center tw-justify-center tw-mx-10 md:tw-mx-0 tw-py-1 tw-px-[20px] tw-w-[250px] md:tw-w-[200px] tw-bg-neutral-900 tw-text-white hover:tw-cursor-pointer hover:tw-bg-neutral-300 hover:tw-text-neutral-900 tw-ease-in tw-duration-300 tw-rounded-[3px] tw-my-2">
							<button className="tw-font-light">Indian - Deal</button>
							<div className="tw-text-[26px]">
								<MdMoneyOff className="tw-ml-2 tw-text-green-700" />
							</div>
						</Link>
						<Link
							to="/vietnamese-bundles-deals"
							className="tw-flex tw-items-center tw-justify-center tw-mx-10 md:tw-mx-0 tw-py-1 tw-px-[20px] tw-w-[250px] md:tw-w-[200px] tw-bg-neutral-900 tw-text-white hover:tw-cursor-pointer hover:tw-bg-neutral-300 hover:tw-text-neutral-900 tw-ease-in tw-duration-300 tw-rounded-[3px] tw-my-2 tw-mb-10 md:tw-mb-0">
							<button className="tw-font-light">Vietnamese - Deal</button>
							<div className="tw-text-[26px]">
								<MdMoneyOff className="tw-ml-2 tw-text-green-700" />
							</div>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}

export default DealsCard
