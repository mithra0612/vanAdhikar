'use client';
import { useMapStore } from '@/stores/MapStore';
import { RotateCcw, RotateCw, ArrowUp } from 'lucide-react'
import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

function BearingAdjuster({ mapRef }: { mapRef: React.RefObject<maplibregl.Map> }) {
    const { bearing, setBearing, bearingControlOpen, setBearingControlOpen } = useMapStore();
    // Bearing adjustment functions
    const adjustBearing = (direction: 'left' | 'right') => {
        const adjustment = direction === 'left' ? -45 : 45;
        const newBearing = (bearing + adjustment + 360) % 360;

        if (mapRef.current) {
            mapRef.current.easeTo({
                bearing: newBearing,
                duration: 800,
            });
        }
        setBearing(newBearing);
    };
    return (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
            <div className="bearing-control-container relative">
                {/* Main Bearing Button */}
                <div className="relative">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => setBearingControlOpen(!bearingControlOpen)}
                                className={`
                                relative w-14 h-14 sm:w-16 sm:h-16
                                backdrop-blur-xl bg-white/90 
                                border-white/20 
                                shadow-lg shadow-black/5
                                rounded-2xl
                                transition-all duration-300 ease-out
                                hover:scale-105 hover:shadow-xl hover:shadow-black/10
                                active:scale-95
                                group border
                                ${bearingControlOpen ? 'bg-blue-500/90 text-green-500 border-blue-400/30' : 'text-gray-700'}
                            `}
                                title="Adjust bearing"
                            >
                                {/* Compass Ring */}
                                <div className="absolute inset-1 border border-gray-200/50 rounded-xl"></div>

                                {/* North Arrow */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <ArrowUp
                                        className={`
                                        w-6 h-6 sm:w-7 sm:h-7 
                                        transition-all duration-500
                                        ${bearingControlOpen ? ' drop-shadow-sm' : 'text-gray-700'}
                                    `}
                                        style={{
                                            transform: `rotate(${bearing}deg)`,
                                            filter: bearingControlOpen ? 'drop-shadow(0 0 2px rgba(255,255,255,0.5))' : 'none'
                                        }}
                                    />
                                </div>

                                {/* Bearing Value Indicator */}
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                                    <div className={`
                                    px-2 py-0.5 text-xs font-mono font-medium
                                    bg-black/70 text-white rounded-full
                                    transition-all duration-300
                                    ${bearingControlOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}
                                `}>
                                        {Math.round(bearing)}°
                                    </div>
                                </div>

                                {/* Active State Ring */}
                                {bearingControlOpen && (
                                    <div className="absolute inset-0 rounded-2xl ring-2 ring-blue-400/50 animate-pulse"></div>
                                )}
                            </button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Adjust bearing</p>
                        </TooltipContent>
                    </Tooltip>


                    {/* Control Buttons */}
                    <div className={`
                            absolute top-1/2 border left-1/2 transform -translate-x-1/2 -translate-y-1/2
                            transition-all duration-500 ease-out
                            ${bearingControlOpen
                            ? 'opacity-100 scale-100 pointer-events-auto'
                            : 'opacity-0 scale-75 pointer-events-none'
                        }
                        `}>
                        {/* Left Rotate Button */}
                        <button
                            onClick={() => adjustBearing('left')}
                            className="
                                    absolute top-1/2 -translate-y-1/2 -left-20 sm:-left-24
                                    w-12 h-12 sm:w-14 sm:h-14
                                    backdrop-blur-xl bg-white/95
                                    border border-white/30
                                    shadow-lg shadow-black/5
                                    rounded-xl
                                    transition-all duration-300
                                    hover:scale-110 hover:shadow-xl hover:shadow-black/10
                                    hover:bg-red-50/95 hover:border-red-200/50
                                    active:scale-95
                                    group
                                "
                            title="Rotate left 45°"
                            style={{
                                transform: `translateX(-80px) translateY(-50%) ${bearingControlOpen ? 'translateX(0)' : 'translateX(20px)'}`,
                                transitionDelay: bearingControlOpen ? '100ms' : '0ms'
                            }}
                        >
                            <div className="flex items-center justify-center">
                                <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-red-600 transition-colors" />
                            </div>

                            {/* Tooltip */}
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                    -45°
                                </div>
                            </div>
                        </button>

                        {/* Right Rotate Button */}
                        <button
                            onClick={() => adjustBearing('right')}
                            className="
                                    absolute top-1/2 -translate-y-1/2 -right-20 sm:-right-24
                                    w-12 h-12 sm:w-14 sm:h-14
                                    backdrop-blur-xl bg-white/95
                                    border border-white/30
                                    shadow-lg shadow-black/5
                                    rounded-xl
                                    transition-all duration-300
                                    hover:scale-110 hover:shadow-xl hover:shadow-black/10
                                    hover:bg-green-50/95 hover:border-green-200/50
                                    active:scale-95
                                    group
                                "
                            title="Rotate right 45°"
                            style={{
                                transform: `translateX(80px) translateY(-50%) ${bearingControlOpen ? 'translateX(0)' : 'translateX(-20px)'}`,
                                transitionDelay: bearingControlOpen ? '150ms' : '0ms'
                            }}
                        >
                            <div className="flex items-center justify-center">
                                <RotateCw className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-green-600 transition-colors" />
                            </div>

                            {/* Tooltip */}
                            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                                    +45°
                                </div>
                            </div>
                        </button>
                    </div>
                </div>

                {/* Background Overlay when Open */}
                {bearingControlOpen && (
                    <div
                        className="fixed inset-0 bg-black/5 -z-10 transition-opacity duration-300"
                        onClick={() => setBearingControlOpen(false)}
                    />
                )}
            </div>
        </div>
    )
}

export default BearingAdjuster
