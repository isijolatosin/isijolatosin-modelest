import React, { useContext } from 'react'
import { CgClose } from 'react-icons/cg'
import { GrCheckmark } from 'react-icons/gr'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/user-context'
import { selectItemCount } from '../../slices/appSlices'

const Add2CartPopup = ({ singleCart, setSingleCart, quantity }) => {
	const navigate = useNavigate()
	const [agree, setAgree] = React.useState(false)
	const [warn, setWarn] = React.useState(false)
	const [showInfo, setShowInfo] = React.useState(false)
	const { user } = useContext(UserContext)
	const itemCount = useSelector(selectItemCount)

	function handleCheckout() {
		if (!agree) {
			setWarn(true)
		}
		if (agree) {
			navigate(`/checkout/${user?.displayName || 'new-customer'}`)
			// setTimeout(() => {
			// 	setTimeout(function () {
			// 		window.scrollTo(0, window.innerHeight)
			// 	}, 500)
			// }, 500)
		}
	}

	return (
		<div>
			{singleCart && (
				<div className="tw-absolute tw-bg-white tw-border tw-border-neutral-300 tw-py-5 tw-px-5 md:tw-w-[520px] tw-w-[400px] tw-top-0 md:tw-top-[95px] tw-z-40 tw-right-0 md:tw-right-[40px] tw-shadow-lg">
					<div className="tw-flex tw-items-center">
						<GrCheckmark />
						<span className="tw-text-xs tw-ml-2 tw-text-neutral-700">
							{`${quantity} Item added to your cart`}
						</span>
					</div>
					<div className="tw-flex tw-flex-row tw-mb-5 tw-mt-3">
						<img
							id={singleCart._id}
							src={singleCart.image}
							alt={singleCart._id}
							className="tw-h-[50px] tw-w-[50px] tw-mr-2 tw-object-cover tw-rounded-full tw-object-center"
						/>
						<div className="tw-flex tw-flex-col tw-text-xs md:tw-text-sm">
							<span>
								{singleCart.hairLength?.includes('inch')
									? `${singleCart.hairLength} ${singleCart.name}`
									: `${singleCart.hairLength} - inches ${singleCart.name}`}
							</span>
							{singleCart.hairColor && (
								<span>Color - {singleCart.hairColor}</span>
							)}
							{singleCart.hairTexture && (
								<span>Texture - {singleCart.hairTexture}</span>
							)}
							{singleCart.width && <span>Width - {singleCart.width}</span>}
							<span>${singleCart.price} USD</span>
						</div>
					</div>
					<div className="tw-flex tw-items-center tw-relative tw-mb-5">
						<label className="check-container">
							<input
								onChange={(e) => {
									setAgree(e.target.checked)
									setWarn(false)
								}}
								type="checkbox"
							/>
							<span
								className={`${warn && 'tw-border-red-700'} checkmark`}></span>
						</label>
						<div>
							<p
								className={`${
									warn ? 'tw-text-red-600' : 'tw-text-neutral-900'
								} tw-text-sm`}>
								I have read and agreed with{' '}
								<button
									className={`${
										warn
											? 'tw-text-red-600 tw-border-b-[1px] tw-border-red-600'
											: 'tw-text-blue-500 tw-border-b-[1px] tw-border-blue-500'
									}`}
									onMouseOver={() => setShowInfo(true)}
									onMouseLeave={() => setShowInfo(false)}>
									Terms and Conditions
								</button>
							</p>
						</div>
						{showInfo && (
							<div className="tw-absolute tw-max-w-[150px] tw-bg-[rgba(0,0,0,0.85)] tw-p-2 tw-rounded-md tw-rounded-br-none md:tw-rounded-br-md md:tw-rounded-bl-none tw-text-white tw-text-center tw-top-[-40px] tw-right-[10px] tw-text-xs tw-flex tw-items-top">
								<span className="tw-text-left">
									Review terms and condition in help tab
								</span>
							</div>
						)}
					</div>
					<div>
						<div className="tw-flex tw-items-center tw-justify-between tw-mx-auto tw-w-[80%] md:tw-w-[70%]">
							<button
								onClick={() => {
									if (agree) {
										navigate(
											`/user-cart/${user?.displayName || 'new-customer'}`
										)
									} else {
										setWarn(true)
									}
								}}
								className="tw-border tw-border-black tw-py-1 tw-px-5 tw-bg-white tw-text-center tw-text-xs md:tw-text-sm hover:tw-bg-neutral-900 hover:tw-text-white tw-ease-in tw-duration-300">
								<button>View cart ({itemCount})</button>
							</button>
							<button
								onClick={handleCheckout}
								className="tw-bg-black tw-text-white tw-py-1 tw-px-5 tw-text-center tw-text-xs md:tw-text-sm hover:tw-bg-white hover:tw-text-neutral-900 tw-border tw-border-black tw-ease-in tw-duration-300">
								<button>Check out</button>
							</button>
						</div>
						<button
							onClick={() => {
								if (agree) {
									setSingleCart(null)
								} else {
									setWarn(true)
								}
							}}
							size={25}
							className="tw-w-full tw-text-center tw-text-blue-500 tw-text-xs tw-mt-5 tw-pb-1 hover:tw-cursor-pointer hover:tw-text-neutral-600 tw-ease-in tw-duration-300">
							<span>Continue shopping</span>
						</button>
					</div>
					<div className="tw-absolute tw-top-2 tw-p-1 tw-bg-neutral-900 tw-rounded-full tw-text-white tw-right-2 hover:md:tw-bg-white hover:md:tw-text-neutral-900 tw-cursor-pointer tw-ease-in tw-duration-300">
						<CgClose onClick={() => setSingleCart(null)} size={15} />
					</div>
				</div>
			)}
		</div>
	)
}

export default Add2CartPopup
