import React from 'react'
import { Helmet } from 'react-helmet'
import Layout from '../components/shared/Layout'
import Products from '../components/Products'

function HomePage() {
	const [sales, setSales] = React.useState(false)

	React.useEffect(() => {
		setSales(localStorage.getItem('isSales'))
	}, [])
	return (
		<div className="tw-bg-neutral-800 relative">
			<Helmet>
				<title>Home</title>
			</Helmet>
			<Layout>
				<div
					className={
						sales
							? 'tw-mt-[70px] tw-pt-[100px] md:tw-py-[70px] lg:tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[80%] lg:tw-mx-auto'
							: 'tw-pt-[100px] md:tw-py-[70px] lg:tw-w-[100%] xl:tw-w-[90%] 2xl:tw-w-[80%] lg:tw-mx-auto'
					}>
					<Products />
				</div>
			</Layout>
		</div>
	)
}

export default HomePage
