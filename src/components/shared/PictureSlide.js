import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

const PictureSlide = ({ images }) => {
	return (
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
			// pagination={true}
			modules={[Autoplay, EffectCoverflow, Pagination]}
			className="swiper tw-w-[100%] tw-h-[90vh] lg:tw-w-[70%] md:tw-h-[80vh] tw-pt-[30px] md:tw-pt-[50px] tw-pb-[30px]">
			{images.map((image, idx) => (
				<SwiperSlide
					key={idx}
					className="swiper-slide tw-w-[300px] tw-h-[500px] md:tw-h-[400px]">
					<img src={image} alt="" />
				</SwiperSlide>
			))}
		</Swiper>
	)
}

export default PictureSlide
