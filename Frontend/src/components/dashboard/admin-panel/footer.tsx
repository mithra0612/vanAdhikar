import { Computer, Github } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-950 py-3 px-2 sm:px-4 md:px-0">
      <div className="mx-2 sm:mx-6 px-2 sm:px-6 p-2 sm:p-4 border rounded-xl bg-white shadow-md flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Left text */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-center md:justify-start">
          <span className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 text-center md:text-left">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-semibold text-blue-600 dark:text-blue-400">VanAdhikar</span>. All rights reserved.
          </span>
        </div>

        {/* Right links */}
        <div className="flex md:hidden flex-wrap items-center gap-3 sm:gap-6 w-full md:w-auto justify-center md:justify-end">
          <Link
            href="https://nextjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition text-xs sm:text-sm md:text-base"
          >
            <Computer size={16} /> Next.js
          </Link>
          <Link
            href="https://github.com/girish-gaikwad/VanAdhikar"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-medium text-gray-500 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition text-xs sm:text-sm md:text-base"
          >
            <Github size={16} /> GitHub
          </Link>
          <span className="hidden md:inline text-gray-400">|</span>
          <span className="text-xs sm:text-sm md:text-base text-gray-500 dark:text-gray-400">
            Made with <span className="text-red-500">❤️</span> for SIH 2025
          </span>
        </div>
      </div>
    </footer>
  );
}
