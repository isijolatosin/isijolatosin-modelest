import React from 'react'
import { MdArrowBackIosNew, MdArrowForwardIos } from 'react-icons/md'

const Slideshow = ({ images, iconSize }) => {
	const imageArray = [
		{
			image: (images.image && images.image) || (images?.[0] && images?.[0]),
			id: 1,
		},
		{
			image: (images.image2 && images.image2) || (images?.[1] && images?.[1]),
			id: 2,
		},
		{
			image: (images.image3 && images.image3) || (images?.[2] && images?.[2]),
			id: 3,
		},
		{
			image: (images.image4 && images.image4) || (images?.[3] && images?.[3]),
			id: 4,
		},
	].filter((x) => x.image)

	const [current, setCurrent] = React.useState(0)
	const length = imageArray.length

	const nextSlide = () => {
		setCurrent(current === length - 1 ? 0 : current + 1)
	}
	const prevSlide = () => {
		setCurrent(current === 0 ? length - 1 : current - 1)
	}

	return (
		<div className="tw-relative">
			{imageArray.length > 1 && (
				<MdArrowBackIosNew
					size={iconSize}
					className="left-arrow tw-left-3"
					onClick={prevSlide}
				/>
			)}
			{imageArray.length > 1 && (
				<MdArrowForwardIos
					size={iconSize}
					className="right-arrow tw-right-3"
					onClick={nextSlide}
				/>
			)}
			<div className="slider tw-w-[100%] tw-mb-10">
				{imageArray.map((item, idx) => (
					<div key={idx} className={idx === current ? 'slide active' : 'slide'}>
						{idx === current && (
							<div className="image">
								<img src={item.image} alt={item.id} />
								<span className="tw-absolute tw-text-gray-600 tw-right-6 tw-bottom-4 tw-italic tw-text-[10px]">
									modelEst...
								</span>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default Slideshow
