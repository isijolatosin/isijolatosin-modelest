import React, { useState, useEffect, useRef } from 'react'
import {
	MdDoubleArrow,
	MdKeyboardArrowLeft,
	MdKeyboardArrowRight,
} from 'react-icons/md'

const Pagination = ({ data, contentPerPage, totalContent, setChunkIndex }) => {
	const [allowPrevious, setAllowPrevious] = useState(false)
	const [currentPage, setCurrentPage] = useState(1)
	const [allowNext, setAllowNext] = useState(false)
	const [paginatedCards, setPaginatedCards] = useState([])
	const prevCurrentPage = useRef()
	const totalCards = Math.ceil(data?.length / contentPerPage)
	const chunkedCards = []

	let index = 0

	for (let i = 0; i < data?.length; i++) {
		chunkedCards.push(data.slice(index, contentPerPage + index))

		index += contentPerPage
	}

	const handlePrevNextPageLogic = (page) => {
		if (page === 1) {
			setAllowPrevious(true)
		} else {
			setAllowPrevious(false)
		}

		if (page < totalCards) {
			setAllowNext(false)
		} else {
			setAllowNext(true)
		}

		setChunkIndex(page - 1)
		setCurrentPage(page)
	}

	const setupPaginatedCards = () => {
		const pagination = []
		const index = Math.floor(currentPage / contentPerPage - 0.1)
		const chunkedPaginated = []

		let sectionIndex = 0

		for (let i = 0; i < chunkedCards.length; i++) {
			chunkedPaginated.push(
				chunkedCards.slice(sectionIndex, contentPerPage + sectionIndex)
			)
			sectionIndex += contentPerPage
		}

		const chunkedPaginatedSections = []
		const filteredChunk = chunkedPaginated.filter((x) => x.length !== 0)

		for (let i = 0; i < filteredChunk.length; i++) {
			if (filteredChunk[i].filter((x) => x.length !== 0).length !== 0) {
				chunkedPaginatedSections.push(
					filteredChunk[i].filter((x) => x.length !== 0)
				)
			}
		}

		for (let i = 1; i <= chunkedPaginatedSections[index]?.length; i++) {
			pagination.push({
				type: 'page',
				number: index * contentPerPage + i,
				label: index * contentPerPage + i,
			})
		}

		setPaginatedCards(pagination)
	}

	const handlePage = (page) => {
		handlePrevNextPageLogic(page)
	}

	const handleFirstPage = () => {
		if (currentPage === 1) {
			setAllowPrevious(true)
		}
		setCurrentPage(1)
		setChunkIndex(0)
	}

	const handlePrevPage = () => {
		if (currentPage > 1) {
			if (currentPage - 1 === 1) {
				setAllowPrevious(false)
			}
		}

		setChunkIndex(currentPage - 2)
		// setChunkIndex(currentPage);
		setCurrentPage(currentPage - 1)
	}

	const handleNextPage = () => {
		if (currentPage === totalCards) {
			setAllowNext(true)
		}

		if (currentPage >= 1) {
			setAllowPrevious(false)
		}

		if (currentPage) setChunkIndex(currentPage)
		setCurrentPage(currentPage + 1)
	}

	const handleLastPage = () => {
		if (currentPage + 1 === totalCards) {
			setAllowNext(true)
		}

		if (currentPage >= 1) {
			setAllowPrevious(false)
		}

		setCurrentPage(totalCards)
		setChunkIndex(totalCards - 1)
	}

	useEffect(() => {
		prevCurrentPage.current = currentPage

		if (paginatedCards.length === 0) {
			setupPaginatedCards()
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [paginatedCards])

	useEffect(() => {
		if (prevCurrentPage.current !== currentPage) {
			setupPaginatedCards()
		}

		if (currentPage < totalCards) {
			setAllowNext(false)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage])

	return (
		<>
			{totalContent > 1 && (
				<div className="pagWrapper">
					<button
						onClick={handleFirstPage}
						disabled={allowPrevious || currentPage === 1}
						type="button"
						className={
							allowPrevious || currentPage === 1
								? 'tw-opacity-[0.1] flipArrow pagButton'
								: 'flipArrow pagButton'
						}>
						<MdDoubleArrow size={14} className="tw-ml-1" />
					</button>

					<button
						className={
							allowPrevious || currentPage === 1
								? 'pagButton tw-mr-3 tw-opacity-[0.1]'
								: 'pagButton tw-mr-3'
						}
						onClick={handlePrevPage}
						disabled={allowPrevious || currentPage === 1}
						type="button">
						<MdKeyboardArrowLeft className="tw-ml-[2px]" />
					</button>

					{paginatedCards.map((pagination) => (
						<button
							type="button"
							className={`${
								currentPage === pagination?.number ? 'active pagNum' : 'pagNum'
							}`}
							label={pagination?.label}
							onClick={() => handlePage(pagination?.number)}
							disabled={currentPage === pagination?.number}>
							{pagination?.label}
						</button>
					))}

					<button
						className={
							allowNext || currentPage === totalCards
								? 'pagButton tw-ml-3 tw-opacity-[0.1]'
								: 'pagButton tw-ml-3'
						}
						onClick={handleNextPage}
						disabled={allowNext || currentPage === totalCards}
						type="button">
						<MdKeyboardArrowRight className="tw-ml-[3px]" />
					</button>

					<button
						className={
							allowNext || currentPage === totalCards
								? 'tw-opacity-[0.1] pagButton tw-flex tw-flex-row tw-items-center'
								: ' pagButton tw-flex tw-flex-row tw-items-center'
						}
						onClick={handleLastPage}
						disabled={allowNext || currentPage === totalCards}
						type="button">
						<MdDoubleArrow size={14} className="tw-ml-1" />
					</button>
				</div>
			)}
		</>
	)
}

export default Pagination
