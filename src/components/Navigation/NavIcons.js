import React, { useContext } from 'react'
import { BsHandbag, BsHandbagFill } from 'react-icons/bs'
import { FiLogOut } from 'react-icons/fi'
import { FiLogIn } from 'react-icons/fi'
import { MdAssignmentInd } from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { UserContext } from '../../context/user-context'
import { selectItemCount } from '../../slices/appSlices'
import { useSelector } from 'react-redux'
import { BsFillPersonFill } from 'react-icons/bs'

function NavIcons() {
	const { user } = useContext(UserContext)
	const itemCount = useSelector(selectItemCount)
	const [showCountCard, setShowCountCard] = React.useState(false)
	const navigate = useNavigate()

	const handleSignOut = () => {
		auth.signOut()
		navigate('/')
	}

	return (
		<div className=" tw-flex tw-flex-row tw-w-46 tw-justify-end tw-items-center tw-mb-3">
			{user && (
				<Link
					to={`/user/${user?.displayName}`}
					className="tw-w-30 tw-h-30 tw-text-[#bba371] tw-ease-in tw-duration-300 hover:tw-bg-neutral-800 tw-cursor-pointer tw-rounded-full tw-p-2 tw-mr-4">
					<BsFillPersonFill size={25} />
				</Link>
			)}
			<div
				onMouseOver={() => setShowCountCard(true)}
				onMouseOut={() => setShowCountCard(false)}
				onClick={() =>
					navigate(`/user-cart/${user?.displayName || 'new-customer'}`)
				}
				className={`${
					itemCount > 0 && 'tw-mt-6'
				} tw-w-30 tw-h-30 tw-text-[#bba371] tw-text-xl  hover:tw-bg-neutral-800 hover:tw-text-[#bba371] tw-cursor-pointer tw-rounded-full tw-p-2 tw-ease-in tw-duration-300 tw-relative`}>
				{itemCount > 0 ? <BsHandbagFill size={21} /> : <BsHandbag size={21} />}
				{itemCount > 0 && (
					<span className="tw-absolute tw--top-[10px] tw-right-[2px] tw-border-[1px] tw-border-[#bba371] tw-font-light tw-text-md bg-blur3 tw-bg-clip-text tw-text-[#ffffff] tw-rounded-full tw-p-4 tw-h-1 tw-w-1 tw-flex tw-mx-auto tw-justify-center tw-items-center">
						{itemCount}
					</span>
				)}
				{showCountCard && (
					<div className="tw-hidden md:tw-inline">
						<div className="tw-absolute tw-text-xs tw-w-[150px] tw-bg-neutral-900 tw-p-2 tw-text-[#bba371] tw-rounded-sm tw-text-center tw-left-[-57px] tw-top-[40px] tw-border-[1px] tw-border-[#bba371]">
							<span>
								You have {itemCount} {itemCount > 1 ? 'items' : 'item'} in your
								cart
							</span>
						</div>
						<div className="tw-absolute tw-bottom-[-11px] tw-w-[15px] tw-rotate-45 tw-h-[15px] tw-left-[11px] tw-bg-neutral-900 tw-border-t-[1px] tw-border-l-[1px] tw-border-[#bba371] "></div>
					</div>
				)}
			</div>
			{user && (
				<div className="tw-flex tw-ml-[20px] tw-flex-col tw-justify-center tw-items-center hover:tw-bg-neutral-800 tw-cursor-pointer tw-rounded-full tw-p-2 tw-relative tw-ease-in tw-duration-300">
					<div className="tw-text-[#bba371] tw-text-xl">
						<FiLogOut size={25} onClick={handleSignOut} />
					</div>
				</div>
			)}
			{!user && (
				<div className="tw-ml-5 tw-flex tw-flex-row tw-justify-between tw-items-center">
					<div className="tw-flex tw-flex-col tw-justify-center tw-items-center hover:tw-bg-neutral-800 tw-cursor-pointer tw-rounded-full tw-p-2 tw-mr-5 tw-relative tw-ease-in tw-duration-300">
						<div className="tw-text-[#bba371] tw-text-xl">
							<FiLogIn size={25} onClick={() => navigate('/login')} />
						</div>
					</div>
					<div className="tw-flex tw-flex-col tw-justify-center tw-items-center hover:tw-bg-neutral-800 tw-cursor-pointer tw-rounded-full tw-p-2 tw-relative tw-ease-in tw-duration-300 ">
						<div className="tw-text-[#bba371] tw-text-xl">
							<MdAssignmentInd
								size={25}
								onClick={() => navigate('/register')}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default NavIcons
