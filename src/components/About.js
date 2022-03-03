const aboutImg = require('../assets/about.jpeg')

function About() {
	return (
		// <div className="about-container">
		// {/* <div className="about-left">
		// 	<div className="about-rec"></div>
		// 	<img className="about-img " src={aboutImg} alt="" />
		// </div> */}
		<div className="tw-px-10">
			<img
				className="tw-w-64 tw-h-[300px] tw-float-left tw-aspect-[1/1] lg:tw-aspect-[1/2] tw-rounded-lg tw-shadow-lg tw-object-cover tw-object-center tw-mb-0 tw-mr-6 [clip-path:var(--my-shape)] [shape-outside:var(--my-shape)] lg:[--my-shape:polygon(0%_0%,100%_0%,75%_100%,0%_100%)]"
				src={aboutImg}
				alt=""
			/>
			<h1 className="tw-text-3xl tw-font-bold">ABOUT US</h1>
			<div className="tw-relative">
				<div className="tw-bg-clip-border tw-p-0.5 tw-mt-[-5px] tw-mb-[20px] tw-w-[40px] tw-ml-[280px] tw tw-bg-pink-600"></div>
				<h3 className="tw-font-semibold tw-text-neutral-600 tw-mb-[15px]">
					OFFERING THE BEST HAIR BUNDLES
				</h3>
			</div>
			<p className="tw-text-neutral-600 tw-font-thin">
				ModelEst was created for those who have a flair for hair, those that
				have to switch it up by length, color and texture. This company birthed
				out of passion for hair and poised appearance. I can never keep a
				hairstyle for a long time because I love to switch it up. All women
				should have the opportunity to look elegant and hair-raising. The
				contemporary world we live in today has taken a 360 turn to feminism and
				presentation of self is the order of the day.
				<br />
				<br />
				Our mode of serve ranges from full installment to scheduling payment. We
				provide this method to ease the burden for those who want to make
				installmental payment just because they couldn’t afford to let that hair
				pass them by. We are fully here for your service if installmental is
				your preferred option.
				<br />
				<br />
				<div className="tw-italic tw-text-sm tw-font-semibold tw-text-left">
					<span> ...we serve everyone and leave no one behind!</span>
				</div>
				<br />
				Beaty don’t cost much if you are dealing with the right merchant that
				cares about not making you break your bank and provides the best quality
				you can ever get out there. We at modelEst cares and we are committed to
				bringing to you the best quality with an affordable deal every time you
				buy from us. Optimum guarantee for your desired hair product getting to
				you in due time.
				<br />
				<br />
				Integrity, respect, loyalty and service is what we are built on and
				these principles have brought us this far and still drive us to forge
				ahead. There is no stopping till all women of all ages look their best
				and more…
			</p>
		</div>
		// </div>
	)
}

export default About
