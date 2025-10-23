"use client";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <div className="container mx-auto flex items-center px-4 sm:px-6 lg:px-8 h-14 fixed top-2 inset-x-0 z-50">
                {/* Desktop Menu */}
                <nav className="hidden md:flex flex-1 items-center">
                    <Menu setActive={setActive} className="flex w-full p bg-white items-center justify-between ">
                        {/* Left: Logo */}
                        <div className="flex items-center  text-black font-mono font-semibold text-lg mr-8">
                            <Image
                                src="/logos/applogo.png"
                                alt="Logo"
                                width={32}
                                height={32}
                                className="mr-2 brightness-0"
                            />
                            VanAdhikar
                        </div>

                        {/* Center: Navigation */}
                        <div className="flex items-center gap-6">
                            <MenuItem setActive={setActive} active={active} item="FRA Atlas">
                                <div className="flex flex-col space-y-4 text-sm">
                                    <HoveredLink href="/atlas/overview">Atlas Overview</HoveredLink>
                                    <HoveredLink href="/atlas/interactive-map">Interactive WebGIS Map</HoveredLink>
                                    <HoveredLink href="/atlas/forest-rights">Forest Rights Visualization</HoveredLink>
                                    <HoveredLink href="/atlas/ai-insights">AI-Powered Insights</HoveredLink>
                                </div>
                            </MenuItem>

                            <MenuItem setActive={setActive} active={active} item="States">
                                <div className="text-sm grid grid-cols-2 gap-6 p-4">
                                    <ProductItem
                                        title="Madhya Pradesh"
                                        href="/states/madhya-pradesh"
                                        src="/images/states/mp.png"
                                        description="FRA implementation monitoring in Madhya Pradesh"
                                    />
                                    <ProductItem
                                        title="Tripura"
                                        href="/states/tripura"
                                        src="/images/states/tripura.png"
                                        description="Forest rights tracking in Tripura"
                                    />
                                    <ProductItem
                                        title="Odisha"
                                        href="/states/odisha"
                                        src="/images/states/odisha.png"
                                        description="Comprehensive FRA monitoring in Odisha"
                                    />
                                    <ProductItem
                                        title="Telangana"
                                        href="/states/telangana"
                                        src="/images/states/telangana.png"
                                        description="Telangana forest rights implementation"
                                    />
                                </div>
                            </MenuItem>

                            <MenuItem setActive={setActive} active={active} item="Monitoring">
                                <div className="flex flex-col space-y-4 text-sm">
                                    <HoveredLink href="/monitoring/dashboard">Real-time Dashboard</HoveredLink>
                                    <HoveredLink href="/monitoring/reports">Progress Reports</HoveredLink>
                                    <HoveredLink href="/monitoring/analytics">Data Analytics</HoveredLink>
                                    <HoveredLink href="/monitoring/alerts">Alert System</HoveredLink>
                                </div>
                            </MenuItem>

                            <MenuItem setActive={setActive} active={active} item="DSS">
                                <div className="flex flex-col space-y-4 text-sm">
                                    <HoveredLink href="/dss/decision-support">Decision Support Tools</HoveredLink>
                                    <HoveredLink href="/dss/policy-recommendations">Policy Recommendations</HoveredLink>
                                    <HoveredLink href="/dss/impact-assessment">Impact Assessment</HoveredLink>
                                    <HoveredLink href="/dss/scenario-modeling">Scenario Modeling</HoveredLink>
                                </div>
                            </MenuItem>
                        </div>

                        {/* Right: Theme + Login */}
                        <div className="flex items-center gap-4 ml-8">
                            <div
                                id="gooey-btn"
                                className="relative flex items-center group"
                                style={{ filter: "url(#gooey-filter)" }}
                            >
                                <button className="absolute right-0 px-2 py-1.5 rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground font-normal text-sm transition-all duration-300 hover:bg-primary/90 cursor-pointer h-8 flex items-center justify-center -translate-x-10 group-hover:-translate-x-29 z-0 border border-white/20">
                                    <svg
                                        className="w-3 h-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 17L17 7M17 7H7M17 7V17"
                                        />
                                    </svg>
                                </button>
                                <button className="px-4 py-1.5 rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground font-normal text-sm transition-all duration-300 hover:bg-primary/90 cursor-pointer h-8 flex items-center z-10 shadow-lg border border-white/20">
                                    Admin Login
                                </button>
                            </div>
                        </div>
                    </Menu>
                </nav>

                {/* Mobile Toggle */}
                <div className="flex md:hidden items-center justify-between  w-full bg-white rounded-full px-2 gap-2">

                    {/* Left: Logo */}
                    <div className="flex items-center  font-mono font-semibold text-lg mr-8">
                        <Image
                            src="/logos/applogo.png"
                            alt="Logo"
                            width={32}
                            height={32}
                            className="mr-2 brightness-0"
                        />
                        VanAdhikar
                    </div>
                    <button
                        className="text-foreground p-2 rounded-lg hover:bg-muted transition-colors duration-200"
                        aria-label="Toggle menu"
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                    >
                        <motion.svg
                            width="24"
                            height="24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            animate={mobileMenuOpen ? "open" : "closed"}
                            variants={{
                                open: { rotate: 45 },
                                closed: { rotate: 0 },
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
                        </motion.svg>
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        className="md:hidden absolute top-14 inset-x-4 rounded-xl bg-background/95 backdrop-blur-md shadow-2xl border border-border/60 overflow-hidden z-50"
                        initial={{ opacity: 0, y: -10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.98 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        <div className="p-4 space-y-4">
                            {/* FRA Atlas */}
                            <div>
                                <h3 className="font-semibold text-foreground mb-2 text-base border-b border-border/30 pb-1">
                                    FRA Atlas
                                </h3>
                                <div className="space-y-1">
                                    {[
                                        "Atlas Overview",
                                        "Interactive WebGIS Map",
                                        "Forest Rights Visualization",
                                        "AI-Powered Insights"
                                    ].map((label, idx) => (
                                        <a
                                            key={idx}
                                            href={`/atlas/${label.toLowerCase().replace(/ /g, "-")}`}
                                            className="block px-2 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {label}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* States */}
                            <div>
                                <h3 className="font-semibold text-foreground mb-2 text-base border-b border-border/30 pb-1">
                                    States
                                </h3>
                                <div className="space-y-1">
                                    {["Madhya Pradesh", "Tripura", "Odisha", "Telangana"].map((label, idx) => (
                                        <a
                                            key={idx}
                                            href={`/states/${label.toLowerCase().replace(/ /g, "-")}`}
                                            className="block px-2 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {label}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Monitoring */}
                            <div>
                                <h3 className="font-semibold text-foreground mb-2 text-base border-b border-border/30 pb-1">
                                    Monitoring
                                </h3>
                                <div className="space-y-1">
                                    {["Real-time Dashboard", "Progress Reports", "Data Analytics", "Alert System"].map((label, idx) => (
                                        <a
                                            key={idx}
                                            href={`/monitoring/${label.toLowerCase().replace(/ /g, "-")}`}
                                            className="block px-2 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {label}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* DSS */}
                            <div>
                                <h3 className="font-semibold text-foreground mb-2 text-base border-b border-border/30 pb-1">
                                    Decision Support System
                                </h3>
                                <div className="space-y-1">
                                    {["Decision Support Tools", "Policy Recommendations", "Impact Assessment", "Scenario Modeling"].map((label, idx) => (
                                        <a
                                            key={idx}
                                            href={`/dss/${label.toLowerCase().replace(/ /g, "-")}`}
                                            className="block px-2 py-1.5 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            {label}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Login */}
                            <div className="pt-2 border-t border-border/30">
                                <button
                                    className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground font-medium text-sm transition-all duration-200 hover:bg-primary/90 focus:outline-none shadow-lg"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Admin Login
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
