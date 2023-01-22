import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GiPencil } from "react-icons/gi";
import { db } from "../../firebase";
import Button from "../shared/Button";
import Pagination from "./Pagination";
import { ANONYMOUS } from "../../constant";

const Reviews = ({ category, color }) => {
	const [chunkIndex, setChunkIndex] = React.useState(0);
	const [isForm, setIsForm] = React.useState(false);
	const [reviewsArray, setReviewsArray] = React.useState([]);
	const [reviews, setReviews] = React.useState({
		name: "",
		email: "",
		title: "",
		message: "",
	});
	const [rating, setRating] = React.useState(0);
	const contentPerPage = 3;
	const totalCards = reviewsArray.length / contentPerPage;

	const handleChangeAuthUser = (e) => {
		setReviews({ ...reviews, [e.target.name]: e.target.value });
	};

	const handleSubmit = () => {
		db.collection(category).add({
			name: reviews?.name,
			email: reviews?.email,
			title: reviews?.title,
			message: reviews?.message,
			rating: rating,
			date: new Date().toDateString(),
		});

		setRating(0);
		setReviews({
			name: "",
			email: "",
			title: "",
			message: "",
		});
		setIsForm(false);
	};

	React.useEffect(() => {
		let mounted = true;

		db.collection(category)
			.orderBy("date", "asc")
			.onSnapshot((snapshot) => {
				const results = snapshot.docs?.map((doc) => ({
					data: doc.data(),
				}));
				if (results) {
					let data = [];
					for (const result of results) {
						data.push({
							name: result?.data?.name,
							email: result?.data?.email,
							title: result?.data?.title,
							message: result?.data?.message,
							rating: result?.data?.rating,
							date: result?.data?.date,
						});
					}
					if (mounted) setReviewsArray(data);
				}
			});
		return () => (mounted = false);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const chunkedCards = [];
	let index = 0;
	for (let i = 0; i < totalCards; i++) {
		chunkedCards.push(reviewsArray.slice(index, contentPerPage + index));
		index += contentPerPage;
	}

	return (
		<div className={`tw-bg-${color} tw-mt-10 tw-py-10 tw-w-full`}>
			<div className="tw-border-[1px] tw-w-full md:tw-w-[80%] xl:tw-w-[55%] tw-mx-auto tw-p-5">
				<div className="tw-border-b-[1px] tw-pb-5">
					<h1 className="tw-text-neutral-700 tw-text-[28px] tw-mb-2 Oswald">
						Customer Reviews
					</h1>
					<div className="tw-flex tw-flex-col md:tw-flex-row md:tw-items-center tw-justify-between">
						<div className="tw-flex tw-flex-col md:tw-flex-row">
							<div className="tw-flex tw-flex-row tw-items-center">
								{Array(5)
									.fill()
									.map((_, i) => (
										<AiFillStar
											className="tw-text-neutral-800"
											size={25}
											key={i}
										/>
									))}
							</div>
							{reviewsArray?.length && (
								<span className="md:tw-ml-2 tw-text-neutral-600">
									Based on {reviewsArray?.length} reviews
								</span>
							)}
						</div>
						{!isForm && (
							<div
								className="tw-mt-5 md:tw-mt-0 tw-flex tw-items-center tw-text-red-700 "
								onClick={() => {
									setIsForm(true);
								}}>
								<span className="tw-font-[600] hover:tw-cursor-pointer tw-mr-1">
									Write a review
								</span>
								...
								<GiPencil size={15} />
							</div>
						)}
					</div>
				</div>
				{isForm && (
					<div className="tw-py-5">
						<p className="Oswald tw-pb-2">Write a review</p>
						<div>
							<p>Name</p>
							<input
								type="text"
								name="name"
								id="name"
								value={reviews.name}
								onChange={handleChangeAuthUser}
								placeholder="Enter your name"
								className="tw-mt-1 tw-block tw-w-[100%] tw-px-3 tw-py-2 tw-border tw-border-neutral-200 tw-text-sm tw-placeholder-neutral-300 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5"
							/>
						</div>
						<div>
							<p>Email</p>
							<input
								type="email"
								name="email"
								id="email"
								value={reviews.email}
								onChange={handleChangeAuthUser}
								placeholder="john.smith@example.com"
								className="tw-mt-1 tw-block tw-w-[100%] tw-px-3 tw-py-2 tw-border tw-border-neutral-200 tw-text-sm tw-placeholder-neutral-300 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5"
							/>
						</div>
						<div className="tw-mb-3">
							<p>Rating</p>
							<div className="tw-flex tw-mb-2">
								{[1, 2, 3, 4, 5].includes(rating) ? (
									<AiFillStar
										onClick={() => setRating(1)}
										className="tw-text-neutral-800 hover:tw-cursor-pointer"
										size={25}
									/>
								) : (
									<AiOutlineStar
										onClick={() => setRating(1)}
										className="tw-text-red-400 hover:tw-cursor-pointer"
										size={25}
									/>
								)}
								{[2, 3, 4, 5].includes(rating) ? (
									<AiFillStar
										onClick={() => setRating(2)}
										className="tw-text-neutral-800 hover:tw-cursor-pointer"
										size={25}
									/>
								) : (
									<AiOutlineStar
										onClick={() => setRating(2)}
										className="tw-text-red-400 hover:tw-cursor-pointer"
										size={25}
									/>
								)}
								{[3, 4, 5].includes(rating) ? (
									<AiFillStar
										onClick={() => setRating(3)}
										className="tw-text-neutral-800 hover:tw-cursor-pointer"
										size={25}
									/>
								) : (
									<AiOutlineStar
										onClick={() => setRating(3)}
										className="tw-text-red-400 hover:tw-cursor-pointer"
										size={25}
									/>
								)}
								{[4, 5].includes(rating) ? (
									<AiFillStar
										onClick={() => setRating(4)}
										className="tw-text-neutral-800 hover:tw-cursor-pointer"
										size={25}
									/>
								) : (
									<AiOutlineStar
										onClick={() => setRating(4)}
										className="tw-text-red-400 hover:tw-cursor-pointer"
										size={25}
									/>
								)}
								{[5].includes(rating) ? (
									<AiFillStar
										onClick={() => setRating(5)}
										className="tw-text-neutral-800 hover:tw-cursor-pointer"
										size={25}
									/>
								) : (
									<AiOutlineStar
										onClick={() => setRating(5)}
										className="tw-text-red-400 hover:tw-cursor-pointer"
										size={25}
									/>
								)}
							</div>
						</div>
						<div>
							<p>Review Title</p>
							<input
								type="text"
								name="title"
								id="title"
								value={reviews.title}
								onChange={handleChangeAuthUser}
								placeholder="Give your review title"
								className="tw-mt-1 tw-block tw-w-[100%] tw-px-3 tw-py-2 tw-border tw-border-neutral-200 tw-text-sm tw-placeholder-neutral-300 focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-5"
							/>
						</div>
						<div>
							<p>Your Review Message (1500)</p>
							<textarea
								id="message"
								rows="10"
								cols="50"
								name="message"
								value={reviews.message}
								onChange={handleChangeAuthUser}
								placeholder="Write your comment here..."
								className="tw-w-[100%] tw-mb-5 tw-text-neutral-500 tw-font-light tw-bg-white tw-block tw-px-3 tw-py-2 tw-border-neutral-200 tw-rounded-sm tw-text-xs tw-border-[1px] tw-placeholder-neutral-300 focus:tw-outline-none focus:tw-shadow-lg focus:tw-ring-1 focus:tw-ring-blue-200 disabled:tw-bg-neutral-50 disabled:tw-text-neutral-500 disabled:tw-border-neutral-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0"
							/>
						</div>
						<div className="tw-flex tw-flex-row tw-justify-end tw-mb-10">
							<Button handleFunc={handleSubmit}>Submit Review</Button>
						</div>
					</div>
				)}
				{chunkedCards[chunkIndex]?.map((review, idx) => (
					<div key={idx} className="tw-py-5 tw-border-t-[1px]">
						<div className="tw-flex tw-mb-2">
							{Array(review?.rating)
								.fill()
								.map((_, i) => (
									<AiFillStar
										className="tw-text-neutral-800"
										size={20}
										key={i}
									/>
								))}
							{review?.rating === 4 && (
								<AiOutlineStar className="tw-text-neutral-800" size={20} />
							)}
							{review?.rating === 3 && (
								<>
									<AiOutlineStar className="tw-text-neutral-800" size={20} />
									<AiOutlineStar className="tw-text-neutral-800" size={20} />
								</>
							)}
							{review?.rating === 2 && (
								<>
									<AiOutlineStar className="tw-text-neutral-800" size={20} />
									<AiOutlineStar className="tw-text-neutral-800" size={20} />
									<AiOutlineStar className="tw-text-neutral-800" size={20} />
								</>
							)}
							{review?.rating === 1 && (
								<>
									<AiOutlineStar className="tw-text-neutral-800" size={20} />
									<AiOutlineStar className="tw-text-neutral-800" size={20} />
									<AiOutlineStar className="tw-text-neutral-800" size={20} />
									<AiOutlineStar className="tw-text-neutral-800" size={20} />
								</>
							)}
						</div>
						<p className="Oswald tw-text-neutral-700">{review?.title}</p>
						<p className="tw-font-bold tw-italic tw-text-xs tw-mb-3 tw-capitalize tw-text-neutral-700">
							{review?.name ? review?.name : ANONYMOUS}{" "}
							<span className="tw-font-light tw-lowercase">on</span>{" "}
							{review?.date}
						</p>
						<p className="tw-text-xs tw-text-neutral-600 tw-leading-5">
							{review?.message}
						</p>
					</div>
				))}
				{reviewsArray?.length > contentPerPage && (
					<Pagination
						data={reviewsArray}
						contentPerPage={contentPerPage}
						setChunkIndex={setChunkIndex}
						totalContent={reviewsArray.length}
					/>
				)}
			</div>
		</div>
	);
};

export default Reviews;
