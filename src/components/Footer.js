import React from 'react'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaTiktok } from 'react-icons/fa'
import { SiMastercard } from 'react-icons/si'
import { SiTreyarch } from 'react-icons/si'
import { RiVisaLine } from 'react-icons/ri'
import { SiAmericanexpress } from 'react-icons/si'
import { countries } from '../country'
import { Link } from 'react-router-dom'
import Heading from './Heading'

function Footer({
	showContactForm,
	setShowContactForm,
	showTerms,
	setShowTerms,
	showShippingReturns,
	setShowShippingReturns,
	showPrivacyReturns,
	setPrivacyReturns,
}) {
	const paymentType = [
		{ id: 1, type: <SiMastercard size={20} color="darkorange" /> },
		{ id: 2, type: <RiVisaLine size={20} color="blue" /> },
		{ id: 3, type: <SiAmericanexpress size={20} color="blue" /> },
	]
	const [country, setCountry] = React.useState('United States')
	const handleOnChange = (e) => {
		setCountry(e.target.value)
		localStorage.setItem('country', e.target.value)
	}
	const [contactInput, setcontactInput] = React.useState({
		name: '',
		email: '',
		subject: '',
		message: '',
		error: null,
	})

	const links = [
		{
			id: 1,
			name: 'Contact Us',
		},
		{
			id: 2,
			name: 'Terms and Conditions',
		},
		{
			id: 3,
			name: 'Shipping & Returns Policy',
		},
		{
			id: 4,
			name: 'Privacy Policy',
		},
	]

	const indian = [
		{
			id: '1',
			name: 'Bundles (Indian)',
			route: '/indian-bundles',
		},
		{
			id: '2',
			name: 'Closure / Frontal (Indian)',
			route: '/indian-closure-frontal',
		},
		{
			id: '3',
			name: 'Jet Black / Blonde (Indian)',
			route: '/indian-jet-black-&-blonde',
		},
	]
	const vietnamese = [
		{
			id: '1',
			name: 'Bundles (Vietnamese)',
			// route: '/vietnamese-bundles',
		},
		{
			id: '2',
			name: 'Closure / Frontal (Vietnamese)',
			// route: '/vietnamese-closure-frontal',
		},
		{
			id: '3',
			name: 'Jet Black / Blonde (Vietnamese)',
			// route: '/vietnamese-jet-black-&-blonde',
		},
	]
	const Virgin = [
		{
			id: '1',
			name: 'Bundles (Virgin)',
			// route: '/virgin-bundles',
		},
		{
			id: '2',
			name: 'Closure / Frontal (Virgin)',
			// route: '/virgin-closure-frontal',
		},
		{
			id: '3',
			name: 'Jet Black / Blonde (Virgin)',
			// route: '/virgin-jet-black-&-blonde-hair',
		},
	]

	const handleContactInput = (e) => {
		setcontactInput({ ...contactInput, [e.target.name]: e.target.value })
	}

	function handleSubmit(e) {
		e.preventDefault()
		try {
			window.open(
				`mailto:'modelEst1010@gmail.com'?subject=${contactInput.subject}&body=${contactInput.name}: ${contactInput.message}. My email is ${contactInput.email}`
			)
			setcontactInput({
				name: '',
				email: '',
				subject: '',
				message: '',
				error: null,
			})
		} catch (error) {
			console.log(error)
			setcontactInput({ ...contactInput, error: error.message })
		}
		setShowContactForm(false)
	}

	return (
		<footer className="tw-flex tw-bg-white tw-flex-col tw-py-5 tw-justify-center tw-items-center tw-border-t-[1px] tw-border-neutral-300">
			<span className="tw-text-center tw-mb-5 tw-text-sm tw-font-light">
				Quick Links
			</span>
			<div className="xl:tw-w-[60%] tw-w-full md:tw-w-[90%] tw-px-5 md:tw-px-10 tw-flex tw-flex-col md:tw-flex-row md:tw-justify-between tw-border-b tw-mb-5">
				<div className="tw-w-full tw-grid tw-grid-cols-2 tw-gap-2 md:tw-mr-10 tw-text-neutral-600 md:tw-border-r-[1px] md:tw-pr-20 tw-mb-10">
					<div className="tw-mb-5">
						<h1 className="tw-text-xs tw-font-bold  tw-mb-2">Indian Hair</h1>
						<ul className="tw-flex tw-flex-col tw-justify-center tw-text-xs tw-font-light tw-mb-1">
							{indian.map((ind) => (
								<Link
									key={ind.id}
									to={ind.route}
									className="hover:tw-cursor-pointer hover:tw-underline tw-mb-1 ">
									{ind.name}
								</Link>
							))}
						</ul>
					</div>
					<div className="tw-mb-5">
						<h1 className="tw-text-xs tw-font-bold  tw-mb-2">
							Vietnamese Hair
						</h1>
						<ul className="tw-flex tw-flex-col tw-justify-center tw-text-xs tw-font-light tw-mb-1">
							{vietnamese.map((veit) => (
								<Link
									key={veit.id}
									to="/"
									// onClick={() => navigate(`/${veit.route}`)}
									className="hover:tw-cursor-pointer hover:tw-underline tw-mb-1 ">
									{veit.name}{' '}
									<span className="tw-text-[10px] tw-font-bold">
										- coming soon...
									</span>
								</Link>
							))}
						</ul>
					</div>
					<div className="tw-mb-5">
						<h1 className="tw-text-xs tw-font-bold  tw-mb-2">Virgin Hair</h1>
						<ul className="tw-flex tw-flex-col tw-justify-center tw-text-xs tw-font-light tw-mb-1">
							{Virgin.map((virg) => (
								<Link
									key={virg.id}
									to="/"
									// onClick={() => navigate(`/${virg.route}`)}
									className="hover:tw-cursor-pointer hover:tw-underline tw-mb-1 ">
									{virg.name}{' '}
									<span className="tw-text-[10px] tw-font-bold">
										- coming soon...
									</span>
								</Link>
							))}
						</ul>
					</div>
				</div>
				<div className=" tw-text-neutral-600">
					<h1 className="tw-text-xs tw-font-bold  tw-mb-2">Customer Service</h1>
					<ul className="tw-flex tw-flex-col tw-justify-center tw-text-xs tw-font-light tw-mb-1">
						{links.map((link) => (
							<li
								key={link.id}
								onClick={
									link.name === 'Contact Us'
										? () => {
												setShowContactForm(!showContactForm)
												setShowTerms(false)
												setShowShippingReturns(false)
												setPrivacyReturns(false)
										  }
										: link.name === 'Terms and Conditions'
										? () => {
												setShowTerms(!showTerms)
												setShowContactForm(false)
												setShowShippingReturns(false)
												setPrivacyReturns(false)
										  }
										: link.name === 'Shipping & Returns Policy'
										? () => {
												setShowShippingReturns(!showShippingReturns)
												setShowTerms(false)
												setShowContactForm(false)
										  }
										: link.name === 'Privacy Policy'
										? () => {
												setPrivacyReturns(!showPrivacyReturns)
												setShowTerms(false)
												setShowContactForm(false)
												setShowShippingReturns(false)
										  }
										: null
								}
								className="hover:tw-cursor-pointer hover:tw-underline tw-mb-1 ">
								{link.name}
							</li>
						))}
					</ul>
					<div className="tw-border-neutral-100 tw-w-full tw-flex tw-flex-col tw-mt-5 tw-mb-5 tw-pb-5 tw-pt-5 md:tw-items-center">
						<span className="tw-text-xs tw-font-light tw-tracking-widest tw-text-black tw-mb-1">
							Country/region
						</span>
						<select
							className="tw-w-[220px] tw-mb-5 tw-text-neutral-500 tw-font-light tw-bg-white tw-block tw-px-3 tw-py-2 tw-border-neutral-500 tw-rounded-[2px] tw-text-xs tw-border-[1px] tw-placeholder-gray-200 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0"
							onChange={handleOnChange}
							id="country"
							value={country}
							name="country">
							{countries.map((item, idx) => (
								<option key={idx}>
									{item.countryName} - {item.currencyCode}
								</option>
							))}
						</select>
					</div>
				</div>
			</div>
			{showShippingReturns && (
				<div
					id="shipping"
					className="tw-w-[80%] tw-text-sm tw-font-light tw-mb-10">
					<div className="tw-text-center tw-mb-4 tw-mt-5 tw-font-light tw-text-lg tw-uppercase tw-border-b">
						<Heading children="Shipping & Return Policy" isBold={true} />
					</div>
					<div className="tw-mb-2">
						<p className="tw-font-bold tw-uppercase">Shipping Policy</p>
					</div>
					<p>
						Once your modelEst order has been processed, it’s mode of shipping
						is standard delivery. Shipping address must be imputed correctly.
						All orders will require a signature upon delivery. Please allow at
						least 5 days for order processing, order processing may take longer
						than 5 days depending on order volume. Please allow another 2 weeks
						- not subject to weekends, for orders to be shipped. Once order has
						been shipped, a tracking number will be sent via email once order
						has been dispatched. Failure to sign for the delivery may result in
						the package being returned to your local post office
					</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">Order Processing</p>
					</div>
					<p>
						Incorrect billing information and/or shipping to an address other
						than the billing address may cause shipping delays, as information
						must be verified. ModelEst has the right to decline an order and
						issue a refund at our sole option. Confirmation of billing may be
						required and customer can/will be contacted via phone and email to
						complete.
					</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">Tracking information</p>
					</div>
					<p>
						You will receive an email with a tracking number once your items
						have been shipped. If you do not receive a tracking number within 14
						business days of placing your order, email ModelEst at
						<strong> modelEst1010@gmail.com</strong>. Please, have your order
						number included in the email. We do not ship on weekends, holidays,
						and in the occurrence of a natural disaster.
					</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">
							Cancellation and modification policy
						</p>
					</div>
					<p>
						Orders can be changed or modified but never cancelled for “full
						refund”. We DO NOT OFFER REFUNDS, due to the nature of the product.
						Once the order has been placed, we will only make modifications to
						the order. Please, refer to Return and Exchange Policy below.
					</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">
							Return and exchange policy
						</p>
					</div>
					<p>
						Due to the nature of the product, your order must meet Federal
						Health Regulations before requesting a return or exchange. All
						returns are processed within 14 business days upon arrival to our
						offices.
					</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">Return</p>
					</div>
					<p>
						All hair has undergone a quality assurance process to ensure it is
						free of imperfections. If you receive an item that is damaged,
						defective, or materially different, please email customer service at
						<strong> modelEst1010@gmail.com</strong> within 3 business days of
						the receipt date. If the hair received does not meet our brand
						standards, we will gladly exchange it and begin the exchange process
						per our cost. Our fulfillment department must inspect all incoming
						shipments to ensure all product is in its original condition. No
						in-store credit will be given if product has been unraveled,
						co-washed, or manipulated in any manner from its original state.
					</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">Exchanges</p>
					</div>
					<div>
						<ul className="">
							<li>
								1. Requests must be made within 3 business days of receipt of
								product(s).
							</li>
							<br />
							<li>
								2. Any exchange requested after 3 business days of receiving the
								product will not be honored.
							</li>
							<br />
							<li>
								3. We will not accept any merchandise, which has been used or
								altered (unraveled, washed, brushed, combed or cut) in any way.
							</li>
							<br />
							<li>
								4. According to the Federal law you cannot return human hair
								products that have been used due to hygienic reasons. Please
								return the item in the original and resalable condition as a
								necessary health precaution.
							</li>
							<br />
							<li>
								5. Product must be exchanged for something of equal or greater
								value.
							</li>
							<br />
							<li>
								6. In order to process an exchange, the product would need to be
								sent back at your expense. When requesting an exchange, a
								modelEst representative will send a return label to you via your
								email address. This label should be printed and placed onto your
								package to ensure your package is insured during its route back
								to our offices. Once your product has been received it will be
								examined thoroughly. If the product has been returned unused in
								its original condition, we will exchange the product for
								something of equal or greater value per your selection.
							</li>
							<br />
							<li>
								7. Exchanges are limited to two exchanges per order. No refunds
								will be permitted, unless it is determined that ModelEst hair is
								the party at fault due to a fulfillment error, then we shall
								exchange the product at no additional cost to the customer.
							</li>
							<br />
							<li>
								8. Customer is responsible for the reshipment cost as that is a
								separate service that has already been used.
							</li>
							<br />
							<li>
								9. For any exchange that permits a difference (less than
								original) customer will hold a in-store credit for the remaining
								balance owed as we do not refund ANY costs.
							</li>
						</ul>
					</div>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">
							Return and Exchange procedure
						</p>
					</div>
					<p>
						When you receive your item(s), open the box and visually examine the
						product to verify if you have received the desired texture and
						lengths you ordered. You can gently take the hair out of the
						plastic. At this time, you can determine if the products you have
						received are damaged, defective, or materially different from what
						you ordered. Please, contact us immediately via email at
						<strong> modelEst1010@gmail.com</strong> with any discrepancy or
						questions.
					</p>
				</div>
			)}
			{showPrivacyReturns && (
				<div
					id="privacy"
					className="tw-w-[80%] tw-text-sm tw-font-light tw-mb-10">
					<div className="tw-text-center tw-mb-4 tw-mt-5 tw-font-light tw-text-lg tw-uppercase tw-border-b">
						<Heading children="Privacy Policy" isBold={true} />
					</div>
					<div className="tw-mb-2">
						<p className="tw-font-bold tw-uppercase">
							Privacy Policy for ModelEst Hair
						</p>
					</div>
					<p>
						This policy describes the ways we collect, store, use and protect
						your personal information. You accept this Privacy Policy when you
						sign up for or use our products, services or any other features,
						technologies or functionalities offered by us on our website,
						application or through any other means collectively the "ModelEst
						hair. ". We may amend this policy at any time by posting a revised
						version on our website. The revised version will be effective at the
						time we post it to Her Hair Company.
					</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">
							What Information Do We Collect?
						</p>
					</div>
					<p>
						We collect information from you when you register on our site, place
						an order, subscribe to our newsletter or fill out a form.
					</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">Orders</p>
					</div>
					<p>
						If you purchase a product from us, we request certain personally
						identifiable information from you on our order form. You must
						provide contact information (such as name, email, and shipping
						address, phone #) and financial information (such as credit card
						number, expiration date, billing address). We use this information
						for billing purposes and to fill your orders. If we have trouble
						processing an order, we will use this information to contact you.
					</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">
							How We Use the Personal Information We Collect
						</p>
					</div>
					<p>
						Our primary purpose in collecting personal information is to provide
						you with a secure, smooth, efficient, and customized experience. We
						use the Order Information that we collect generally to fulfill any
						orders placed through the Site (including processing your payment
						information, arranging for shipping, and providing you with invoices
						and/or order confirmations). Additionally, we use this Order
						Information to:
						<br />
						<br />
						* Communicate with you;
						<br />
						<br />
						* Process transactions and send notices about your transactions;
						<br />
						<br />
						* Resolve disputes, collect fees, and troubleshoot problems;
						<br />
						<br /> * Prevent potentially prohibited or illegal activities, and
						enforce our User Agreement;
						<br />
						<br /> * Screen our orders for potential risk or fraud; and
					</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">Customer Service</p>
					</div>
					<p>
						When you place an order on our site, an email containing your
						receipt will be sent immediately after checkout to confirm your
						purchase.
					</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">Reviews/Testimonials</p>
					</div>
					<p>
						If you use “Write a Review” to post a review on this Web site, you
						should be aware that any personally identifiable information you
						submit there can be read, collected, or used by other users of these
						forums. We post testimonials and comments received from our
						customers via email. We are not responsible for the personally
						identifiable information you choose to submit in these forums.
					</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">
							Information Sharing and Disclosure
						</p>
					</div>
					<p>
						We will share your personal information with third parties only in
						the ways that are described in this privacy statement. We do not
						sell, rent, trade, or otherwise share your personal information with
						third parties except as described in this privacy statement.
						<br />
						<br />
						We may also share your Personal Information to comply with
						applicable laws and regulations, to respond to a subpoena, search
						warrant or other lawful request for information we receive, or to
						otherwise protect our rights.
					</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">Do Not Track</p>
					</div>
					<p>
						Please note that we do not alter our Site’s data collection and use
						practices when we see a Do Not Track signal from your browser.
						<br />
						<br />
						If you are a European resident, you have the right to access
						personal information we hold about you and to ask that your personal
						information be corrected, updated, or deleted. If you would like to
						exercise this right, please contact us through the contact
						information below.
						<br />
						<br />
						Additionally, if you are a European resident we note that we are
						processing your information in order to fulfill contracts we might
						have with you (for example if you make an order through the Site),
						or otherwise to pursue our legitimate business interests listed
						above. Additionally, please note that your information will be
						transferred outside of Europe, including to Canada and the United
						States.
					</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">Minors</p>
					</div>
					<p>The Site is not intended for individuals under the age of 18.</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">Data Retention</p>
					</div>
					<p>
						When you place an order through the Site, we will maintain your
						Order Information for our records unless and until you ask us to
						delete this information.
					</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">Legal Disclaimer</p>
					</div>
					<p>
						We reserve the right to disclose your personally identifiable
						information as required by law and when we believe that disclosure
						is necessary to protect our rights and/or comply with a judicial
						proceeding, court order, or legal process served on our Web site.
					</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">
							How We Protect and Store Personal Information
						</p>
					</div>
					<p>
						Throughout this policy, we use the term "personal information" to
						describe information that can be associated with a specific person
						and can be used to identify that person. We do not consider personal
						information to include information that has been anonymized so that
						it does not identify a specific user.
						<br />
						<br />
						We store and process your personal information on our computers in
						the US and elsewhere in the world where Her Hair Company Inc.
						facilities or our service providers are located, and we protect it
						by maintaining physical, electronic and procedural safeguards in
						compliance with applicable US federal and state regulations.
					</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">Photo Share Disclaimer</p>
					</div>
					<p>
						Upon sending ModelEst Hair, photos of you, our product, or tools
						used, they become property of ModelEst. Photos are used for but not
						limited to promotions, marketing, social media, newsletters, and our
						site. Owners’ rights to the photo are given to ModelEst Hair,
						without the anticipation for royalties and/or lawsuits. NO photo
						will be used for any reason to publicly harass or embarrass any
						customer. All photos must be of high quality with no existing
						watermarks. ModelEst Hair, will add a watermark to your photo to
						prevent any other site, organization, company, or viewer to
						illegally copy the image. We use the hashtag #ModelEstHair on social
						media to specify the photos posted from our company. Thank you for
						participating and supporting our company as well as providing our
						viewers with an image to better help them see the products.
					</p>
					<div className="tw-mb-2 tw-mt-5">
						<p className="tw-font-bold tw-uppercase">Contact Us</p>
					</div>
					<p>
						For more information about our privacy practices, if you have
						questions, or if you would like to make a complaint, please contact
						us by e-mail at <strong> modelEst1010@gmail.com</strong> or by mail
						using the details provided below:
					</p>
				</div>
			)}

			{showContactForm && (
				<form
					onSubmit={handleSubmit}
					className="tw-w-full tw-flex tw-flex-col tw-items-center md:tw-max-w-[80%] tw-bg-neutral-50 tw-py-5 tw-mb-5">
					<span
						id="contact"
						className="tw-text-2xl tw-font-light tw-mb-1 tw-mt-5">
						Contact - ModelEst
					</span>
					<p className="tw-font-light tw-text-[14px] tw-max-w-[80%] lg:tw-max-w-[50%] tw-my-5">
						We at modelEst are customer centric, we take pride in our customers.
						We are committed in helping with picking the right hair for you,
						adequate information regarding education on hair maintenance, and
						providing high quality hair extensions. We value you our customers
						and we are committed to long time support. Our customers are our
						sister’s. We respond within 24-48 business hours Monday - Friday.
					</p>
					<div className="md:tw-w-[90%] lg:tw-w-[70%] 2xl:tw-w-[50%] tw-mx-auto tw-flex tw-flex-col tw-items-center">
						<input
							type="text"
							name="name"
							id="name"
							value={contactInput.name}
							onChange={handleContactInput}
							placeholder="Full Name"
							className="tw-w-[100%] tw-mb-5 tw-text-neutral-500 tw-font-light tw-bg-white tw-block tw-px-3 tw-py-2 tw-border-gray-200 tw-rounded-[2px] tw-text-xs tw-border-[1px] tw-placeholder-neutral-400 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0"
						/>
						<input
							type="text"
							name="email"
							id="email"
							value={contactInput.email}
							onChange={handleContactInput}
							placeholder="Email"
							className="tw-w-[100%] tw-mb-5 tw-text-neutral-500 tw-font-light tw-bg-white tw-block tw-px-3 tw-py-2 tw-border-gray-200 tw-rounded-[2px] tw-text-xs tw-border-[1px] tw-placeholder-neutral-400 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0"
						/>
						<input
							type="text"
							name="subject"
							id="subject"
							value={contactInput.subject}
							onChange={handleContactInput}
							placeholder="subject / order - number"
							className="tw-w-[100%] tw-mb-5 tw-text-neutral-500 tw-font-light tw-bg-white tw-block tw-px-3 tw-py-2 tw-border-gray-200 tw-rounded-[2px] tw-text-xs tw-border-[1px] tw-placeholder-neutral-400 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0"
						/>
						<textarea
							id="message"
							rows="4"
							cols="50"
							name="message"
							value={contactInput.message}
							onChange={handleContactInput}
							placeholder="message..."
							className="tw-w-[100%] tw-mb-5 tw-text-neutral-500 tw-font-light tw-bg-white tw-block tw-px-3 tw-py-2 tw-border-gray-200 tw-rounded-[2px] tw-text-xs tw-border-[1px] tw-placeholder-neutral-400 focus:tw-outline-none focus:tw-border-sky-500 focus:tw-ring-1 focus:tw-ring-sky-500 disabled:tw-bg-gray-50 disabled:tw-text-gray-500 disabled:tw-border-gray-200 disabled:tw-shadow-none invalid:tw-border-pink-500 invalid:tw-text-pink-600 focus:invalid:tw-border-pink-500 focus:invalid:tw-ring-pink-500 tw-outline-0"
						/>
						<div className="tw-text-center tw-text-xs tw-text-red-800">
							{contactInput.error ? (
								<p>Error message: {contactInput.error}</p>
							) : null}
						</div>
						<button
							className="tw-bg-neutral-600 tw-w-[70%] tw-text-white tw-py-2 tw-text-sm tw-font-light tw-tracking-wide"
							type="submit">
							submit
						</button>
					</div>
				</form>
			)}
			{showTerms && (
				<div
					id="terms"
					className="tw-w-[80%] tw-text-sm tw-font-light tw-mb-10">
					<div className="tw-text-center tw-mb-4 tw-mt-5 tw-font-light tw-text-lg tw-uppercase tw-border-b">
						<Heading children="Terms and Services" isBold={true} />
					</div>
					<p>
						This website is operated by modelEst hair. Throughout the site, the
						terms “we”, “us” and “our” refer to modelEst hair. Only Raw Beauty
						offers this website, including all information, tools and services
						available from this site to you, the user, conditioned upon your
						acceptance of all terms, conditions, policies and notices stated
						here.
						<br />
						<br />
						By visiting our site and/ or purchasing something from us, you
						engage in our “Service” and agree to be bound by the following terms
						and conditions (“Terms of Service”, “Terms”), including those
						additional terms and conditions and policies referenced herein
						and/or available by hyperlink. These Terms of Service apply to all
						users of the site, including without limitation users who are
						browsers, vendors, customers, merchants, and/ or contributors of
						content.
						<br />
						<br />
						Please read these Terms of Service carefully before accessing or
						using our website. By accessing or using any part of the site, you
						agree to be bound by these Terms of Service. If you do not agree to
						all the terms and conditions of this agreement, then you may not
						access the website or use any services. If these Terms of Service
						are considered an offer, acceptance is expressly limited to these
						Terms of Service.
						<br />
						<br />
						Any new features or tools which are added to the current store shall
						also be subject to the Terms of Service. You can review the most
						current version of the Terms of Service at any time on this page. We
						reserve the right to update, change or replace any part of these
						Terms of Service by posting updates and/or changes to our website.
						It is your responsibility to check this page periodically for
						changes. Your continued use of or access to the website following
						the posting of any changes constitutes acceptance of those changes.
						<br />
						<br />
						<br />
						<p className="tw-font-normal">SECTION 1 - ONLINE STORE TERMS</p>
						<br />
						By agreeing to these Terms of Service, you represent that you are at
						least the age of majority in your state or province of residence, or
						that you are the age of majority in your state or province of
						residence and you have given us your consent to allow any of your
						minor dependents to use this site.
						<br />
						<br />
						You may not use our products for any illegal or unauthorized purpose
						nor may you, in the use of the Service, violate any laws in your
						jurisdiction (including but not limited to copyright laws).
						<br />
						<br />
						You must not transmit any worms or viruses or any code of a
						destructive nature.
						<br />
						<br />A breach or violation of any of the Terms will result in an
						immediate termination of your Services.
						<br />
						<br />
						<br />
						<p className="tw-font-normal">SECTION 2 - GENERAL CONDITIONS</p>
						<br />
						We reserve the right to refuse service to anyone for any reason at
						any time.
						<br />
						<br />
						You understand that your content (not including credit card
						information), may be transferred unencrypted and involve (a)
						transmissions over various networks; and (b) changes to conform and
						adapt to technical requirements of connecting networks or devices.
						Credit card information is always encrypted during transfer over
						networks.
						<br />
						<br />
						You agree not to reproduce, duplicate, copy, sell, resell or exploit
						any portion of the Service, use of the Service, or access to the
						Service or any contact on the website through which the service is
						provided, without express written permission by us.
						<br />
						<br />
						The headings used in this agreement are included for convenience
						only and will not limit or otherwise affect these Terms.
						<br />
						<br />
						<br />
						<p className="tw-font-normal">
							SECTION 3 - ACCURACY, COMPLETENESS AND TIMELINESS OF INFORMATION
						</p>
						<br />
						We are not responsible if information made available on this site is
						not accurate, complete or current. The material on this site is
						provided for general information only and should not be relied upon
						or used as the sole basis for making decisions without consulting
						primary, more accurate, more complete or more timely sources of
						information. Any reliance on the material on this site is at your
						own risk.
						<br />
						<br />
						This site may contain certain historical information. Historical
						information, necessarily, is not current and is provided for your
						reference only. We reserve the right to modify the contents of this
						site at any time, but we have no obligation to update any
						information on our site. You agree that it is your responsibility to
						monitor changes to our site.
						<br />
						<br />
						<br />
						<p className="tw-font-normal">
							SECTION 4 - MODIFICATIONS TO THE SERVICE AND PRICES
						</p>
						<br />
						Prices for our products are subject to change without notice.
						<br />
						<br />
						We reserve the right at any time to modify or discontinue the
						Service (or any part or content thereof) without notice at any time.
						<br />
						<br />
						We shall not be liable to you or to any third-party for any
						modification, price change, suspension or discontinuance of the
						Service.
						<br />
						<br />
						<br />
						<p className="tw-font-normal">
							SECTION 5 - PRODUCTS OR SERVICES (if applicable)
						</p>
						<br />
						Certain products or services may be available exclusively online
						through the website. These products or services may have limited
						quantities and are subject to return or exchange only according to
						our Return Policy.
						<br />
						<br />
						We have made every effort to display as accurately as possible the
						colors and images of our products that appear at the store. We
						cannot guarantee that your computer monitor's display of any color
						will be accurate.
						<br />
						<br />
						We reserve the right, but are not obligated, to limit the sales of
						our products or Services to any person, geographic region or
						jurisdiction. We may exercise this right on a case-by-case basis. We
						reserve the right to limit the quantities of any products or
						services that we offer. All descriptions of products or product
						pricing are subject to change at anytime without notice, at the sole
						discretion of us. We reserve the right to discontinue any product at
						any time. Any offer for any product or service made on this site is
						void where prohibited.
						<br />
						<br />
						We do not warrant that the quality of any products, services,
						information, or other material purchased or obtained by you will
						meet your expectations, or that any errors in the Service will be
						corrected.
						<br />
						<br />
						<br />
						<p className="tw-font-normal">
							SECTION 6 - ACCURACY OF BILLING AND ACCOUNT INFORMATION
						</p>
						<br />
						We reserve the right to refuse any order you place with us. We may,
						in our sole discretion, limit or cancel quantities purchased per
						person, per household or per order. These restrictions may include
						orders placed by or under the same customer account, the same credit
						card, and/or orders that use the same billing and/or shipping
						address. In the event that we make a change to or cancel an order,
						we may attempt to notify you by contacting the e-mail and/or billing
						address/phone number provided at the time the order was made. We
						reserve the right to limit or prohibit orders that, in our sole
						judgment, appear to be placed by dealers, resellers or distributors.
						<br />
						<br />
						You agree to provide current, complete and accurate purchase and
						account information for all purchases made at our store. You agree
						to promptly update your account and other information, including
						your email address and credit card numbers and expiration dates, so
						that we can complete your transactions and contact you as needed.
						<br />
						<br />
						For more detail, please review our Returns Policy.
						<br />
						<br />
						<br />
						{/* <p className="tw-font-normal">SECTION 7 - OPTIONAL TOOLS</p>
						<br />
						We may provide you with access to third-party tools over which we
						neither monitor nor have any control nor input.
						<br />
						<br />
						You acknowledge and agree that we provide access to such tools ”as
						is” and “as available” without any warranties, representations or
						conditions of any kind and without any endorsement. We shall have no
						liability whatsoever arising from or relating to your use of
						optional third-party tools.
						<br />
						<br />
						Any use by you of optional tools offered through the site is
						entirely at your own risk and discretion and you should ensure that
						you are familiar with and approve of the terms on which tools are
						provided by the relevant third-party provider(s).
						<br />
						<br />
						We may also, in the future, offer new services and/or features
						through the website (including, the release of new tools and
						resources). Such new features and/or services shall also be subject
						to these Terms of Service.
						<br />
						<br />
						<br /> */}
						{/* <p className="tw-font-normal">SECTION 8 - THIRD-PARTY LINKS</p>
						<br />
						Certain content, products and services available via our Service may
						include materials from third-parties.
						<br />
						<br />
						Third-party links on this site may direct you to third-party
						websites that are not affiliated with us. We are not responsible for
						examining or evaluating the content or accuracy and we do not
						warrant and will not have any liability or responsibility for any
						third-party materials or websites, or for any other materials,
						products, or services of third-parties.
						<br />
						<br />
						We are not liable for any harm or damages related to the purchase or
						use of goods, services, resources, content, or any other
						transactions made in connection with any third-party websites.
						Please review carefully the third-party's policies and practices and
						make sure you understand them before you engage in any transaction.
						Complaints, claims, concerns, or questions regarding third-party
						products should be directed to the third-party.
						<br />
						<br />
						<br /> */}
						<p className="tw-font-normal">
							SECTION 7 - USER COMMENTS, FEEDBACK AND OTHER SUBMISSIONS
						</p>
						<br />
						If, at our request, you send certain specific submissions (for
						example contest entries) or without a request from us you send
						creative ideas, suggestions, proposals, plans, or other materials,
						whether online, by email, by postal mail, or otherwise
						(collectively, 'comments'), you agree that we may, at any time,
						without restriction, edit, copy, publish, distribute, translate and
						otherwise use in any medium any comments that you forward to us. We
						are and shall be under no obligation (1) to maintain any comments in
						confidence; (2) to pay compensation for any comments; or (3) to
						respond to any comments.
						<br />
						<br />
						We may, but have no obligation to, monitor, edit or remove content
						that we determine in our sole discretion are unlawful, offensive,
						threatening, libelous, defamatory, pornographic, obscene or
						otherwise objectionable or violates any party’s intellectual
						property or these Terms of Service.
						<br />
						<br />
						You agree that your comments will not violate any right of any
						third-party, including copyright, trademark, privacy, personality or
						other personal or proprietary right. You further agree that your
						comments will not contain libelous or otherwise unlawful, abusive or
						obscene material, or contain any computer virus or other malware
						that could in any way affect the operation of the Service or any
						related website. You may not use a false e-mail address, pretend to
						be someone other than yourself, or otherwise mislead us or
						third-parties as to the origin of any comments. You are solely
						responsible for any comments you make and their accuracy. We take no
						responsibility and assume no liability for any comments posted by
						you or any third-party.
						<br />
						<br />
						<br />
						<p className="tw-font-normal">SECTION 8 - PERSONAL INFORMATION</p>
						<br />
						Your submission of personal information through the store is
						governed by our Privacy Policy. To view our Privacy Policy.
						<br />
						<br />
						<br />
						<p className="tw-font-normal">
							SECTION 9 - ERRORS, INACCURACIES AND OMISSIONS
						</p>
						<br />
						Occasionally there may be information on our site or in the Service
						that contains typographical errors, inaccuracies or omissions that
						may relate to product descriptions, pricing, promotions, offers,
						product shipping charges, transit times and availability. We reserve
						the right to correct any errors, inaccuracies or omissions, and to
						change or update information or cancel orders if any information in
						the Service or on any related website is inaccurate at any time
						without prior notice (including after you have submitted your
						order).
						<br />
						<br />
						We undertake no obligation to update, amend or clarify information
						in the Service or on any related website, including without
						limitation, pricing information, except as required by law. No
						specified update or refresh date applied in the Service or on any
						related website, should be taken to indicate that all information in
						the Service or on any related website has been modified or updated.
						<br />
						<br />
						<br />
						<p className="tw-font-normal">SECTION 10 - PROHIBITED USES</p>
						<br />
						In addition to other prohibitions as set forth in the Terms of
						Service, you are prohibited from using the site or its content: (a)
						for any unlawful purpose; (b) to solicit others to perform or
						participate in any unlawful acts; (c) to violate any international,
						federal, provincial or state regulations, rules, laws, or local
						ordinances; (d) to infringe upon or violate our intellectual
						property rights or the intellectual property rights of others; (e)
						to harass, abuse, insult, harm, defame, slander, disparage,
						intimidate, or discriminate based on gender, sexual orientation,
						religion, ethnicity, race, age, national origin, or disability; (f)
						to submit false or misleading information; (g) to upload or transmit
						viruses or any other type of malicious code that will or may be used
						in any way that will affect the functionality or operation of the
						Service or of any related website, other websites, or the Internet;
						(h) to collect or track the personal information of others; (i) to
						spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any
						obscene or immoral purpose; or (k) to interfere with or circumvent
						the security features of the Service or any related website, other
						websites, or the Internet. We reserve the right to terminate your
						use of the Service or any related website for violating any of the
						prohibited uses.
						<br />
						<br />
						<br />
						<p className="tw-font-normal">
							SECTION 11 - DISCLAIMER OF WARRANTIES; LIMITATION OF LIABILITY
						</p>
						<br />
						We do not guarantee, represent or warrant that your use of our
						service will be uninterrupted, timely, secure or error-free.
						<br />
						<br />
						We do not warrant that the results that may be obtained from the use
						of the service will be accurate or reliable.
						<br />
						<br />
						You agree that from time to time we may remove the service for
						indefinite periods of time or cancel the service at any time,
						without notice to you.
						<br />
						<br />
						You expressly agree that your use of, or inability to use, the
						service is at your sole risk. The service and all products and
						services delivered to you through the service are (except as
						expressly stated by us) provided 'as is' and 'as available' for your
						use, without any representation, warranties or conditions of any
						kind, either express or implied, including all implied warranties or
						conditions of merchantability, merchantable quality, fitness for a
						particular purpose, durability, title, and non-infringement.
						<br />
						<br />
						In no case shall modelEst hair, our directors, officers, employees,
						affiliates, agents, contractors, interns, suppliers, service
						providers or licensors be liable for any injury, loss, claim, or any
						direct, indirect, incidental, punitive, special, or consequential
						damages of any kind, including, without limitation lost profits,
						lost revenue, lost savings, loss of data, replacement costs, or any
						similar damages, whether based in contract, tort (including
						negligence), strict liability or otherwise, arising from your use of
						any of the service or any products procured using the service, or
						for any other claim related in any way to your use of the service or
						any product, including, but not limited to, any errors or omissions
						in any content, or any loss or damage of any kind incurred as a
						result of the use of the service or any content (or product) posted,
						transmitted, or otherwise made available via the service, even if
						advised of their possibility. Because some states or jurisdictions
						do not allow the exclusion or the limitation of liability for
						consequential or incidental damages, in such states or
						jurisdictions, our liability shall be limited to the maximum extent
						permitted by law.
						<br />
						<br />
						<br />
						<p className="tw-font-normal">SECTION 12 - INDEMNIFICATION</p>
						<br />
						You agree to indemnify, defend and hold harmless modelEst hair and
						our parent, subsidiaries, affiliates, partners, officers, directors,
						agents, contractors, licensors, service providers, subcontractors,
						suppliers, interns and employees, harmless from any claim or demand,
						including reasonable attorneys’ fees, made by any third-party due to
						or arising out of your breach of these Terms of Service or the
						documents they incorporate by reference, or your violation of any
						law or the rights of a third-party.
						<br />
						<br />
						<br />
						<p className="tw-font-normal">SECTION 13 - SEVERABILITY</p>
						<br />
						In the event that any provision of these Terms of Service is
						determined to be unlawful, void or unenforceable, such provision
						shall nonetheless be enforceable to the fullest extent permitted by
						applicable law, and the unenforceable portion shall be deemed to be
						severed from these Terms of Service, such determination shall not
						affect the validity and enforceability of any other remaining
						provisions.
						<br />
						<br />
						<br />
						<p className="tw-font-normal">SECTION 14 - TERMINATION</p>
						<br />
						The obligations and liabilities of the parties incurred prior to the
						termination date shall survive the termination of this agreement for
						all purposes.
						<br />
						<br />
						These Terms of Service are effective unless and until terminated by
						either you or us. You may terminate these Terms of Service at any
						time by notifying us that you no longer wish to use our Services, or
						when you cease using our site.
						<br />
						<br />
						If in our sole judgment you fail, or we suspect that you have
						failed, to comply with any term or provision of these Terms of
						Service, we also may terminate this agreement at any time without
						notice and you will remain liable for all amounts due up to and
						including the date of termination; and/or accordingly may deny you
						access to our Services (or any part thereof).
						<br />
						<br />
						<br />
						<p className="tw-font-normal">SECTION 15 - ENTIRE AGREEMENT</p>
						<br />
						The failure of us to exercise or enforce any right or provision of
						these Terms of Service shall not constitute a waiver of such right
						or provision.
						<br />
						<br />
						These Terms of Service and any policies or operating rules posted by
						us on this site or in respect to The Service constitutes the entire
						agreement and understanding between you and us and govern your use
						of the Service, superseding any prior or contemporaneous agreements,
						communications and proposals, whether oral or written, between you
						and us (including, but not limited to, any prior versions of the
						Terms of Service).
						<br />
						<br />
						Any ambiguities in the interpretation of these Terms of Service
						shall not be construed against the drafting party.
						<br />
						<br />
						<br />
						<p className="tw-font-normal">SECTION 16 - GOVERNING LAW</p>
						<br />
						These Terms of Service and any separate agreements whereby we
						provide you Services shall be governed by and construed in
						accordance with the laws of.
						<br />
						<br />
						<br />
						<p className="tw-font-normal">
							SECTION 17 - CHANGES TO TERMS OF SERVICE
						</p>
						<br />
						You can review the most current version of the Terms of Service at
						any time at this page.
						<br />
						<br />
						We reserve the right, at our sole discretion, to update, change or
						replace any part of these Terms of Service by posting updates and
						changes to our website. It is your responsibility to check our
						website periodically for changes. Your continued use of or access to
						our website or the Service following the posting of any changes to
						these Terms of Service constitutes acceptance of those changes.
						<br />
						<br />
						Questions about the Terms of Service should be sent to us at
						<span className="tw-font-bold tw-ml-2">modelEst1010@gmail.com</span>
						.
					</p>
				</div>
			)}
			<div className="tw-flex tw-flex-row tw-justify-between tw-items-center tw-mb-5">
				{paymentType.map((item) => (
					<div
						key={item.id}
						className={
							item.id !== 3
								? 'tw-mx-2 tw-border tw-border-gray-300 tw-rounded-sm tw-px-1'
								: 'tw-mx-2'
						}>
						{item.type}
					</div>
				))}
			</div>
			<div className="tw-flex tw-text-xs tw-text-neutral-500 tw-font-light">
				<div className="tw-pr-1 tw-border-r-2 tw-border-r-neutral-800 md:tw-flex">
					<p className="">
						&copy; {new Date().getUTCFullYear()} <span>modelEst</span>
						<span> • All right reserved</span>
					</p>
				</div>
				<div className="md:tw-flex tw-ml-1">
					<p className="tw-flex tw-items-center">
						<span>Design by</span>{' '}
						<span className="rose-gold tw-ml-1">
							<a
								href="https://www.linkedin.com/in/oluwatosin-isijola-33333ba8/"
								target="_blank"
								rel="noopener noreferrer">
								<SiTreyarch size={15} />
							</a>
						</span>
					</p>
				</div>
			</div>
			<span className="tw-text-[10px] tw-font-light tw-my-5 tw-bg-neutral-100 tw-w-full tw-text-center tw-text-neutral-500">
				This site is protected by Google Privacy Policy and Terms of Service
				apply.
			</span>
			<div className="tw-flex tw-justify-evenly tw-items-center tw-w-[80%] md:tw-w-[8%] md:tw-ml-10 tw-mt-3 rose-gold">
				<a
					href="https://www.instagram.com/modelestluxuryhair/"
					target="_blank"
					rel="noopener noreferrer">
					<AiOutlineInstagram size={20} className="hover:tw-text-rose-100" />
				</a>
				<a
					href="https://www.tiktok.com/@es.motayo"
					target="_blank"
					rel="noopener noreferrer">
					<FaTiktok size={20} className="hover:tw-text-rose-100" />
				</a>
			</div>
		</footer>
	)
}

export default Footer
