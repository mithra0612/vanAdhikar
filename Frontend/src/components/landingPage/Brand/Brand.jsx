"use client"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const Brand = () => {
  const settings = {
    loop: true,
    spaceBetween: 30,
    speed: 800,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: { slidesPerView: 1 },
      768: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    pagination: {
      el: ".brand-pagination", // custom container
      clickable: true,
      renderBullet: (index, className) => {
        return `<span class="${className} w-3 h-3 bg-green-500 rounded-full mx-1 inline-block"></span>`;
      },
    },
  };

  return (
    <div className="bg-white py-10">
      <div className="Container relative z-10">
        <Swiper {...settings} modules={[Pagination, Autoplay]}>
          <SwiperSlide>
            <div>
              <img
                src={"/images/brand2-logo.png"}
                draggable="false"
                className="m-auto"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img
                src={"/images/brand2-logo2.png"}
                draggable="false"
                className="m-auto"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img
                src={"/images/brand2-logo3.png"}
                draggable="false"
                className="m-auto"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img
                src={"/images/brand2-logo.png"}
                draggable="false"
                className="m-auto"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img
                src={"/images/brand2-logo5.png"}
                draggable="false"
                className="m-auto"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div>
              <img
                src={"/images/brand2-logo.png"}
                draggable="false"
                className="m-auto"
              />
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Pagination bullets will render here instead of overlapping logos */}
        <div className="brand-pagination flex justify-center mt-6"></div>
      </div>
    </div>
  );
};

export default Brand;
