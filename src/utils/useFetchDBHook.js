/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { ref, onValue } from "firebase/database";
import axios from "axios";
import {
	AMBASSADOR,
	AUTH_USER,
	PRODUCT,
	PURCHASE,
	SHOPPINGS,
} from "../constant";

export default function useFetchDBHook(data, type, user) {
	const [allAmbb, setAllAmb] = React.useState([]);
	const [authUsers, setAuthUsers] = React.useState([]);
	const [returnVal, setReturnVal] = React.useState("");
	const [products, setProduct] = React.useState([]);
	const [resources, setResources] = React.useState([]);
	const [cartHist, setCartHist] = React.useState([]);

	React.useEffect(async () => {
		let mounted = true;
		switch (type) {
			case "amb":
				return data.collection(AMBASSADOR).onSnapshot((snapshot) => {
					const result = [];
					// eslint-disable-next-line array-callback-return
					snapshot.docs.map((doc) => {
						if (doc.data()) {
							result.push(doc.data());
						}
					});
					if (mounted) setAllAmb(result);
				});
			case "authUsers":
				return data.collection(AUTH_USER).onSnapshot((snapshot) => {
					const result = [];
					// eslint-disable-next-line array-callback-return
					snapshot.docs.map((doc) => {
						if (doc.data()) {
							result.push(doc.data());
						}
					});
					if (mounted) setAuthUsers(result);
				});
			case "account":
				return data
					.collection(PURCHASE)
					.doc(`${user?.email}/`)
					.collection(SHOPPINGS)
					.orderBy("timestamp", "asc")
					.onSnapshot((snapshot) => {
						const results = snapshot.docs.map((doc) => ({
							data: doc.data(),
						}));

						if (results) {
							let _data = [];
							for (const result of results) {
								_data.push({
									color: result?.data.color,
									description: result?.data.description,
									id: result?.data.id,
									length: result?.data.length,
									orderNo: result?.data.orderNo,
									price: result?.data.price,
									quantity: result?.data.quantity,
									timestamp: new Date(result?.data.timestamp).toDateString(),
									title: result?.data.title,
									image: result?.data?.image,
								});
							}
							if (mounted) setCartHist(_data);
						}
					});

			case "sales":
				const starCountRef = ref(data, type);
				onValue(starCountRef, (snapshot) => {
					const data = snapshot.val();
					if (mounted) setReturnVal(data.no);
				});
				return "";
			case "cloudinaryImage":
				const {
					data: { resources },
				} = await axios.get(process.env.REACT_APP_CLOUDINARY_WIGS);
				if (mounted) setResources(resources);
				return "";
			case "products":
				const {
					data: { products },
				} = await axios.get(`${process.env.REACT_APP_BASE_ROUTE}/${PRODUCT}`);
				if (mounted) setProduct(products);
				return "";

			default:
				break;
		}
		return () => (mounted = false);
	}, [type]);

	let finalRes;
	if (allAmbb.length) return (finalRes = allAmbb);
	if (authUsers.length) return (finalRes = authUsers);
	if (returnVal) return (finalRes = returnVal);
	if (resources.length) return (finalRes = resources);
	if (products.length) return (finalRes = products);
	if (products.length) return (finalRes = products);
	if (cartHist.length) return (finalRes = cartHist);
	return finalRes;
}
