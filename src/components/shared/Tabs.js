import React from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

const Tabs = ({ user, userPostalAddress, isPaymentPage }) => {
	return (
		<div className="tw-text-neutral-400 tw-flex tw-items-center tw-border-t-[1px] tw-border-b-[1px] tw-border-neutral-800 tw-py-3 lg:tw-mt-[-40px] tw-justify-center tw-font-light tw-text-xs tw-mt-[-30px]">
			<Link
				to={`/user-cart/${user?.displayName}`}
				className="tw-flex tw-items-center tw-mr-2">
				<span className="tw-mr-2 tw-text-white">Cart</span>
				<MdKeyboardArrowRight size={23} />
			</Link>
			<Link
				to={`/checkout/${user?.displayName}`}
				className="tw-flex tw-items-center tw-mr-2">
				<span
					className={`${
						window.location.pathname.includes("checkout")
							? "tw-text-[#bba371] tw-font-bold"
							: "tw-text-white"
					} tw-mr-2`}>
					Information
				</span>
				<MdKeyboardArrowRight size={23} />
			</Link>
			<Link
				to={
					isPaymentPage
						? `/payment/${user?.displayName}`
						: userPostalAddress && `/payment`
				}>
				<span
					className={`${
						window.location.pathname.includes("payment")
							? "tw-text-[#bba371] tw-font-bold"
							: "tw-text-white tw-mr-2"
					}`}>
					Payment
				</span>
			</Link>
		</div>
	);
};

export default Tabs;
