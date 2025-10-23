"use client"
import CountUp from "react-countup";

const Rating = () => {
  return (
    <div className="bg-[linear-gradient(180deg,_rgba(245,248,237,1)_50%,_rgba(255,255,255,1)_50%)]">
      <div className="Container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center bg-[url('/images/rating-bg.jpg')] bg-cover bg-no-repeat bg-center rounded-md px-5 sm:px-[60px] py-11">
          <h1 className="font-AlbertSans font-bold text-[20px] leading-7 sm:text-[34px] sm:leading-[44px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[40px] xl:leading-[50px] 2xl:text-[46px] 2xl:leading-[56px] text-white mt-5 mb-3">
            FRA Atlas System <br />
            Performance & Impact
          </h1>
          <div className="grid grid-cols-2 gap-4 lg:gap-2 xl:gap-4">
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-2 xl:gap-4">
              <div>
                <img src={"/images/team-1.png"} draggable="false" className="m-auto w-8 h-8 sm:w-auto sm:h-auto" />
              </div>
              <div>
                <CountUp
                  start={0}
                  end={1250}
                  suffix="+"
                  className="font-AlbertSans text-[28px] sm:text-[36px] lg:text-[32px] xl:text-[40px] text-white font-bold"
                />
                <p className="font-AlbertSans text-white text-sm sm:text-lg lg:text-sm xl:text-lg -mt-1">
                  Communities Served
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-2 xl:gap-4">
              <div>
                <img src={"/images/team-1.png"} draggable="false" className="m-auto w-8 h-8 sm:w-auto sm:h-auto" />
              </div>
              <div>
                <CountUp
                  start={0}
                  end={95}
                  suffix=".8%"
                  className="font-AlbertSans text-[28px] sm:text-[36px] lg:text-[32px] xl:text-[40px] text-white font-bold"
                />
                <p className="font-AlbertSans text-white text-sm sm:text-lg lg:text-sm xl:text-lg -mt-1">
                  AI Accuracy
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-2 xl:gap-4">
              <div>
                <img src={"/images/team-1.png"} draggable="false" className="m-auto w-8 h-8 sm:w-auto sm:h-auto" />
              </div>
              <div>
                <CountUp
                  start={0}
                  end={8500}
                  suffix="+"
                  className="font-AlbertSans text-[28px] sm:text-[36px] lg:text-[32px] xl:text-[40px] text-white font-bold"
                />
                <p className="font-AlbertSans text-white text-sm sm:text-lg lg:text-sm xl:text-lg -mt-1">
                  Rights Processed
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 sm:gap-4 lg:gap-2 xl:gap-4">
              <div>
                <img src={"/images/team-1.png"} draggable="false" className="m-auto w-8 h-8 sm:w-auto sm:h-auto" />
              </div>
              <div>
                <CountUp
                  start={0}
                  end={4}
                  suffix=" States"
                  className="font-AlbertSans text-[28px] sm:text-[36px] lg:text-[32px] xl:text-[40px] text-white font-bold"
                />
                <p className="font-AlbertSans text-white text-sm sm:text-lg lg:text-sm xl:text-lg -mt-1">
                  Implementation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
