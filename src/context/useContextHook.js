import React from "react";

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
	return (
		<PriceContext.Provider value={{ priceObject, setPriceObject }}>
			{children}
		</PriceContext.Provider>
	);
};

export const useGlobalContext = () => {
	return React.useContext(PriceContext);
};

export { PriceContext, AppProvider };
