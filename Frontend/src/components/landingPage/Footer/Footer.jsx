import Image from "next/image";
import {
  FaArrowRightLong,
  FaChevronRight,
  FaFacebookF,
  FaLinkedinIn,
  FaPhone,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-[url('/images/footer-bg.jpg')] bg-no-repeat bg-center bg-cover relative z-10 overflow-hidden" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <img
        src="/images/footer-line.png"
        draggable="false"
        className="absolute -z-10 right-0 -bottom-20 opacity-70"
      />
      <img
        src="/images/footer-shape.png"
        draggable="false"
        className="absolute -z-10 top-0 left-0 animate-dance2"
      />
      <div className="container mx-auto px-4 mt-10 sm:px-6 lg:px-8 max-w-7xl py-10">
        <div className="relative">
          <div className="bg-[url('/images/footer-social.jpg')] bg-no-repeat bg-cover bg-center relative rounded-md ">
            <div className="flex flex-col gap-7 lg:gap-0 lg:flex-row lg:items-center lg:justify-between p-10 mb-[90px]">
              <div>
                <h2 className="font-AlbertSans font-bold text-[30px] sm:text-[40px]" style={{ color: "var(--primary)" }}>
                  Connect With Government Portals
                </h2>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <h5 className="font-AlbertSans font-semibold text-white text-lg uppercase">
                  Official Links :
                </h5>
                <ul className="flex gap-3">
                  <li>
                    <a
                      href="https://tribal.nic.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:text-primary overflow-hidden transition-all duration-500 hover:text-Primary relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-10 before:bg-white before:transition-all before:duration-500 before:scale-0 hover:before:scale-100"
                      title="Ministry of Tribal Affairs"
                    >
                      <FaFacebookF />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://moef.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:text-primary overflow-hidden transition-all duration-500 hover:text-PrimaryColor-0 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-10 before:bg-white before:transition-all before:duration-500 before:scale-0 hover:before:scale-100"
                      title="Ministry of Environment & Forests"
                    >
                      <FaXTwitter />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://india.gov.in"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:text-primary overflow-hidden transition-all duration-500 hover:text-PrimaryColor-0 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-10 before:bg-white before:transition-all before:duration-500 before:scale-0 hover:before:scale-100"
                      title="National Portal of India"
                    >
                      <FaLinkedinIn />
                    </a>
                  </li>
                  <li>
                    <a
                      href="/contact"
                      className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white hover:text-primary overflow-hidden transition-all duration-500 hover:text-PrimaryColor-0 relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:-z-10 before:bg-white before:transition-all before:duration-500 before:scale-0 hover:before:scale-100"
                      title="Contact Support"
                    >
                      <FaPinterestP />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:flex justify-center items-center w-full absolute top-1/4 left-16 md:left-1/3 lg:left-16 hidden ">
              <img
                src="/images/footer-shape2.png"
                draggable="false"
                className="animate-zoomInOut"
              />
            </div>
          </div>
          <img
            src="/images/footer-social-shape.png"
            draggable="false"
            className="absolute -z-10 -bottom-[70px] -right-[10px] animate-dance2"
          />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <a
              href="/"
              className="flex items-center font-AlbertSans text-2xl text-white font-bold"
            >
              <Image
                src="/logos/applogo.png"
                alt="Logo"
                width={36}
                height={36}
                className="mr-2 brightness-0 invert"
                draggable={false}
              />
              VanAdhikar
            </a>

            <p className="font-AlbertSans mt-7 mb-5" style={{ color: "var(--foreground)" }}>
              Advanced AI-powered monitoring system for Forest Rights Act
              implementation across India. Empowering communities through
              transparent data and decision support tools.
            </p>
            <div>
              <h6 className="font-AlbertSans font-medium text-white text-lg pl-8 relative before:absolute before:top-1/2 before:left-0 before:-translate-y-1/2 before:bg-PrimaryColor-0 before:w-[22px] before:h-[2px]">
                Support Contact
              </h6>
              <a href="tel:+911234567890" className="mt-[18px] block">
                <button className="flex items-center gap-3 font-AlbertSans text-white transition-all duration-500 hover:text-PrimaryColor-0">
                  <FaPhone className="text-PrimaryColor-0" />
                  +91 (1234) 567-890
                </button>
              </a>
              <a
                href="mailto:support@vanadhikar.gov.in"
                className="mt-[18px] block"
              >
                <button className="flex items-center gap-3 font-AlbertSans text-white transition-all duration-500 hover:text-PrimaryColor-0">
                  <MdEmail size={"18"} className="text-PrimaryColor-0" />
                  support@vanadhikar.gov.in
                </button>
              </a>
            </div>
          </div>
          <div>
            <h4 className="font-AlbertSans text-2xl text-white font-semibold mb-[30px]">
              FRA Atlas
            </h4>
            <ul>
              <li>
                <a href="/atlas/overview">
                  <button className="flex items-center gap-2 font-AlbertSans text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-[18px] opacity-60 hover:!opacity-100">
                    <FaChevronRight className="text-xs opacity-60" />
                    Atlas Overview
                  </button>
                </a>
              </li>
              <li>
                <a href="/atlas/interactive-map">
                  <button className="flex items-center gap-2 font-AlbertSans text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-[18px] opacity-60 hover:!opacity-100">
                    <FaChevronRight className="text-xs opacity-60" />
                    Interactive WebGIS
                  </button>
                </a>
              </li>
              <li>
                <a href="/atlas/forest-rights">
                  <button className="flex items-center gap-2 font-AlbertSans text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-[18px] opacity-60 hover:!opacity-100">
                    <FaChevronRight className="text-xs opacity-60" />
                    Forest Rights Data
                  </button>
                </a>
              </li>
              <li>
                <a href="/atlas/ai-insights">
                  <button className="flex items-center gap-2 font-AlbertSans text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-[18px] opacity-60 hover:!opacity-100">
                    <FaChevronRight className="text-xs opacity-60" />
                    AI-Powered Insights
                  </button>
                </a>
              </li>
              <li>
                <a href="/monitoring/dashboard">
                  <button className="flex items-center gap-2 font-AlbertSans text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 opacity-60 hover:!opacity-100">
                    <FaChevronRight className="text-xs opacity-60" />
                    Monitoring Dashboard
                  </button>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-AlbertSans text-2xl text-white font-semibold mb-[30px]">
              States & Resources
            </h4>
            <ul>
              <li>
                <a href="/states/madhya-pradesh">
                  <button className="flex items-center gap-2 font-AlbertSans text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-[18px] opacity-60 hover:!opacity-100">
                    <FaChevronRight className="text-xs opacity-60" />
                    Madhya Pradesh
                  </button>
                </a>
              </li>
              <li>
                <a href="/states/tripura">
                  <button className="flex items-center gap-2 font-AlbertSans text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-[18px] opacity-60 hover:!opacity-100">
                    <FaChevronRight className="text-xs opacity-60" />
                    Tripura
                  </button>
                </a>
              </li>
              <li>
                <a href="/states/odisha">
                  <button className="flex items-center gap-2 font-AlbertSans text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-[18px] opacity-60 hover:!opacity-100">
                    <FaChevronRight className="text-xs opacity-60" />
                    Odisha
                  </button>
                </a>
              </li>
              <li>
                <a href="/states/telangana">
                  <button className="flex items-center gap-2 font-AlbertSans text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 mb-[18px] opacity-60 hover:!opacity-100">
                    <FaChevronRight className="text-xs opacity-60" />
                    Telangana
                  </button>
                </a>
              </li>
              <li>
                <a href="/dss/decision-support">
                  <button className="flex items-center gap-2 font-AlbertSans text-white transition-all duration-500 hover:text-PrimaryColor-0 hover:gap-1 opacity-60 hover:!opacity-100">
                    <FaChevronRight className="text-xs opacity-60" />
                    Decision Support
                  </button>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-AlbertSans text-2xl text-white font-semibold mb-8">
              Updates & Alerts
            </h4>
            <p className="font-AlbertSans text-TextColor-0 font-medium mb-[22px]">
              Subscribe for FRA Implementation Updates
            </p>
            <form action="#" method="post">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Official Email*"
                required
                className="w-full h-[60px] rounded-full font-AlbertSans border border-PrimaryColor-0 border-opacity-50 bg-transparent px-6 py-2 text-white placeholder:text-white mb-4"
              />
              <button
                type="submit"
                className="w-full h-[58px] rounded-full border border-PrimaryColor-0 bg-PrimaryColor-0 gap-2 px-6 py-2 text-white font-AlbertSans uppercase flex items-center justify-center relative z-10 before:absolute before:top-0 before:left-0 before:w-full before:h-full before:rounded-full before:bg-[#041e15] before:-z-10 before:scale-0 before:transition-all before:duration-500 hover:before:scale-100"
              >
                Subscribe <FaArrowRightLong />
              </button>
            </form>
          </div>
        </div>
        <div className="text-left sm:text-center pb-6 mt-16">
          <p className="font-AlbertSans text-white">
            © Copyrights 2024 VanAdhikar - AI-Powered FRA Atlas. All rights
            reserved by
            <span className="text-PrimaryColor-0"> Government of India</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
