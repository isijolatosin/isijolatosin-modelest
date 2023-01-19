import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { UserContext } from "../../context/user-context";
import { FaUserGraduate } from "react-icons/fa";
import useFetchDBHook from "../../utils/useFetchDBHook";
import { db } from "../../firebase";
import { AMB, ROLE } from "../../constant";

const logo = require("../../assets/logo2.png");

function ImageComponent() {
	const { user } = useContext(UserContext);
	const [showText, setShowText] = React.useState(false);
	const type = "authUsers";
	const admin = useFetchDBHook(db, type, {})?.[0];
	const adminArray = admin?.adminUsers?.filter(
		(adm) => adm?.type === ROLE.GLOBAL_LEAD
	);
	const ambArray = admin?.adminUsers.filter(
		(amb) => amb?.type === ROLE.GLOBAL_LEAD || ROLE.REGIONAL_LEAD || AMB
	);

	let ambCode;
	let authUser;
	ambArray?.filter((amb) => {
		if (amb.email === user?.email) ambCode = amb.code;

		return null;
	});
	adminArray?.filter((adm) => {
		if (adm?.email === user?.email) authUser = adm?.email;

		return null;
	});

	const handleShow = () => {
		!showText && setShowText(true);
	};
	const handleHide = () => {
		setShowText(false);
	};
	return (
		<div className="tw-py-1 tw-flex tw-flex-row tw-items-center ">
			<Link className="tw-ml-[-10px] tw-mt-1" to="/">
				<img
					src={logo}
					loading="lazy"
					alt=".."
					className="tw-w-[70px] tw-h-full tw-object-contain tw-rounded-full"
				/>
			</Link>
			<div className="tw-flex tw-flex-row tw-items-center tw-justify-center">
				{authUser && (
					<Link
						to="/admin-portal"
						className="tw-relative"
						onMouseOver={handleShow}
						onMouseOut={handleHide}>
						<div className="tw-w-30 tw-h-30 tw-p-2 tw-text-[#bba371] tw-text-xl hover:tw-cursor-pointer tw-bg-neutral-800 tw-rounded-full tw-ease-in tw-duration-300 tw-ml-[-5px]">
							<RiAdminFill />
						</div>
					</Link>
				)}
				{ambCode && (
					<Link
						to={`/performance/${ambCode}`}
						className="tw-relative"
						onMouseOver={handleShow}
						onMouseOut={handleHide}>
						<div className="tw-w-30 tw-h-30 tw-p-2 tw-text-[#bba371] tw-text-xl hover:tw-cursor-pointer tw-bg-neutral-800 tw-rounded-full tw-ease-in tw-duration-300 tw-ml-[10px]">
							<FaUserGraduate />
						</div>
					</Link>
				)}
			</div>
		</div>
	);
}

export default ImageComponent;
