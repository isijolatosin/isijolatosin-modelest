import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/shared/Layout";
import { db } from "../firebase";
import useFetchHook from "../utils/useFetchHook";
import ProfileCard from "../components/shared/ProfileCard";

const Ambassador = () => {
	const type = "amb";
	const allAmb = useFetchHook(db, type)?.sort((a, b) =>
		a.monthCount < b.monthCount ? 1 : a.monthCount > b.monthCount ? -1 : 0
	);

	return (
		<div>
			<Helmet>
				<title>Ambassador Performance</title>
			</Helmet>
			<Layout>
				<div className="tw-pt-[100px] md:tw-pt-20  tw-pb-10 tw-px-10 tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 xl:tw-grid-cols-3 tw-gap-2 tw-bg-neutral-400">
					{allAmb?.map((amb) => (
						<div key={amb.yourSalesCode}>
							<ProfileCard data={amb} />
						</div>
					))}
				</div>
			</Layout>
		</div>
	);
};

export default Ambassador;
