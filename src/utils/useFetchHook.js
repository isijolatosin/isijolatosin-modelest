/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

export default function useFetchHook(db, type) {
	const [allAmbb, setAllAmb] = React.useState([]);
	const [authUsers, setAuthUsers] = React.useState([]);

	React.useEffect(() => {
		switch (type) {
			case "amb":
				return db.collection("ambassador").onSnapshot((snapshot) => {
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
				return db.collection("authorized-users").onSnapshot((snapshot) => {
					const result = [];
					// eslint-disable-next-line array-callback-return
					snapshot.docs.map((doc) => {
						if (doc.data()) {
							result.push(doc.data());
						}
					});
					setAuthUsers(result);
				});
			default:
				break;
		}
	}, []);

	const finalRes = allAmbb.length
		? allAmbb
		: authUsers.length
		? authUsers
		: null;

	return finalRes;
}
