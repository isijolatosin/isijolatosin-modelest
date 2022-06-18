import React, { useContext } from 'react'
import { CgClose } from 'react-icons/cg'
import { GrCheckmark } from 'react-icons/gr'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/user-context'
import { selectItemCount } from '../../slices/appSlices'

const Add2CartPopup = ({ singleCart, setSingleCart }) => {
	const navigate = useNavigate()
	const { user } = useContext(UserContext)
	const itemCount = useSelector(selectItemCount)

	function handleCheckout() {
		navigate(`/user-cart/${user?.displayName || 'new-customer'}`)
		setTimeout(() => {
			setTimeout(function () {
				window.scrollTo(0, window.innerHeight)
			}, 500)
		}, 500)
	}

	return (
		<div>
			{singleCart && (
				<div className="tw-absolute bg-blur2 tw-border tw-border-neutral-300 tw-p-10 tw-w-[350px] tw-top-0 md:tw-top-[95px] tw-z-40 tw-right-0 md:tw-right-[40px]">
					<div className="tw-flex tw-items-center">
						<GrCheckmark />
						<span className="tw-text-xs tw-ml-2 tw-text-neutral-700">
							Item added to your cart
						</span>
					</div>
					<div className="tw-flex tw-flex-row tw-mb-10 tw-mt-7">
						<img
							id={singleCart._id}
							src={singleCart.image}
							alt={singleCart._id}
							className=" tw-w-[80px] tw-h-[120px] tw-mr-3 tw-object-cover tw-rounded-sm hover:tw-cursor-pointer"
						/>
						<div className="tw-flex tw-flex-col tw-text-sm">
							<span>{singleCart.name}</span>
							<span>Length - {singleCart.hairLength}" inches</span>
							{singleCart.width && <span>Width - {singleCart.width}</span>}
							<span>Color - {singleCart.hairColor}</span>
							<span>Price - ${singleCart.price} USD</span>
						</div>
					</div>
					<div
						onClick={() =>
							navigate(`/user-cart/${user?.displayName || 'new-customer'}`)
						}
						className="tw-border tw-border-black tw-py-2 tw-bg-white tw-text-center tw-mb-3">
						<button>View cart ({itemCount})</button>
					</div>
					<div
						onClick={handleCheckout}
						className="tw-bg-black tw-text-white tw-py-2 tw-text-center">
						<button>Check out</button>
					</div>
					<div
						onClick={() => setSingleCart(null)}
						size={25}
						className="tw-text-center tw-mt-2 tw-border-b tw-pb-1 hover:tw-cursor-pointer">
						<span>Continue shopping</span>
					</div>
					<div className="tw-absolute tw-top-10 tw-right-5 hover:tw-cursor-pointer">
						<CgClose onClick={() => setSingleCart(null)} size={25} />
					</div>
				</div>
			)}
		</div>
	)
}

export default Add2CartPopup
