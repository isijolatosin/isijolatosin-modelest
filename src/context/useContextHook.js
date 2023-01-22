import React, { useCallback } from "react";
import { PRODUCT } from "../constant";
import useFetchHook from "../utils/useFetchHook";
import { getDatabase, onValue, ref } from "firebase/database";

const PriceContext = React.createContext();

const AppProvider = ({ children }) => {
	const [priceObject, setPriceObject] = React.useState({
		14: "",
		16: "",
		18: "",
		20: "",
		22: "",
		24: "",
		26: "",
		28: "",
		30: "",
	});

	const type = PRODUCT;
	const url = `${process.env.REACT_APP_BASE_ROUTE}/${PRODUCT}`;
	const fetchProductsRes = useFetchHook(url, type);
	const fetchProducts = useCallback(() => {
		return fetchProductsRes;
	}, [fetchProductsRes]);

	const database = getDatabase();
	const fetchSalesPercentage = () => {
		const starCountRef = ref(database, "sales");
		let data;
		onValue(starCountRef, (snapshot) => {
			data = snapshot.val().no;
		});
		return data;
	};
	const fetchBundlePercentage = () => {
		const bundleDealsPercentage = ref(database, "bundle deals");
		let data;
		onValue(bundleDealsPercentage, (snapshot) => {
			data = snapshot.val().on;
		});
		return data;
	};

	return (
		<PriceContext.Provider
			value={{
				priceObject,
				setPriceObject,
				fetchProducts,
				fetchSalesPercentage,
				fetchBundlePercentage,
			}}>
			{children}
		</PriceContext.Provider>
	);
};

export const useGlobalContext = () => {
	return React.useContext(PriceContext);
};

export { PriceContext, AppProvider };
