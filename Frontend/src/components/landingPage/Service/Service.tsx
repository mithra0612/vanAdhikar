/* eslint-disable no-unused-vars */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import ServiceCard from "./ServiceCard";
import { GoArrowUpRight } from "react-icons/go";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const ServiceData = [
  {
    id: 1,
    serviceImg: "/images/service2-thumb.jpg",
    serviceIcon: "/images/service2-icon.png",
    serviceUrl: "/atlas/interactive-map",
    serviceButton: <GoArrowUpRight />,
    serviceButton2: "Explore Atlas",
    serviceTitle: "WebGIS Mapping",
    serviceDesc: "Interactive forest rights visualization with real-time geospatial data and comprehensive mapping tools for FRA implementation tracking.",
    serviceShape: "/images/service-shape.png",
  },
  {
    id: 2,
    serviceImg: "/images/service2-thumb2.jpg",
    serviceIcon: "/images/service2-icon2.png",
    serviceUrl: "/atlas/ai-insights",
    serviceButton: <GoArrowUpRight />,
    serviceButton2: "View Insights",
    serviceTitle: "AI Analytics",
    serviceDesc: "Automated insights and predictions using machine learning algorithms to analyze forest rights patterns and implementation efficiency.",
    serviceShape: "/images/service-shape.png",
  },
  {
    id: 3,
    serviceImg: "/images/service2-thumb3.jpg",
    serviceIcon: "/images/service2-icon3.png",
    serviceUrl: "/monitoring/dashboard",
    serviceButton: <GoArrowUpRight />,
    serviceButton2: "Monitor Now",
    serviceTitle: "Real-time Monitoring",
    serviceDesc: "Progress tracking across Madhya Pradesh, Tripura, Odisha, and Telangana with live updates and comprehensive reporting tools.",
    serviceShape: "/images/service-shape.png",
  },
  {
    id: 4,
    serviceImg: "/images/service2-thumb.jpg",
    serviceIcon: "/images/service2-icon.png",
    serviceUrl: "/dss/decision-support",
    serviceButton: <GoArrowUpRight />,
    serviceButton2: "Access DSS",
    serviceTitle: "Decision Support",
    serviceDesc: "Policy recommendations and impact assessment tools powered by AI to support informed decision-making for FRA implementation.",
    serviceShape: "/images/service-shape.png",
  },
];

const Service = () => {
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
      clickable: true,
      renderBullet: (index: number, className: string) => {
        return `<span class="${className} pagination-bullet"></span>`;
      },
    },
  };

  return (
    <section className="service relative pt-20 pb-[120px] bg-[#f5f8ed] z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-1/2 2xl:before:h-[54.8%] before:bg-[url('/images/service2-bg.jpg')] before:-z-10 before:bg-cover before:bg-center before:bg-no-repeat">
      <img
        src={"/images/testi-shape-1.png"}
        draggable="false"
        className="absolute top-32 left-20 animate-dance2 hidden lg:block"
      />
      <img
        src={"/images/testi-shape-2.png"}
        draggable="false"
        className="absolute top-32 right-20 animate-movebtn hidden lg:block"
      />
      <div className="Container">
        <div className="text-center">
          <h5 className="font-AlbertSans text-white font-medium text-PrimaryColor-0 flex items-center gap-2 justify-center">
            <img src={"/images/sub-title-shape.png"} draggable="false" />
            KEY FEATURES & CAPABILITIES
          </h5>
          <h1 className="font-AlbertSans font-bold text-xl leading-6 sm:text-[38px] sm:leading-[48px] md:text-[40px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[40px] xl:leading-[50px] 2xl:text-[46px] 2xl:leading-[56px] text-white mt-5 mb-3 pb-9">
            Advanced AI-Powered Tools for <br />
            Forest Rights Act Implementation
          </h1>
        </div>

        <div className="mt-[40px] border md:px-20 px-5">
          <Swiper {...settings} modules={[Pagination, Autoplay]}>
            {ServiceData.map((service) => (
              <SwiperSlide key={service.id}>
                <ServiceCard
                  serviceImg={service.serviceImg}
                  serviceIcon={service.serviceIcon}
                  serviceUrl={service.serviceUrl}
                  serviceButton={service.serviceButton}
                  serviceButton2={service.serviceButton2}
                  serviceTitle={service.serviceTitle}
                  serviceDesc={service.serviceDesc}
                  serviceShape={service.serviceShape}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Service;
