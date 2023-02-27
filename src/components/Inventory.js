/* eslint-disable array-callback-return */
import React from "react";
import InventoryForm from "./InventoryForm";
import { uploadMultipleFile } from "../utils/uploadFileFunc";
import { useGlobalContext } from "../context/useContextHook";
import axios from "axios";

const Inventory = React.memo(({ categories }) => {
	const { priceObject, setPriceObject } = useGlobalContext();
	const [isInstock, setIsInstock] = React.useState(false);
	const [isFeatured, setIsFeatured] = React.useState(false);
	const [postError, setPostError] = React.useState("");
	const [salesPercent, setSalesPercent] = React.useState();
	const [formData, setFormData] = React.useState({
		title: "",
		brand: "",
		density: "",
		texture: "",
		capsize: "",
		type: "",
		color: "",
		video: "",
		length: "",
		availablelength: "",
		availablecolor: "",
		dealLength: "",
		description: "",
		category: "",
	});
	const [imagesFile, setImagesFile] = React.useState([]);

	const handleformDataChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const toggleInstock = () => {
		setIsInstock(!isInstock);
	};
	const toggleIsFeatured = () => {
		setIsFeatured(!isFeatured);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const product = {
				name: formData.title,
				brand: formData.brand,
				density: formData.density,
				texture: formData.texture,
				capsize: formData.capsize,
				type: formData.type,
				color: formData.color,
				price: priceObject,
				video: formData.video,
				length: formData.length,
				availablelength: formData.availablelength,
				availablecolor: formData.availablecolor,
				dealLength: formData.dealLength,
				description: formData.description,
				salespercent: salesPercent,
				instock: isInstock,
				isFeatured: isFeatured,
				images: imagesFile,
				category: formData.category,
			};
			await axios.post(`${process.env.REACT_APP_BASE_ROUTE}/products`, product);
		} catch (error) {
			setPostError(error.message);
			console.log(error);
		}

		setFormData({
			title: "",
			brand: "",
			density: "",
			texture: "",
			capsize: "",
			type: "",
			color: "",
			video: "",
			length: "",
			dealLength: "",
			availablelength: "",
			availablecolor: "",
			description: "",
			category: "",
		});
		setPriceObject({
			14: "",
			16: "",
			18: "",
			20: "",
			22: "",
			24: "",
			26: "",
			28: "",
			30: "",
		});
		setImagesFile([]);
		setSalesPercent("");
		setIsInstock(false);
		setIsFeatured(false);
		window.location.reload();
	};

	const inputTypes = [
		{
			id: "1",
			name: "title",
			type: "text",
			value: formData?.title,
			placeholder: "Product Name...",
			isRequired: true,
		},
		{
			id: "2",
			name: "brand",
			type: "text",
			value: formData?.brand,
			placeholder: "Product Brand...",
			isRequired: true,
		},
		{
			id: "3",
			name: "density",
			type: "text",
			value: formData?.density,
			placeholder: "Product Density...",
			isRequired: false,
		},
		{
			id: "4",
			name: "texture",
			type: "text",
			value: formData?.texture,
			placeholder: "Product Texture...",
			isRequired: true,
		},
		{
			id: "5",
			name: "capsize",
			type: "text",
			value: formData?.capsize,
			placeholder: "Product Capsize...",
			isRequired: false,
		},
		{
			id: "6",
			name: "type",
			type: "text",
			value: formData?.type,
			placeholder: "Product Type...",
			isRequired: true,
		},
		{
			id: "7",
			name: "color",
			type: "text",
			value: formData?.color,
			placeholder: "Product Color...",
			isRequired: true,
		},
		{
			id: "8",
			name: "availablecolor",
			type: "text",
			value: formData?.availablecolor,
			placeholder: "Available Color...",
			isRequired: true,
		},
		{
			id: "9",
			name: "length",
			type: "number",
			value: formData?.length,
			placeholder: "Length...",
			isRequired: true,
		},
		{
			id: "10",
			name: "dealLength",
			type: "text",
			value: formData?.dealLength,
			placeholder: "Bundle Deals Length...",
			isRequired: false,
		},
		{
			id: "11",
			name: "availablelength",
			type: "text",
			value: formData?.availablelength,
			placeholder: "Available Lengths...",
			isRequired: true,
		},
		{
			id: "12",
			name: "video",
			type: "text",
			value: formData?.video,
			placeholder: "Product video url...",
			isRequired: false,
		},
		{
			id: "13",
			name: "category",
			type: "text",
			value: formData?.category,
			placeholder: "Use category Id...",
			isRequired: true,
		},
	];

	return (
		<InventoryForm
			handleSubmit={handleSubmit}
			inputTypes={inputTypes}
			handleformDataChange={handleformDataChange}
			formData={formData}
			isInstock={isInstock}
			toggleInstock={toggleInstock}
			postError={postError}
			buttonText="Add to Inventory"
			uploadMultipleFile={(e) => uploadMultipleFile(e, setImagesFile)}
			toggleIsFeatured={toggleIsFeatured}
			isFeatured={isFeatured}
			categories={categories}
			setSalesPercent={setSalesPercent}
		/>
	);
});

export default Inventory;
