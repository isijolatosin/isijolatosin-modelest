import { BLONDE613, CLOSURE, FRONTAL, NATURAL_BLACK } from "../constant";

export function returnObjectProperty(dt) {
	let name,
		id,
		image,
		color,
		description,
		width,
		_hairColor,
		avesizes,
		sizes,
		_hairTexture,
		_sales,
		_singleprice,
		_vWPriceClosure,
		_vWPriceFrontal;
	if (dt) {
		name = dt?.[0]?.name;
		id = dt?.[0]?._id;
		image = dt?.[0]?.images[0];
		color = dt?.[0]?.color;
		description = dt?.[0]?.description;
		width = dt?.[0]?.widthlength;
		_hairColor =
			dt?.[0]?.type.toLowerCase() === FRONTAL
				? [NATURAL_BLACK]
				: [NATURAL_BLACK, BLONDE613];
		avesizes = dt?.[0]?.availablelength?.split(", ");
		sizes = dt?.[0]?.length.split(", ");
		_hairTexture = dt?.[0]?.texture;
		_sales = dt?.[0]?.sales;
		_singleprice = dt?.[0]?.price;
		_vWPriceClosure = dt?.[0]?.name.toLowerCase().includes(`-${CLOSURE}`);
		_vWPriceFrontal = dt?.[0]?.name.toLowerCase().includes(`-${FRONTAL}`);
	}
	return {
		name,
		id,
		image,
		color,
		description,
		width,
		_hairColor,
		avesizes,
		sizes,
		_hairTexture,
		_sales,
		_singleprice,
		_vWPriceClosure,
		_vWPriceFrontal,
	};
}
export function returnDecsriptionObject(dt, texture, name, color, avesizes) {
	const obj1 = { key: "Brand", value: `Raw ${dt?.[0]?.brand} hair` };
	const obj2 = {
		key: "Hair Texture",
		value: [FRONTAL, CLOSURE].includes(dt?.[0]?.type?.toLowerCase())
			? texture
				? texture?.join(", ")
				: ""
			: name,
	};
	const obj3 = { key: "Hair Color", value: color };
	const obj4 = {
		key: "Hair Length",
		value: `Available from ${avesizes?.[0]}" - ${
			avesizes?.[avesizes.length - 1]
		}" inches`,
	};
	const obj5 = { key: "Material", value: "100% Human Hair" };
	const obj6 = {
		key: "Cap Size",
		value: "Average Size(Head circumference: 54cm - 58cm",
	};
	const obj7 = { key: "Can be bleached.dyed", value: "Yes" };
	const obj8 = {
		key: "Return policy",
		value:
			"We accept 10-days no reason return exchange with hair not been used",
	};
	const obj9 = {
		key: "Delivery time",
		value:
			"We usually ship the order within 24 hours after order confirmation, except for weekends and holidays - (order confirmation is within 2 weeks)",
	};
	return [obj1, obj2, obj3, obj4, obj5, obj6, obj7, obj8, obj9];
}
