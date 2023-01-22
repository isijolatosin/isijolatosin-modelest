import React from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaOpencart, FaHandPointRight } from "react-icons/fa";
import Layout from "../components/shared/Layout";
import CartItems from "../components/CartItems";
import { clearCartItem, selectCartItems } from "../slices/appSlices";
import Button from "../components/shared/Button";
import CheckoutFormAction from "../components/shared/CheckoutFormAction";

const Cart = () => {
	const cartItems = useSelector(selectCartItems);
	const clearCartItm = useSelector(clearCartItem);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	return (
		<>
			<Helmet>
				<title>Cart</title>
			</Helmet>
			<Layout>
				<div className="tw-bg-neutral-200 tw-pt-[90px] md:tw-pt-[60px] tw-pb-[20px] tw-w-full tw-flex tw-flex-col tw-items-center tw-justify-center home tw-relative">
					<div className="tw-flex tw-flex-row tw-items-center tw-mb-1">
						<FaOpencart className="tw-text-2xl tw-text-violet-500" />
						<h2 className="tw-text-2xl tw-ml-2 tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-pink-500 tw-to-violet-500">
							Cart
						</h2>
						{cartItems.length > 0 && (
							<div
								onClick={() => dispatch(clearCartItm)}
								className="tw-ml-16 tw-cursor-pointer tw-duration-300 tw-ease-in hover:tw-text-[#4a4029] tw-text-[#bba371] tw-font-light tw-tracking-wider tw-text-sm">
								<span>Clear cart</span>
							</div>
						)}
					</div>
					{cartItems?.length === 0 ? (
						<div className="tw-flex tw-items-center">
							<div className="tw-mr-5 tw-font-light tw-text-white">
								Your Cart is Empty
							</div>
							<FaHandPointRight className="tw-text-white tw-mr-5 tw-text-2xl" />
							<Button handleFunc={() => navigate("/")}>Shop now</Button>
						</div>
					) : (
						<div className="tw-flex tw-flex-col tw-w-full lg:tw-flex-row lg:tw-w-[90%] tw-justify-center tw-items-center lg:tw-items-start">
							<div className="tw-w-full lg:tw-w-[60%]">
								{cartItems?.map((item) => (
									<CartItems product={item} key={item.id} />
								))}
							</div>
							<CheckoutFormAction navigate={navigate} />
						</div>
					)}
				</div>
			</Layout>
		</>
	);
};

export default Cart;
