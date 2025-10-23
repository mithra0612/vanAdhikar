import { useMapStore } from '@/stores/MapStore';
import { Compass, MountainSnow, RotateCw } from 'lucide-react';
import React from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

function TopButtons({ toggle3DTerrain, mapRef }: { toggle3DTerrain: () => void, mapRef: React.RefObject<maplibregl.Map> }) {
    const { terrain3D, setTerrain3D, setBearing, bearing } = useMapStore();

    // Rotate handler - smoothly rotate bearing by 180 degrees
    const rotateView = () => {
        const newBearing = (bearing + 180) % 360;
        if (mapRef.current) {
            mapRef.current.easeTo({
                bearing: newBearing,
                duration: 8000, // 2 second smooth rotation
                easing: (t) => t * (2 - t), // ease-out curve for smooth deceleration
            });
        }
        setBearing(newBearing);
    };

    return (
        <div className="absolute top-16 sm:top-4 right-2 sm:right-3 flex flex-col space-y-2 z-10">
            {/* Mobile-responsive control buttons */}
            {/* 3D Toggle Button */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={toggle3DTerrain}
                        className={`p-2 sm:p-2 shadow-md rounded-full transition-colors ${terrain3D
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-gradient-to-r from-teal-500 to-teal-500 text-white hover:from-teal-600 hover:to-teal-600'
                            }`}
                        title={terrain3D ? "Disable 3D Terrain" : "Enable 3D Terrain"}
                    >
                        <MountainSnow className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Toggle 3D Terrain</p>
                </TooltipContent>
            </Tooltip>


            {/* Bearing Reset Button */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={() => {
                            setBearing(0);
                            if (mapRef.current) {
                                mapRef.current.easeTo({
                                    bearing: 0,
                                    duration: 1000,
                                });
                            }
                        }}
                        className="p-2 sm:p-2 bg-gradient-to-r from-teal-500 to-teal-500 shadow-md rounded-full  transition-colors"
                        title="Reset bearing to North"
                    >
                        <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Reset bearing to North</p>
                </TooltipContent>
            </Tooltip>


            {/* Rotate View Button */}
            <Tooltip>
                <TooltipTrigger asChild>
                    <button
                        onClick={rotateView}
                        className="p-2 sm:p-2 bg-gradient-to-r from-teal-500 to-teal-500 shadow-md rounded-full transition-colors"
                        title="Rotate view 180°"
                    >
                        <RotateCw className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>Rotate view 180°</p>
                </TooltipContent>
            </Tooltip>

        </div>
    )
}

export default TopButtons
