import React from 'react'
import { Link } from 'react-router-dom'

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
		route: '/wigs/virgin',
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
		route: '/wigs/vietnamese',
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
		name: 'Indian - Hair',
		route: '/indian-bundles-deals',
	},
	{
		id: '3',
		name: 'Virgin - Hair',
		route: '/virgin-bundles-deals',
	},
	{
		id: '2',
		name: 'Vietnamese - Hair',
		route: '/vietnamese-bundles-deals',
	},
]

function LinksComponent() {
	const [list1, setList1] = React.useState(false)
	const [list2, setList2] = React.useState(false)
	const [list3, setList3] = React.useState(false)
	const [list4, setList4] = React.useState(false)

	const handleMousein1 = () => {
		setList4(false)
		setList3(false)
		setList2(false)
		setList1(true)
	}
	const handleMousein2 = () => {
		setList4(false)
		setList3(false)
		setList2(true)
		setList1(false)
	}
	const handleMousein3 = () => {
		setList4(false)
		setList3(true)
		setList2(false)
		setList1(false)
	}
	const handleMousein4 = () => {
		setList4(true)
		setList3(false)
		setList2(false)
		setList1(false)
	}
	return (
		<div className="tw-grid tw-grid-cols-4 tw-w-full">
			<div
				onMouseOver={handleMousein1}
				onMouseLeave={() => setList1(false)}
				className="tw-w-full tw-relative tw-uppercase tw-font-bold tw-text-[10px]">
				<p className="hover:tw-cursor-pointer tw-border-l-[1px] tw-border-r-[1px] tw-border-neutral-600 tw-px-2 tw-text-center">
					Indian - hair
				</p>

				{list1 && (
					<div className="tw-absolute tw-top-[30px] md:tw-top-4 tw-left-[-12px] md:tw-left-0 tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						{indianSubLinks.map((item) => (
							<Link
								to={item.route}
								className="tw-shadow-lg md:tw-text-center tw-px-3 tw-rounded-sm  md:tw-w-[190px] tw-w-[180px] tw-bg-neutral-300 md:tw-bg-neutral-400 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500 tw-opacity-[0.95]"
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
				className="tw-w-full tw-relative tw-uppercase tw-font-bold tw-text-[10px]">
				<p className="tw-text-center hover:tw-cursor-pointer tw-border-r-[1px] tw-border-neutral-600 tw-px-2">
					Virgin - hair
				</p>

				{list3 && (
					<div className="tw-absolute tw-top-[30px] md:tw-top-4 tw-right-[-45px] md:tw-left-0 tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						{virginSubLinks.map((item) => (
							<Link
								to={item.route}
								className="tw-text-center tw-px-3 tw-rounded-sm md:tw-w-[190px] tw-w-[180px] tw-bg-neutral-300 md:tw-bg-neutral-400 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500 tw-opacity-[0.95]"
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
				className="tw-w-full tw-relative tw-uppercase tw-font-bold tw-text-[10px]">
				<p className="tw-text-center hover:tw-cursor-pointer tw-border-r-[1px] tw-border-neutral-600 tw-px-2">
					Vietnamese - hair
				</p>

				{list2 && (
					<div className="tw-absolute tw-top-[30px] md:tw-top-4 tw-left-[-40px] md:tw-left-0 tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						{vietnameseSubLinks.map((item) => (
							<Link
								to={item.route}
								className="tw-text-center md:tw-text-center tw-px-3 tw-rounded-sm md:tw-w-[190px] tw-w-[180px] tw-bg-neutral-300 md:tw-bg-neutral-400 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500 tw-opacity-[0.95]"
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
				className="tw-w-full tw-relative tw-uppercase tw-font-bold tw-text-[10px]">
				<p className="tw-text-center hover:tw-cursor-pointer tw-border-r-[1px] tw-border-neutral-600 tw-px-2">
					Bundle - Deals
				</p>

				{list4 && (
					<div className="tw-absolute tw-top-[30px] md:tw-top-4 tw-right-[-12px] md:tw-left-0 tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						{bundlesDeals.map((item) => (
							<Link
								to={item.route}
								className="tw-shadow-lg tw-text-right md:tw-text-center tw-px-3 tw-rounded-sm md:tw-w-[190px] tw-w-[180px] tw-bg-neutral-300 md:tw-bg-neutral-400 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500 tw-opacity-[0.95]"
								key={item.id}>
								{item.name}
							</Link>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default LinksComponent
