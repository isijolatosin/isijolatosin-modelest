import React from 'react'
import { Link } from 'react-router-dom'

const FeaturedCard = ({ featuredProduct }) => {
	return (
		<div className="tw-border-t-[1px] tw-text-neutral-900 tw-w-full tw-bg-white md:tw-pb-20">
			<div className="featuredCard media-scroller tw-gap-3 tw-py-10 tw-w-[95%] tw-mx-auto tw-snap-x tw-snap-mandatory">
				{featuredProduct.map((item) => (
					<Link
						to={
							item?.name.toLowerCase().includes('bundles')
								? `/all-bundles`
								: item?.route
						}
						className="media-element tw-relative tw-gap-0 tw-shadow-lg tw-snap-center">
						<img className="tw-shadow-lg" src={item?.image} alt={item?.name} />
						<p className="tw-absolute tw-bg-[rgba(0,0,0,0.8)] tw-text-[#bba371] tw-font-light tw-bottom-0 tw-rounded-b-lg md:tw-p-3 tw-pl-2 tw-tracking-widest md:tw-text-[28px] tw-text-[18px] tw-w-full font_cursive">
							{item?.name}
						</p>
					</Link>
				))}
			</div>
		</div>
	)
}

export default FeaturedCard
