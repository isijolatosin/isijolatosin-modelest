import { getDatabase, ref, onValue } from 'firebase/database'
const database = getDatabase()

export const fetchSalesPercentage = () => {
	let data
	const starCountRef = ref(database, 'sales')
	onValue(starCountRef, (snapshot) => {
		data = snapshot.val().no
	})
	return data
}
export const fetchBundlePercentage = () => {
	let data
	const bundleDealsPercentage = ref(database, 'bundle deals')
	onValue(bundleDealsPercentage, (snapshot) => {
		data = snapshot.val().on
	})
	return data
}
