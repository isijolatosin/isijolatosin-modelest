import React from 'react'
import { CgClose } from 'react-icons/cg'
import { HiEye, HiEyeOff } from 'react-icons/hi'

const ContactForm = ({
	SubmitInqury,
	setShowForm,
	setChatError,
	setChatSuccess,
	setChatDetail,
	chatDetail,
	handleChangeChat,
	chatSuccess,
	chatError,
	textColor,
	isCancelBtn,
	toggleHeight,
	setToggleHeight,
	isFormBtn,
}) => {
	return (
		<>
			<p
				className={`tw-relative tw-text-center tw-leading-5 tw-text-xs md:tw-text-sm tw-my-3 tw-mb-5 tw-font-bold tw-w-[100%] tw-mx-auto ${textColor}`}>
				<span className="tw-text-red-800 tw-text-lg">Hey!</span> You got
				questions for modelEst ? <br />
				Please fill out the form below and we will get back to you as soon as
				possible
			</p>
			{isFormBtn && (
				<div className="tw-w-full tw-mx-auto tw-flex tw-justify-center">
					<button
						className="tw-text-[#bba371] tw-text-center tw-mb-2 tw-border-[1px] tw-p-3 tw-rounded-full tw-border-neutral-700 tw-text-sm hover:tw-text-neutral-600 hover:tw-border-[#bba371] tw-ease-in tw-duration-300"
						onClick={() => setToggleHeight(!toggleHeight)}>
						{toggleHeight ? <HiEye size={25} /> : <HiEyeOff size={25} />}
					</button>
				</div>
			)}
			<form
				onSubmit={SubmitInqury}
				className={`${
					toggleHeight ? 'tw-h-0 tw-opacity-0' : 'tw-h-full tw-opacity-1'
				} tw-ease-in tw-duration-300`}>
				{isCancelBtn && (
					<div className="tw-absolute tw-right-[30px] tw-top-[70px]">
						<div
							onClick={() => {
								setShowForm(false)
								setChatError(false)
								setChatSuccess(false)
								setChatDetail({
									name: '',
									title: '',
									email: '',
									message: '',
								})
							}}
							className="tw-text-md tw-text-white tw-bg-neutral-900 tw-w-[30px] tw-h-[30px] tw-p-[8px] tw-flex tw-items-center tw-justify-center tw-rounded-full tw-shadow-lg tw-ease-in tw-duration-300 tw-cursor-pointer hover:md:tw-bg-white hover:md:tw-text-neutral-900">
							<CgClose />
						</div>
					</div>
				)}

				<div>
					<input
						type="text"
						name="name"
						id="name"
						value={chatDetail?.name}
						onChange={handleChangeChat}
						placeholder="Name"
						className={`tw-bg-transparent tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-text-xs tw-shadow-xl placeholder:tw-text-xs focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-1 placeholder:${textColor} tw-font-bold ${textColor}`}
					/>
				</div>
				<div>
					<input
						type="text"
						name="title"
						id="title"
						value={chatDetail.title}
						onChange={handleChangeChat}
						placeholder="Topic"
						className={`tw-bg-transparent tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-text-xs tw-shadow-xl placeholder:tw-text-xs focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-1 placeholder:${textColor} tw-font-bold ${textColor}`}
					/>
				</div>
				<div>
					<input
						type="email"
						name="email"
						id="email"
						value={chatDetail.email}
						onChange={handleChangeChat}
						placeholder="Email"
						className={`tw-bg-transparent tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-text-xs tw-shadow-xl placeholder:tw-text-xs focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-1 placeholder:${textColor} tw-font-bold ${textColor}`}
					/>
				</div>
				<div>
					<textarea
						name="message"
						rows={10}
						cols={25}
						value={chatDetail.message}
						onChange={handleChangeChat}
						placeholder="Message..."
						className={`tw-bg-transparent tw-block tw-mx-auto tw-w-[100%] tw-px-3 tw-py-2 tw-text-xs tw-shadow-xl focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0 tw-mb-1 placeholder:tw-font-bold placeholder:${textColor} ${textColor} tw-font-bold`}
					/>
				</div>
				{chatError && (
					<div className="tw-text-center tw-text-xs tw-mt-2 tw-text-red-700">
						<span>Please enter required field(s) above</span>
					</div>
				)}
				{chatSuccess && (
					<div className="tw-text-center tw-text-xs tw-mt-2 tw-text-blue-700">
						<span>Message Sent!</span>
					</div>
				)}
				<button
					className="tw-w-full tw-bg-neutral-900 tw-text-white tw-text-center tw-text-xs tw-py-2 tw-mt-3 tw-mb-10 tw-cursor-pointer hover:tw-bg-white hover:tw-text-neutral-900 tw-ease-in tw-duration-300"
					type="submit">
					Send message
				</button>
			</form>
		</>
	)
}

export default ContactForm
