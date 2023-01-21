/* eslint-disable array-callback-return */
import React from "react";
import InventoryForm from "./InventoryForm";
import { uploadMultipleFile } from "../utils/uploadFileFunc";
import { useGlobalContext } from "../context/useContextHook";
import axios from "axios";

const Inventory = React.memo(({ categories }) => {
	const { priceObject } = useGlobalContext();
	const [isInstock, setIsInstock] = React.useState(false);
	const [isFeatured, setIsFeatured] = React.useState(false);
	const [postError, setPostError] = React.useState("");
	const [salesPercent, setSalesPercent] = React.useState(0);
	const [formData, setFormData] = React.useState({});
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
		setImagesFile([]);
		setSalesPercent("");
		setIsInstock(false);
		setIsFeatured(false);
	};

	const inputTypes = [
		{
			id: "1",
			name: "title",
			type: "text",
			value: formData.title,
			placeholder: "Product Name...",
		},
		{
			id: "2",
			name: "brand",
			type: "text",
			value: formData.brand,
			placeholder: "Product Brand...",
		},
		{
			id: "3",
			name: "density",
			type: "text",
			value: formData.density,
			placeholder: "Product Density...",
		},
		{
			id: "4",
			name: "texture",
			type: "text",
			value: formData.texture,
			placeholder: "Product Texture...",
		},
		{
			id: "5",
			name: "capsize",
			type: "text",
			value: formData.capsize,
			placeholder: "Product Capsize...",
		},
		{
			id: "6",
			name: "type",
			type: "text",
			value: formData.type,
			placeholder: "Product Type...",
		},
		{
			id: "7",
			name: "color",
			type: "text",
			value: formData.color,
			placeholder: "Product Color...",
		},
		{
			id: "8",
			name: "availablecolor",
			type: "text",
			value: formData.availablecolor,
			placeholder: "Available Color...",
		},
		{
			id: "9",
			name: "length",
			type: "number",
			value: formData.length,
			placeholder: "Length...",
		},
		{
			id: "10",
			name: "dealLength",
			type: "text",
			value: formData.dealLength,
			placeholder: "Bundle Deals Length...",
		},
		{
			id: "11",
			name: "availablelength",
			type: "text",
			value: formData.availablelength,
			placeholder: "Available Lengths...",
		},
		{
			id: "13",
			name: "video",
			type: "text",
			value: formData.video,
			placeholder: "Product video url...",
		},
		{
			id: "14",
			name: "category",
			type: "text",
			value: formData.category,
			placeholder: "Use category Id...",
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
