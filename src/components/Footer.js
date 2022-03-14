import React from 'react'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaTiktok } from 'react-icons/fa'
import { SiMastercard } from 'react-icons/si'
import { RiVisaLine } from 'react-icons/ri'
import { SiAmericanexpress } from 'react-icons/si'

function Footer() {
	const paymentType = [
		{ id: 1, type: <SiMastercard size={20} color="darkorange" /> },
		{ id: 2, type: <RiVisaLine size={20} color="blue" /> },
		{ id: 3, type: <SiAmericanexpress size={20} color="blue" /> },
	]
	return (
		<footer className="tw-flex tw-bg-white tw-flex-col tw-py-5 tw-justify-center tw-items-center tw-border-t-[1px] tw-border-neutral-300">
			<div className="tw-flex tw-flex-row tw-justify-between tw-items-center tw-mb-5">
				{paymentType.map((item) => (
					<div
						key={item.id}
						className={
							item.id !== 3
								? 'tw-mx-2 tw-border tw-border-gray-700 tw-rounded-sm tw-px-1'
								: 'tw-mx-2'
						}>
						{item.type}
					</div>
				))}
			</div>
			<div className="tw-flex tw-text-xs tw-text-neutral-500 tw-font-light">
				<div className="tw-pr-5 tw-border-r-2 tw-border-r-neutral-800 md:tw-flex">
					<p className="">
						&copy; {new Date().getUTCFullYear()} <span>modelEst</span>
						<span> • All right reserved</span>
					</p>
				</div>
				<div className="md:tw-flex tw-ml-5">
					<p className="">
						website develop by{' '}
						<span className="rose-gold">
							<a
								href="https://www.linkedin.com/in/oluwatosin-isijola-33333ba8/"
								target="_blank"
								rel="noopener noreferrer">
								- Tony Isijola
							</a>
						</span>
					</p>
				</div>
			</div>
			<div className="tw-flex tw-justify-evenly tw-items-center tw-w-[80%] md:tw-w-[8%] md:tw-ml-10 tw-mt-3 rose-gold">
				<a
					href="https://www.instagram.com/es.motayo/"
					target="_blank"
					rel="noopener noreferrer">
					<AiOutlineInstagram size={20} className="hover:tw-text-rose-100" />
				</a>
				{/* <a
					href="https://www.facebook.com/search/top?q=hairposey"
					target="_blank"
					rel="noopener noreferrer">
					<FiFacebook size={20} className="hover:tw-text-rose-100" />
				</a> */}
				<a
					href="https://www.tiktok.com/@es.motayo"
					target="_blank"
					rel="noopener noreferrer">
					<FaTiktok size={20} className="hover:tw-text-rose-100" />
				</a>
			</div>
		</footer>
	)
}

export default Footer
