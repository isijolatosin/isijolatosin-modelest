import React from 'react'
import { Link } from 'react-router-dom'

const subLinks = [
	{
		id: '1',
		name: 'Bundles',
		route: '/indian-bundles',
	},
	{
		id: '2',
		name: 'Closure / Frontal',
		route: '/indian-closure-frontal',
	},
	{
		id: '3',
		name: 'Jet Black / Blonde',
		route: '/indian-jet-black-&-blonde',
	},
]
const bundlesDeals = [
	{
		id: '1',
		name: 'Indian - Hair',
		route: '/indian-bundles-deals',
	},
	{
		id: '2',
		name: 'Vietnamese - Hair',
		route: '/vietnamese-bundles-deals',
	},
	{
		id: '3',
		name: 'Brazilian - Hair',
		route: '/brazilian-bundles-deals',
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
				<p className="hover:tw-cursor-pointer tw-border-l-[1px] tw-border-neutral-600 tw-pl-2 tw-mr-4 tw-text-center">
					Indian - hair
				</p>

				{list1 && (
					<div className="tw-absolute tw-top-[30px] md:tw-top-4 tw-left-[-12px] md:tw-left-0 tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						{subLinks.map((item) => (
							<Link
								to={item.route}
								className="tw-shadow-lg md:tw-text-center tw-px-3 tw-rounded-sm  tw-w-[180px] tw-bg-neutral-300 md:tw-bg-neutral-400 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500"
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
				<p className="tw-text-center hover:tw-cursor-pointer tw-border-l-[1px] tw-border-neutral-600 tw-pl-2 tw-mr-4">
					Vietnamese - hair
				</p>

				{list2 && (
					<div className="tw-absolute tw-top-[30px] md:tw-top-4 tw-left-[-40px] md:tw-left-0 tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						<p className="tw-shadow-lg tw-text-center md:tw-text-center tw-px-3 tw-rounded-sm tw-pl-5  tw-w-[180px] tw-bg-neutral-300 md:tw-bg-neutral-400 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500">
							coming soon...
						</p>
						<p className="tw-shadow-lg tw-text-center md:tw-text-center tw-px-3 tw-rounded-sm tw-pl-5  tw-w-[180px] tw-bg-neutral-300 md:tw-bg-neutral-400 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500">
							coming soon...
						</p>
						<p className="tw-shadow-lg tw-text-center md:tw-text-center tw-px-3 tw-rounded-sm tw-pl-5  tw-w-[180px] tw-bg-neutral-300 md:tw-bg-neutral-400 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500">
							coming soon...
						</p>

						{/* {subLinks.map((item) => (
							<Link
								to={item.route}
								className="tw-text-center md:tw-text-left tw-px-3 tw-rounded-sm tw-pl-5 tw-w-[250px] tw-bg-neutral-300 md:tw-bg-neutral-400 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500"
								key={item.id}>
								{item.name}
							</Link>
						))} */}
					</div>
				)}
			</div>
			<div
				onMouseOver={handleMousein3}
				onMouseLeave={() => setList3(false)}
				className="tw-w-full tw-relative tw-uppercase tw-font-bold tw-text-[10px]">
				<p className="tw-text-center hover:tw-cursor-pointer tw-border-l-[1px] tw-border-r-[1px] tw-border-neutral-600 tw-px-2">
					Brazillian - hair
				</p>

				{list3 && (
					<div className="tw-absolute tw-top-[30px] md:tw-top-4 tw-right-[-45px] md:tw-left-0 tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						<p className="tw-shadow-lg tw-text-center md:tw-text-center tw-px-3 tw-rounded-sm tw-pl-5  tw-w-[180px] tw-bg-neutral-300 md:tw-bg-neutral-400 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500">
							coming soon...
						</p>
						<p className="tw-shadow-lg tw-text-center md:tw-text-center tw-px-3 tw-rounded-sm tw-pl-5  tw-w-[180px] tw-bg-neutral-300 md:tw-bg-neutral-400 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500">
							coming soon...
						</p>
						<p className="tw-shadow-lg tw-text-center md:tw-text-center tw-px-3 tw-rounded-sm tw-pl-5  tw-w-[180px] tw-bg-neutral-300 md:tw-bg-neutral-400 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500">
							coming soon...
						</p>
						{/* {subLinks.map((item) => (
							<Link
								to={item.route}
								className="tw-text-right md:tw-text-left tw-px-3 tw-rounded-sm tw-pl-5 tw-w-[250px] tw-bg-neutral-300 md:tw-bg-neutral-400 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500"
								key={item.id}>
								{item.name}
							</Link>
						))} */}
					</div>
				)}
			</div>
			<div
				onMouseOver={handleMousein4}
				onMouseLeave={() => setList4(false)}
				className="tw-w-full tw-relative tw-uppercase tw-font-bold tw-text-[10px]">
				<p className="tw-text-center hover:tw-cursor-pointer tw-border-l-[1px] tw-border-r-[1px] tw-border-neutral-600 tw-px-2">
					Bundle - Deals
				</p>

				{list4 && (
					<div className="tw-absolute tw-top-[30px] md:tw-top-4 tw-right-[-12px] md:tw-left-0 tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						{bundlesDeals.map((item) => (
							<Link
								to={item.route}
								className="tw-shadow-lg tw-text-right md:tw-text-left tw-px-3 tw-rounded-sm tw-pl-5 tw-w-[180px] tw-bg-neutral-300 md:tw-bg-neutral-400 tw-mb-[1px] tw-text-[11px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500"
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
