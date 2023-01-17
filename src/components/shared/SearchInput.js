import React, { useRef } from "react";
import { MdOutlineClose } from "react-icons/md";
import { RiSearch2Fill } from "react-icons/ri";
import {
	ALL_BUNDLES,
	BUNDLES,
	CLOSURE,
	CLOSURE_FRONTAL_LINK,
	FRONTAL,
	HAIR_BUNDLES,
	VIETNAMESE,
	VIETNAMESE_WIGS_LINK,
	VIRGINWIG,
	WIGS_LINK,
} from "../../constant";

const SearchInput = ({
	allProducts,
	searchControl,
	setFiltered,
	setSearchControl,
	setSearchError,
	inputValue,
	setInputValue,
}) => {
	const inputRef = useRef(null);
	const handleChange = (e) => {
		setInputValue(e);
		if (inputValue) {
			const returnFiltered = [];
			setSearchError(false);
			// eslint-disable-next-line array-callback-return
			allProducts.filter((product) => {
				if (product?.brand?.toLowerCase().includes(inputValue.toLowerCase())) {
					if (product?.type?.toLowerCase().includes(VIRGINWIG)) {
						const obj = {
							name: product?.name,
							image: product?.images[0],
							price:
								product?.price?.[
									product?.length?.split(", ")[0] || product?.length
								],
							route: WIGS_LINK,
						};
						returnFiltered.push(obj);
					}
					if (
						product?.type?.toLowerCase().includes(HAIR_BUNDLES) ||
						product?.type?.toLowerCase().includes(BUNDLES)
					) {
						const obj = {
							name: product?.name,
							image: product?.images[0],
							price:
								product?.price?.[
									product?.length?.split(", ")[0] || product?.length
								],
							route: ALL_BUNDLES,
						};
						returnFiltered.push(obj);
					}
					if (product?.type?.toLowerCase().includes(FRONTAL)) {
						const obj = {
							name: product?.name,
							image: product?.images[0],
							price:
								product?.price?.[
									product?.length?.split(", ")[0] || product?.length
								],
							route: CLOSURE_FRONTAL_LINK,
						};
						returnFiltered.push(obj);
					}
					if (product?.type?.toLowerCase().includes(CLOSURE)) {
						const obj = {
							name: product?.name,
							image: product?.images[0],
							price:
								product?.price?.[
									product?.length?.split(", ")[0] || product?.length
								],
							route: CLOSURE_FRONTAL_LINK,
						};
						returnFiltered.push(obj);
					}
					if (product?.type?.toLowerCase().includes(VIETNAMESE)) {
						const obj = {
							name: product?.name,
							image: product?.images[0],
							price:
								product?.price?.[
									product?.length?.split(", ")[0] || product?.length
								],
							route: VIETNAMESE_WIGS_LINK,
						};
						returnFiltered.push(obj);
					}
				} else if (
					product?.name?.toLowerCase().includes(inputValue.toLowerCase())
				) {
					if (product?.type?.toLowerCase().includes(VIRGINWIG)) {
						const obj = {
							name: product?.name,
							image: product?.images[0],
							price:
								product?.price?.[
									product?.length?.split(", ")[0] || product?.length
								],
							route: WIGS_LINK,
						};
						returnFiltered.push(obj);
					}
					if (product?.type?.toLowerCase().includes(HAIR_BUNDLES)) {
						const obj = {
							name: product?.name,
							image: product?.images[0],
							price:
								product?.price?.[
									product?.length?.split(", ")[0] || product?.length
								],
							route: ALL_BUNDLES,
						};
						returnFiltered.push(obj);
					}
					if (product?.type?.toLowerCase().includes(FRONTAL)) {
						const obj = {
							name: product?.name,
							image: product?.images[0],
							price:
								product?.price?.[
									product?.length?.split(", ")[0] || product?.length
								],
							route: CLOSURE_FRONTAL_LINK,
						};
						returnFiltered.push(obj);
					}
					if (product?.type?.toLowerCase().includes(CLOSURE)) {
						const obj = {
							name: product?.name,
							image: product?.images[0],
							price:
								product?.price?.[
									product?.length?.split(", ")[0] || product?.length
								],
							route: CLOSURE_FRONTAL_LINK,
						};
						returnFiltered.push(obj);
					}
					if (product?.type?.toLowerCase().includes(VIETNAMESE)) {
						const obj = {
							name: product?.name,
							image: product?.images[0],
							price:
								product?.price?.[
									product?.length?.split(", ")[0] || product?.length
								],
							route: VIETNAMESE_WIGS_LINK,
						};
						returnFiltered.push(obj);
					}
				}
			});

			if (returnFiltered.length > 0) {
				// window.scrollTo(0, 0)
				setFiltered(
					returnFiltered.sort((a, b) => a.name.localeCompare(b.name))
				);
			} else {
				setSearchError(true);
				returnFiltered.push([]);
			}
		}
	};

	return (
		<div
			className={`${
				searchControl
					? "_search tw-bg-white __search"
					: "_search tw-bg-white tw-rounded-r-[30px]"
			}`}>
			<input
				ref={inputRef}
				type="text"
				value={inputValue}
				onChange={(e) => handleChange(inputRef.current.value)}
				className={`${
					searchControl
						? "search__input tw-placeholder-neutral-900 tw-text-neutral-900 tw-text-[14px] __search__input placeholder:tw-text-xs"
						: "search__input tw-placeholder-neutral-900 tw-text-neutral-900 tw-text-[14px]"
				} placeholder:tw-text-neutral-500 placeholder:tw-italic`}
				aria-label="search"
				placeholder="...search by name / brand"
			/>
			<button className="search__submit tw-z-10" aria-label="submit search">
				{searchControl ? (
					<MdOutlineClose
						onClick={() => {
							setInputValue("");
							setFiltered([]);
							setSearchControl(false);
							setSearchError(false);
						}}
					/>
				) : (
					<RiSearch2Fill
						onClick={() => {
							setSearchControl(true);
							inputRef.current.focus();
						}}
					/>
				)}
			</button>
		</div>
	);
};

export default SearchInput;
