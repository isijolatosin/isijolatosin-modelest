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
			`${process.env.REACT_APP_BASE_ROUTE}/image/uploadSingle`,
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
export const uploadImage = (e, setImagesFile) => {
	const data = new FormData();
	const images = e.target.files;
	const returnImg = [];
	for (var i = 0; i < images.length; i++) {
		data.append("file", images[i]);

		data.append(
			"upload_preset",
			`${process.env.REACT_APP_CLOUD_UPLOAD_PRESET}`
		);
		data.append("cloud_name", `${process.env.REACT_APP_CLOUD_NAME}`);
		data.append("folder", "modelest-upload/general");

		fetch(
			`https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
			{
				method: "post",
				body: data,
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.url) returnImg.push(data.url);
			})
			.catch((err) => console.log(err));
	}
	setImagesFile(returnImg);
};
