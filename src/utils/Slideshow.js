import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

const Slideshow = ({ images, iconSize, video }) => {
	const imageArray = [
		{
			image: (images?.image && images?.image) || (images?.[0] && images?.[0]),
			id: 1,
		},
		{
			image: (images?.image2 && images?.image2) || (images?.[1] && images?.[1]),
			id: 2,
		},
		{
			image: (images?.image3 && images?.image3) || (images?.[2] && images?.[2]),
			id: 3,
		},
		{
			image: (images?.image4 && images?.image4) || (images?.[3] && images?.[3]),
			id: 4,
		},
	].filter((x) => x?.image)

	const [current, setCurrent] = React.useState(0)
	const length = imageArray?.length

	const nextSlide = () => {
		setCurrent(current === length - 1 ? 0 : current + 1)
	}
	const prevSlide = () => {
		setCurrent(current === 0 ? length - 1 : current - 1)
	}

	return (
		<div className="tw-relative tw-w-[100%] xl:tw-w-[70%] tw-mx-auto">
			{imageArray?.length > 1 && (
				<MdArrowBackIosNew
					size={iconSize}
					className="left-arrow tw-left-3"
					onClick={prevSlide}
				/>
			)}
			{imageArray?.length > 1 && (
				<MdArrowForwardIos
					size={iconSize}
					className="right-arrow tw-right-3"
					onClick={nextSlide}
				/>
			)}
			<div className="slider tw-w-[100%] tw-h-[630px] lg:tw-h-[700px] tw-mb-10 tw-flex tw-flex-col">
				{imageArray?.map((item, idx) => (
					<div
						key={idx}
						className={
							idx === current
								? 'slide active tw-w-full tw-h-full'
								: 'slide tw-w-full'
						}>
						{idx === current && (
							<div className="image">
								<img
									src={item?.image}
									alt={item?.id}
									className="tw-w-full tw-object-cover tw-object-bottom"
								/>
								<span className="tw-absolute tw-text-gray-600 tw-right-6 tw-bottom-4 tw-italic tw-text-[10px]">
									modelEst...
								</span>
							</div>
						)}
					</div>
				))}
				<div className="tw-flex tw-items-center tw-justify-center tw-flex-wrap tw-p-4 tw-bg-neutral-100 tw-overflow-hidden">
					{imageArray?.map((item, idx) => (
						<div
							onClick={() => setCurrent(idx)}
							key={idx}
							className={`${
								idx === current && 'tw-border-[1px] tw-p-2 tw-border-[#bba371]'
							} tw-mx-2 tw-ease-in tw-duration-300 hover:md:tw-opacity-[0.3] md:tw-cursor-pointer`}>
							<img
								src={item?.image}
								alt={item?.id}
								className="tw-w-[50px] tw-h-[50px] tw-object-cover"
							/>
						</div>
					))}
					{images?.type?.includes('wig') && (
						<a
							href={video && video}
							target="_blank"
							rel="noreferrer"
							className={`${
								video
									? 'tw-text-[#bba371] tw-border-[#bba371] hover:md:tw-text-neutral-300 hover:md:tw-border-neutral-300 '
									: 'tw-text-neutral-300 tw-border-neutral-300'
							} tw-w-[35px] tw-h-[35px] tw-flex tw-items-center tw-justify-center tw-rounded-full tw-border-[1px] tw-ease-in tw-duration-300 tw-ml-3`}>
							<BsFillPlayFill size={25} className="tw-w-[70%] tw-h-[70%]" />
						</a>
					)}
				</div>
			</div>
		</div>
	)
}

export default Slideshow
