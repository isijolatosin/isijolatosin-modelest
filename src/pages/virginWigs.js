import React, { useCallback } from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/shared/Layout";
import WigsCard from "../components/WigsCard";
import { PRODUCT } from "../constant";
import useFetchHook from "../utils/useFetchHook";

function VirginWigs() {
	const [wigs, setWigs] = React.useState([]);

	const url = `${process.env.REACT_APP_BASE_ROUTE}/${PRODUCT}`;
	const productsRes = useFetchHook(url, PRODUCT);
	const fetchProducts = useCallback(async () => {
		try {
			const filtered = [];
			// eslint-disable-next-line array-callback-return
			productsRes.filter((product) => {
				if (product.type.toLowerCase().includes("virgin wig")) {
					filtered.push(product);
				}
			});
			setWigs(filtered);
		} catch (error) {
			console.log(error);
		}
	}, [productsRes]);

	React.useEffect(() => {
		fetchProducts();
	}, [fetchProducts]);

	return (
		<div className="home">
			<Helmet>
				<title>Virgin-wigs</title>
			</Helmet>
			<Layout>
				<div className="tw-pt-[95px] md:tw-pt-[60px] tw-w-full tw-bg-[rgba(255,255,255,0.1)] tw-pb-10">
					{wigs?.length === 0 ? (
						<div className="tw-w-full tw-flex tw-justify-center tw-pt-[50px]">
							<div className="tw-rounded-full progress">
								<div className="inner"></div>
							</div>
						</div>
					) : (
						<div className="tw-w-full tw-flex tw-flex-wrap tw-justify-center tw-mx-auto">
							{wigs &&
								wigs?.map((wig) => (
									<div key={wig.id}>
										<WigsCard product={wig} />
									</div>
								))}
						</div>
					)}
				</div>
			</Layout>
		</div>
	);
}

export default VirginWigs;
