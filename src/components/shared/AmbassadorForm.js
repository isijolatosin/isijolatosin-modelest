import React from "react";
import { RiInstagramLine, RiSnapchatLine } from "react-icons/ri";
import { SiTiktok } from "react-icons/si";
import Heading from "../Heading";
import Button from "./Button";

const AmbassadorForm = ({
	ambObj,
	handleUpdateAmbObj,
	handleSubmit,
	exist,
}) => {
	return (
		<article className="tw-w-full">
			<form
				className="tw-w-[95%] xl:tw-w-[75%] tw-mx-auto"
				onSubmit={handleSubmit}>
				<div>
					<div className="tw-mt-10 tw-mb-2">
						<Heading
							children="Personal Information"
							size2={true}
							isBold={true}
							isWhite={true}
						/>
					</div>
					<div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-2">
						<div className="tw-w-[100%]">
							<input
								type="text"
								name="firstname"
								id="firstname"
								value={ambObj.firstname}
								onChange={handleUpdateAmbObj}
								placeholder="First Name..."
								className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
							/>
						</div>
						<div className="tw-w-[100%]">
							<input
								type="text"
								name="lastname"
								id="lastname"
								value={ambObj.lastname}
								onChange={handleUpdateAmbObj}
								placeholder="Last Name..."
								className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
							/>
						</div>
						<div className="tw-w-[100%]">
							<input
								type="text"
								name="email"
								id="email"
								value={ambObj.email}
								onChange={handleUpdateAmbObj}
								placeholder="Email..."
								className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
							/>
						</div>
						<div className="tw-w-[100%] tw-flex tw-items-center">
							<input
								type="text"
								name="code"
								id="text"
								value={ambObj.code}
								onChange={handleUpdateAmbObj}
								placeholder="Code..."
								className="tw-flex-[0.17] tw-w-full tw-px-3 tw-py-2 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0 tw-mr-1"
							/>
							<input
								type="number"
								name="phone"
								id="number"
								value={ambObj.phone}
								onChange={handleUpdateAmbObj}
								placeholder="Phone No..."
								className="tw-flex-[0.83] tw-w-full tw-px-3 tw-py-2 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
							/>
						</div>
						<div className="tw-w-[100%]">
							<input
								type="text"
								name="state"
								id="state"
								value={ambObj.state}
								onChange={handleUpdateAmbObj}
								placeholder="State/Province..."
								className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
							/>
						</div>
						<div className="tw-w-[100%]">
							<input
								type="text"
								name="country"
								id="country"
								value={ambObj.country}
								onChange={handleUpdateAmbObj}
								placeholder="Country..."
								className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
							/>
						</div>
						<div className="tw-w-[100%]">
							<input
								type="date"
								name="date"
								id="date"
								placeholder="Date"
								required
								value={ambObj.date}
								onChange={handleUpdateAmbObj}
								className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
							/>
						</div>
					</div>
				</div>
				<div>
					<div className="tw-mt-10 tw-mb-2">
						<Heading
							children="Bank Information"
							size2={true}
							isBold={true}
							isWhite={true}
						/>
					</div>
					<div className="tw-grid md:tw-grid-cols-2 tw-gap-2">
						<div className="tw-w-[100%]">
							<input
								type="text"
								name="accountNo"
								id="accountNo"
								value={ambObj.accountNo}
								onChange={handleUpdateAmbObj}
								placeholder="Account No..."
								className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
							/>
						</div>
						<div className="tw-w-[100%]">
							<input
								type="text"
								name="bankName"
								id="bankName"
								value={ambObj.bankName}
								onChange={handleUpdateAmbObj}
								placeholder="Bank Name..."
								className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
							/>
						</div>
					</div>
				</div>

				<div>
					<div className="tw-mt-10 tw-mb-2">
						<Heading
							children="Handles"
							size2={true}
							isBold={true}
							isWhite={true}
						/>
					</div>
					<div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-2">
						<div className="tw-w-[100%] tw-flex tw-items-center tw-justify-center">
							<div className="tw-flex-[0.12] tw-text-[#bba371]">
								<RiInstagramLine size={25} />
							</div>
							<input
								type="text"
								name="instagram"
								id="instagram"
								value={ambObj.instagram}
								onChange={handleUpdateAmbObj}
								placeholder="@instagram..."
								className="tw-flex-[0.88] tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
							/>
						</div>
						<div className="tw-w-[100%] tw-flex tw-items-center tw-justify-center">
							<div className="tw-flex-[0.12] tw-text-[#bba371]">
								<SiTiktok size={25} />
							</div>
							<input
								type="text"
								name="tiktok"
								id="tiktok"
								value={ambObj.tiktok}
								onChange={handleUpdateAmbObj}
								placeholder="@tiktok..."
								className="tw-flex-[0.88] tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
							/>
						</div>
						<div className="tw-w-[100%] tw-flex tw-items-center tw-justify-center">
							<div className="tw-flex-[0.12] tw-text-[#bba371]">
								<RiSnapchatLine size={25} />
							</div>
							<input
								type="text"
								name="snapchat"
								id="snapchat"
								value={ambObj.snapchat}
								onChange={handleUpdateAmbObj}
								placeholder="@snapchat..."
								className="tw-flex-[0.88] tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
							/>
						</div>
					</div>
				</div>

				<div className="tw-text-center tw-text-xs tw-text-red-800 tw-mt-10 tw-mb-2">
					{ambObj.error ? <p>Error message: {ambObj.error}</p> : null}
				</div>
				{exist && (
					<div className="tw-text-center">
						<span className="tw-text-xs tw-text-white tw-bg-red-800 tw-px-5">
							The Provided Information Has Already Been Used!
						</span>
					</div>
				)}
				<div className="tw-flex tw-flex-row tw-mb-10 tw-justify-center">
					<Button onClick={handleSubmit} type="submit" isShadow={true}>
						Lock In Your Space
					</Button>
				</div>
			</form>
		</article>
	);
};

export default AmbassadorForm;
