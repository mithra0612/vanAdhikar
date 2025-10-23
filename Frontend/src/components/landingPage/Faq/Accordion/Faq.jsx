"use client";
import Link from "next/link";
import FaqAccordion from "./FaqAccordion";

const Faq = () => {
  //  All Faqs and  answers.
  const faqs = [
    {
      faqIcon: "/images/faq-icon.png",
      title: "What is the Forest Rights Act and how does VanAdhikar help?",
      text: "The Forest Rights Act (2006) recognizes the rights of forest-dwelling tribal communities. VanAdhikar provides AI-powered monitoring, transparent tracking, and comprehensive data analysis to ensure effective FRA implementation across Madhya Pradesh, Tripura, Odisha, and Telangana.",
      active: true,
    },
    {
      faqIcon: "/images/faq-icon.png",
      title: "How accurate is the AI-powered analysis system?",
      text: "Our AI system maintains 95.8% accuracy in processing forest rights applications and generating insights. The machine learning algorithms continuously learn from new data to improve prediction accuracy and policy recommendations for better decision-making.",
      active: false,
    },
    {
      faqIcon: "/images/faq-icon.png",
      title: "Which states are currently covered by the FRA Atlas?",
      text: "Currently, VanAdhikar covers four major states: Madhya Pradesh, Tripura, Odisha, and Telangana. We provide comprehensive monitoring, WebGIS mapping, and decision support tools specifically tailored for forest rights implementation in these regions.",
      active: false,
    },
    {
      faqIcon: "/images/faq-icon.png",
      title: "How can government officials access the admin dashboard?",
      text: "Government officials and authorized personnel can access the admin dashboard through secure login credentials. The dashboard provides real-time monitoring, progress tracking, AI insights, and comprehensive reporting tools for effective FRA implementation management.",
      active: false,
    },
  ];

  return (
    <section
      className="relative overflow-hidden py-20 bg-[url('/images/faq-bg.jpg')] bg-cover bg-no-repeat
     bg-center"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 items-center">
          <div className="relative">
            <img
              src={"/images/faqs-shape2.png"}
              className="absolute -top-28 right-10 animate-movebtn"
            />
            <h5 className="font-AlbertSans font-medium text-PrimaryColor-0 flex items-center gap-2">
              <img src={"/images/sub-title-shape.png"} draggable="false" />
              FREQUENTLY ASKED QUESTIONS
            </h5>
            <h1 className="font-AlbertSans font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[40px] xl:leading-[50px] 2xl:text-[46px] 2xl:leading-[56px] text-HeadingColor-0 mt-5 mb-6">
              Common Questions About <br />
              FRA Implementation
            </h1>
            <p className="font-AlbertSans text-TextColor-0 font-light mb-9">
              {`Get answers to frequently asked questions about Forest Rights Act implementation, our AI-powered monitoring system, and how government officials can effectively use VanAdhikar for transparent forest rights tracking and decision support.`}
            </p>
            <Link href={"/contact"}>
              <button className="primary-btn">
                {`Contact Support`}
                <img src={"/images/button-shape-1.png"} draggable="false" />
              </button>
            </Link>
          </div>
          <div className="w-full mx-auto">
            <div>
              {faqs.map((faq, index) => (
                <FaqAccordion
                  key={index}
                  faqIcon={faq.faqIcon}
                  title={faq.title}
                  id={`faqs-${index}`}
                  active={faq.active}
                >
                  {faq.text}
                </FaqAccordion>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
