import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/shared/Layout";
import { fetchSalesPercentage } from "../utils/salesPercentageNumber";

function VirginBundles() {
	const [sales, setSales] = React.useState(null);
	React.useEffect(() => {
		setSales(fetchSalesPercentage());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const name = window.location.pathname
		.split("/")
		.filter((x) => x)
		.join(" ");
	return (
		<>
			<Helmet>
				<title>Virgin-Hair-Bundle</title>
			</Helmet>
			<Layout>
				<div
					className={`${
						sales ? "tw-pt-[160px] md:tw-pt-[150px]" : "tw-pt-[95px]"
					} tw-w-full tw-bg-[rgba(255,255,255,0.1)] tw-pb-10 home tw-text-white tw-text-center`}>
					{name} coming soon. We got you covered...
				</div>
			</Layout>
		</>
	);
}

export default VirginBundles;
