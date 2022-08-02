import React from 'react'
import dayjs from 'dayjs'
import { AUTHORIZED_ID } from '../constant'
import { db } from '../firebase'

const PromoCard = () => {
	const [code, setCode] = React.useState('')
	const [countTime, setCountTime] = React.useState('')
	const [countDay, setCountDay] = React.useState('')
	const generateCode = () => {
		const genCode = `ModelEst${Math.random().toString(18).slice(2)}`
		setCode(genCode)
		db.collection('admin')
			.doc(`${AUTHORIZED_ID.id_one}/`)
			.collection('discount-code')
			.add({
				code: genCode,
			})
			.then(() => {
				console.log(`SUCCESSFULL ADDED CODE`)
			})
			.catch((error) => console.log('Error ' + error.message))
	}

	// Set the date we're counting down to
	const countDownDate = new Date('Aug 31, 2022 11:59:59').getTime()

	// Update the count down every 1 second
	const x = setInterval(function () {
		// Get today's date and time
		const now = new Date().getTime()

		// Find the distance between now and the count down date
		const distance = countDownDate - now

		// Time calculations for days, hours, minutes and seconds
		const days = Math.floor(distance / (1000 * 60 * 60 * 24))
		const hours = Math.floor(
			(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
		)
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
		const seconds = Math.floor((distance % (1000 * 60)) / 1000)

		// Display the result in the element with id="time"
		const h = hours < 10 ? `0${hours}` : hours
		const m = minutes < 10 ? `0${minutes}` : minutes
		const s = seconds < 10 ? `0${seconds}` : seconds
		setCountTime(h + ' : ' + m + ' : ' + s)
		// Display the result in the element with id="day"
		setCountDay(days)

		// If the count down is finished, write some text
		if (distance < 0) {
			clearInterval(x)
			document.getElementById('demo').innerHTML = 'EXPIRED'
		}
	}, 1000)

	return (
		<div className="tw-w-full tw-bg-black tw-h-[450px] md:tw-h-[500px]">
			<div className="tw-relative">
				<div className="tw-relative tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-between tw-w-[80%] tw-mx-auto">
					<div className="font_cursive tw-text-[100px] md:tw-text-[250px] tw-text-white tw-relative tw-flex-[0.9]">
						<span className="tw-text-[32px] md:tw-text-[60px] tw-absolute tw-rotate-[-7deg] tw-top-[120px] md:tw-top-[155px] tw-left-[110px] md:tw-left-[220px] md:tw-bg-[rgba(255,0,217,0.2)] tw-text-white tw-w-[75%] md:tw-w-[40%] tw-pl-5">
							Price slash !!!{' '}
						</span>
						<span className="tw-text-xl md:tw-text-4xl tw-text-neutral-900 tw-absolute tw-rotate-[-5deg] tw-top-[110px] md:tw-top-[150px] tw-left-[140px] md:tw-left-[220px] tw-bg-[rgba(0,204,255,0.8)] tw-w-[60%] md:tw-w-[25%] tw-pl-5">
							Back to School{' '}
						</span>
						<span className="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-[#00ccff] tw-to-[#ff00d9]">
							August{' '}
						</span>
						{/* <span className="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-black tw-via-yellow-600 tw-to-yellow-700">
							August{' '}
						</span> */}
					</div>
					<div
						onClick={generateCode}
						className="box md:tw-absolute md:tw-top-[130px] md:tw-right-[20px] tw-relative tw-cursor-pointer tw-mt-10">
						<span></span>
						<div className="content">
							<h1>Generate Code</h1>
						</div>
					</div>
				</div>
				<div className="md:tw-absolute tw-bottom-[90px] tw-right-[180px]">
					<p className="yellow tw-text-white tw-font-bold tw-text-xs tw-w-full tw-text-center tw-mt-7">
						{code}
					</p>
					<p className="tw-text-neutral-500 tw-text-xs tw-w-full tw-text-center tw-mt-1">
						Use code at checkout...
					</p>
				</div>
			</div>
			<div className="md:tw-mt-[-60px] tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-center tw-mt-5">
				{countDay > 0 && (
					<div className="tw-border-[4px] tw-border-neutral-900 tw-rounded-full tw-w-[70px] tw-h-[70px] md:tw-w-[100px] md:tw-h-[100px] md:tw-mr-5 md:tw-mt-3">
						<div className="tw-text-[30px] md:tw-text-[50px] tw-text-white tw-flex tw-items-center tw-justify-center orbitron tw-w-full tw-pt-1">
							{countDay}
						</div>
						<div className="tw-w-full tw-flex tw-items-center tw-justify-center tw-mt-[-13px] md:tw-mt-[-20px]">
							<span className="tw-text-sm md:tw-text-lg tw-text-white orbitron">
								{countDay > 1 ? 'days' : 'day'}
							</span>
						</div>
					</div>
				)}
				<div className="tw-text-[30px] md:tw-text-[50px] tw-text-white orbitron">
					{countTime}
				</div>
			</div>
		</div>
	)
}

export default PromoCard
// tw-bg-gradient-to-r tw-from-indigo-500 tw-via-purple-500 tw-to-pink-500 tw-rounded-md
