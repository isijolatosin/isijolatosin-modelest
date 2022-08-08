import React from 'react'
import Card from './Card'
import Add2CartPopup from './shared/Add2CartPopup'

import DealsCard from './shared/DealsCard'
import FeaturedCard from '../components/shared/FeaturedCard'
import ContactForm from './shared/ContactForm'

import HomePageSingleModal from './shared/HomePageSingleModal'

function Products({
	allProducts,
	sales,
	featuredProduct,
	SubmitInqury,
	setChatError,
	setChatSuccess,
	chatDetail,
	handleChangeChat,
	chatSuccess,
	similarProductsFrontal,
	similarProductsClosure,
	chatError,
}) {
	const [toggleHeight, setToggleHeight] = React.useState(true)
	const [singleProducts, setSingleproducts] = React.useState(null)
	const [singleCart, setSingleCart] = React.useState(null)

	const scrollToTop = function scrollToTop() {
		window.scrollTo(0, 0)
	}

	const lengthArray = [
		'14inch, 16inch, & 18inch',
		'16inch, 18inch, & 20inch',
		'18inch, 20inch, & 22inch',
		'20inch, 22inch, & 24inch',
	]
	const productSectionLength =
		allProducts?.length % 2 === 0
			? allProducts?.length / 2
			: (allProducts?.length - 1) / 2

	return (
		<div className="tw-mt-[20px] md:tw-mt-[10px] tw-relative tw-flex tw-flex-col tw-items-center ">
			<div className="tw-fixed tw-top-0 tw-right-0 md:tw-top-[-100px] md:tw-right-[-20px] tw-z-50">
				<Add2CartPopup
					singleCart={singleCart}
					setSingleCart={setSingleCart}
					quantity="1"
				/>
			</div>
			{allProducts ? (
				<div
					className={`featuredCard2 tw-grid tw-grid-flow-col tw-pb-5 tw-overflow-x-scroll tw-w-full tw-snap-x tw-snap-mandatory ${
						!sales && 'tw-pt-[8px]'
					} md:tw-w-[100%] tw-gap-2`}>
					{allProducts?.slice(0, productSectionLength).map((product) => {
						return (
							<div
								key={product._id}
								className="tw-justify-center tw-items-center tw-flex tw-flex-row tw-snap-center">
								<Card
									sales={sales}
									key={product._id}
									product={product}
									setSingleproducts={setSingleproducts}
									scrollToTop={scrollToTop}
								/>
							</div>
						)
					})}
				</div>
			) : (
				<div className="tw-text-neutral-500">Loading data...</div>
			)}
			<DealsCard lengthArray={lengthArray} brand="Indian, Virgin, Vietnamese" />
			<div className="">
				<FeaturedCard featuredProduct={featuredProduct} />
			</div>
			<div className="tw-border-b-[1px] tw-border-neutral-800 tw-w-full md:tw-inline tw-hidden">
				<div className="tw-bg-neutral-900 tw-mt-5 md:tw-w-[50%] tw-w-full tw-mx-auto">
					<ContactForm
						SubmitInqury={SubmitInqury}
						setChatError={setChatError}
						setChatSuccess={setChatSuccess}
						chatDetail={chatDetail}
						handleChangeChat={handleChangeChat}
						chatSuccess={chatSuccess}
						chatError={chatError}
						textColor="tw-text-white"
						isCancelBtn={false}
						toggleHeight={toggleHeight}
						setToggleHeight={setToggleHeight}
						isFormBtn={true}
					/>
				</div>
			</div>
			{allProducts ? (
				<div
					className={`featuredCard2 tw-grid tw-grid-flow-col tw-pb-5 tw-overflow-x-scroll tw-w-full tw-snap-x tw-snap-mandatory ${
						!sales && 'tw-pt-[20px]'
					} md:tw-w-[100%] tw-gap-2 tw-mt-10 `}>
					{allProducts
						?.slice(productSectionLength, allProducts.length)
						.map((product) => {
							return (
								<div
									key={product._id}
									className="tw-justify-center tw-items-center tw-flex tw-flex-row tw-snap-center">
									<Card
										sales={sales}
										key={product._id}
										product={product}
										setSingleproducts={setSingleproducts}
										scrollToTop={scrollToTop}
									/>
								</div>
							)
						})}
				</div>
			) : (
				<div className="tw-text-neutral-500">Loading data...</div>
			)}

			{singleProducts && (
				<HomePageSingleModal
					singleProducts={singleProducts}
					setSingleproducts={setSingleproducts}
					similarProductsClosure={similarProductsClosure}
					similarProductsFrontal={similarProductsFrontal}
					sales={sales}
				/>
			)}
		</div>
	)
}

export default Products
