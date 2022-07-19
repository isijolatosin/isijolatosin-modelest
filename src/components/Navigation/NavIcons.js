import React, { useContext } from 'react'
import { MdShoppingBasket } from 'react-icons/md'
import { MdOutlineShoppingBasket } from 'react-icons/md'
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
				onClick={() =>
					navigate(`/user-cart/${user?.displayName || 'new-customer'}`)
				}
				className={`${
					itemCount > 0 && 'tw-mt-6'
				} tw-w-30 tw-h-30 tw-text-[#bba371] tw-text-xl  hover:tw-bg-neutral-800 hover:tw-text-[#bba371] tw-cursor-pointer tw-rounded-full tw-p-2 tw-ease-in tw-duration-300 tw-relative`}>
				{itemCount > 0 ? (
					<MdShoppingBasket size={25} />
				) : (
					<MdOutlineShoppingBasket size={25} />
				)}
				{itemCount > 0 && (
					<span className="tw-absolute tw--top-[10px] tw-right-[3.5px] tw-border-[1px] tw-border-[#bba371] tw-font-light tw-text-md bg-blur3 tw-bg-clip-text tw-text-[#ffffff] tw-rounded-full tw-p-4 tw-h-1 tw-w-1 tw-flex tw-mx-auto tw-justify-center tw-items-center">
						{itemCount}
					</span>
				)}
			</div>
			{user && (
				<div className="tw-flex tw-ml-[20px] tw-flex-col tw-justify-center tw-items-center hover:tw-bg-neutral-800 tw-cursor-pointer tw-rounded-full tw-p-2 tw-relative tw-ease-in tw-duration-300">
					<div className="tw-text-[#bba371] tw-text-xl">
						<FiLogOut size={25} onClick={handleSignOut} />
					</div>
					{/* <span className="tw-text-[7px] tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-black tw-via-yellow-600 tw-to-yellow-700 tw-uppercase">
						sign out
					</span> */}
				</div>
			)}
			{!user && (
				<div className="tw-ml-5 tw-flex tw-flex-row tw-justify-between tw-items-center">
					<div className="tw-flex tw-flex-col tw-justify-center tw-items-center hover:tw-bg-neutral-800 tw-cursor-pointer tw-rounded-full tw-p-2 tw-mr-5 tw-relative tw-ease-in tw-duration-300">
						<div className="tw-text-[#bba371] tw-text-xl">
							<FiLogIn size={25} onClick={() => navigate('/login')} />
						</div>
						{/* <span className="tw-text-[7px] tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-black tw-via-yellow-600 tw-to-yellow-700 tw-uppercase">
							sign in
						</span> */}
					</div>
					<div className="tw-flex tw-flex-col tw-justify-center tw-items-center hover:tw-bg-neutral-800 tw-cursor-pointer tw-rounded-full tw-p-2 tw-relative tw-ease-in tw-duration-300 ">
						<div className="tw-text-[#bba371] tw-text-xl">
							<MdAssignmentInd
								size={25}
								onClick={() => navigate('/register')}
							/>
						</div>
						{/* <span className="tw-text-[7px] tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-black tw-via-yellow-600 tw-to-yellow-700 tw-uppercase">
							sign up
						</span> */}
					</div>
				</div>
			)}
		</div>
	)
}

export default NavIcons
