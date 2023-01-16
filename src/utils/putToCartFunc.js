import { addToCartItem, increaseCartItem } from "../slices/appSlices";

export function addToCart(
	price,
	length,
	dispatch,
	singleProduct,
	setSingleCart,
	setError
) {
	let timeOut;
	clearTimeout(timeOut);
	if (!price) {
		setError(true);
	} else {
		if (length) {
			dispatch(addToCartItem(singleProduct));
			timeOut = setTimeout(() => {
				setSingleCart(singleProduct);
			}, 1000);
		} else {
			setError(true);
		}
	}
}
export function increaseItem(
	price,
	length,
	dispatch,
	singleProduct,
	setSingleCart,
	setError
) {
	let timeOut;
	clearTimeout(timeOut);
	if (!price) {
		setError(true);
	} else {
		if (length) {
			dispatch(increaseCartItem(singleProduct));
			timeOut = setTimeout(() => {
				setSingleCart(singleProduct);
			}, 1000);
		} else {
			setError(true);
		}
	}
}
