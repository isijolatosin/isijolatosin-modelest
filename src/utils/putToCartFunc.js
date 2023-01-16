import { addToCartItem, increaseCartItem } from "../slices/appSlices";

export function addToCart(
	price,
	length,
	dispatch,
	singleProduct,
	setSingleCart,
	setError,
	increase
) {
	let timeOut;
	clearTimeout(timeOut);
	if (!price) {
		setError(true);
	} else {
		if (length) {
			if (increase) {
				dispatch(increaseCartItem(singleProduct));
			} else {
				console.log(singleProduct);
				dispatch(addToCartItem(singleProduct));
			}
			timeOut = setTimeout(() => {
				setSingleCart(singleProduct);
			}, 1000);
		} else {
			setError(true);
		}
	}
}
