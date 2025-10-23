import Footer2 from "@/components/landingPage/Footer/Footer";
import ScrollToTop from "@/components/landingPage/ScrollToTop/ScrollToTop";
import Banner from "@/components/landingPage/Banner/Banner";
import About from "@/components/landingPage/About/About";
import Service from "@/components/landingPage/Service/Service";
import Rating from "@/components/landingPage/Rating/Rating";
import Faq from "@/components/landingPage/Faq/Accordion/Faq";
import Testimonial from "@/components/landingPage/Testimonial/Testimonial";
import ContentSlider2 from "@/components/landingPage/ContentSlider2/ContentSlider2";
import Process2 from "@/components/landingPage/Process/Process2";
import Appointment from "@/components/landingPage/Appointment/Appointment";
import { Navbar } from "@/components/landingPage/Navbar/nav";
import Project from "@/components/landingPage/Project/Project";
import Brand from "@/components/landingPage/Brand/Brand";
import Donation from "@/components/landingPage/Donations/Donation";
import Blog from "@/components/landingPage/Blog/Blog";
import Skill from "@/components/landingPage/Skill/Skill";
import Events from "@/components/landingPage/Events/Events";
import TeamMember from "@/components/landingPage/TeamMember/TeamMember";
const Main3 = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div >
        <Banner />
        <About />
        <Service />
        <Process2 />
        <Rating />
        <Faq />
        <ContentSlider2 />
        <Testimonial />
        <Appointment />
        {/*
        <Skill />
        
        //images for the impacts
        <Project />
        
        // a fancy animated section onhover
        <Events />
        
        //need ui correction
        <TeamMember />
        
        //didnt need this but can be used in future
        <Donation />
        <Blog /> 
        <Brand />
        */}
      </div>
      <Footer2 />
    </>
  );
};
export default Main3;
