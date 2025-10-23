import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaLinkedinIn, FaPinterestP, FaXTwitter } from "react-icons/fa6";

const Banner = () => {
  return (
    <section className="bg-[url('/images/hero-bg.jpg')] bg-cover bg-center bg-no-repeat min-h-screen flex flex-col items-center justify-center relative z-10 overflow-hidden">
      {/* Background decoration */}
      <img
        src={"/images/banner-shape.png"}
        draggable="false"
        className="absolute top-0 -left-5 animate-dance2 hidden lg:block"
        alt="Banner decoration"
      />

      {/* Right corner - Banner Image */}
      <img
        src={"/images/banner-thumb.png"}
        draggable="false"
        className="absolute lg:w-6/12 top-0 -right-5 animate-dance2 hidden lg:block"
      />

      <div className="container mx-auto px-4 md:mt-10 sm:px-6 lg:px-8 max-w-7xl py-20">
        {/* Main Content Section - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-left">
            <h5 className="font-AlbertSans text-PrimaryColor-0 text-black font-medium flex items-center gap-2 mb-5">
              <img src={"/images/sub-title-shape.png"} alt="Shape" />
              FOREST RIGHTS ACT MONITORING
            </h5>

            <h1 className="font-AlbertSans text-black font-extrabold text-HeadingColor-0 text-[28px] leading-[34px] sm:text-[42px] sm:leading-[48px] md:text-[50px] md:leading-[56px] lg:text-[58px] lg:leading-[64px] xl:text-[66px] xl:leading-[72px] mb-5">
              Empowering Communities. Securing Rights.{" "}
            </h1>

            <p className="font-AlbertSans text-black text-TextColor-0 mb-8 leading-relaxed">
              Advanced WebGIS-based monitoring and decision support for Forest
              Rights Act implementation across Madhya Pradesh, Tripura, Odisha,
              and Telangana. Empowering communities through data-driven insights
              and transparent forest rights tracking.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start gap-4 mb-12">
              <Button variant="default" size="lg" asChild>
                <Link href="/atlas/interactive-map" className="min-w-[140px]">
                  Explore FRA Atlas <ArrowRightIcon className="ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/dashboard" className="min-w-[140px]">
                  View Dashboard
                </Link>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6">
              <span className="font-AlbertSans text-HeadingColor-0 text-sm font-medium">
                GOVERNMENT LINKS
              </span>
              <div className="h-[1px] w-12 bg-HeadingColor-0"></div>
              <ul className="flex gap-4 items-center">
                <li>
                  <Link
                    href="https://tribal.nic.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all duration-300 text-HeadingColor-0 hover:text-PrimaryColor-0 p-2"
                    title="Ministry of Tribal Affairs"
                  >
                    <FaLinkedinIn className="w-5 h-5" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://moef.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-all duration-300 text-HeadingColor-0 hover:text-PrimaryColor-0 p-2"
                    title="Ministry of Environment & Forests"
                  >
                    <FaXTwitter className="w-5 h-5" />
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="transition-all duration-300 text-HeadingColor-0 hover:text-PrimaryColor-0 p-2"
                    title="Contact Support"
                  >
                    <FaPinterestP className="w-5 h-5" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Demo Images Section */}
        <div className="flex flex-col items-center text-center space-y-16">
          <div className="w-full max-w-6xl mx-auto">
            <div className="relative flex justify-center">
              {/* Main Desktop/Laptop Image */}
              <div className="relative z-10">
                <Image
                  src="/demo-light-min.png"
                  width={900}
                  height={506}
                  alt="Desktop Application Demo"
                  priority
                  className="border rounded-2xl shadow-2xl dark:hidden max-w-full h-auto"
                />
                <Image
                  src="/demo-dark-min.png"
                  width={900}
                  height={506}
                  alt="Desktop Application Demo - Dark Mode"
                  priority
                  className="border border-zinc-600 rounded-2xl shadow-2xl hidden dark:block dark:shadow-gray-500/5 max-w-full h-auto"
                />
              </div>

              {/* Mobile Phone Overlay — show only on large screens for professionalism */}
              <div className="absolute -bottom-6 -right-8 lg:-right-12 z-20 hidden lg:block">
                <div className="relative">
                  <Image
                    src="/demo-mobile-light-min.png"
                    width={200}
                    height={433}
                    alt="Mobile Application Demo"
                    className="border rounded-2xl shadow-2xl dark:hidden transform rotate-3 hover:rotate-0 transition-transform duration-300"
                  />
                  <Image
                    src="/demo-mobile-dark-min.png"
                    width={200}
                    height={433}
                    alt="Mobile Application Demo - Dark Mode"
                    className="border border-zinc-600 rounded-2xl shadow-2xl hidden dark:block transform rotate-3 hover:rotate-0 transition-transform duration-300"
                  />
                </div>
              </div>

              {/* Subtle gradient for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
