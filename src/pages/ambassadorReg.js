import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Layout from '../components/shared/Layout'
import Button from '../components/shared/Button'
import { fetchSalesPercentage } from '../utils/salesPercentageNumber'
import { db } from '../firebase'
import { RiHomeLine, RiInstagramLine, RiSnapchatLine } from 'react-icons/ri'
import { SiTiktok } from 'react-icons/si'
import Heading from '../components/Heading'

const Ambassador = () => {
	const [ambObj, setAmbObj] = useState({
		firstname: '',
		lastname: '',
		email: '',
		code: '',
		phone: '',
		bankName: '',
		accountNo: '',
		state: '',
		country: '',
		date: '',
		instagram: '',
		tiktok: '',
		snapchat: '',
		error: null,
	})
	const [sales, setSales] = React.useState(null)
	const [exist, setAlreadyExist] = React.useState(false)
	const [allAmb, setAllAmb] = React.useState([])
	const [ambCode, setAmbCode] = React.useState('')

	React.useEffect(() => {
		setSales(fetchSalesPercentage())
		db.collection('ambassador').onSnapshot((snapshot) => {
			const result = []
			// eslint-disable-next-line array-callback-return
			snapshot.docs.map((doc) => {
				if (doc.data()) {
					result.push(doc.data())
				}
			})
			setAllAmb(result)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const handleChangeAuthUser = (e) => {
		setAmbObj({ ...ambObj, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (
			ambObj.accountNo &&
			ambObj.bankName &&
			ambObj.firstname &&
			ambObj.lastname &&
			ambObj.email &&
			ambObj.code &&
			ambObj.phone &&
			ambObj.country &&
			ambObj.date &&
			(ambObj.instagram || ambObj.tiktok || ambObj.snapchat)
		) {
			const code = `AMB${ambObj.country
				.slice(0, 3)
				.toUpperCase()}${Math.random().toString(18).slice(2).toUpperCase()}`

			const index = allAmb?.findIndex(
				(obj) =>
					obj.yourSalesCode.toUpperCase() === code || obj.email === ambObj.email
			)

			if (index < 0) {
				db.collection('ambassador')
					.add({
						accountNo: ambObj?.accountNo,
						bankName: ambObj?.bankName,
						country: ambObj?.country,
						date: ambObj?.date,
						email: ambObj?.email,
						firstname: ambObj?.firstname,
						instagram: ambObj?.instagram,
						lastname: ambObj?.lastname,
						phone: ambObj?.code + ambObj?.phone,
						state: ambObj?.state,
						snapchat: ambObj?.snapchat,
						tiktok: ambObj?.tiktok,
						yourSalesCode: code,
					})
					.then(() => {
						setAmbObj({
							firstname: '',
							lastname: '',
							email: '',
							code: '',
							phone: '',
							bankName: '',
							accountNo: '',
							state: '',
							country: '',
							date: '',
							instagram: '',
							tiktok: '',
							snapchat: '',
							error: null,
						})
						setAlreadyExist(false)
						setAmbCode(code)
					})
			} else {
				setAlreadyExist(true)
			}
		} else {
			setAmbObj({ ...ambObj, error: 'Required field(s) missing!' })
		}
	}

	return (
		<div>
			<Helmet>
				<title>Ambassador Sign Up</title>
			</Helmet>
			<Layout>
				<section
					className={`${
						sales ? 'tw-pt-[180px]' : 'tw-pt-[130px]'
					} tw-w-full tw-bg-[rgba(255,255,255,0.1)] tw-pb-10 logo`}>
					<div className="tw-text-center tw-relative">
						<div className="tw-w-[55%] tw-mx-auto tw-my-10 tw-text-neutral-50 tw-font-light">
							<Link to="/">
								<span className="tw-text-[#bba371]">modelEst.</span>
							</Link>
						</div>
						<Link
							to="/"
							className="tw-absolute tw-top-[-60px] md:tw-top-[-100px] tw-left-[15px] tw-flex tw-items-center tw-text-[#bba371]">
							<RiHomeLine size={25} />
							<p className="tw-ml-1 tw-text-xs">Home</p>
						</Link>
					</div>
					<article className="tw-w-full">
						<form
							className="tw-w-[95%] xl:tw-w-[75%] tw-mx-auto"
							onSubmit={handleSubmit}>
							<div>
								<div className="tw-mt-10 tw-mb-2">
									<Heading
										children="Personal Information"
										size2={true}
										isBold={true}
										isWhite={true}
									/>
								</div>
								<div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-2">
									<div className="tw-w-[100%]">
										<input
											type="text"
											name="firstname"
											id="firstname"
											value={ambObj.firstname}
											onChange={handleChangeAuthUser}
											placeholder="First Name..."
											className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
										/>
									</div>
									<div className="tw-w-[100%]">
										<input
											type="text"
											name="lastname"
											id="lastname"
											value={ambObj.lastname}
											onChange={handleChangeAuthUser}
											placeholder="Last Name..."
											className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
										/>
									</div>
									<div className="tw-w-[100%]">
										<input
											type="text"
											name="email"
											id="email"
											value={ambObj.email}
											onChange={handleChangeAuthUser}
											placeholder="Email..."
											className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
										/>
									</div>
									<div className="tw-w-[100%] tw-flex tw-items-center">
										<input
											type="text"
											name="code"
											id="text"
											value={ambObj.code}
											onChange={handleChangeAuthUser}
											placeholder="Code..."
											className="tw-flex-[0.17] tw-w-full tw-px-3 tw-py-2 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0 tw-mr-1"
										/>
										<input
											type="number"
											name="phone"
											id="number"
											value={ambObj.phone}
											onChange={handleChangeAuthUser}
											placeholder="Phone No..."
											className="tw-flex-[0.83] tw-w-full tw-px-3 tw-py-2 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
										/>
									</div>
									<div className="tw-w-[100%]">
										<input
											type="text"
											name="state"
											id="state"
											value={ambObj.state}
											onChange={handleChangeAuthUser}
											placeholder="State/Province..."
											className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
										/>
									</div>
									<div className="tw-w-[100%]">
										<input
											type="text"
											name="country"
											id="country"
											value={ambObj.country}
											onChange={handleChangeAuthUser}
											placeholder="Country..."
											className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
										/>
									</div>
									<div className="tw-w-[100%]">
										<input
											type="date"
											name="date"
											id="date"
											value={ambObj.date}
											onChange={handleChangeAuthUser}
											className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
										/>
									</div>
								</div>
							</div>
							<div>
								<div className="tw-mt-10 tw-mb-2">
									<Heading
										children="Bank Information"
										size2={true}
										isBold={true}
										isWhite={true}
									/>
								</div>
								<div className="tw-grid md:tw-grid-cols-2 tw-gap-2">
									<div className="tw-w-[100%]">
										<input
											type="text"
											name="accountNo"
											id="accountNo"
											value={ambObj.accountNo}
											onChange={handleChangeAuthUser}
											placeholder="Account No..."
											className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
										/>
									</div>
									<div className="tw-w-[100%]">
										<input
											type="text"
											name="bankName"
											id="bankName"
											value={ambObj.bankName}
											onChange={handleChangeAuthUser}
											placeholder="Bank Name..."
											className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
										/>
									</div>
								</div>
							</div>
							<div>
								<div className="tw-mt-10 tw-mb-2">
									<Heading
										children="Handles"
										size2={true}
										isBold={true}
										isWhite={true}
									/>
								</div>
								<div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-2">
									<div className="tw-w-[100%] tw-flex tw-items-center tw-justify-center">
										<div className="tw-flex-[0.12] tw-text-[#bba371]">
											<RiInstagramLine size={25} />
										</div>
										<input
											type="text"
											name="instagram"
											id="instagram"
											value={ambObj.instagram}
											onChange={handleChangeAuthUser}
											placeholder="@instagram..."
											className="tw-flex-[0.88] tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
										/>
									</div>
									<div className="tw-w-[100%] tw-flex tw-items-center tw-justify-center">
										<div className="tw-flex-[0.12] tw-text-[#bba371]">
											<SiTiktok size={25} />
										</div>
										<input
											type="text"
											name="tiktok"
											id="tiktok"
											value={ambObj.tiktok}
											onChange={handleChangeAuthUser}
											placeholder="@tiktok..."
											className="tw-flex-[0.88] tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
										/>
									</div>
									<div className="tw-w-[100%] tw-flex tw-items-center tw-justify-center">
										<div className="tw-flex-[0.12] tw-text-[#bba371]">
											<RiSnapchatLine size={25} />
										</div>
										<input
											type="text"
											name="snapchat"
											id="snapchat"
											value={ambObj.snapchat}
											onChange={handleChangeAuthUser}
											placeholder="@snapchat..."
											className="tw-flex-[0.88] tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
										/>
									</div>
								</div>
							</div>

							<div className="tw-text-center tw-text-xs tw-text-red-800 tw-mt-10 tw-mb-2">
								{ambObj.error ? <p>Error message: {ambObj.error}</p> : null}
							</div>
							{exist && (
								<div className="tw-text-center tw-text-xs tw-text-red-800">
									This Ambassador already exists in the database!
								</div>
							)}
							<div className="tw-flex tw-flex-row tw-mb-10 tw-justify-center">
								<Button onClick={handleSubmit} type="submit" isShadow={true}>
									Lock In
								</Button>
							</div>
						</form>
					</article>
					<div
						className={`tw-flex tw-flex-col tw-items-center tw-text-white tw-mb-5 tw-ease-in tw-duration-500 ${
							ambCode ? 'tw-opacity-1 tw-scale-100' : 'tw-opacity-0 tw-scale-50'
						}`}>
						<p className="tw-text-xs">Your personal sales code is</p>
						<p className="yellow tw-bg-white tw-text-neutral-900  tw-px-20 tw-w-fit tw-flex">
							{ambCode}
						</p>
					</div>

					<div>
						<p className="tw-text-neutral-300 tw-font-light tw-text-center  tw-text-xs ">
							Already Locked In?{' '}
							<Link to="/">
								<button className="tw-text-[#bba371] tw-font-thin tw-mb-10">
									go to home page
								</button>
							</Link>{' '}
						</p>
					</div>
				</section>
			</Layout>
		</div>
	)
}

export default Ambassador
