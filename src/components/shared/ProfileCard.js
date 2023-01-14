import React, { useContext } from "react";
import { UserContext } from "../../context/user-context";
import { AMB, ROLE } from "../../constant";

const ProfileCard = (props) => {
	const { user } = useContext(UserContext);
	return (
		<div
			className={`${
				props?.data?.role === ROLE?.GLOBAL_LEAD
					? "tw-bg-neutral-800 tw-text-white"
					: props?.data?.role === ROLE?.REGIONAL_LEAD
					? "tw-bg-neutral-500 tw-text-white"
					: props?.data?.role === AMB
					? "tw-bg-neutral-200 tw-text-neutral-600"
					: ""
			} tw-grid tw-grid-col-2 tw-grid-flow-col tw-gap-3 tw-p-2 tw-pt-5 tw-mb-1 tw-rounded-sm tw-relative`}>
			<div>
				<h1 className="tw-font-light tw-text-xs tw-border-b-[0.1px] tw-border-neutral-700 tw-py-1">
					<strong>Account Name:</strong> {props?.data?.displayName}
				</h1>
				<h1 className="tw-font-light tw-text-xs tw-border-b-[0.1px] tw-border-neutral-700 tw-py-1">
					<strong>Handle:</strong>{" "}
					{props?.data?.instagram ||
						props?.data?.tiktok ||
						props?.data?.snapchat}
				</h1>
				{props?.data?.country && (
					<h1 className="tw-font-light tw-text-xs tw-border-b-[0.1px] tw-border-neutral-700 tw-py-1">
						<strong>Country:</strong> {props?.data?.country}
					</h1>
				)}
				{props?.data?.state && (
					<h1 className="tw-font-light tw-text-xs tw-border-b-[0.1px] tw-border-neutral-700 tw-py-1">
						<strong>State:</strong> {props?.data?.state}
					</h1>
				)}
			</div>
			<div>
				<h1 className="tw-font-light tw-text-xs tw-border-b-[0.1px] tw-border-neutral-700 tw-py-1">
					<strong>Customer since:</strong>{" "}
					{props?.data?.createdAt
						? new Date(props?.data?.createdAt?.seconds * 1000).toLocaleString()
						: props?.data?.date}
				</h1>
				{props?.data?.yourSalesCode && (
					<h1 className="tw-font-light tw-text-xs tw-border-b-[0.1px] tw-border-neutral-700 tw-py-1">
						<strong>Code:</strong> {props?.data?.yourSalesCode}
					</h1>
				)}
				{props?.data?.totalSales >= 0 && (
					<h1 className="tw-font-light tw-text-xs tw-border-b-[0.1px] tw-border-neutral-700 tw-py-1">
						<strong>Total No of Sales:</strong> {props?.data?.totalSales}{" "}
						{props?.data?.totalSales > 0 ? "units" : "unit"}
					</h1>
				)}
				{props?.data?.monthCount >= 0 && (
					<div
						className={`${
							props?.data?.currentMonthIncome > 700
								? "tw-text-green-400"
								: props?.data?.currentMonthIncome > 500
								? "tw-text-blue-400"
								: "tw-text-red-700"
						} tw-flex tw-items-center tw-justify-between tw-border-b-[0.1px] tw-border-neutral-700 tw-font-bold `}>
						<h1 className={`tw-text-xs tw-py-1 `}>
							<strong className="tw-capitalize">
								{props?.data?.month} sales:
							</strong>{" "}
							{props?.data?.monthCount}{" "}
							{props?.data?.monthCount > 0 ? "units" : "unit"}
						</h1>
						{user?.email === props?.data?.email && (
							<h1
								className={`tw-text-xs tw-border-l-[1px] tw-border-neutral-700 tw-pl-2 tw-ml-2`}>
								USD ${props?.data?.currentMonthIncome}
							</h1>
						)}
					</div>
				)}
			</div>
			{props?.data?.email === user?.email && (
				<div className="tw-absolute tw-top-0 tw-left-0 tw-bg-neutral-100 tw-border-b-[1px] tw-border-neutral-300 tw-px-4 tw-pt-1 tw-text-[9px] tw-text-black tw-w-full tw-font-light">
					<span>You - {user?.displayName || props?.data?.email}</span>
				</div>
			)}
		</div>
	);
};

export default ProfileCard;
