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
	const [authUser, setAuthUser] = useState({
		firstname: '',
		lastname: '',
		email: '',
		phone: '',
		bankName: '',
		accountNo: '',
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
		setAuthUser({ ...authUser, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (
			authUser.firstname &&
			authUser.lastname &&
			authUser.email &&
			authUser.phone &&
			authUser.bankName &&
			authUser.accountNo &&
			(authUser.instagram || authUser.tiktok || authUser.snapchat)
		) {
			const code = `${authUser.firstname.slice(0, 1)}${authUser.lastname.slice(
				0,
				1
			)}${Math.random().toString(18).slice(2)}`

			const index = allAmb?.findIndex(
				(obj) => obj.yourSalesCode === code || obj.email === authUser.email
			)

			if (index < 0) {
				db.collection('ambassador')
					.add({
						firstname: authUser?.firstname,
						lastname: authUser?.lastname,
						email: authUser?.email,
						phone: authUser?.phone,
						bankName: authUser?.bankName,
						accountNo: authUser?.accountNo,
						instagram: authUser?.instagram,
						tiktok: authUser?.tiktok,
						snapchat: authUser?.snapchat,
						yourSalesCode: code,
					})
					.then(() => {
						setAuthUser({
							firstname: '',
							lastname: '',
							email: '',
							phone: '',
							bankName: '',
							accountNo: '',
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
			setAuthUser({ ...authUser, error: 'Required field(s) missing!' })
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
						{/* <h1 className="tw-text-xl tw-font-thin tw-text-neutral-50 tw-mt-5 md:tw-mt-0 ">
							Sign up as modelEst influencer
						</h1> */}
						<div className="tw-w-[55%] tw-mx-auto tw-my-10 tw-text-neutral-50 tw-font-thin">
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
							className="tw-w-[90%] xl:tw-w-[75%] tw-mx-auto"
							onSubmit={handleSubmit}>
							<div className="tw-mt-10 tw-mb-2">
								<Heading
									children="Payment Information"
									size2={true}
									isLight={true}
									isWhite={true}
								/>
							</div>
							<div className="tw-grid md:tw-grid-cols-2 lg:tw-grid-cols-3 tw-gap-2">
								<div className="tw-w-[100%]">
									<input
										type="text"
										name="accountNo"
										id="accountNo"
										value={authUser.accountNo}
										onChange={handleChangeAuthUser}
										placeholder="Account No..."
										className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
									/>
								</div>
								<div className="tw-w-[100%]">
									<input
										type="text"
										name="bankName"
										id="bankName"
										value={authUser.bankName}
										onChange={handleChangeAuthUser}
										placeholder="Bank Name..."
										className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
									/>
								</div>
								<div className="tw-w-[100%]">
									<input
										type="text"
										name="firstname"
										id="firstname"
										value={authUser.firstname}
										onChange={handleChangeAuthUser}
										placeholder="First Name..."
										className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
									/>
								</div>
								<div className="tw-w-[100%]">
									<input
										type="text"
										name="lastname"
										id="lastname"
										value={authUser.lastname}
										onChange={handleChangeAuthUser}
										placeholder="Last Name..."
										className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
									/>
								</div>
								<div className="tw-w-[100%]">
									<input
										type="text"
										name="email"
										id="email"
										value={authUser.email}
										onChange={handleChangeAuthUser}
										placeholder="Email..."
										className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
									/>
								</div>
								<div className="tw-w-[100%]">
									<input
										type="number"
										name="phone"
										id="number"
										value={authUser.phone}
										onChange={handleChangeAuthUser}
										placeholder="Phone No..."
										className="tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
									/>
								</div>
							</div>
							<div className="tw-mt-10 tw-mb-2">
								<Heading
									children="Handles"
									size2={true}
									isLight={true}
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
										value={authUser.instagram}
										onChange={handleChangeAuthUser}
										placeholder="@instagram..."
										className="tw-flex-[0.88] tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
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
										value={authUser.tiktok}
										onChange={handleChangeAuthUser}
										placeholder="@tiktok..."
										className="tw-flex-[0.88] tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
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
										value={authUser.snapchat}
										onChange={handleChangeAuthUser}
										placeholder="@snapchat..."
										className="tw-flex-[0.88] tw-w-full tw-px-3 tw-py-2 tw-border-0 tw-text-sm placeholder:tw-text-neutral-900 placeholder:tw-text-xs placeholder:tw-font-light focus:tw-outline-none focus:tw-border-gray-200 focus:tw-ring-1 focus:tw-ring-gray-200 isabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-red-800 invalid:tw-text-red-800 focus:invalid:tw-border-red-800 focus:invalid:tw-ring-red-800 tw-outline-0"
									/>
								</div>
							</div>

							<div className="tw-text-center tw-text-xs tw-text-red-800">
								{authUser.error ? <p>Error message: {authUser.error}</p> : null}
							</div>
							{exist && (
								<div className="tw-text-center tw-text-xs tw-text-red-800">
									This Ambassador already exists in the database!
								</div>
							)}
							<div className="tw-flex tw-flex-row tw-my-10 tw-justify-center">
								<Button onClick={handleSubmit} type="submit" isShadow={true}>
									Lock In
								</Button>
							</div>
						</form>
					</article>
					<div
						className={`tw-flex tw-flex-col tw-items-center tw-text-white tw-mb-5 tw-ease-in tw-duration-500 ${
							ambCode ? 'tw-opacity-1' : 'tw-opacity-0'
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
