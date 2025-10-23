/* eslint-disable no-unused-vars */
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProjectCard from "./ProjectCard";
import { GoArrowUpRight } from "react-icons/go";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const ProjectData = [
  {
    id: 1,
    projectThumb: "/images/project-thumb.jpg",
    projectSubTitle: "Climate",
    projectTitle: "Cleaning Forest",
    buttonUrl: "/project_details",
    projectButton: <GoArrowUpRight />,
    projectContentShape: "/images/project-content-shape.png",
    projectShape: "/images/project-shape.png",
  },
  {
    id: 2,
    projectThumb: "/images/project-thumb2.jpg",
    projectSubTitle: "Environment",
    projectTitle: "Tree Plantation",
    buttonUrl: "/project_details",
    projectButton: <GoArrowUpRight />,
    projectContentShape: "/images/project-content-shape.png",
    projectShape: "/images/project-shape.png",
  },
  {
    id: 3,
    projectThumb: "/images/project-thumb3.jpg",
    projectSubTitle: "Recycling",
    projectTitle: "Plastic Recycling",
    buttonUrl: "/project_details",
    projectButton: <GoArrowUpRight />,
    projectContentShape: "/images/project-content-shape.png",
    projectShape: "/images/project-shape.png",
  },
  {
    id: 4,
    projectThumb: "/images/project-thumb4.jpg",
    projectSubTitle: "Climate",
    projectTitle: "Cleaning Forest",
    buttonUrl: "/project_details",
    projectButton: <GoArrowUpRight />,
    projectContentShape: "/images/project-content-shape.png",
    projectShape: "/images/project-shape.png",
  },
  {
    id: 5,
    projectThumb: "/images/project-thumb4.jpg",
    projectSubTitle: "Climate",
    projectTitle: "Cleaning Forest",
    buttonUrl: "/project_details",
    projectButton: <GoArrowUpRight />,
    projectContentShape: "/images/project-content-shape.png",
    projectShape: "/images/project-shape.png",
  },
];

const Project = () => {
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
      renderBullet: (index, className) => {
        return `<span class="${className} pagination-bullet"></span>`;
      },
    },
  };
  
  return (
    <section className="project bg-[url('/images/project-bg.jpg')] bg-cover bg-center bg-no-repeat py-28 project">
      <div className="text-center">
        <h5 className="font-AlbertSans font-medium text-PrimaryColor-0 flex items-center justify-center gap-2">
          <img src={"/images/sub-title-shape.png"} draggable="false" />
          OUR PROJECTS
        </h5>
        <h1 className="font-AlbertSans font-bold text-xl leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[40px] xl:leading-[50px] 2xl:text-[46px] 2xl:leading-[56px] text-HeadingColor-0 mt-5 mb-3">
          Finished the Latest Leading <br />
          Environmental Works
        </h1>
      </div>
        <div className="mt-[40px] border md:px-10 px-2">
          <Swiper {...settings} modules={[Pagination, Autoplay]}>
          <div>
            {ProjectData.map(
              ({
                id,
                projectThumb,
                projectShape,
                projectContentShape,
                projectSubTitle,
                projectTitle,
                buttonUrl,
                projectButton,
                buttonIcon,
              }) => {
                return (
                  <SwiperSlide key={id}>
                    <div className="pb-[100px]">
                      <ProjectCard
                        projectThumb={projectThumb}
                        projectContentShape={projectContentShape}
                        projectShape={projectShape}
                        projectSubTitle={projectSubTitle}
                        projectTitle={projectTitle}
                        buttonUrl={buttonUrl}
                        projectButton={projectButton}
                        buttonIcon={buttonIcon}
                      />
                    </div>
                  </SwiperSlide>
                );
              }
            )}
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default Project;
