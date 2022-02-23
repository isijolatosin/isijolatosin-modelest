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
					OFFERING THE BEST HAIRSTYLING SERVICES
				</h3>
			</div>
			<p className="tw-text-neutral-600 tw-font-thin">
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry's standard dummy text ever
				since the 1500s, when an unknown printer took a galley of type and
				scrambled it to make a type specimen book. It has survived not only five
				centuries, but also the leap into electronic typesetting, remaining
				essentially unchanged. It was popularised in the 1960s with the release
				of Letraset sheets containing Lorem Ipsum passages, and more recently
				with desktop publishing software like Aldus PageMaker including versions
				of Lorem Ipsum.
				<br />
				<br />
				Contrary to popular belief, Lorem Ipsum is not simply random text. It
				has roots in a piece of classical Latin literature from 45 BC, making it
				over 2000 years old. Richard McClintock, a Latin professor at
				Hampden-Sydney College in Virginia, looked up one of the more obscure
				Latin words, consectetur, from a Lorem Ipsum passage, and going through
				the cites of the word in classical literature, discovered the
				undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
				of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
				Cicero, written in 45 BC.
			</p>
		</div>
		// </div>
	)
}

export default About
