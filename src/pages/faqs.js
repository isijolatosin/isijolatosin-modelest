import React from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Heading from '../components/Heading'
import Layout from '../components/shared/Layout'

function Faqs() {
	const [show, setShow] = React.useState(false)
	const faqs = [
		{
			id: '1',
			title: 'HOW CAN I MEASURE THE LENGTH OF MY BUNDLES?',
			value:
				'ModelEst hair extensions should be measured to the fall of the hair. Start 0 at the weft and measure to the fall of the hair. Curly hair extensions must be measured by pulling the hair straight. Again, start 0 at the weft; pull the hair straight from the ends, and the length will be at the tips of the hair. Each bundle will not measure exact when it is still wrapped in its band, as tension can affect the fall of each strand.',
		},
		{
			id: '2',
			title: 'CAN THE HAIR BE STRAIGHTENED OR CURLED?',
			value:
				'ModelEst hair extensions can be styled like your own hair. You are able to use a thermal (hot) tool to straighten, curl, crimp, etc. Keep in mind the hair does not have all the nutrients that a strand growing from your scalp will. Heat damage can cause breakage and dryness. Therefore, it is imperative that you use a heat-protecting product, always co-wash your hair, and protect it during sleep hours.',
		},
		{
			id: '3',
			title: 'CAN I COLOR MY BUNDLES?',
			value:
				'Yes, but keep in mind that this purchase is an investment for you and chemically altering the hair can possibly damage it if not done correctly. Professional consultation is advised. ModelEst hair extensions can handle a coloring process very well, but please be cautious. Once the hair is chemically-altered incorrectly, the cuticle can become damaged and overexposed, causing fraying, breakage, dryness, and tangling. This in turn will affect the overall look and feel of your hair. Chemical damage has no reverse button, and we will not be held liable for any damages.',
		},
		{
			id: '4',
			title: 'DOES THIS HAIR SHED?',
			value:
				'Minimally, no hair is absolutely perfect. We have reinforced machine wefting, to minimize shedding to nearly none. You may see a few strands here or there while detangling or styling, but nothing troubling or excessive. The most effective way to avoid shedding is by sealing the wefts. (See “How do I seal my wefts?”)',
		},
		{
			id: '5',
			title: 'WHAT DOES CO-WASH MEAN?',
			value:
				'Co-washing simply means washing with conditioner. It is a key task in extending the life of your extensions and keeping them healthy. We recommend a co-wash once a week with moisturizing conditioner to ensure your hair gets the nutrients and moisture it needs. When you first receive your extensions, it is important to co-wash the hair to maintain its luster and softness and to prevent over drying. Shampooing the hair can strip the hair entirely too much of its moisture, mild shampoo is advised Always use cold to warm water, as hot water will overexpose the cuticle of the hair.',
		},
		{
			id: '6',
			title: 'HOW SHOULD I CARE FOR MY HAIR?',
			value:
				'All virgin hair reacts differently to product and regimens. Please be mindful to stay away from ingredients that can strip your extensions of moisture such as parabens, sulfate, and silicone. These products usually tend to have a high alcohol content which dehydrates the hair follicle of its nutrients. Heavy oils are also not necessary to care for your extensions as it can weigh down your hair pattern. By rule of thumb, we recommend co-washing your bundles weekly and shampooing bi-weekly to rid your bundles of any excess product. Deep conditioning can be done as needed.',
		},
		{
			id: '7',
			title: 'WHAT PRODUCTS DO YOU RECOMMEND I USE?',
			value:
				'With no two heads being alike, our customers have a variety of experience with different textures as well as their daily maintenance of their extensions. Over the years we have collected knowledge regarding what works best. Our customers highly suggest product lines such as Crème of Nature, Carol’s Daughter, Cantu, As I Am, and more. Even though our customers suggest these products, your extensions may not respond in the same manner. If you have any further questions regarding your hair maintenance routine, please contact our customer service department at 000.***.****.',
		},
		{
			id: '8',
			title: 'HOW MANY BUNDLES SHOULD I ORDER?',
			value:
				'The key to determining how many bundles to purchase depends on the lengths you are wanting. As all bundles are the same weight (3.3oz), the longer bundles have shorter wefts, and the shorter bundles have longer wefts. For a full sew-in, we recommend 3-4 bundles of hair. For lengths over 18”, we recommend ordering 4-5 bundles of hair. If you desire an install with a lot of volume, you will need 4-5 bundles or 4 bundles with a closure. A closure is a great addition to your install, as you will have no leave-out. This is considered a full protective style, and none of your hair will be exposed.',
		},
		{
			id: '9',
			title: 'HOW LONG WILL IT TAKE FOR ME TO RECEIVE MY PACKAGE?',
			value:
				'We have a standard 48-72 hour processing time prior to the shipment of all orders. This processing timeframe is subject to change due to sales or holidays. Please review our shipping methods to receive an estimated timeframe of received your package.',
		},
	]

	React.useEffect(() => {
		setTimeout(() => {
			setShow(true)
		}, 3000)
	}, [])

	return (
		<>
			<Helmet>
				<title>Faqs</title>
			</Helmet>
			<Layout>
				{!show && (
					<div className="tw-bg-neutral-300 tw-py-[100px] tw-flex tw-justify-center">
						<div className="tw-rounded-full progress">
							<div className="inner"></div>
						</div>
					</div>
				)}
				{show && (
					<div className="tw-bg-neutral-50 tw-text-neutral-700">
						<div className="tw-pb-[100px] tw-pt-[120px] md:tw-pt-[80px] tw-px-5 tw-flex tw-flex-col tw-items-left tw-text-sm tw-w-[100%] md:tw-w-[80%] lg:tw-w-[70%] tw-mx-auto">
							<p className="tw-mb-5">
								Virgin Hair are natural human hair that still maintains its
								natural state. No chemical changes, no color, has not been
								processed, and all cuticles are intact. All hair sold by
								modelEst Hair Company is virgin hair.
							</p>
							{faqs.slice(0, 4).map((faq) => (
								<div key={faq.id}>
									<div className="tw-my-2">
										<Heading children={faq.title} isBold={true} size1={true} />
									</div>
									<div className="tw-mb-6 tw-font-light">
										<span>{faq.value}</span>
									</div>
								</div>
							))}
							<div className="tw-my-2">
								<Heading
									children="HOW DO I SEAL MY WEFTS?"
									isBold={true}
									size1={true}
								/>
							</div>
							<div className="tw-mb-6 tw-font-light">
								<span>
									Our weft sealer is available for purchase{' '}
									<Link to="/" className="tw-text-red-600 tw-font-normal">
										here
									</Link>
									. To watch “How To” video or read about the sealer,{' '}
									<Link
										to="/blogs/caring-for-indian-virgin-vietnamese-hair-extensions"
										className="tw-text-red-600 tw-font-normal">
										click here
									</Link>
								</span>
							</div>
							<div className="tw-my-2">
								<Heading
									children="HOW LONG DOES THIS HAIR LAST?"
									isBold={true}
									size1={true}
								/>
							</div>
							<div className="tw-mb-6 tw-font-light">
								<span>
									Our raw and virgin hair can last up to 3 years or more with
									proper care and maintenance. Learn more about caring for your
									Virgin, Indian and Vietnamese hair extensions{' '}
									<Link
										to="/blogs/caring-for-indian-virgin-vietnamese-hair-extensions"
										className="tw-text-red-600 tw-font-normal">
										here...
									</Link>
								</span>
							</div>
							{faqs.slice(4, faqs.length).map((faq) => (
								<div key={faq.id}>
									<div className="tw-my-2">
										<Heading children={faq.title} isBold={true} size1={true} />
									</div>
									<div className="tw-mb-6 tw-font-light">
										<span>{faq.value}</span>
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</Layout>
		</>
	)
}

export default Faqs
