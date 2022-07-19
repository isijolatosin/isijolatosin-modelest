import React from 'react'
import Footer from '../Footer'
import Nav from '../Navigation/Nav'

function Layout({ children, allProducts }) {
	const [showContactForm, setShowContactForm] = React.useState(false)
	const [showTerms, setShowTerms] = React.useState(false)
	const [showShippingReturns, setShowShippingReturns] = React.useState(false)
	const [showPrivacyReturns, setPrivacyReturns] = React.useState(false)
	return (
		<div>
			<div className="tw-bg-neutral-900 tw-text-white tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-20 tw-max-w-screen ">
				<Nav
					allProducts={allProducts}
					setShowContactForm={setShowContactForm}
					setShowTerms={setShowTerms}
					setShowShippingReturns={setShowShippingReturns}
					setPrivacyReturns={setPrivacyReturns}
				/>
			</div>
			<div className="tw-mt-2">{children}</div>
			<div>
				<Footer
					showContactForm={showContactForm}
					setShowContactForm={setShowContactForm}
					showTerms={showTerms}
					setShowTerms={setShowTerms}
					showShippingReturns={showShippingReturns}
					setShowShippingReturns={setShowShippingReturns}
					showPrivacyReturns={showPrivacyReturns}
					setPrivacyReturns={setPrivacyReturns}
				/>
			</div>
		</div>
	)
}

export default Layout
