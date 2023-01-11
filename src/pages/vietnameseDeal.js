import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/shared/Layout";
import {
	fetchBundlePercentage,
	fetchSalesPercentage,
} from "../utils/salesPercentageNumber";

function VietnameseDeal() {
	const [sales, setSales] = React.useState(null);
	const [bundleDeals, setBundleDeals] = React.useState(null);
	React.useEffect(() => {
		setSales(fetchSalesPercentage());
		setBundleDeals(fetchBundlePercentage());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Helmet>
				<title>Vietnamese-Hair-Bundle-Deals</title>
			</Helmet>
			<Layout>
				<div
					className={`${
						sales ? "tw-pt-[160px] md:tw-pt-[150px]" : "tw-pt-[95px]"
					} tw-w-full tw-bg-[rgba(255,255,255,0.1)] tw-pb-10 home tw-text-white tw-text-center`}>
					Vietnamese hair Bundle Deals coming soon. We got you covered...
					{bundleDeals}
				</div>
			</Layout>
		</>
	);
}

export default VietnameseDeal;
