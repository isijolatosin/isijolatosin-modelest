import React, { useContext } from "react";
import { UserContext } from "../../context/user-context";

const ProfileCard = (props) => {
	const { user } = useContext(UserContext);
	return (
		<div
			className={`${
				props?.data?.email === user?.email
					? "tw-border-white tw-border-[1px] tw-bg-neutral-500 tw-text-neutral-300"
					: "tw-bg-neutral-50"
			} tw-flex tw-flex-row tw-items-start tw-justify-between tw-p-2 tw-rounded-sm tw-mb-1`}>
			<div>
				<h1 className="tw-font-light tw-text-xs">
					<strong>Account Name:</strong> {props?.data?.displayName}
				</h1>
				<h1 className="tw-font-light tw-text-xs">
					<strong>Account Email:</strong> {props?.data?.email}
				</h1>
				{props?.data?.country && (
					<h1 className="tw-font-light tw-text-xs">
						<strong>Country:</strong> {props?.data?.country}
					</h1>
				)}
				{props?.data?.state && (
					<h1 className="tw-font-light tw-text-xs">
						<strong>State:</strong> {props?.data?.state}
					</h1>
				)}
			</div>
			<div>
				<h1 className="tw-font-light tw-text-xs">
					<strong>Customer since:</strong>{" "}
					{props?.data?.createdAt
						? new Date(props?.data?.createdAt?.seconds * 1000).toLocaleString()
						: props?.data?.date}
				</h1>
				{props?.data?.yourSalesCode && (
					<h1 className="tw-font-light tw-text-xs">
						<strong>Code:</strong> {props?.data?.yourSalesCode}
					</h1>
				)}
				{props?.data?.totalSales >= 0 && (
					<h1 className="tw-font-light tw-text-xs">
						<strong>Total No of Sales:</strong> {props?.data?.totalSales}{" "}
						{props?.data?.totalSales > 0 ? "units" : "unit"}
					</h1>
				)}
				{props?.data?.monthCount >= 0 && (
					<h1
						className={`tw-font-light tw-text-xs ${
							props?.data?.monthCount > 6
								? "tw-text-green-400"
								: props?.data?.monthCount > 3
								? "tw-text-blue-400"
								: "tw-text-red-700"
						}`}>
						<strong className="tw-capitalize">
							{props?.data?.month} sales:
						</strong>{" "}
						{props?.data?.monthCount}{" "}
						{props?.data?.monthCount > 0 ? "units" : "unit"}
					</h1>
				)}
			</div>
		</div>
	);
};

export default ProfileCard;
