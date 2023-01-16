import {
	BLONDE613,
	BODYWAVE,
	CLOSURE,
	CURLY,
	FRONTAL,
	NATURAL_BLACK,
	STRAIGHT,
	WAVY,
	closureVirginWigPricing,
	frontalVirginWigPricing,
	wigTextureType1,
	wigTextureType2,
	wigTextureTypeIncreaseValue1,
	wigTextureTypeIncreaseValue2,
} from "../constant";

export function predictPriceFunc(price, length) {
	let _price;
	let _price2;
	if (length === "14") {
		_price = price;
	} else if (length === "16") {
		_price = price + 10;
	} else if (length === "18") {
		_price = price + 20;
	} else if (length === "20") {
		_price = price + 30;
	} else if (length === "22") {
		_price = price + 40;
	} else if (length === "24") {
		_price = price + 50;
	} else if (length === "26") {
		_price = price + 60;
	} else if (length === "28") {
		_price = price + 70;
	} else if (length === "30") {
		_price = price + 80;
	}

	if (length === "14") {
		_price2 = price;
	} else if (length === "16") {
		_price2 = price + 6;
	} else if (length === "18") {
		_price2 = price + 12;
	} else if (length === "20") {
		_price2 = price + 18;
	} else if (length === "22") {
		_price2 = price + 24;
	} else if (length === "24") {
		_price2 = price + 30;
	} else if (length === "26") {
		_price2 = price + 36;
	} else if (length === "28") {
		_price2 = price + 42;
	} else if (length === "30") {
		_price2 = price + 48;
	}

	return { _price, _price2 };
}

export function pricePredict(dt, _color, _hairType, _price2, _price) {
	if (dt?.[0]?.type.toLowerCase() === FRONTAL) {
		// for frontal
		if (
			_color?.toLowerCase()?.includes(NATURAL_BLACK) &&
			(_hairType?.toLowerCase()?.includes(BODYWAVE) ||
				_hairType?.toLowerCase()?.includes(WAVY) ||
				_hairType?.toLowerCase()?.includes(CURLY))
		) {
			return (_price2 += 6);
		} else if (
			_color?.toLowerCase()?.includes(NATURAL_BLACK) &&
			_hairType?.toLowerCase()?.includes(STRAIGHT)
		) {
			return _price2;
		}
	} else {
		// for closure
		if (
			_color?.toLowerCase()?.includes(NATURAL_BLACK) &&
			(_hairType?.toLowerCase()?.includes(BODYWAVE) ||
				_hairType?.toLowerCase()?.includes(WAVY) ||
				_hairType?.toLowerCase()?.includes(CURLY))
		) {
			return (_price += 5);
		} else if (
			_color?.toLowerCase()?.includes(NATURAL_BLACK) &&
			_hairType?.toLowerCase()?.includes(STRAIGHT)
		) {
			return _price;
		}

		if (
			_color?.toLowerCase()?.includes(BLONDE613) &&
			(_hairType?.toLowerCase()?.includes(BODYWAVE) ||
				_hairType?.toLowerCase()?.includes(WAVY) ||
				_hairType?.toLowerCase()?.includes(CURLY))
		) {
			return (_price += 15);
		} else if (
			_color?.toLowerCase()?.includes(BLONDE613) &&
			_hairType?.toLowerCase()?.includes(STRAIGHT)
		) {
			return (_price += 10);
		}
	}
}

export function wigFuncClosure(dt, length) {
	let a;
	// eslint-disable-next-line array-callback-return
	closureVirginWigPricing.map((p) => {
		if (length === p?.length) {
			if (dt[0]?.texture) {
				if (wigTextureType1.includes(dt[0]?.texture?.toLowerCase())) {
					a = p?.price + wigTextureTypeIncreaseValue1;
				} else {
					a = p?.price;
				}
			} else if (dt[0]?.texture) {
				if (wigTextureType2.includes(dt[0]?.texture?.toLowerCase())) {
					a = p?.price + wigTextureTypeIncreaseValue2;
				} else {
					a = p?.price;
				}
			} else if (dt[0]?.texture.toLowerCase().includes(STRAIGHT)) {
				a = p?.price;
			} else {
				a = p?.price;
			}
		}
	});
	return a;
}

export function wigFuncFrontal(dt, length) {
	let a;
	// eslint-disable-next-line array-callback-return
	frontalVirginWigPricing.map((p) => {
		if (length === p?.length) {
			if (dt[0]?.texture) {
				if (wigTextureType1.includes(dt[0]?.texture?.toLowerCase())) {
					a = p?.price + wigTextureTypeIncreaseValue1;
				} else {
					a = p?.price;
				}
			} else if (dt[0]?.texture) {
				if (wigTextureType2.includes(dt[0]?.texture?.toLowerCase())) {
					a = p?.price + wigTextureTypeIncreaseValue2;
				} else {
					a = p?.price;
				}
			} else if (dt[0]?.texture?.toLowerCase().includes(STRAIGHT)) {
				a = p?.price;
			} else {
				a = p?.price;
			}
		}
	});
	return a;
}

export function priceFunc(dt, f_cPrice, _price, price_Nosales) {
	if (dt?.[0]?.sales) {
		if (
			dt?.[0]?.type.toLowerCase() === FRONTAL ||
			dt?.[0]?.type.toLowerCase() === CLOSURE
		) {
			return Number(f_cPrice);
		} else {
			return Number(_price);
		}
	} else {
		return Number(price_Nosales);
	}
}
