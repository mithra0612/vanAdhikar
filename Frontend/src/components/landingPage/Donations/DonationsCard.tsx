/* eslint-disable react/prop-types */
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

interface DonationsCardProps {
  donateImg: string;
  imgbutton: string;
  donateUrl: string;
  donateTitle: string;
  donateDesc: string;
  donatePercent: number;
  percentTitle: string;
  percentNumber: string;
  percentTitle2: string;
  percentNumber2: string;
}

const DonationsCard = ({
  donateImg,
  imgbutton,
  donateUrl,
  donateTitle,
  donateDesc,
  donatePercent,
  percentTitle,
  percentNumber,
  percentTitle2,
  percentNumber2,
}: DonationsCardProps) => {
  return (
    <div className="inline-block group">
      <div className="relative z-10 overflow-hidden rounded-t-md">
        <img
          src={donateImg}
          className="w-full transition-all duration-500 group-hover:blur-[2px]"
        />
        <Link href={donateUrl}>
          <button className="absolute inline-block text-left top-full left-1/2 -translate-x-1/2 group-hover:top-1/2 group-hover:-translate-y-1/2 font-AlbertSans rounded-full bg-PrimaryColor-0 text-white transition-all duration-500 px-6 sm:px-[30px] lg:px-[15px] xl:px-[30px] py-[14px]">
            {imgbutton}
          </button>
        </Link>
      </div>
      <div className="px-[30px] pb-8 pt-6 bg-white">
        <Link href={donateUrl}>
          <button className="font-AlbertSans font-semibold text-left text-xl sm:text-2xl lg:text-xl xl:text-2xl pb-4 text-HeadingColor-0 transition-all duration-500 group-hover:text-PrimaryColor-0">
            {donateTitle}
          </button>
        </Link>
        <p className="font-AlbertSans text-TextColor-0">{donateDesc}</p>
        <div className="mt-10">
          <Progress value={donatePercent} className="h-2 bg-[#e1efcb]" />
        </div>
        <div className="flex justify-between mt-4">
          <h6 className="font-AlbertSans text-TextColor-0">
            {percentTitle}
            <span className="text-HeadingColor-0"> {percentNumber}</span>
          </h6>
          <h6 className="font-AlbertSans text-TextColor-0">
            {percentTitle2}
            <span className="text-HeadingColor-0"> {percentNumber2}</span>
          </h6>
        </div>
      </div>
    </div>
  );
};

export default DonationsCard;
