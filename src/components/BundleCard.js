import React from 'react'
import { MdOutlineInventory, MdMoneyOff } from 'react-icons/md'
import { GiMoneyStack } from 'react-icons/gi'
import RatingFix from './shared/RatingFix'
import truncate from '../utils/truncate'
import { Link } from 'react-router-dom'

function BundleCard({ product, sales, dealPrice, frontalClosure, texture }) {
	return (
		<div className="card tw-drop-shadow-xl">
			<ul className="ul">
				<li>
					<span className="tw-absolute tw-left-[-95px] tw-text-white tw-text-md tw-font-bold">
						<span className="tw-text-xs tw-font-light">From</span> ${dealPrice}
					</span>
					<GiMoneyStack />
				</li>
				<li>
					<span
						className={`${
							product.sales && sales !== 0
								? 'tw-text-white  tw-left-[-35px]'
								: 'tw-text-white tw-left-[-73px]'
						} tw-absolute tw-text-xs`}>
						{product.sales ? 'Sales' : 'Not on Sales'}
					</span>
					<MdMoneyOff className={`${!product.sales && 'tw-text-red-800'}`} />
				</li>
				<li>
					<span
						className={`${
							product?.instock
								? 'tw-text-white  tw-left-[-45px]'
								: 'tw-text-white tw-left-[-65px]'
						} tw-absolute tw-text-xs`}>
						{product.instock ? 'Instock' : 'Not Instock'}
					</span>
					<MdOutlineInventory
						className={`${!product.instock && 'tw-text-red-800'}`}
					/>
				</li>
			</ul>
			<img
				id={product._id}
				src={product?.image}
				alt={product._id}
				className="tw-w-full md:tw-w-[400px] tw-object-cover"
			/>
			<div className="con-text tw-bg-[rgba(255,255,255,0.95)]">
				<h2 className="tw-text-sm tw-font-bold tw-uppercase">
					{product.name} & {frontalClosure}{' '}
					<span className="tw-text-[12px] tw-text-red-700">
						- 3 Bundle Deal
					</span>
				</h2>
				<div className="tw-flex tw-items-center">
					<RatingFix isNum={false} />
				</div>
				<span className="tw-text-xs">
					Starting from{' '}
					<span className="tw-font-bold tw-text-xl">${dealPrice}</span>
				</span>
				<p className="">{truncate(product?.description, 30)}</p>
			</div>
			<Link
				to={`/deals/3-bundle-deal-${product?.brand}-${texture}&${frontalClosure}`}>
				<button className="tw-absolute tw-bottom-[20px] tw-right-[20px] tw-z-30">
					Buy Now
				</button>
			</Link>
		</div>
	)
}

export default BundleCard
