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
		_vWPriceFrontal,
		salespercent,
		_hairLength,
		_with;
	if (dt) {
		name = dt?.name;
		id = dt?._id;
		image = dt?.images?.[0];
		color = dt?.color ? dt?.color : "";
		description = dt?.description;
		width = dt?.widthlength ? dt?.widthlength : "";
		_hairColor =
			dt?.type?.toLowerCase() === FRONTAL
				? [NATURAL_BLACK]
				: dt?.type?.toLowerCase() === CLOSURE
				? [NATURAL_BLACK, BLONDE613]
				: null;
		avesizes = dt?.availablelength?.includes(",")
			? dt?.availablelength?.split(", ")
			: [dt?.availablelength];
		sizes = dt?.length?.indexOf(",") > -1 ? dt?.length?.split(", ") : "";
		_hairTexture = dt?.texture ? dt?.texture : "";
		_sales = dt?.sales ? dt?.sales : dt?.sales;
		_singleprice = dt?.price[dt?.length] || dt?.price;
		_vWPriceClosure = dt?.name?.toLowerCase()?.includes(`-${CLOSURE}`);
		_vWPriceFrontal = dt?.name?.toLowerCase()?.includes(`-${FRONTAL}`);
		salespercent = dt?.salespercent;
		_with = dt?.with ? dt?.with : "";
		_hairLength = dt?.length ? dt?.length : "";
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
		salespercent,
		_with,
		_hairLength,
	};
}
export function returnDecsriptionObject(dt, texture, name, color, avesizes) {
	const obj1 = { key: "Brand", value: `Raw ${dt?.[0]?.brand} hair` };
	const obj2 = {
		key: "Hair Texture",
		value: [FRONTAL, CLOSURE].includes(dt?.type?.toLowerCase())
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
