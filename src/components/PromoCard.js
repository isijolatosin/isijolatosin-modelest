import React from 'react'
import { AUTHORIZED_ID } from '../constant'
import { db } from '../firebase'

const PromoCard = () => {
	const [code, setCode] = React.useState('')
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

	return (
		<div className="tw-w-full tw-bg-black tw-h-[350px]">
			<div className="tw-relative">
				<div className="tw-relative tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-between tw-w-[80%] tw-mx-auto">
					<div className="font_cursive tw-text-[100px] md:tw-text-[250px] tw-text-white tw-relative tw-flex-[0.9]">
						<span className="tw-text-[32px] md:tw-text-[60px] tw-absolute tw-rotate-[-7deg] tw-top-[120px] md:tw-top-[155px] tw-left-[110px] md:tw-left-[220px] tw-bg-[rgba(0,0,0,0.7)] tw-text-white tw-w-[75%] md:tw-w-[40%] tw-pl-5">
							Price slash !!!{' '}
						</span>
						<span className="tw-text-xl md:tw-text-4xl tw-text-neutral-900 tw-absolute tw-rotate-[-5deg] tw-top-[110px] md:tw-top-[150px] tw-left-[140px] md:tw-left-[220px] tw-bg-[rgba(255,255,255,0.7)] tw-w-[60%] md:tw-w-[40%] tw-pl-5">
							Back to School{' '}
						</span>
						<span className="tw-bg-clip-text tw-text-transparent tw-bg-gradient-to-r tw-from-black tw-via-yellow-600 tw-to-yellow-700">
							August{' '}
						</span>
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
						Use code on checkout...
					</p>
				</div>
			</div>
		</div>
	)
}

export default PromoCard
// tw-bg-gradient-to-r tw-from-indigo-500 tw-via-purple-500 tw-to-pink-500 tw-rounded-md
