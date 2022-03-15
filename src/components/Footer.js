import React from 'react'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaTiktok } from 'react-icons/fa'
import { SiMastercard } from 'react-icons/si'
import { RiVisaLine } from 'react-icons/ri'
import { SiAmericanexpress } from 'react-icons/si'
import { countries } from '../country'

function Footer() {
	const paymentType = [
		{ id: 1, type: <SiMastercard size={20} color="darkorange" /> },
		{ id: 2, type: <RiVisaLine size={20} color="blue" /> },
		{ id: 3, type: <SiAmericanexpress size={20} color="blue" /> },
	]
	const [country, setCountry] = React.useState('United States')
	const handleOnChange = (e) => {
		setCountry(e.target.value)
		localStorage.setItem('Country/region', country)
	}

	React.useEffect(() => {
		localStorage.setItem('Country/region', country)
	}, [country])

	const links = [
		{
			id: 2,
			name: 'Contact Us',
		},
		{
			id: 3,
			name: 'About Us',
		},
		{
			id: 4,
			name: 'Privacy Policy',
		},
		{
			id: 5,
			name: 'Shipping Policies',
		},
		{
			id: 6,
			name: 'Terms and Conditions',
		},
	]
	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 1900)
	}

	return (
		<footer className="tw-flex tw-bg-white tw-flex-col tw-py-5 tw-justify-center tw-items-center tw-border-t-[1px] tw-border-neutral-300">
			<span className="tw-text-center tw-mb-5 tw-text-sm tw-font-light">
				Quick Links
			</span>
			<div className="tw-flex tw-flex-row tw-w-[80%] md:tw-max-w-[50%] lg:tw-max-w-[35%] xl:tw-max-w-[25%] tw-text-xs tw-justify-between tw-font-light tw-mb-5">
				<ul className="">
					{links.slice(0, 2).map((link) => (
						<li
							onClick={link.name === 'About Us' && scrollToTop}
							className="tw-mb-3 hover:tw-cursor-pointer hover:tw-underline ">
							{link.name}
						</li>
					))}
				</ul>
				<ul className="">
					{links.slice(2, 4).map((link) => (
						<li className="tw-mb-3 hover:tw-cursor-pointer hover:tw-underline ">
							{link.name}
						</li>
					))}
				</ul>
				<ul className="">
					{links.slice(4, links.length).map((link) => (
						<li className="tw-mb-3 hover:tw-cursor-pointer hover:tw-underline ">
							{link.name}
						</li>
					))}
				</ul>
			</div>
			<div>
				<span className="tw-text-xs tw-font-light tw-tracking-widest tw-text-neutral-400">
					Country/region
				</span>
				<select
					className="tw-w-[220px] tw-mb-5 tw-text-neutral-500 tw-font-light tw-bg-white tw-block tw-px-3 tw-py-2 tw-border-gray-200 tw-rounded-[2px] tw-text-xs tw-border-[1px] tw-placeholder-gray-200 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0"
					onChange={handleOnChange}
					id="country"
					value={country}
					name="country">
					{countries.map((item, idx) => (
						<option key={idx}>{item.country}</option>
					))}
				</select>
			</div>
			<div className="tw-flex tw-flex-row tw-justify-between tw-items-center tw-mb-5">
				{paymentType.map((item) => (
					<div
						key={item.id}
						className={
							item.id !== 3
								? 'tw-mx-2 tw-border tw-border-gray-300 tw-rounded-sm tw-px-1'
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
