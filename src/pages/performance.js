import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import Layout from "../components/shared/Layout";
import { db } from "../firebase";
import useFetchHook from "../utils/useFetchHook";
import ProfileCard from "../components/shared/ProfileCard";
import Button from "../components/shared/Button";

const Ambassador = () => {
	const { ambId } = useParams();
	const type = "amb";
	const allAmb = useFetchHook(db, type)?.sort((a, b) =>
		a.monthCount < b.monthCount ? 1 : a.monthCount > b.monthCount ? -1 : 0
	);
	const navigate = useNavigate();
	const verifyAmbId = allAmb?.some((amb) => amb?.yourSalesCode === ambId);
	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div>
			<Helmet>
				<title>Ambassador Performance</title>
			</Helmet>
			<Layout>
				<div className="tw-pt-[100px] md:tw-pt-20  tw-pb-10 tw-px-10 tw-flex tw-justify-center tw-bg-neutral-400">
					{verifyAmbId ? (
						<div className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 xl:tw-grid-cols-3 tw-gap-2 ">
							{allAmb?.map((amb) => (
								<div key={amb.yourSalesCode}>
									<ProfileCard data={amb} />
								</div>
							))}
						</div>
					) : (
						<div className="">
							<p className="tw-text-[20px] tw-text-red-800">
								Unauthorized Access!
							</p>
							<p className="tw-text-[10px] tw-text-red-800 tw-mb-2">
								This page is for ModelEst Ambassadors. Contact admin for
								inquiries.
							</p>
							<Button
								children="Exit Page"
								handleFunc={handleGoBack}
								type="button"
								isShadow={true}
							/>
						</div>
					)}
				</div>
			</Layout>
		</div>
	);
};

export default Ambassador;
