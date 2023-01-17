/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import axios from "axios";
import { CLOSURE, FRONTAL, cloudinaryBaseUrl } from "../constant";

export default function useFetchHook(url, type, isBundle, isJet, isAllBundles) {
	const [resources, setResources] = React.useState([]);
	const [productsRes, setProductsRes] = React.useState([]);

	React.useEffect(async () => {
		let mounted = true;
		if (mounted) {
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
					setResources(images);
					return "";
				case "products":
					const {
						data: { products },
					} = await axios.get(url);
					try {
						if (isBundle) {
							const filtered = products.filter(
								(product) =>
									product.color.toLowerCase() === "natural black" &&
									!product.name.toLowerCase().includes("closure") &&
									!product.name.toLowerCase().includes("frontal") &&
									!product.type.toLowerCase().includes("virgin wig") &&
									!product.type.toLowerCase().includes("vietnamese wig") &&
									!product.brand.toLowerCase().includes("virgin hair") &&
									!product.brand.toLowerCase().includes("vietnamese hair")
							);
							setProductsRes(
								filtered.sort((a, b) => a.name.localeCompare(b.name))
							);
						} else if (isJet) {
							const filtered = products.filter(
								(product) =>
									(product.color.toLowerCase() === "jet black" ||
										product.color.toLowerCase().includes("blonde613")) &&
									product?.type.toLowerCase() !== CLOSURE &&
									product?.type.toLowerCase() !== FRONTAL
							);
							setProductsRes(
								filtered.sort((a, b) => a.name.localeCompare(b.name))
							);
						} else if (isAllBundles) {
							const filtered = products.filter((product) =>
								product.type.toLowerCase().includes("hair bundles")
							);
							setProductsRes(
								filtered.sort((a, b) => a.name.localeCompare(b.name))
							);
						} else {
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
