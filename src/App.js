import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page";
import Register from "./pages/register";
import Ambassador from "./pages/ambassadorReg";
import Login from "./pages/login";
import NotFound from "./pages/error";
import Canceled from "./pages/canceled";
import Success from "./pages/success";
import Management from "./pages/management";
import Cart from "./pages/cart";
import Checkout from "./pages/checkout";
import Payment from "./pages/payment";
import Account from "./pages/account";

import DealPage from "./pages/dealPage";
import AllBundles from "./pages/allBundles";

import IndianDeal from "./pages/indianDeal";
import IndianBundles from "./pages/indian-bundles";
import IndianJetBlackHair from "./pages/indian-jet-black-hairs";
import IndianClosureFrontal from "./pages/indian-closure-frontal";

import VietnameseWig from "./pages/vietnameseWigs";
import VietnameseDeal from "./pages/vietnameseDeal";
import VietnameseBundles from "./pages/vietnamese-bundles";
import VietnameseClosureFrontal from "./pages/vietnamese-closure-frontal";

import SingleWig from "./pages/singlewig";
import VirginWig from "./pages/virginWigs";
import VirginDeal from "./pages/virginDeal";
import VirginBundles from "./pages/virgin-bundles";
import VirginClosureFrontal from "./pages/virgin-closure-frontal";

import Faqs from "./pages/faqs";
import Blogs from "./pages/blogs";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
	return (
		<PayPalScriptProvider
			option={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
		>
			<Routes>
				<Route exact path="/register" element={<Register />} />
				<Route
					exact
					path="/ambassadors-registration"
					element={<Ambassador />}
				/>
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/canceled" element={<Canceled />} />
				<Route exact path="/success" element={<Success />} />
				<Route exact path="/admin-portal" element={<Management />} />
				<Route exact path="/user/:userInfo" element={<Account />} />
				<Route exact path="/user-cart/:userId" element={<Cart />} />
				<Route exact path="/checkout/:userId" element={<Checkout />} />
				<Route exact path="/payment" element={<Payment />} />
				<Route
					exact
					path="/modelEst/frequently-asked-questions"
					element={<Faqs />}
				/>
				<Route
					exact
					path="/blogs/caring-for-indian-virgin-vietnamese-hair-extensions"
					element={<Blogs />}
				/>

				{/*  */}
				{/*  */}
				{/* ****************** OTHERS ROUTES ******************/}
				<Route exact path="/wigs/:id" element={<SingleWig />} />
				<Route exact path="/all-bundles" element={<AllBundles />} />

				{/*  */}
				{/*  */}
				{/* ****************** INDIA ******************/}
				<Route exact path="/bundles/indian" element={<IndianBundles />} />
				<Route
					exact
					path="/closure-frontal/indian"
					element={<IndianClosureFrontal />}
				/>
				<Route
					exact
					path="/jet-black-&-blonde/indian"
					element={<IndianJetBlackHair />}
				/>
				<Route exact path="/indian-bundles-deals" element={<IndianDeal />} />

				{/*  */}
				{/*  */}
				{/* ****************** VIETNAMESE ******************/}
				<Route exact path="/vietnamese-wigs" element={<VietnameseWig />} />
				<Route
					exact
					path="/bundles/vietnamese"
					element={<VietnameseBundles />}
				/>
				<Route
					exact
					path="/closure-frontal/vietnamese"
					element={<VietnameseClosureFrontal />}
				/>
				<Route
					exact
					path="/vietnamese-bundles-deals"
					element={<VietnameseDeal />}
				/>

				{/*  */}
				{/*  */}
				{/* ****************** VIRGIN ******************/}
				<Route exact path="/virgin-wigs" element={<VirginWig />} />
				<Route exact path="/bundles/virgin" element={<VirginBundles />} />
				<Route exact path="/Virgin-bundles-deals" element={<VirginDeal />} />
				<Route
					exact
					path="/closure-frontal/virgin"
					element={<VirginClosureFrontal />}
				/>

				{/*  */}
				{/*  */}
				{/* ****************** DEALS ******************/}
				<Route exact path="/deals/:dealInfo" element={<DealPage />} />
				<Route exact path="/bodywave&closure/:reviews" element={<DealPage />} />

				{/*  */}
				{/*  */}
				{/* ****************** REVIEWS ******************/}
				<Route exact path="/bodywave&frontal/:reviews" element={<DealPage />} />
				<Route
					exact
					path="/bundles/:brand/:reviews"
					element={<VietnameseBundles />}
				/>
				<Route
					exact
					path="/bundles/:brand/:reviews"
					element={<IndianBundles />}
				/>
				<Route
					exact
					path="/closure-frontal/indian/:reviews"
					element={<IndianClosureFrontal />}
				/>
				<Route
					exact
					path="/jet-black-&-blonde/indian/:reviews"
					element={<IndianJetBlackHair />}
				/>
				<Route
					exact
					path="/bundles/:brand/:reviews"
					element={<VirginBundles />}
				/>
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
					path="/closure-frontal/virgin/:reviews"
					element={<VirginClosureFrontal />}
				/>
				<Route
					exact
					path="/closure-frontal/vietnamese/:reviews"
					element={<VietnameseClosureFrontal />}
				/>

				<Route exact path="*" element={<NotFound />} />
				<Route exact path="/" element={<HomePage />} />
			</Routes>
		</PayPalScriptProvider>
	);
}

export default App;
