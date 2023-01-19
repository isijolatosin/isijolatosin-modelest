/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import {
	BLONDE613,
	CLOSURE,
	FRONTAL,
	HAIR_BUNDLES,
	JETBLACK,
	NATURAL_BLACK,
	VIETNAMESEHAIR,
	VIETNAMESEWIG,
	VIRGINHAIR,
	VIRGINWIG,
	cloudinaryBaseUrl,
} from "../constant";

export default function useFetchHook(url, type, isBundle, isJet, isAllBundles) {
	const [resources, setResources] = React.useState([]);
	const [productsRes, setProductsRes] = React.useState([]);

	React.useEffect(async () => {
		let mounted = true;
		switch (type) {
			case "cloudinaryImage":
				const {
					data: { resources },
				} = await axios.get(url);
				const images = [];
				resources?.map((img) => {
					const public_id = img?.public_id;
					let version = img?.version;
					let format = img?.format;
					const isIOS = window.navigator.userAgent.indexOf("iPhone") !== -1;
					const isAndroid =
						window.navigator.userAgent.indexOf("Android") !== -1;
					const isWin = window.navigator.userAgent.indexOf("Win") !== -1;
					const isMac = window.navigator.userAgent.indexOf("Mac") !== -1;
					const isUNIX = window.navigator.userAgent.indexOf("X11") !== -1;
					const isLinux = window.navigator.userAgent.indexOf("Linux") !== -1;
					if (isWin || isMac || isUNIX || isLinux) {
						images.push(
							`${cloudinaryBaseUrl}f_auto/v${version}/${public_id}.${format}`
						);
					} else if (isIOS) {
						images.push(
							`${cloudinaryBaseUrl}f_jp2/v${version}/${public_id}.${format}`
						);
					} else if (isAndroid) {
						images.push(
							`${cloudinaryBaseUrl}f_webp,w_50/v${version}/${public_id}.${format}`
						);
					}
				});
				if (mounted) setResources(images);
				return "";
			case "products":
				const {
					data: { products },
				} = await axios.get(url);
				try {
					if (isBundle) {
						const filtered = products.filter(
							(product) =>
								product.color.toLowerCase() === NATURAL_BLACK &&
								!product.name.toLowerCase().includes(CLOSURE) &&
								!product.name
									.toLowerCase()
									.includes(
										FRONTAL ||
											VIRGINWIG ||
											VIETNAMESEWIG ||
											VIRGINHAIR ||
											VIETNAMESEHAIR
									)
						);
						if (mounted)
							setProductsRes(
								filtered.sort((a, b) => a.name.localeCompare(b.name))
							);
					} else if (isJet) {
						const filtered = products.filter(
							(product) =>
								[JETBLACK, BLONDE613].includes(product.color.toLowerCase()) &&
								![CLOSURE, FRONTAL].includes(product?.type.toLowerCase())
						);
						if (mounted)
							setProductsRes(
								filtered.sort((a, b) => a.name.localeCompare(b.name))
							);
					} else if (isAllBundles) {
						const filtered = products.filter((product) =>
							product.type.toLowerCase().includes(HAIR_BUNDLES)
						);
						if (mounted)
							setProductsRes(
								filtered.sort((a, b) => a.name.localeCompare(b.name))
							);
					} else {
						if (mounted)
							setProductsRes(
								products?.sort((a, b) => a?.name?.localeCompare(b?.type))
							);
					}
				} catch (error) {
					console.log(error);
				}
				return "";

			default:
				break;
		}
		return () => (mounted = false);
	}, [type]);

	const finalRes = resources?.length
		? resources
		: productsRes?.length
		? productsRes
		: null;

	return finalRes;
}
