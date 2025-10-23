/* eslint-disable no-unused-vars */
import ProcessCard from "./ProcessCard2";

const processData = [
  {
    id: 1,
    processIcon: "/images/process-icon.png",
    boxShape: "/images/process-arrow.png",
    processTitle: "Data Collection & Analysis",
    processDesc:
      "Admin collects forest rights applications, tribal community data, and land records. AI algorithms analyze patterns and validate submissions across the four target states.",
  },

  {
    id: 2,
    processIcon: "/images/process-icon2.png",
    boxShape: "/images/process-arrow2.png",
    processTitle: "AI-Powered Assessment",
    processDesc:
      "Advanced machine learning models process applications, identify discrepancies, generate insights, and provide recommendations for policy decisions and implementation strategies.",
  },
  {
    id: 3,
    processIcon: "/images/process-icon3.png",
    processTitle: "Decision Support & Monitoring",
    processDesc:
      "Admin dashboard provides real-time monitoring, progress tracking, policy recommendations, and comprehensive reports for informed decision-making and transparent implementation.",
  },
];

const Process = () => {
  return (
    <section className="relative z-10">
      <div className="processShape"></div>
      <div className="container mx-auto px-4 mt-10 sm:px-6 lg:px-8 max-w-7xl py-20">
        <div className="text-center">
          <h5 className="font-AlbertSans font-medium text-PrimaryColor-0 flex items-center gap-2 justify-center">
            <img src={"/images/sub-title-shape.png"} draggable="false" />
            ADMIN WORKFLOW PROCESS
          </h5>
          <h1 className="font-AlbertSans font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[40px] xl:leading-[50px] 2xl:text-[46px] 2xl:leading-[56px] text-HeadingColor-0 mt-5 mb-3">
            How Administrators Use FRA Atlas
          </h1>
        </div>
        <div className="pb-16 mt-[60px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {processData.map(
              ({ id, processIcon, processTitle, boxShape, processDesc }) => {
                return (
                  <div key={id}>
                    <ProcessCard
                      processIcon={processIcon}
                      boxShape={boxShape}
                      processTitle={processTitle}
                      processDesc={processDesc}
                    />
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
