import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const indianSubLinks = [
	{
		id: '1',
		name: 'Bundles',
		route: '/bundles/indian',
	},
	{
		id: '2',
		name: 'Closure / Frontal',
		route: '/closure-frontal/indian',
	},
	{
		id: '3',
		name: 'Jet Black / Blonde',
		route: '/jet-black-&-blonde/indian',
	},
]
const virginSubLinks = [
	{
		id: '3',
		name: 'Wigs',
		route: '/virgin-wigs/',
	},
	{
		id: '1',
		name: 'Bundles',
		route: '/bundles/virgin',
	},
	{
		id: '2',
		name: 'Closure / Frontal',
		route: '/closure-frontal/virgin',
	},
]
const vietnameseSubLinks = [
	{
		id: '3',
		name: 'Wigs',
		route: '/vietnamese-wigs/',
	},
	{
		id: '1',
		name: 'Bundles',
		route: '/bundles/vietnamese',
	},
	{
		id: '2',
		name: 'Closure / Frontal',
		route: '/closure-frontal/vietnamese',
	},
]
const bundlesDeals = [
	{
		id: '1',
		name: 'Indian',
		route: '/indian-bundles-deals',
	},
	{
		id: '2',
		name: 'Virgin',
		route: '/virgin-bundles-deals',
	},
	{
		id: '3',
		name: 'Vietnamese',
		route: '/vietnamese-bundles-deals',
	},
]
const helpLinks = [
	{
		id: '1',
		key: 'faqs',
		name: 'FAQs',
	},
	{
		id: '2',
		key: '/blogs/caring-for-indian-virgin-vietnamese-hair-extensions',
		name: 'Blogs',
	},
	{
		id: '3',
		key: 'privacy',
		name: 'Privacy Policy',
	},
	{
		id: '4',
		key: 'shipping',
		name: 'Shipping & Returns',
	},
	{
		id: '5',
		key: 'terms',
		name: 'Terms & Conditions',
	},
	{
		id: '6',
		key: 'contact',
		name: 'About Us / Contact Us',
	},
]

function LinksComponent({
	setShowContactForm,
	setShowTerms,
	setShowShippingReturns,
	setPrivacyReturns,
}) {
	const navigate = useNavigate()
	const [list1, setList1] = React.useState(false)
	const [list2, setList2] = React.useState(false)
	const [list3, setList3] = React.useState(false)
	const [list4, setList4] = React.useState(false)
	const [list5, setList5] = React.useState(false)

	const handleMousein1 = () => {
		setList5(false)
		setList4(false)
		setList3(false)
		setList2(false)
		setList1(true)
	}
	const handleMousein2 = () => {
		setList5(false)
		setList4(false)
		setList3(false)
		setList2(true)
		setList1(false)
	}
	const handleMousein3 = () => {
		setList5(false)
		setList4(false)
		setList3(true)
		setList2(false)
		setList1(false)
	}
	const handleMousein4 = () => {
		setList5(false)
		setList4(true)
		setList3(false)
		setList2(false)
		setList1(false)
	}
	const handleMousein5 = () => {
		setList5(true)
		setList4(false)
		setList3(false)
		setList2(false)
		setList1(false)
	}

	const handleHelp = (txt) => {
		if (txt.toLowerCase() === 'about us / contact us') {
			setShowContactForm(true)
			setPrivacyReturns(false)
			setShowShippingReturns(false)
			setShowTerms(false)
			window.scrollTo(0, document.body.scrollHeight)
		} else if (txt.toLowerCase() === 'privacy policy') {
			setShowContactForm(false)
			setPrivacyReturns(true)
			setShowShippingReturns(false)
			setShowTerms(false)
			window.scrollTo(0, document.body.scrollHeight)
		} else if (txt.toLowerCase() === 'shipping & returns') {
			setShowContactForm(false)
			setPrivacyReturns(false)
			setShowShippingReturns(true)
			setShowTerms(false)
			window.scrollTo(0, document.body.scrollHeight)
		} else if (txt.toLowerCase() === 'terms & conditions') {
			setShowContactForm(false)
			setPrivacyReturns(false)
			setShowShippingReturns(false)
			setShowTerms(true)
			window.scrollTo(0, document.body.scrollHeight)
		} else if (txt.toLowerCase() === 'faqs') {
			setShowContactForm(false)
			setPrivacyReturns(false)
			setShowShippingReturns(false)
			navigate('/modelEst/frequently-asked-questions')
		} else if (txt.toLowerCase() === 'blogs') {
			setShowContactForm(false)
			setPrivacyReturns(false)
			setShowShippingReturns(false)
			navigate('/blogs/caring-for-indian-virgin-vietnamese-hair-extensions')
		}
	}

	return (
		<div className="tw-grid tw-grid-cols-5 tw-w-full">
			<div
				onMouseOver={handleMousein1}
				onMouseLeave={() => setList1(false)}
				className="tw-w-full tw-relative tw-uppercase tw-font-light tw-text-[10px] md:tw-text-[12px]">
				<p className="hover:tw-cursor-pointer tw-border-r-[1px] tw-border-[#bba371] tw-px-2 tw-text-center">
					Indian
				</p>

				{list1 && (
					<div className="tw-absolute tw-top-[20px] md:tw-top-4 tw-left-[-12px] md:tw-left-0 tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						{indianSubLinks.map((item) => (
							<Link
								to={item.route}
								className="tw-shadow-lg md:tw-text-center tw-px-3 tw-rounded-sm  md:tw-w-[150px] tw-w-[160px] tw-bg-neutral-900 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-white hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500 tw-opacity-[0.95]"
								key={item.id}>
								{item.name}
							</Link>
						))}
					</div>
				)}
			</div>

			<div
				onMouseOver={handleMousein3}
				onMouseLeave={() => setList3(false)}
				className="tw-w-full tw-relative tw-uppercase tw-font-light tw-text-[10px] md:tw-text-[12px]">
				<p className="tw-text-center hover:tw-cursor-pointer tw-border-r-[1px] tw-border-[#bba371] tw-px-2">
					Virgin
				</p>

				{list3 && (
					<div className="tw-absolute tw-top-[20px] md:tw-top-4 tw-right-[-40px] md:tw-left-0 tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						{virginSubLinks.map((item) => (
							<Link
								to={item.route}
								className="tw-text-center tw-px-3 tw-rounded-sm md:tw-w-[150px] tw-w-[160px] tw-bg-neutral-900 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-white hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500 tw-opacity-[0.95]"
								key={item.id}>
								{item.name}
							</Link>
						))}
					</div>
				)}
			</div>

			<div
				onMouseOver={handleMousein2}
				onMouseLeave={() => setList2(false)}
				className="tw-w-full tw-relative tw-uppercase tw-font-light tw-text-[10px] md:tw-text-[12px]">
				<p className="tw-text-center hover:tw-cursor-pointer tw-border-r-[1px] tw-border-[#bba371] tw-px-2">
					Vietnamese
				</p>

				{list2 && (
					<div className="tw-absolute tw-top-[20px] md:tw-top-4 tw-left-[-43px] md:tw-left-0 tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						{vietnameseSubLinks.map((item) => (
							<Link
								to={item.route}
								className="tw-text-center md:tw-text-center tw-px-3 tw-rounded-sm md:tw-w-[150px] tw-w-[160px] tw-bg-neutral-900 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-white hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500 tw-opacity-[0.95]"
								key={item.id}>
								{item.name}
							</Link>
						))}
					</div>
				)}
			</div>

			<div
				onMouseOver={handleMousein4}
				onMouseLeave={() => setList4(false)}
				className="tw-w-full tw-relative tw-uppercase tw-font-light tw-text-[10px] md:tw-text-[12px]">
				<p className="tw-text-center hover:tw-cursor-pointer tw-border-r-[1px] tw-border-[#bba371] tw-px-2">
					Deals
				</p>

				{list4 && (
					<div className="tw-absolute tw-top-[20px] md:tw-top-4 tw-right-[-40px] md:tw-left-0 tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						{bundlesDeals.map((item) => (
							<Link
								to={item.route}
								className="tw-shadow-lg tw-text-center md:tw-text-center tw-px-3 tw-rounded-sm md:tw-w-[150px] tw-w-[160px] tw-bg-neutral-900 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-white hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500 tw-opacity-[0.95]"
								key={item.id}>
								{item.name}
							</Link>
						))}
					</div>
				)}
			</div>
			<div
				onMouseOver={handleMousein5}
				onMouseLeave={() => setList5(false)}
				className="tw-w-full tw-relative tw-uppercase tw-font-light tw-text-[10px] md:tw-text-[12px]">
				<p className="tw-text-center hover:tw-cursor-pointer  tw-px-2">
					Help ?
				</p>

				{list5 && (
					<div className="tw-absolute tw-top-[20px] md:tw-top-4 tw-right-[-12px] md:tw-left-0 tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						{helpLinks.map((item) => (
							<span
								onClick={() => handleHelp(item.name)}
								className="tw-shadow-lg tw-text-right md:tw-text-center tw-px-3 tw-rounded-sm md:tw-w-[150px] tw-w-[160px] tw-bg-neutral-900 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-white hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500 tw-opacity-[0.95]"
								key={item.id}>
								{item.name}
							</span>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default LinksComponent
