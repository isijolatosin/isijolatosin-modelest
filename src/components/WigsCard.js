import React from "react";
import { MdOutlineInventory, MdMoneyOff } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import { VscSymbolRuler } from "react-icons/vsc";
import RatingFix from "./shared/RatingFix";
import truncate from "../utils/truncate";
import { Link } from "react-router-dom";

function WigsCard({ product, sales, dealPrice, frontalClosure, texture }) {
	const lengthSplit = product?.length.split(", ");
	const lengthSplitFirst = product?.length.split(", ")[0];
	const lengthSplitEnd = product?.length.split(", ")[lengthSplit.length - 1];
	return (
		<div className="card tw-drop-shadow-xl tw-mx-1 tw-mb-3">
			<ul className="ul">
				<li>
					<span className="tw-absolute tw-left-[-95px] tw-text-white tw-text-md tw-font-bold">
						<span className="tw-text-xs tw-font-light">From</span> ${dealPrice}
						:00
					</span>
					<GiMoneyStack />
				</li>
				<li>
					<span
						className={`tw-absolute ${
							product?.length.length > 2
								? "tw-left-[-110px]"
								: "tw-left-[-77px]"
						} tw-text-white tw-text-md tw-font-light`}>
						<span className="">
							{product?.length.length > 2
								? `${lengthSplitFirst} -
								  ${lengthSplitEnd}`
								: product?.length}
							" inches
						</span>
					</span>
					<VscSymbolRuler />
				</li>
				<li>
					<span
						className={`${
							product.sales && sales !== 0
								? "tw-text-white  tw-left-[-35px]"
								: "tw-text-white tw-left-[-73px]"
						} tw-absolute tw-text-xs`}>
						{product.sales ? "Sales" : "Not on Sales"}
					</span>
					<MdMoneyOff className={`${product.sales && "tw-text-red-800"}`} />
				</li>
				<li>
					<span
						className={`${
							product?.instock
								? "tw-text-white  tw-left-[-45px]"
								: "tw-text-white tw-left-[-65px]"
						} tw-absolute tw-text-xs`}>
						{product.instock ? "Instock" : "Not Instock"}
					</span>
					<MdOutlineInventory
						className={`${!product.instock && "tw-text-red-800"}`}
					/>
				</li>
			</ul>
			<img
				id={product._id}
				src={product?.images[0]}
				alt={product._id}
				className="tw-w-full md:tw-w-[400px] tw-object-cover"
			/>
			<div className="con-text tw-bg-[rgba(255,255,255,0.95)] tw-w-full">
				<h2 className="tw-text-[10px] tw-font-bold tw-uppercase tw-text-[#bba371] tw-mb-[-7px]">
					{product.name.split("-")[1]}
				</h2>
				<h2 className="tw-text-[18px] tw-font-bold tw-uppercase">
					{product.name.split("-")[0]}
				</h2>
				<div className="tw-flex tw-items-center">
					<RatingFix isNum={false} />
				</div>
				<span className="tw-text-xs">
					Starting from{" "}
					<span className="tw-font-bold tw-text-xl">${dealPrice}:00</span>
				</span>
				<p className="">{truncate(product.description, 30)}</p>
			</div>
			<Link to={`/wigs/${product?.brand}-${product?._id}`}>
				<button className="tw-absolute tw-bottom-[20px] tw-right-[20px] tw-z-30">
					Buy Now
				</button>
			</Link>
		</div>
	);
}

export default WigsCard;
