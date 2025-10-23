/* eslint-disable no-unused-vars */
"use client";
import { MdOutlineStarPurple500 } from "react-icons/md";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import TestimonialCard from "./TestimonialCard";

const testiData = [
  {
    id: 1,
    testiImg: "/images/testi-profile.png",
    testiRatingIcon: <MdOutlineStarPurple500 />,
    testiName: "Dr. Rajesh Kumar",
    testiDesignation: "Forest Secretary, Madhya Pradesh",
    testiDesc: `VanAdhikar has revolutionized our FRA implementation process. The AI-powered insights and real-time monitoring have increased our efficiency by 300%. The transparent tracking system has greatly improved community trust and compliance.`,
    testiShape: "/images/envato.png",
  },
  {
    id: 2,
    testiImg: "/images/testi-profile2.png",
    testiRatingIcon: <MdOutlineStarPurple500 />,
    testiName: "Smt. Priya Sharma",
    testiDesignation: "Tribal Affairs Officer, Odisha",
    testiDesc: `The WebGIS mapping feature is exceptional for visualizing forest rights data. Decision support tools provide accurate policy recommendations that have helped us serve over 500 tribal communities more effectively.`,
    testiShape: "/images/amazon.png",
  },
  {
    id: 3,
    testiImg: "/images/testi-profile.png",
    testiRatingIcon: <MdOutlineStarPurple500 />,
    testiName: "Shri Arjun Singh",
    testiDesignation: "Community Representative, Tripura",
    testiDesc: `For the first time, we can track our forest rights applications transparently. The system shows real progress and keeps us informed. VanAdhikar has made the FRA process more accessible for our tribal communities.`,
    testiShape: "/images/envato.png",
  },
];

const Testimonial = () => {
  const settings = {
    loop: true,
    spaceBetween: 30,
    speed: 1000,
    autoplay: true,
    breakpoints: {
      320: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 2,
      },
      1400: {
        slidesPerView: 2,
      },
    },
  };
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + ' pagination-bullet"></span>';
    },
  };
  return (
    <section className="bg-[#f5f8ed] relative z-10 before:absolute before:top-0 before:left-1/2 before:-translate-x-1/2 before:w-2/3 before:-z-10 before:h-2/3 before:bg-[url('/images/map.png')] before:bg-center before:bg-cover before:bg-no-repeat overflow-hidden testimonial">
      <img
        src={"/images/testi-shape-1.png"}
        draggable="false"
        className="absolute -z-10 top-44 right-[5%] animate-zoomInOut"
      />
      <img
        src={"/images/testi-shape-2.png"}
        draggable="false"
        className="absolute -z-10 top-16 right-[20%] animate-zoomInOut"
      />
      <img
        src={"/images/testi-shape-3.png"}
        draggable="false"
        className="absolute -z-10 top-44 left-[5%] animate-zoomInOut"
      />
      <img
        src={"/images/testi-shape-4.png"}
        draggable="false"
        className="absolute -z-10 top-16 left-[20%] animate-zoomInOut"
      />
      <div className="container mx-auto px-4 mt-10 sm:px-6 lg:px-8 max-w-7xl py-20">
        <div className="text-center">
          <h5 className="font-AlbertSans font-medium text-PrimaryColor-0 flex items-center gap-2 justify-center">
            <img src={"/images/sub-title-shape.png"} draggable="false" />
            USER TESTIMONIALS
          </h5>
          <h1 className="font-AlbertSans font-bold text-xl leading-7 sm:text-[36px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[40px] xl:leading-[50px] 2xl:text-[46px] 2xl:leading-[56px] text-HeadingColor-0 mt-5 mb-3">
            What Government Officials Say About
            <br />
            FRA Atlas Implementation
          </h1>
        </div>
        <div className="mt-[46px]">
          <Swiper {...settings} pagination={pagination} modules={[Pagination]}>
            <div>
              {testiData.map(
                ({
                  id,
                  testiImg,
                  testiRatingIcon,
                  testiName,
                  testiDesignation,
                  testiDesc,
                  testiShape,
                }) => {
                  return (
                    <SwiperSlide key={id}>
                      <div className="pb-[80px] pt-3">
                        <TestimonialCard
                          testiImg={testiImg}
                          testiRatingIcon={testiRatingIcon}
                          testiName={testiName}
                          testiDesignation={testiDesignation}
                          testiDesc={testiDesc}
                          testiShape={testiShape}
                        />
                      </div>
                    </SwiperSlide>
                  );
                }
              )}
            </div>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
