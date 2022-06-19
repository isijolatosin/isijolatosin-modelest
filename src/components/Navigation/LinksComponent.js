import React from 'react'
import { Link } from 'react-router-dom'

const subLinks = [
	{
		id: '1',
		name: 'Hair Bundles',
		route: '/hair-bundles',
	},
	{
		id: '2',
		name: 'Closure / Frontal',
		route: '/closure-frontal',
	},
	{
		id: '3',
		name: 'Jet Black / Blonde',
		route: '/jet-black-&-blonde-hair',
	},
]

function LinksComponent() {
	const [list1, setList1] = React.useState(false)
	const [list2, setList2] = React.useState(false)
	const [list3, setList3] = React.useState(false)

	const handleMousein1 = () => {
		setList1(true)
		setList2(false)
		setList3(false)
	}
	const handleMousein2 = () => {
		setList2(true)
		setList1(false)
		setList3(false)
	}
	const handleMousein3 = () => {
		setList3(true)
		setList1(false)
		setList2(false)
	}
	return (
		<div className="tw-grid tw-grid-cols-3 tw-w-full">
			<div
				onMouseOver={handleMousein1}
				onMouseLeave={() => setList1(false)}
				className="tw-w-full tw-relative tw-uppercase tw-font-bold tw-text-[10px]">
				<div className="tw-flex tw-flex-row tw-justify-between tw-items-center hover:tw-cursor-pointer tw-border-l-[1px] tw-border-neutral-600 tw-pl-2 tw-mr-4">
					Indian - hair
				</div>

				{list1 && (
					<div className="tw-absolute tw-top-[25px] md:tw-top-4 tw-left-0 tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						{subLinks.map((item) => (
							<Link
								to={item.route}
								className="tw-px-3 tw-rounded-sm md:tw-w-[250px] tw-w-[200px] tw-bg-neutral-400 tw-mb-[1px] tw-text-[12px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500"
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
				<div className="tw-flex tw-flex-row tw-justify-between tw-items-center hover:tw-cursor-pointer tw-border-l-[1px] tw-border-neutral-600 tw-pl-2 tw-mr-4">
					Vietnamese - hair
				</div>

				{list2 && (
					<div className="tw-absolute tw-top-[25px] md:tw-top-4 tw-left-[-35px] md:tw-left-0 tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						<p className="tw-text-center md:tw-text-left tw-px-3 tw-rounded-sm tw-pl-5 md:tw-w-[250px] tw-w-[200px] tw-bg-neutral-400 tw-mb-[1px] tw-text-[12px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500">
							coming soon...
						</p>
						<p className="tw-text-center md:tw-text-left tw-px-3 tw-rounded-sm tw-pl-5 md:tw-w-[250px] tw-w-[200px] tw-bg-neutral-400 tw-mb-[1px] tw-text-[12px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500">
							coming soon...
						</p>
						<p className="tw-text-center md:tw-text-left tw-px-3 tw-rounded-sm tw-pl-5 md:tw-w-[250px] tw-w-[200px] tw-bg-neutral-400 tw-mb-[1px] tw-text-[12px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500">
							coming soon...
						</p>

						{/* {subLinks.map((item) => (
							<Link
								to={item.route}
								className="tw-text-center md:tw-text-left tw-px-3 tw-rounded-sm tw-pl-5 tw-w-[250px] tw-bg-neutral-400 tw-mb-[1px] tw-text-[12px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500"
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
				<div className="tw-flex tw-flex-row tw-justify-between tw-items-center hover:tw-cursor-pointer tw-border-l-[1px] tw-border-neutral-600 tw-pl-2 tw-mr-4">
					Brazillian - hair
				</div>

				{list3 && (
					<div className="tw-absolute tw-top-[25px] md:tw-top-4 tw-right-[-10px] md:tw-right-0 md:tw-left-0 tw-flex tw-flex-col tw-justify-left tw-ease-in tw-duration-300">
						<p className="tw-text-right md:tw-text-left tw-px-3 tw-rounded-sm tw-pl-5 md:tw-w-[250px] tw-w-[200px] tw-bg-neutral-400 tw-mb-[1px] tw-text-[12px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500">
							coming soon...
						</p>
						<p className="tw-text-right md:tw-text-left tw-px-3 tw-rounded-sm tw-pl-5 md:tw-w-[250px] tw-w-[200px] tw-bg-neutral-400 tw-mb-[1px] tw-text-[12px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500">
							coming soon...
						</p>
						<p className="tw-text-right md:tw-text-left tw-px-3 tw-rounded-sm tw-pl-5 md:tw-w-[250px] tw-w-[200px] tw-bg-neutral-400 tw-mb-[1px] tw-text-[12px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500">
							coming soon...
						</p>
						{/* {subLinks.map((item) => (
							<Link
								to={item.route}
								className="tw-text-right md:tw-text-left tw-px-3 tw-rounded-sm tw-pl-5 tw-w-[250px] tw-bg-neutral-400 tw-mb-[1px] tw-text-[12px] tw-p-5 tw-text-neutral-800 hover:tw-text-neutral-500 hover:tw-cursor-pointer tw-ease-in-out tw-duration-500"
								key={item.id}>
								{item.name}
							</Link>
						))} */}
					</div>
				)}
			</div>
		</div>
	)
}

export default LinksComponent
