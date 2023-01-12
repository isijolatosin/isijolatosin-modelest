import React from "react";
import { auth, createUserProfileDocument } from "../firebase";

export const UserContext = React.createContext();

const UserContextProvider = ({ children }) => {
	const [user, setUser] = React.useState(null);
	const [loading, setLoading] = React.useState(true);
	const [changeInfo, setChangeInfo] = React.useState(false);

	React.useEffect(() => {
		let contextTimer;
		clearTimeout(contextTimer);
		const unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);
				userRef.onSnapshot((snapShot) => {
					setUser({
						id: snapShot.id,
						...snapShot.data(),
					});
					contextTimer = setTimeout(() => {
						setLoading(false);
					}, 2000);
				});
			} else {
				contextTimer = setTimeout(() => {
					setLoading(false);
					setUser(userAuth);
				}, 2000);
			}
		});
		return () => unsubscribeFromAuth();
	}, []);

	let timeOut;
	clearTimeout(timeOut);
	if (!user) {
		timeOut = setTimeout(() => {
			setChangeInfo(true);
		}, 500);
	}

	const userContext = { user, loading };
	if (loading) {
		return (
			<div className="tw-py-[100px] tw-flex tw-justify-center">
				{user ? (
					<div className="tw-text-gray-600 tw-flex tw-flex-col tw-items-center tw-mt-[10px]">
						Authenticating User...
					</div>
				) : (
					<div className="tw-text-gray-600 tw-flex tw-flex-col tw-items-center tw-mt-[10px]">
						{changeInfo ? "No User Detected!" : "Authenticating User..."}
					</div>
				)}

				<div className="tw-rounded-full progress">
					<div className="inner"></div>
				</div>
			</div>
		);
	}
	return (
		<UserContext.Provider value={userContext}>{children}</UserContext.Provider>
	);
};

export default UserContextProvider;
