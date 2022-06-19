import React from 'react'
import ImageComponent from './ImageComponent'
import LinksComponent from './LinksComponent'
import NavIcons from './NavIcons'

function Nav() {
	return (
		<div>
			{localStorage.getItem('isSales') && (
				<div className="tw-bg-black tw-flex tw-flex-col tw-text-white tw-border-b-[1px] tw-font-bold tw-text-center tw-py-2 lg:tw-text-3xl">
					<span className="tw-text-xl">
						PROMO SALE! 15% OFF ON EVERYTHING!!
					</span>
					{/* <span className="tw-text-[16px] tw-my-[-10px]">
						Price deducted at checkout!
					</span> */}
				</div>
			)}
			<div className="tw-flex tw-h-[60px] tw-w-[95%] lg:tw-w-[100%] xl:tw-w-[85%] 2xl:tw-w-[80%] tw-grow tw-flex-row tw-items-center tw-justify-between tw-my-0 tw-mx-auto">
				<div className="tw-w-[10%]">
					<ImageComponent />
				</div>
				<div className="tw-hidden md:tw-inline tw-w-[60%]">
					<LinksComponent />
				</div>
				<div className="tw-w-[40%] md:tw-w-[15%]">
					<NavIcons />
				</div>
			</div>
			<div className="tw-in-line tw-px-3 md:tw-hidden tw-flex-0.8 tw-border-t-[1px] tw-border-neutral-300 tw-bg-neutral-300 tw-py-2">
				<LinksComponent />
			</div>
		</div>
	)
}

export default Nav
