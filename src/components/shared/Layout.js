import Footer from '../Footer'
import Nav from '../Navigation/Nav'

function Layout({ children, allProducts }) {
	return (
		<div>
			<div className="tw-bg-neutral-400 tw-fixed tw-top-0 tw-left-0 tw-right-0 tw-z-20 tw-max-w-screen ">
				<Nav allProducts={allProducts} />
			</div>
			<div className="tw-mt-2">{children}</div>
			<div>
				<Footer />
			</div>
		</div>
	)
}

export default Layout
