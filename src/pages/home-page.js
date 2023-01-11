import React from "react";
import axios from "axios";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { MdOutgoingMail } from "react-icons/md";
import { Helmet } from "react-helmet";
import Layout from "../components/shared/Layout";
import Products from "../components/Products";
import { db } from "../firebase";
import ContactForm from "../components/shared/ContactForm";
import { Link } from "react-router-dom";
import SearchInput from "../components/shared/SearchInput";
import { getDatabase, ref, onValue } from "firebase/database";
import { cloudinaryBaseUrl } from "../constant";
import PictureSlide from "../components/shared/PictureSlide";
import CtaButton from "../components/shared/CtaButton";

function HomePage() {
	const [searchControl, setSearchControl] = React.useState(false);
	const [close, setClose] = React.useState(false);
	const [chatError, setChatError] = React.useState(false);
	const [chatSuccess, setChatSuccess] = React.useState(false);
	const [toBottom, setToBottom] = React.useState(false);
	const [chat, setChat] = React.useState(true);
	const [showPopInfo, setShowPopInfo] = React.useState(false);
	const [showForm, setShowForm] = React.useState(false);
	const [searchError, setSearchError] = React.useState(false);
	// const [expired, setExpired] = React.useState(false)
	const [allProducts, setAllproducts] = React.useState([]);
	const [allWigsCloudinaryImg, setAllWigsCloudinaryImg] = React.useState([]);
	const [filtered, setFiltered] = React.useState([]);
	const [sales, setSales] = React.useState(null);
	const [inputValue, setInputValue] = React.useState("");
	const [similarProductsClosure, setSimilarProductsClosure] =
		React.useState(null);
	const [similarProductsFrontal, setSimilarProductsFrontal] =
		React.useState(null);
	const [chatDetail, setChatDetail] = React.useState({
		name: "",
		title: "",
		email: "",
		message: "",
	});
	const [featuredProduct, setFeaturedProduct] = React.useState([]);

	const database = getDatabase();
	React.useEffect(() => {
		const starCountRef = ref(database, "sales");
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val();
			setSales(data.no);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function fetchProducts() {
		try {
			const {
				data: {
					products,
					//  curUser
				},
			} = await axios.get(`${process.env.REACT_APP_BASE_ROUTE}/products`);

			const array1 = [];
			const array2 = [];
			// eslint-disable-next-line array-callback-return
			products.filter((prod) => {
				if (prod?.brand?.toLowerCase().includes("virgin hair")) {
					if (prod?.name?.toLowerCase().includes("-closure")) {
						array1.push(prod);
					}
				}
				setSimilarProductsClosure(array1);

				if (prod?.brand?.toLowerCase().includes("virgin hair")) {
					if (prod?.name?.toLowerCase().includes("-frontal")) {
						array2.push(prod);
					}
				}
				setSimilarProductsFrontal(array2);
			});

			const fArray = [];
			// eslint-disable-next-line array-callback-return
			products.filter((p) => {
				if (p?.isFeatured) {
					const obj = {
						name: p?.name,
						price: p?.price,
						brand: p?.brand,
						color: p?.color,
						type: p?.type,
						image: p?.images[0],
						route: `/${p?.route}`,
					};
					fArray.push(obj);
				}
			});
			const reverseFeatured = fArray.reverse();

			setFeaturedProduct(reverseFeatured);
			setAllproducts(products?.sort((a, b) => a?.name?.localeCompare(b?.type)));
		} catch (error) {
			console.log(error);
		}
	}

	const fetchCloudinaryImages = async () => {
		const {
			data: { resources },
		} = await axios.get(process.env.REACT_APP_CLOUDINARY_WIGS);

		const images = [];
		// eslint-disable-next-line array-callback-return
		resources.map((img) => {
			const public_id = img?.public_id;
			let version = img?.version;
			let format = img?.format;

			images.push(`${cloudinaryBaseUrl}${version}/${public_id}.${format}`);
		});

		setAllWigsCloudinaryImg(images);
	};

	React.useEffect(() => {
		fetchProducts();
		fetchCloudinaryImages();

		setTimeout(() => {
			setShowPopInfo(true);
		}, 5000);
	}, []);

	if (showPopInfo) {
		setTimeout(() => {
			setShowPopInfo(false);
		}, 10000);
	}

	window.onscroll = function (ev) {
		if (
			window.innerHeight + window.scrollY >=
			document.body.offsetHeight - (window.innerHeight + window.scrollY)
		) {
			setToBottom(true);
			setChat(false);
		} else {
			setToBottom(false);
			setChat(true);
		}
	};
	const handleChangeChat = (e) => {
		setChatError(false);
		setChatDetail({ ...chatDetail, [e.target.name]: e.target.value });
	};

	const SubmitInqury = (e) => {
		e.preventDefault();

		if (
			chatDetail.name === "" ||
			chatDetail.title === "" ||
			chatDetail.email === "" ||
			chatDetail.message === ""
		) {
			setChatError(true);
		} else if (
			chatDetail.name !== "" &&
			chatDetail.title !== "" &&
			chatDetail.email !== "" &&
			chatDetail.message !== ""
		) {
			db.collection("customer-inqury")
				.add({
					id: `ModelEst${Math.random().toString(36).slice(2)}`,
					name: chatDetail.name,
					title: chatDetail.title,
					message: chatDetail.message,
					email: chatDetail.email,
					timestamp: new Date().valueOf(),
				})
				.then(() => {
					console.log(`SUCCESSFULL`);
				})
				.catch((error) => console.log("Error " + error.message));

			setChatDetail({
				name: "",
				title: "",
				email: "",
				message: "",
			});
			setTimeout(() => {
				setChatSuccess(true);
			}, 1000);
		}
	};
	return (
		<div className="relative home ">
			<Helmet>
				<title>Home</title>
			</Helmet>
			<Layout>
				<div
					className={
						allProducts.every((product) => product.sales)
							? `tw-flex tw-flex-col tw-items-center ${
									allProducts.length === 0 ? "tw-pt-[60px]" : "tw-pt-[120px]"
							  } tw-pb-10 md:tw-py-[50px] lg:tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[80%] lg:tw-mx-auto`
							: ` tw-flex tw-flex-col tw-items-center ${
									allProducts.length === 0 && "tw-pt-[230px]"
							  } ${
									sales !== 0
										? "md:tw-pt-[75px] tw-pt-[95px]"
										: "md:tw-pt-[35px] tw-pt-[50px]"
							  } md:tw-pb-[50px] lg:tw-w-[100%] lg:tw-mx-auto tw-bg-[rgba(255,255,255,0.1)] tw-relative`
					}>
					<div
						onClick={() => window.scrollTo(0, 0)}
						className={`${
							toBottom ? "tw-inline" : "tw-hidden"
						} tw-fixed tw-bottom-[25px] tw-right-[10px] tw-bg-[rgba(0,0,0,0.85)] tw-text-[#bba371] tw-p-2 tw-rounded-[30px] tw-z-20 tw-cursor-pointer hover:md:tw-bg-white hover:md:tw-text-neutral-900 tw-shadow-lg tw-shadow-[rgba(255,255,255,0.3)] tw-ease-in tw-duration-300 `}>
						<MdOutlineKeyboardArrowUp size={33} />
					</div>
					<div
						className={`${
							showPopInfo
								? "tw-opacity-1 tw-right-[50px]"
								: "tw-opacity-0 tw-right-[-400px]"
						} tw-inline md:tw-hidden tw-fixed tw-bg-[rgba(0,0,0,0.85)] tw-text-[#bba371] tw-border-[#bba371] tw-border-[1px] tw-w-[200px] tw-bottom-[70px] tw-px-5 tw-py-3 tw-text-center tw-text-xs tw-rounded-xl tw-rounded-br-none tw-ease-in tw-duration-500 tw-from-zinc-1000 tw-z-20`}>
						<span>
							For customized order placing and special inquiries, send modelEst
							a message and we'll get back to you ASAP!
						</span>
						<div
							onClick={() => setShowPopInfo(false)}
							className="tw-absolute tw-top-0 tw-right-[-15px] tw-z-20">
							<AiOutlineCloseCircle />
						</div>
					</div>
					<div
						className={`${
							chat
								? "tw-flex tw-flex-col tw-items-center tw-justify-center"
								: "tw-hidden"
						} md:tw-hidden tw-fixed tw-bottom-[25px] tw-right-[10px] tw-z-20 hover:md:tw-bg-white hover:md:tw-text-neutral-900 `}>
						<div
							onClick={() => {
								setShowForm(!showForm);
								setChatError(false);
								setChatSuccess(false);
								setShowPopInfo(false);
								setChatDetail({
									name: "",
									title: "",
									email: "",
									message: "",
								});
							}}
							className="tw-mb-[1px] tw-text-[#bba371] tw-bg-[rgba(0,0,0,0.85)] tw-rounded-t-[30px] tw-cursor-pointer tw-shadow-lg tw-shadow-[rgba(255,255,255,0.3)] tw-ease-in tw-duration-300 tw-pt-4 tw-pb-1 tw-px-2 tw-w-[45px]">
							<MdOutgoingMail size={30} />
						</div>
						<div className="tw-text-[#bba371] tw-bg-[rgba(0,0,0,0.85)] tw-rounded-b-[30px] tw-cursor-pointer tw-shadow-lg tw-shadow-[rgba(255,255,255,0.3)] tw-ease-in tw-duration-300 tw-pb-4 tw-pt-1 tw-px-2 tw-w-[45px]">
							<CtaButton />
						</div>
					</div>
					<div
						className={`${searchControl && "tw-w-[100%] lg:tw-w-[40%]"} ${
							sales
								? "tw-top-[101px] md:tw-top-[76px]"
								: "tw-top-[56px] md:tw-top-[24px]"
						} tw-flex tw-flex-col content tw-fixed tw-left-[-16px] md:tw-left-[-16px] tw-z-10 tw-ease-in tw-duration-300 2xl:tw-ml-10 tw-mt-[20px]`}>
						<SearchInput
							allProducts={allProducts}
							searchControl={searchControl}
							close={close}
							setFiltered={setFiltered}
							setSearchControl={setSearchControl}
							setClose={setClose}
							setSearchError={setSearchError}
							inputValue={inputValue}
							setInputValue={setInputValue}
						/>
						{searchError && (
							<div className="tw-bg-white tw-text-black  tw-w-[80%] featuredCard tw-shadow-lg tw-rounded-b-[5px] tw-border-[1px] tw-border-t-0 tw-border-neutral-900">
								<p className="tw-text-[13px] md:tw-text-[14px] tw-text-red-700 tw-p-3 tw-pl-5">
									No Result Found !
								</p>
							</div>
						)}
						{filtered?.length !== 0 && inputValue && (
							<div className="tw-bg-white tw-text-black  tw-w-[80%] tw-overflow-y-scroll tw-max-h-[400px] md:tw-max-h-[600px] featuredCard tw-shadow-lg tw-rounded-b-[5px] tw-border-[1px] tw-border-t-0 tw-border-neutral-900">
								{filtered.map((item) => (
									<Link to={item?.route} key={item?._id}>
										<div className="tw-flex tw-items-center tw-p-3 tw-border-b-[1px] tw-w-[100%] tw-mx-auto hover:tw-bg-[rgba(215,191,137,0.3)] tw-ease-in tw-duration-300">
											<div className="tw-mr-3">
												<img
													src={item?.image}
													alt={item?.name}
													className="tw-object-cover tw-w-[40px] tw-h-[40px] tw-rounded-full"
												/>
											</div>
											<div>
												<p className="tw-text-[13px] md:tw-text-[14px]">
													{item?.name}
												</p>
												<p className="tw-text-[13px] md:tw-text-[14px]">
													<span className="tw-text-xs tw-font-light">
														Starting from
													</span>{" "}
													${item?.price}
												</p>
											</div>
										</div>
									</Link>
								))}
								<Link to="/all-bundles">
									<div className="tw-pr-5 tw-py-3 tw-border-b-[1px] tw-w-[90%] tw-mx-auto">
										<span className="tw-text-[13px] md:tw-text-[14px] tw-text-[#bba371] hover:tw-text-black tw-ease-in tw-duration-300">
											View all bundles
										</span>
									</div>
								</Link>
							</div>
						)}
					</div>
					<div
						className={`${
							showForm
								? "tw-right-0 md:tw-right-[8px]"
								: "tw-right-[-800px] md:tw-right-[-350px]"
						} tw-w-[100%] tw-h-screen tw-px-5 tw-pt-[110px] md:tw-pt-0 md:tw-max-h-[600px] md:tw-w-[350px] tw-fixed tw-z-30 tw-bg-[rgba(255,255,255,0.97)] tw-p-2 tw-bottom-0 md:tw-bottom-[50px] tw-text-neutral-900 tw-ease-in tw-duration-300`}>
						<ContactForm
							SubmitInqury={SubmitInqury}
							setShowForm={setShowForm}
							setChatError={setChatError}
							setChatSuccess={setChatSuccess}
							setChatDetail={setChatDetail}
							chatDetail={chatDetail}
							handleChangeChat={handleChangeChat}
							chatSuccess={chatSuccess}
							chatError={chatError}
							textColor="tw-text-neutral-900"
							isCancelBtn={true}
						/>
					</div>
					{allProducts.length !== 0 ? (
						<div className="tw-bg-neutral-900 tw-w-[100%]">
							<div className="tw-mb-6 tw-mt-[80px] tw-w-full tw-px-3 ">
								<div className="tw-relative">
									<div className="tw-w-full tw-flex tw-items-center">
										<PictureSlide images={allWigsCloudinaryImg} />
									</div>
									<div className="tw-absolute tw-text-white tw-bottom-[10%] md:tw-bottom-[20%] tw-text-center tw-w-full font_cursive tw-text-2xl md:tw-text-6xl tw-z-1">
										<p className="tw-font-light tw-text-[rgba(215,191,137,0.7)] md:tw-text-[rgba(215,191,137,0.2)]">
											Your pleasure, our luxury...
										</p>
									</div>
								</div>
								{/* {!expired && <PromoCard setExpired={setExpired} />} */}
								<Products
									SubmitInqury={SubmitInqury}
									setChatError={setChatError}
									setChatSuccess={setChatSuccess}
									chatDetail={chatDetail}
									handleChangeChat={handleChangeChat}
									chatSuccess={chatSuccess}
									chatError={chatError}
									sales={sales}
									featuredProduct={featuredProduct}
									allProducts={allProducts}
									similarProductsClosure={similarProductsClosure}
									similarProductsFrontal={similarProductsFrontal}
								/>
							</div>
						</div>
					) : (
						<div className="tw-pt-[50px] tw-flex tw-justify-center">
							<div className="tw-rounded-full progress">
								<div className="inner"></div>
							</div>
						</div>
					)}
				</div>
			</Layout>
		</div>
	);
}

export default HomePage;
