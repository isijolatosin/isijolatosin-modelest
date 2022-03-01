import React, { useContext } from 'react'
import { GiShoppingBag } from 'react-icons/gi'
import { FiLogOut } from 'react-icons/fi'
import { FiLogIn } from 'react-icons/fi'
import { MdAssignmentInd } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { UserContext } from '../../context/user-context'
import { selectItemCount } from '../../slices/appSlices'
import { useSelector } from 'react-redux'

function NavIcons() {
	const { user } = useContext(UserContext)
	const itemCount = useSelector(selectItemCount)
	const navigate = useNavigate()
	// const [showText, setShowText] = React.useState(false)

	// const handleShow = () => {
	// 	!showText && setShowText(true)
	// }
	// const handleHide = () => {
	// 	setShowText(false)
	// }
	const handleSignOut = () => {
		auth.signOut()
		navigate('/')
	}

	return (
		<div className=" tw-flex tw-flex-row tw-w-46 tw-mr-5 tw-justify-center tw-items-center">
			<div
				onClick={() => navigate('/user-cart')}
				className="tw-w-30 tw-h-30 tw-text-gray-300 tw-text-xl hover:tw-cursor-pointer hover:tw-bg-gray-300 hover:tw-p-2 hover:tw-rounded-full tw-ease-in tw-duration-300 tw-relative">
				<GiShoppingBag />
				<span className="tw-absolute tw--top-4 tw-right-[-16px] tw-border-2 tw-text-sm bg-blur2 tw-bg-clip-text tw-text-neutral-50 tw-font-light tw-rounded-full tw-p-3 tw-h-7 tw-w-7 tw-flex tw-mx-auto tw-justify-center tw-items-center">
					{itemCount}
				</span>
			</div>
			{/* <div
				onMouseOver={!user && handleShow}
				onMouseOut={!user && handleHide}
				onClick={() => user && navigate('/user-account')}
				className="tw-w-30 tw-h-30 tw-text-gray-300 tw-text-xl hover:tw-cursor-pointer hover:tw-bg-gray-300 hover:tw-p-2 hover:tw-rounded-full tw-ease-in tw-duration-300 ">
				<GoPerson />
				<CursorText showText={showText}>Sign In Required</CursorText>
			</div> */}
			{user && (
				<div className="tw-flex  tw-ml-[40px] tw-flex-col tw-justify-center tw-items-center hover:tw-opacity-[0.5] hover:tw-cursor-pointer  tw-relative">
					<div className="tw-text-gray-300 tw-text-xl tw-ease-in tw-duration-500">
						<FiLogOut onClick={handleSignOut} />
					</div>
					<span className="tw-text-[7px] tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500 tw-uppercase">
						sign out
					</span>
				</div>
			)}
			{!user && (
				<div className="tw-w-[80px] tw-ml-[40px] tw-flex tw-flex-row tw-justify-between tw-items-center">
					<div className="tw-flex tw-flex-col tw-justify-center tw-items-center hover:tw-opacity-[0.5] hover:tw-cursor-pointer tw-relative">
						<div className="tw-text-gray-300 tw-text-xl tw-ease-in tw-duration-500">
							<FiLogIn onClick={() => navigate('/login')} />
						</div>
						<span className="tw-text-[7px] tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500 tw-uppercase">
							sign in
						</span>
					</div>
					<div className="tw-flex tw-flex-col tw-justify-center tw-items-center hover:tw-opacity-[0.5] hover:tw-cursor-pointer tw-relative">
						<div className="tw-text-gray-300 tw-text-xl tw-ease-in tw-duration-500">
							<MdAssignmentInd onClick={() => navigate('/register')} />
						</div>
						<span className="tw-text-[7px] tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500 tw-uppercase">
							sign up
						</span>
					</div>
				</div>
			)}
		</div>
	)
}

export default NavIcons
