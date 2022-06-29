import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import generateRandom from '../../utils/RandomGen'

const RatingFix = ({ isNum, isReview, size, color }) => {
	const MAX_RATING = 5
	const MIN_RATING = 5
	const [rating] = React.useState(
		Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1) + MIN_RATING)
	)
	const deci = Number(Math.random().toFixed(1))
	return (
		<div className="tw-flex tw-items-center">
			{Array(rating)
				.fill()
				.map((_, i) => (
					<AiFillStar className={`tw-text-${color}-800`} size={size} key={i} />
				))}
			{isNum && <span className="tw-ml-1">{rating + deci}</span>}
			{generateRandom(100, 200)} reviews
		</div>
	)
}

export default RatingFix
