import React from 'react'
import { Helmet } from 'react-helmet'
import Heading from '../components/Heading'
import Layout from '../components/shared/Layout'

function Blogs() {
	const [show, setShow] = React.useState(false)

	React.useEffect(() => {
		setTimeout(() => {
			setShow(true)
		}, 3000)
	}, [])

	return (
		<>
			<Helmet>
				<title>blogs</title>
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
							<p className="tw-text-xl tw-mb-10 tw-leading-8">
								The package of Virgin Brazilian Hair Extensions you’ve been
								waiting for has finally arrived at your doorstep. The excitement
								alone may keep you buzzing all the way to the beauty salon, but
								many don’t realize that caring for Brazilian hair extensions
								begins as soon as you open your package. Her Hair Company Virgin
								Brazilian Hair Extensions have an average lifespan of 6 months
								to one year if cared for properly. This is why the way you care
								for your Virgin Brazilian Hair Extensions is just as important
								as the company you decide to invest in.
							</p>
							<p className="tw-mb-10 tw-leading-7">
								Her Hair Company has been associated with a number of sources
								for hair extension care ranging from viral YouTube tutorials to
								in-depth customer reviews. With so much information available,
								it can sometimes be overwhelming in finding the exact
								information you need. In this article, we wanted to provide our
								customers hair care tips for virgin hair straight from the
								source from the time its delivered to the time you take it to
								your trusted cosmetologist.
								<br />
								<br />
								Initially when receiving your Virgin Brazilian Hair Extensions
								you’ll want to inspect your package. This can be done by
								removing each bundle from its individual wrapping. Check to
								ensure you’ve received the correct lengths, texture, and inspect
								each bundle from weft to ends. Once you’ve confirmed all the
								contents of your package are in good standing, you can prepare
								your bundles for your appointment.
							</p>
							<div className="tw-mb-10">
								<Heading children="Co-Washing is Key" isBold={true} />
								<p className="tw-leading-7">
									Hair extension care is a necessary part of the longevity of
									Brazilian hair extensions. Co-washing has been proven an
									effective method. The term co-wash means to wash hair with
									only conditioner. This process assist in restoring the hair of
									its moisture and refreshing it back to its natural state. In
									order to co-wash your bundles, we recommend using lukewarm
									water and a conditioner free of parabens and sulfate. Once
									thoroughly co-washed, hang bundles to air-dry. Keep in mind
									that co-washing will need to be repeated after your bundles
									are installed on a weekly basis.
								</p>
							</div>
							<div className="tw-mb-5">
								<Heading children="Using Hair-Care Products" isBold={true} />
								<p className="tw-leading-7">
									Caring for Brazilian hair extensions also includes what
									products you choose to use to maintain your desired look.
									Virgin Brazilian Hair Extensions have an added benefit of not
									needing a lot of product to thrive. Use the mantra “less is
									more” when considering adding products such as serums, oils,
									mousse, etc; These products can weigh down the hair and appear
									greasy over time. Shampooing with a sulfate-free product is
									even suggested on a bi-weekly basis as it can strip the hair
									of its natural oils leading to tangling or shedding as a
									result of dry strands.
									<br />
									<br />
									Now that you have the basic hair-care tips for Virgin hair
									under your belt, you’ll find that your overall experience can
									be hassle-free with just a little maintenance.
								</p>
							</div>
						</div>
					</div>
				)}
			</Layout>
		</>
	)
}

export default Blogs
