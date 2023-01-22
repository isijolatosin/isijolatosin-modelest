/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/shared/Layout";
import { useGlobalContext } from "../context/useContextHook";

function VirginClosureFrontal() {
	const [sales, setSales] = React.useState(null);
	const { fetchSalesPercentage } = useGlobalContext();
	React.useEffect(() => {
		setSales(fetchSalesPercentage());
	}, []);
	const name = window.location.pathname
		.split("/")
		.filter((x) => x)
		.join(" ");

	return (
		<>
			<Helmet>
				<title>Virgin-Hair-Closure&Frontal</title>
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

export default VirginClosureFrontal;
