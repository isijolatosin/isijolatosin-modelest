/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Heading from "./Heading";
import InventoryCard from "./InventoryCard";
import SingleProductEditForm from "./SingleProductEditForm";

const AllInventories = ({ fetchAllData }) => {
	const [singleProduct, setSingleProduct] = React.useState();

	return (
		<div>
			{!singleProduct ? (
				<div className="tw-flex tw-flex-col tw-items-center tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[85%] tw-mx-auto tw-mt-5">
					<Heading children="All Inventories" isBold={true} size2={true} />
					<div className="tw-grid tw-grid-cols-1 tw-w-full md:tw-grid-cols-2 xl:tw-grid-cols-3 2xl:tw-grid-cols-4 tw-gap-5 tw-p-5 lg:tw-p-10">
						{fetchAllData?.map((product) => (
							<InventoryCard
								key={product._id}
								product={product}
								setSingleProduct={setSingleProduct}
							/>
						))}
					</div>
				</div>
			) : (
				<SingleProductEditForm
					singleProduct={singleProduct}
					setSingleProduct={setSingleProduct}
				/>
			)}
		</div>
	);
};
export default AllInventories;
