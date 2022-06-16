import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { RiAdminFill } from 'react-icons/ri'
import { SUPER_USER1, SUPER_USER2 } from '../../constant'
import { UserContext } from '../../context/user-context'
import CursorText from '../shared/CursorText'

const logo = require('../../assets/logo2.png')

function ImageComponent() {
	const { user } = useContext(UserContext)
	const [showText, setShowText] = React.useState(false)

	const handleShow = () => {
		!showText && setShowText(true)
	}
	const handleHide = () => {
		setShowText(false)
	}
	return (
		<div className="tw-py-1 tw-pl-5 tw-flex tw-flex-row tw-items-center ">
			<Link className="tw-ml-[-30px]" to="/">
				<img
					src={logo}
					loading="lazy"
					alt=".."
					className="tw-w-[90px] tw-h-full tw-object-contain tw-rounded-full"
				/>
			</Link>
			{(SUPER_USER1 === user?.email || SUPER_USER2 === user?.email) && (
				<Link
					to="/admin-portal"
					className="tw-relative"
					onMouseOver={handleShow}
					onMouseOut={handleHide}>
					<div className="tw-w-30 tw-h-30 tw-p-2 tw-text-black tw-text-xl hover:tw-cursor-pointer tw-bg-neutral-200 tw-rounded-full tw-ease-in tw-duration-300 tw-ml-[-5px]">
						<RiAdminFill />
					</div>
					<CursorText showText={showText}>Admin</CursorText>
				</Link>
			)}
		</div>
	)
}

export default ImageComponent
