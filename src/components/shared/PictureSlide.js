import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/effect-cards'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

const PictureSlide = ({ images }) => {
	const isIOS =
		window.navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
	return (
		<>
			<Swiper
				effect={'coverflow'}
				grabCursor={true}
				centeredSlides={true}
				slidesPerView={'auto'}
				loop={true}
				coverflowEffect={{
					rotate: 20,
					stretch: 0,
					depth: 320,
					modifier: 1,
					slideShadows: true,
				}}
				autoplay={{
					delay: 2000,
					disableOnInteraction: false,
				}}
				modules={[Autoplay, EffectCoverflow]}
				className="tw-hidden md:tw-inline-block lg:tw-w-[70%] md:tw-h-[86vh] md:tw-pt-[50px]">
				{images.map((image, idx) => (
					<SwiperSlide
						key={idx}
						className="swiper-slide tw-w-[300px] tw-h-[500px] md:tw-h-[400px]">
						<img src={image} alt="" />
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				spaceBetween={30}
				centeredSlides={true}
				loop={true}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				modules={[Autoplay, Pagination, Navigation]}
				className="md:tw-hidden tw-inline-block tw-w-[100vw] tw-h-[85vh]
				tw-pt-[20px] tw-pb-[100px]">
				{images.map((image, idx) => (
					<SwiperSlide
						key={idx}
						className={`tw-w-[100%] ${
							isIOS ? 'tw-h-[430px]' : 'tw-h-[530px]'
						}`}>
						<img src={image} alt="" />
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default PictureSlide
