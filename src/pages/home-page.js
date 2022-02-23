import React from 'react'
import Layout from '../components/shared/Layout'
import Products from '../components/Products'

function HomePage({ history }) {
	return (
		<div className="tw-bg-neutral-800 relative">
			<Layout>
				<div className="tw-pt-[100px] md:tw-py-[70px] lg:tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[80%] lg:tw-mx-auto">
					<Products />
				</div>
			</Layout>
		</div>
	)
}

export default HomePage
