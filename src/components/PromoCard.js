import React from 'react'
import { AUTHORIZED_ID } from '../constant'
import { db } from '../firebase'
import { fetchSalesPercentage } from '../utils/salesPercentageNumber'

const PromoCard = ({ setExpired }) => {
	const [code, setCode] = React.useState('')
	const [countTime, setCountTime] = React.useState('')
	const [countDay, setCountDay] = React.useState('')
	const [sales, setSales] = React.useState(null)

	React.useEffect(() => {
		setSales(fetchSalesPercentage())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
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

		const h = hours < 10 ? `0${hours}` : hours
		const m = minutes < 10 ? `0${minutes}` : minutes
		const s = seconds < 10 ? `0${seconds}` : seconds
		setCountTime(h + ' : ' + m + ' : ' + s)

		setCountDay(days)

		// If the count down is finished, write some text
		if (distance < 0 || distance === 0) {
			clearInterval(x)
			setExpired(true)
		}
	}, 1000)

	return (
		<div className="tw-w-full tw-bg-black tw-h-[500px] tw-relative">
			<div className="tw-relative">
				<div className="tw-relative tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-between tw-w-[95%] lg:tw-w-[80%] xl:tw-w-[70%] tw-mx-auto">
					<div className="font_cursive tw-flex-[0.7] tw-text-white tw-relative md:tw-mr-10">
						<span className="tw-text-[52px] md:tw-text-[45px] lg:tw-text-[55px] tw-absolute tw-rotate-[-7deg] tw-top-[110px] md:tw-top-[115px] tw-left-[40px] md:tw-left-[200px] md:tw-bg-[rgba(255,0,217,0.2)] tw-text-white tw-w-[85%] md:tw-w-[60%] tw-pl-5">
							Price slash !!!{' '}
						</span>
						<span className="tw-text-3xl md:tw-text-4xl tw-text-neutral-900 tw-absolute tw-rotate-[-5deg] tw-top-[110px] md:tw-top-[100px] tw-left-[80px] md:tw-left-[220px] tw-bg-[rgba(0,204,255,0.8)] tw-w-[60%] md:tw-w-[50%] tw-pl-5">
							Back to School{' '}
						</span>
						<span className="tw-text-[120px] lg:tw-text-[200px] xl:tw-text-[250px] tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-[#00ccff] tw-to-[#ff00d9]">
							August{' '}
						</span>
					</div>
					<div className=" tw-flex-[0.3]">
						<div className="md:tw-hidden tw-flex tw-justify-between tw-w-full tw-mt-[10px]">
							<div className=" tw-text-white tw-mt-1 tw-mr-10 orbitron">
								<p className="tw-font-light tw-text-[15px]">SAVE UP TO </p>
								<div className="tw-flex tw-mt-[-25px]">
									<p className="tw-text-[55px] tw-text-red-700">{sales}%</p>
								</div>
							</div>
							<div>
								<div
									onClick={generateCode}
									className="box md:tw-absolute md:tw-top-[130px] md:tw-right-[20px] tw-relative tw-cursor-pointer">
									<span></span>
									<div className="content">
										<h1>Generate Code</h1>
									</div>
								</div>
								<div className="tw-ml-[-40px]">
									<p className="yellow tw-text-white tw-font-bold tw-text-xs tw-w-full tw-text-center tw-mt-7">
										{code}
									</p>
									<p className="tw-text-neutral-500 tw-text-xs tw-w-full tw-text-center tw-mt-1">
										Use code at checkout...
									</p>
								</div>
							</div>
						</div>
						<div className="tw-hidden md:tw-flex tw-flex-col tw-items-center tw-justify-center">
							<div className=" tw-text-white tw-mr-10 tw-mt-[70px] orbitron">
								<p className="tw-font-light tw-text-[50px]">SAVE </p>
								<div className="tw-flex tw-mt-[-40px]">
									<div className="tw-mt-[17px] tw-text-[35px]">
										<p className="tw-text-[33px]">UP</p>
										<p className="tw-mt-[-24px]">TO</p>
									</div>
									<p className="tw-text-[72px] tw-text-red-700 tw-ml-1">
										{sales}%
									</p>
								</div>
							</div>

							<div
								onClick={generateCode}
								className="box md:tw-right-[20px] tw-relative tw-cursor-pointer">
								<span></span>
								<div className="content">
									<h1>Generate Code</h1>
								</div>
							</div>
							<div className="tw-ml-[-40px]">
								<p className="yellow tw-text-white tw-font-bold tw-text-xs tw-w-full tw-text-center tw-mt-7">
									{code}
								</p>
								<p className="tw-text-neutral-500 tw-text-xs tw-w-full tw-text-center tw-mt-1">
									Use code at checkout...
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="tw-mt-[40px] md:tw-mt-0 tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-center ">
				{countDay > 0 && (
					<div className="tw-border-[4px] tw-border-neutral-800 tw-rounded-full tw-w-[70px] tw-h-[70px] md:tw-w-[100px] md:tw-h-[100px] md:tw-mr-5 md:tw-mt-3">
						<>
							<div className="tw-text-[30px] md:tw-text-[50px] tw-text-white tw-flex tw-items-center tw-justify-center orbitron tw-w-full tw-pt-1">
								{countDay}
							</div>
							<div className="tw-w-full tw-flex tw-items-center tw-justify-center tw-mt-[-13px] md:tw-mt-[-20px]">
								<span className="tw-text-sm md:tw-text-lg tw-text-white orbitron">
									{countDay > 1 ? 'days' : 'day'}
								</span>
							</div>
						</>
					</div>
				)}
				<div
					className={`${
						countDay < 1
							? 'tw-text-red-700 tw-w-full tw-text-center'
							: 'tw-text-white'
					} tw-text-[30px] md:tw-text-[50px] orbitron`}>
					{countTime}
				</div>
			</div>
		</div>
	)
}

export default PromoCard
// tw-bg-gradient-to-r tw-from-indigo-500 tw-via-purple-500 tw-to-pink-500 tw-rounded-md
