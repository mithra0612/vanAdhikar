"use client";
import { ModeToggle } from "@/components/appComponents/mode-toggle";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart2,
  ChevronDown,
  FileSliders,
  LandPlot,
  Loader2,
  Map,
  MapPinHouse,
  Menu,
  Search,
  Settings,
  Signpost,
  Trophy,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import useDashboardStore from "../../../stores/searchStore";
import DistrictSearch from "./nav/searchDistrict";
import RegionSearch from "./nav/searchState";
import SearchTaluk from "./nav/searchTaluk";
import VillageSearch from "./nav/searchVillage";

const SearchNavbar = ({handleDashBoardLoading}) => {
  const {
    activeTab,
    setActiveTab,
    State,
    village,
    District,
    setLoading,
    taluk,
    setState,
    setDistrict,
    setTaluk,
    setVillage,
  } = useDashboardStore();

  const [isShrink, setIsShrink] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showQuickSearch, setShowQuickSearch] = useState(false);
  const [quickSearchQuery, setQuickSearchQuery] = useState("");
  const [quickSearchResults, setQuickSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  const modalRefs = {
    state: useRef<HTMLDivElement>(null),
    district: useRef<HTMLDivElement>(null),
    taluk: useRef<HTMLDivElement>(null),
    "village/city": useRef<HTMLDivElement>(null),
  } as Record<string, React.RefObject<HTMLDivElement>>;
  const quickSearchRef = useRef(null);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName === activeTab ? "" : tabName);
  };

  const handleClick = () => {
    setIsShrink(!isShrink);
    if (!State && !District && !village && !taluk) {
      return;
    }
    setLoading(true);
    handleDashBoardLoading(true);
  };

  // Quick search API call
  const searchVillages = async (query) => {
    if (!query || query.length < 2) {
      setQuickSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(
        `https://www.india-location-hub.in/api/locations/villages?search=${encodeURIComponent(
          query
        )}`
      );
      const data = response.data;

      if (data.success && data.data.villages) {
        setQuickSearchResults(data.data.villages);
      } else {
        setQuickSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching villages:", error);
      setQuickSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounced search
  const handleQuickSearchChange = (e) => {
    const query = e.target.value;
    setQuickSearchQuery(query);

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const timeout = setTimeout(() => {
      searchVillages(query);
    }, 300);

    setDebounceTimeout(timeout);
  };

  // Select village from quick search
  const handleVillageSelect = (villageData) => {
    setState(villageData.state_name);
    setDistrict(villageData.district_name);
    setTaluk(villageData.taluka_name);
    setVillage(villageData.name);
    setQuickSearchQuery("");
    setQuickSearchResults([]);
    setShowQuickSearch(false);
    setLoading(true);
  };

  const containerVariants = {
    expanded: {
      width: "100%",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
    shrunk: {
      width: "auto",
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  const contentVariants = {
    expanded: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    shrunk: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
      },
    },
  };

  const navItems = [
    { href: "/claims-list", label: "Claims", icon: BarChart2 },
    { href: "/dssTable", label: "DSS System", icon: FileSliders },
    {
      href: "/atlas/interactive-map",
      label: "Visualize",
      icon: Trophy,
      external: true,
    },
  ];

  const searchTabs = [
    {
      key: "state",
      icon: Map,
      label: "Select State",
      value: State || "Choose State",
      component: RegionSearch,
    },
    {
      key: "district",
      icon: LandPlot,
      label: "Select District",
      value: District || "Select District",
      component: DistrictSearch,
    },
    {
      key: "taluk",
      icon: Signpost,
      label: "Select Taluk/Tehsil",
      value: taluk || "Select Taluk/Tehsil",
      component: SearchTaluk,
    },
    {
      key: "village/city",
      icon: MapPinHouse,
      label: "Select Village/City",
      value: village || "Select Village/City",
      component: VillageSearch,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isInsideModal = Object.values(modalRefs).some(
        (ref) => ref.current && ref.current.contains(event.target)
      );

      const isInsideQuickSearch =
        quickSearchRef.current && quickSearchRef.current.contains(event.target);

      if (!isInsideModal && !isInsideQuickSearch) {
        setActiveTab("");
        setShowQuickSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="sticky top-4 z-50">
      {/* Mobile Header */}
      <div className="md:hidden px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsShrink(!isShrink)}
              className="flex items-center justify-center w-10 h-10 text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg"
            >
              <Search className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center w-10 h-10 text-gray-700 bg-gray-100 rounded-full"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 py-4 border-t border-gray-200"
            >
              <div className="flex flex-col space-y-3 ">
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      {...(item.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <IconComponent className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>

        {/* Mobile Search Bar */}
        <AnimatePresence>
          {!isShrink && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                {/* Quick Search for Mobile */}
                <div className="relative" ref={quickSearchRef}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Quick search village..."
                      value={quickSearchQuery}
                      onChange={handleQuickSearchChange}
                      onFocus={() => setShowQuickSearch(true)}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                    />
                    {isSearching && (
                      <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
                    )}
                  </div>

                  {/* Mobile Quick Search Results */}
                  {showQuickSearch && quickSearchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-50"
                    >
                      {quickSearchResults.map((village) => (
                        <div
                          key={village.id}
                          onClick={() => handleVillageSelect(village)}
                          className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                        >
                          <p className="font-medium text-sm text-gray-900">
                            {village.name}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {village.taluka_name}, {village.district_name},{" "}
                            {village.state_name}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                <div className="relative flex items-center">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-xs text-gray-400">
                    OR
                  </span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {searchTabs.map((tab, index) => {
                  const IconComponent = tab.icon;
                  const ComponentToRender = tab.component;
                  return (
                    <motion.div
                      key={tab.key}
                      ref={modalRefs[tab.key]}
                      className={`relative bg-white rounded-xl p-3 cursor-pointer transition-all duration-200 ${
                        activeTab === tab.key
                          ? "ring-2 ring-red-500 shadow-lg"
                          : "hover:shadow-md border border-gray-200"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTabClick(tab.key);
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              activeTab === tab.key
                                ? "bg-red-100 text-red-500"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">{tab.label}</p>
                            <p
                              className={`text-sm font-medium ${
                                activeTab === tab.key
                                  ? "text-red-500"
                                  : "text-gray-900"
                              }`}
                            >
                              {tab.value}
                            </p>
                          </div>
                        </div>
                        <ChevronDown
                          className={`w-4 h-4 text-gray-400 transition-transform ${
                            activeTab === tab.key ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                      {activeTab === tab.key && <ComponentToRender />}
                    </motion.div>
                  );
                })}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClick}
                  className="w-full flex items-center justify-center gap-2 py-3 text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Search className="w-4 h-4" />
                  Search Demographics
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-center px-6 lg:px-8">
        <motion.div
          className="flex flex-col justify-center w-full max-w-7xl items-center"
          layout
        >
          {/* Desktop Navigation */}
          <AnimatePresence mode="wait">
            {!isShrink && (
              <motion.nav
                key="nav"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex items-center bg-white dark:bg-black rounded-full border space-x-8 mb-3 text-sm font-medium"
              >
                {navItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      {...(item.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                    >
                      <IconComponent className="w-4 h-4" />
                      {item.label}
                    </Link>
                  );
                })}
                <div className="flex items-center gap-1">
                  <Link
                    href="/settings"
                    className="flex items-center border bg-background rounded-full p-1.5 justify-center"
                  >
                    <Settings className="w-5 h-5 text-black dark:text-white " />
                  </Link>
                  <ModeToggle />
                </div>
              </motion.nav>
            )}
          </AnimatePresence>

          {/* Desktop Search Bar */}
          <motion.div
            layout
            variants={containerVariants}
            animate={isShrink ? "shrunk" : "expanded"}
            className={`flex items-center max-w-6xl transition-all duration-300 ${
              activeTab || showQuickSearch
                ? "bg-gradient-to-r from-red-50 to-pink-50 border-red-200"
                : "bg-white border-gray-200"
            } border-2 rounded-full shadow-lg hover:shadow-xl`}
          >
            <AnimatePresence mode="wait">
              {!isShrink ? (
                <motion.div
                  key="expanded-search"
                  layout
                  initial="exit"
                  animate="expanded"
                  exit="exit"
                  variants={contentVariants}
                  className="flex w-full items-center"
                >
                  <div className="flex w-full items-center divide-x divide-gray-200">
                    {/* Quick Search Input */}
                    <div
                      className="relative px-4 py-3 min-w-[200px]"
                      ref={quickSearchRef}
                    >
                      <div className="relative">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Quick search..."
                          value={quickSearchQuery}
                          onChange={handleQuickSearchChange}
                          onFocus={() => setShowQuickSearch(true)}
                          className="w-full pl-8 pr-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
                        />
                        {isSearching && (
                          <Loader2 className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
                        )}
                      </div>

                      {/* Desktop Quick Search Results */}
                      {showQuickSearch && quickSearchResults.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-4 right-4 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-50"
                        >
                          {quickSearchResults.map((village) => (
                            <div
                              key={village.id}
                              onClick={() => handleVillageSelect(village)}
                              className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                            >
                              <p className="font-medium text-sm text-gray-900">
                                {village.name}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">
                                {village.taluka_name}, {village.district_name},{" "}
                                {village.state_name}
                              </p>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </div>

                    {searchTabs.map((tab, index) => {
                      const IconComponent = tab.icon;
                      const ComponentToRender = tab.component;
                      return (
                        <motion.div
                          key={tab.key}
                          ref={modalRefs[tab.key]}
                          className={`relative flex-1 p-4 cursor-pointer transition-all duration-200 ${
                            activeTab === tab.key
                              ? "bg-white text-red-500 shadow-lg rounded-full mx-1"
                              : `text-gray-700 hover:bg-gray-50`
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleTabClick(tab.key);
                          }}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{
                            scale: activeTab === tab.key ? 1 : 1.02,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`p-2 rounded-lg transition-colors ${
                                activeTab === tab.key
                                  ? "bg-red-100 text-red-500"
                                  : "bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-500"
                              }`}
                            >
                              <IconComponent className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-500 mb-1">
                                {tab.label}
                              </p>
                              <p
                                className={`text-sm font-semibold truncate ${
                                  activeTab === tab.key
                                    ? "text-red-500"
                                    : "text-gray-900"
                                }`}
                              >
                                {tab.value}
                              </p>
                            </div>
                          </div>
                          {activeTab === tab.key && <ComponentToRender />}
                        </motion.div>
                      );
                    })}

                    {/* Search Button */}
                    <div className="p-2 lg:p-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleClick}
                        className="flex items-center justify-center w-12 h-12 text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <Search className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="shrunk-search"
                  layout
                  initial="exit"
                  animate="shrunk"
                  exit="exit"
                  variants={contentVariants}
                  className="flex items-center gap-2 p-3"
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      {...(item.external && {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      })}
                      className="px-4 py-2 text-gray-700 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors font-medium"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="flex items-center">
                    <ModeToggle />
                    <Link
                      href="/settings"
                      className="flex items-center border bg-background rounded-full p-1.5 justify-center"
                    >
                      <Settings className="w-5 h-5 text-black dark:text-white " />
                    </Link>
                  </div>
                  <div className="w-px h-6 bg-gray-300 mx-2" />

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsShrink(!isShrink)}
                    className="flex items-center justify-center w-10 h-10 text-white bg-gradient-to-r from-red-500 to-pink-500 rounded-full shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <Search className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default SearchNavbar;
