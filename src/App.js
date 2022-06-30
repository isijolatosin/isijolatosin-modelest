import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/home-page'
import Register from './pages/register'
import Login from './pages/login'
import NotFound from './pages/error'
import Canceled from './pages/canceled'
import Success from './pages/success'
import Management from './pages/management'
import IndianBundles from './pages/indian-bundles'
import VirginBundles from './pages/virgin-bundles'
import VietnameseBundles from './pages/vietnamese-bundles'
import IndianClosureFrontal from './pages/indian-closure-frontal'
import VirginClosureFrontal from './pages/virgin-closure-frontal'
import VietnameseClosureFrontal from './pages/vietnamese-closure-frontal'
import IndianJetBlackHair from './pages/indian-jet-black-hairs'
import VirginJetBlackHair from './pages/virgin-jet-black-hairs'
import VietnameseJetBlackHair from './pages/vietnamese-jet-black-hairs'
import Cart from './pages/cart'
import Account from './pages/account'
import IndianDeal from './pages/indianDeal'
import VietnameseDeal from './pages/vietnameseDeal'
import VirginDeal from './pages/virginDeal'
import DealPage from './pages/dealPage'
import Wigs from './pages/wigs'

function App() {
	return (
		<Routes>
			<Route exact path="/register" element={<Register />} />
			<Route exact path="/login" element={<Login />} />
			<Route exact path="/canceled" element={<Canceled />} />
			<Route exact path="/success" element={<Success />} />
			<Route exact path="/admin-portal" element={<Management />} />
			<Route exact path="/bundles/indian" element={<IndianBundles />} />
			<Route exact path="/bundles/virgin" element={<VirginBundles />} />
			<Route exact path="/bundles/vietnamese" element={<VietnameseBundles />} />
			<Route exact path="/deals/:dealInfo" element={<DealPage />} />
			<Route exact path="/wigs/:brand" element={<Wigs />} />
			<Route exact path="/bodywave&frontal/:reviews" element={<DealPage />} />
			<Route
				exact
				path="/closure-frontal/indian"
				element={<IndianClosureFrontal />}
			/>
			<Route
				exact
				path="/closure-frontal/virgin"
				element={<VirginClosureFrontal />}
			/>
			<Route
				exact
				path="/closure-frontal/vietnamese"
				element={<VietnameseClosureFrontal />}
			/>
			<Route
				exact
				path="/jet-black-&-blonde/indian"
				element={<IndianJetBlackHair />}
			/>
			<Route
				exact
				path="/jet-black-&-blonde/virgin"
				element={<VirginJetBlackHair />}
			/>
			<Route
				exact
				path="/jet-black-&-blonde/vietnamese"
				element={<VietnameseJetBlackHair />}
			/>
			<Route exact path="/indian-bundles-deals" element={<IndianDeal />} />
			<Route
				exact
				path="/vietnamese-bundles-deals"
				element={<VietnameseDeal />}
			/>
			<Route exact path="/Virgin-bundles-deals" element={<VirginDeal />} />
			<Route exact path="/bodywave&closure/:reviews" element={<DealPage />} />
			<Route
				exact
				path="/naturalcurly&closure/:reviews"
				element={<DealPage />}
			/>
			<Route
				exact
				path="/naturalcurly&frontal/:reviews"
				element={<DealPage />}
			/>
			<Route
				exact
				path="/bundles/:brand/:reviews"
				element={<IndianBundles />}
			/>
			<Route
				exact
				path="/bundles/:brand/:reviews"
				element={<VirginBundles />}
			/>
			<Route
				exact
				path="/bundles/:brand/:reviews"
				element={<VietnameseBundles />}
			/>
			<Route
				exact
				path="/closure-frontal/indian/:reviews"
				element={<IndianClosureFrontal />}
			/>
			<Route
				exact
				path="/closure-frontal/virgin/:reviews"
				element={<VirginClosureFrontal />}
			/>
			<Route
				exact
				path="/closure-frontal/vietnamese/:reviews"
				element={<VietnameseClosureFrontal />}
			/>
			<Route
				exact
				path="/jet-black-&-blonde/indian/:reviews"
				element={<IndianJetBlackHair />}
			/>
			<Route
				exact
				path="/jet-black-&-blonde/virgin/:reviews"
				element={<VirginJetBlackHair />}
			/>
			<Route
				exact
				path="/jet-black-&-blonde/vietnamese/:reviews"
				element={<VietnameseJetBlackHair />}
			/>
			<Route exact path="/user-cart/:userId" element={<Cart />} />
			<Route exact path="/user-account" element={<Account />} />
			<Route exact path="*" element={<NotFound />} />
			<Route exact path="/" element={<HomePage />} />
		</Routes>
	)
}

export default App
