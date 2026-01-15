"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const Hero = () => {
  return (
    <section className="container mx-auto my-5 grid grid-cols-1 md:grid-cols-3 gap-5">
      <div className="md:col-span-2 row-span-2 rounded-2xl overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          loop
          className="h-full"
        >
          <SwiperSlide>
            <div className="relative h-140 md:h-full">
              <Image
                src="/assets/sliderOne.webp"
                alt="Slider One"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col justify-center left-8 md:left-16 text-white space-y-3">
                <h1 className="font-medium text-lg tracking-wide">GAME GEAR</h1>
                <h2 className="text-3xl font-bold tracking-wide">
                  GAME CONTROLLER
                </h2>
                <p className="text-white leading-relaxed tracking-wide">
                  Wireless Noise Cancellation
                </p>
                <button className="mt-2 bg-base-100 text-content px-4 py-2 rounded-lg w-max hover:cursor-pointer">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative h-140 md:h-full">
              <Image
                src="/assets/sliderTwo.webp"
                alt="Slider Two"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col justify-center left-8 md:left-16 text-white space-y-3">
                <h1 className="font-medium text-lg tracking-wide">
                  VIRTUAL GLASSES
                </h1>
                <h2 className="text-3xl font-bold tracking-wide">
                  APPLE VISION
                </h2>
                <p className="text-white leading-relaxed tracking-wide">
                  A New Dimension for Entertainment
                </p>
                <button className="mt-2 bg-base-100 text-content px-4 py-2 rounded-lg w-max hover:cursor-pointer">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="relative rounded-2xl overflow-hidden h-70">
        <Image
          src="/assets/bannerOne.webp"
          alt="Banner One"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col justify-center left-4 text-white space-y-1">
          <h1 className="tracking-wide text-sm font-medium">New Arrivals</h1>
          <h3 className="text-xl font-semibold tracking-wide">HOMEPOD PRO</h3>
          <p className="text-sm tracking-wide leading-relaxed hover:cursor-pointer">
            Shop Now →
          </p>
        </div>
      </div>

      <div className="relative rounded-2xl overflow-hidden h-70">
        <Image
          src="/assets/bannerTwo.webp"
          alt="Banner Two"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex flex-col justify-center left-4 text-white space-y-1">
          <h1 className="tracking-wide text-sm font-medium">New Arrivals</h1>
          <h3 className="text-xl font-semibold tracking-wide">BambooBuds</h3>
          <p className="text-sm tracking-wide leading-relaxed hover:cursor-pointer">
            Shop Now →
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;