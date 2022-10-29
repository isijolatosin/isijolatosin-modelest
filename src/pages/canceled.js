import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/shared/Layout";
import Button from "../components/shared/Button";
import Heading from "../components/Heading";
import { fetchSalesPercentage } from "../utils/salesPercentageNumber";

const Canceled = () => {
	const [sales, setSales] = React.useState(false);

	React.useEffect(() => {
		setSales(fetchSalesPercentage());

		localStorage.removeItem("discountPrice");
		localStorage.removeItem("ship");
		localStorage.removeItem("address");
		localStorage.removeItem("altEmail");
		localStorage.removeItem("shippingCost");
		localStorage.removeItem("payload");
		localStorage.removeItem("country");
		localStorage.removeItem("phone");
		localStorage.removeItem("order no");
		localStorage.removeItem("username");
		localStorage.removeItem("finalPriceToPay");
		localStorage.removeItem("finalPriceToPayObject");
	}, []);
	return (
		<Layout>
			<div
				className={
					sales
						? "tw-pt-[230px] tw-bg-neutral-200 lg:tw-mt-[100px] tw-flex tw-flex-col tw-items-center"
						: "tw-pt-[150px] tw-bg-neutral-200 lg:tw-mt-[100px] tw-flex tw-flex-col tw-items-center"
				}
			>
				<Heading children="payment failed" isBold={true} />
				<div className="tw-my-5">
					<span className="tw-font-semibold tw-text-red-800">
						Payment was not successful
					</span>
				</div>
				<Link className="tw-mb-10" to="/">
					<Button>Continue Shopping</Button>
				</Link>
			</div>
		</Layout>
	);
};

export default Canceled;
