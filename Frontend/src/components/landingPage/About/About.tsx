"use client"
import { useState } from "react";
import FsLightbox from "fslightbox-react";
import { CiPlay1 } from "react-icons/ci";
import Link from "next/link";

const About = () => {
  const [toggler, setToggler] = useState(false);

  return (
    <section className="py-[120px] bg-[url('/images/about-bg.jpg')] bg-cover bg-center bg-no-repeat relative overflow-hidden">
      <img
        src={"/images/about2-shape.png"}
        draggable="false"
        className="absolute -bottom-52 -right-20"
      />
      <img
        src={"/images/testi-shape-3.png"}
        draggable="false"
        className="absolute top-32 right-20 animate-zoomInOut hidden 2xl:block"
      />

      <FsLightbox
        toggler={toggler}
        sources={[
          "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        ]}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Images */}
          <div className="relative z-10">
            <img src={"/images/about-1.png"} draggable="false" className="w-full h-auto" />
            <img
              src={"/images/about-2.png"}
              draggable="false"
              className="absolute bottom-0 right-0 hidden sm:block"
            />
            <div className="absolute top-16 right-[60px] lg:right-[30px] xl:-right-[30px] 2xl:right-[60px] hidden sm:block">
              <button
                className="h-[88px] w-[88px] rounded-full border-4 border-white text-2xl text-white bg-PrimaryColor-0 flex justify-center items-center relative z-50 shadow-2xl hover:scale-110 transition-all duration-300 cursor-pointer group"
                onClick={() => setToggler(!toggler)}
                title="Play Video"
                aria-label="Play Video"
              >
                <CiPlay1 className="text-3xl ml-1" />

                {/* Animated rings */}
                <div className="absolute inset-0 rounded-full border-2 border-PrimaryColor-0 opacity-30 animate-ping"></div>
                <div className="absolute -inset-4 rounded-full border-2 border-dashed border-PrimaryColor-0 opacity-50 animate-spin-slow"></div>

                {/* Hover effect overlay */}
                <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="text-left">
            <h5 className="font-AlbertSans font-medium text-PrimaryColor-0 flex items-center gap-2 mb-6">
              <img src={"/images/sub-title-shape.png"} draggable="false" />
              ABOUT FRA ATLAS
            </h5>
            <h1 className="font-AlbertSans font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[40px] xl:leading-[50px] 2xl:text-[46px] 2xl:leading-[56px] text-HeadingColor-0 mb-6">
              AI-Powered Forest Rights <br />
              Monitoring & Decision Support
            </h1>
            <p className="font-AlbertSans text-TextColor-0 font-light mb-8 leading-relaxed">
              {`The Forest Rights Act (2006) recognizes the rights of forest-dwelling tribal communities and other traditional forest dwellers. Our advanced AI-powered FRA Atlas provides comprehensive monitoring, transparent implementation tracking, and data-driven insights across Madhya Pradesh, Tripura, Odisha, and Telangana to ensure effective forest rights recognition.`}
            </p>

            {/* Features Grid */}
            <div className="grid items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2 gap-7 border-t border-BorderColor2-0 pt-8 border-b pb-8 mb-10">
              <div className="flex gap-6">
                <div className="bg-[#ebf5da] w-[65px] h-[65px] rounded flex items-center justify-center">
                  <img src={"/images/about2-icon.png"} draggable="false" />
                </div>
                <div className="flex-1">
                  <h5 className="font-AlbertSans font-semibold text-[22px] text-HeadingColor-0 -mt-2">
                    Community Empowerment
                  </h5>
                  <p className="font-AlbertSans text-TextColor-0 text-[17px] pt-2">
                    Transparent forest rights tracking for tribal communities
                  </p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="bg-[#ebf5da] w-[65px] h-[65px] rounded flex items-center justify-center">
                  <img src={"/images/about2-icon2.png"} draggable="false" />
                </div>
                <div className="flex-1">
                  <h5 className="font-AlbertSans font-semibold text-[22px] text-HeadingColor-0 -mt-2">
                    Government Efficiency
                  </h5>
                  <p className="font-AlbertSans text-TextColor-0 text-[17px] pt-2">
                    AI-driven insights for informed policy decisions
                  </p>
                </div>
              </div>
            </div>

            {/* Call to Action Button */}
            <Link href={"/atlas/overview"}>
              <button className="primary-btn">
                {`Explore FRA Atlas`}
                <img src={"/images/button-shape-1.png"} draggable="false" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
