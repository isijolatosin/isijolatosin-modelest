import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home-page'
import Register from './pages/register'
import Login from './pages/login'
import NotFound from './pages/error'
import Canceled from './pages/canceled'
import Success from './pages/success'
import Management from './pages/management'
import HairBundles from './pages/hair-bundles'
import ClosureFrontal from './pages/closure-frontal'
import JetBlackHair from './pages/jet-black-hairs'
import Cart from './pages/cart'
import Account from './pages/account'
import IndianDeal from './pages/indianDeal'
import VietnameseDeal from './pages/vietnameseDeal'
import VirginDeal from './pages/virginDeal'
import DealPage from './pages/dealPage'

function App() {
	return (
		<Routes>
			<Route exact path="/register" element={<Register />} />
			<Route exact path="/login" element={<Login />} />
			<Route exact path="/canceled" element={<Canceled />} />
			<Route exact path="/success" element={<Success />} />
			<Route exact path="/admin-portal" element={<Management />} />
			<Route exact path="/indian-bundles" element={<HairBundles />} />
			<Route exact path="/deals/:dealInfo" element={<DealPage />} />
			<Route exact path="/bodywave&frontal/:reviews" element={<DealPage />} />
			<Route
				exact
				path="/naturalcurly&frontal/:reviews"
				element={<DealPage />}
			/>
			<Route exact path="/bodywave&closure/:reviews" element={<DealPage />} />
			<Route
				exact
				path="/naturalcurly&closure/:reviews"
				element={<DealPage />}
			/>
			<Route exact path="/indian-bundles-deals" element={<IndianDeal />} />
			<Route
				exact
				path="/vietnamese-bundles-deals"
				element={<VietnameseDeal />}
			/>
			<Route exact path="/Virgin-bundles-deals" element={<VirginDeal />} />
			<Route exact path="/indian-bundles/:reviews" element={<HairBundles />} />
			<Route
				exact
				path="/indian-closure-frontal"
				element={<ClosureFrontal />}
			/>
			<Route
				exact
				path="/indian-closure-frontal/:reviews"
				element={<ClosureFrontal />}
			/>
			<Route
				exact
				path="/indian-jet-black-&-blonde"
				element={<JetBlackHair />}
			/>
			<Route
				exact
				path="/indian-jet-black-&-blonde/:reviews"
				element={<JetBlackHair />}
			/>
			<Route exact path="/user-cart/:userId" element={<Cart />} />
			<Route exact path="/user-account" element={<Account />} />
			<Route exact path="*" element={<NotFound />} />
			<Route exact path="/" element={<HomePage />} />
		</Routes>
	)
}

export default App
