import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'
import Products from '../components/Products'

function HomePage() {
	return (
		<div className="tw-bg-neutral-800 relative">
			<Helmet>
				<title>Home</title>
			</Helmet>
			<Layout>
				<div className="tw-pt-[100px] md:tw-py-[70px] lg:tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[80%] lg:tw-mx-auto">
					<Products />
				</div>
			</Layout>
		</div>
	)
}

export default HomePage
