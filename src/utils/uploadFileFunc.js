import axios from "axios";

export const uploadMultipleFile = async (e, setImagesFile) => {
	// turn 'e' to an array
	var formData = new FormData();
	const files = e.target.files;
	for (var i = 0; i < files.length; i++) {
		formData.append("image", files[i]);
	}

	try {
		const {
			data: { response },
		} = await axios.post(
			`${process.env.REACT_APP_BASE_ROUTE}/image/uploadMultiple`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		const array = [];
		response.map((image) => {
			array.push(image?.src);
			return null;
		});
		setImagesFile(array);
	} catch (error) {
		console.log(error.message);
	}
};
export const uploadFile = async (e, setImageFile) => {
	// turn 'e' to an array
	const imageFile = e.target.files[0];
	const formData = new FormData();
	formData.append("image", imageFile);
	try {
		const {
			data: {
				image: { src },
			},
		} = await axios.post(
			`${process.env.REACT_APP_BASE_ROUTE}/products/uploadSingle`,
			formData,
			{
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}
		);

		setImageFile(src);
	} catch (error) {
		console.log(error);
	}
};
