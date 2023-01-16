/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { ref, onValue } from "firebase/database";
import axios from "axios";

export default function useFetchDBHook(data, type, user) {
	const [allAmbb, setAllAmb] = React.useState([]);
	const [authUsers, setAuthUsers] = React.useState([]);
	const [returnVal, setReturnVal] = React.useState("");
	const [products, setProduct] = React.useState([]);
	const [resources, setResources] = React.useState([]);

	React.useEffect(async () => {
		let mounted = true;
		if (mounted) {
			switch (type) {
				case "amb":
					return data.collection("ambassador").onSnapshot((snapshot) => {
						const result = [];
						// eslint-disable-next-line array-callback-return
						snapshot.docs.map((doc) => {
							if (doc.data()) {
								result.push(doc.data());
							}
						});
						setAllAmb(result);
					});
				case "authUsers":
					return data.collection("authorized-users").onSnapshot((snapshot) => {
						const result = [];
						// eslint-disable-next-line array-callback-return
						snapshot.docs.map((doc) => {
							if (doc.data()) {
								result.push(doc.data());
							}
						});
						setAuthUsers(result);
					});

				case "sales":
					const starCountRef = ref(data, type);
					onValue(starCountRef, (snapshot) => {
						const data = snapshot.val();
						setReturnVal(data.no);
					});
					return "";
				case "cloudinaryImage":
					const {
						data: { resources },
					} = await axios.get(process.env.REACT_APP_CLOUDINARY_WIGS);
					setResources(resources);
					return "";
				case "products":
					const {
						data: { products },
					} = await axios.get(`${process.env.REACT_APP_BASE_ROUTE}/products`);
					setProduct(products);
					return "";

				default:
					break;
			}
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
	return finalRes;
}
