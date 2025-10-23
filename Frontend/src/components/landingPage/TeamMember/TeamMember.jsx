import TeamCard from "./TeamCard";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaPinterestP,
  FaXTwitter,
} from "react-icons/fa6";

const teamData = [
  {
    id: 1,
    teamThumb: "/images/team-thumb.png",
    teamTitle: "Dr. Sarah Chen",
    teamDesignation: "Environmental Scientist",
    teamIcon: <FaFacebookF />,
    teamIcon2: <FaXTwitter />,
    teamIcon3: <FaLinkedinIn />,
    teamIcon4: <FaPinterestP />,
  },
  {
    id: 2,
    teamThumb: "/images/team-thumb2.png",
    teamTitle: "Michael Rodriguez",
    teamDesignation: "Sustainability Manager",
    teamIcon: <FaFacebookF />,
    teamIcon2: <FaXTwitter />,
    teamIcon3: <FaLinkedinIn />,
    teamIcon4: <FaPinterestP />,
  },
  {
    id: 3,
    teamThumb: "/images/team-thumb3.png",
    teamTitle: "Emma Thompson",
    teamDesignation: "Climate Advocate",
    teamIcon: <FaFacebookF />,
    teamIcon2: <FaXTwitter />,
    teamIcon3: <FaLinkedinIn />,
    teamIcon4: <FaPinterestP />,
  },
  {
    id: 4,
    teamThumb: "/images/team-thumb4.png",
    teamTitle: "James Wilson",
    teamDesignation: "Conservation Expert",
    teamIcon: <FaFacebookF />,
    teamIcon2: <FaXTwitter />,
    teamIcon3: <FaLinkedinIn />,
    teamIcon4: <FaPinterestP />,
  },
];

const TeamMember = () => {
  return (
    <section className="py-16 bg-[url('/images/about-bg.jpg')] bg-cover bg-center bg-no-repeat relative overflow-hidden">
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 -z-10"></div>

      {/* Decorative shapes */}
      <img
        src="/images/about-shape-1.png"
        alt="shape"
        className="absolute top-10 left-10 animate-dance2 hidden lg:block opacity-70"
      />
      <img
        src="/images/service-main-shape-2.png"
        alt="shape"
        className="absolute bottom-10 right-10 animate-movebtn hidden lg:block opacity-70"
      />

      <div className="container mx-auto px-4 mt-10 sm:px-6 lg:px-8 max-w-7xl py-20">
        <div className="text-center">
          <h5 className="font-AlbertSans font-medium text-PrimaryColor-0 flex items-center gap-2 justify-center mb-4">
            <img
              src="/images/about-shape-1.png"
              draggable="false"
              className="w-6 h-auto"
            />
            OUR TEAM
          </h5>
          <h1 className="font-AlbertSans font-bold text-[22px] leading-8 sm:text-[38px] sm:leading-[48px] md:text-[44px] md:leading-[54px] lg:text-[32px] lg:leading-[42px] xl:text-[40px] xl:leading-[50px] 2xl:text-[46px] 2xl:leading-[56px] text-white mt-5 mb-3">
            Meet Our Expert Members
          </h1>
          <p className="font-AlbertSans text-TextColor-0 max-w-3xl mx-auto mb-12">
            Our dedicated team of environmental experts is committed to creating
            a sustainable future through innovative solutions and passionate
            advocacy.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7 mt-16">
          {teamData.map(
            ({
              id,
              teamThumb,
              teamTitle,
              teamDesignation,
              teamIcon,
              teamIcon2,
              teamIcon3,
              teamIcon4,
            }) => {
              return (
                <div key={id} className="group">
                  <TeamCard
                    teamThumb={teamThumb}
                    teamTitle={teamTitle}
                    teamDesignation={teamDesignation}
                    teamIcon={teamIcon}
                    teamIcon2={teamIcon2}
                    teamIcon3={teamIcon3}
                    teamIcon4={teamIcon4}
                  />
                </div>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamMember;
