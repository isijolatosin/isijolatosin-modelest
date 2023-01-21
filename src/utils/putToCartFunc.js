import { addToCartItem, increaseCartItem } from "../slices/appSlices";

export function addToCart(
	price,
	dispatch,
	_singleProduct,
	setSingleCart,
	setError,
	increase
) {
	let timeOut;
	clearTimeout(timeOut);
	if (!price) {
		setError(true);
	} else {
		if (increase) {
			dispatch(increaseCartItem(_singleProduct));
		} else {
			dispatch(addToCartItem(_singleProduct));
		}
		timeOut = setTimeout(() => {
			setSingleCart(_singleProduct);
		}, 1000);
	}
}
