"use client";
import Draggable from "react-draggable";
import { useRef } from "react";
import { useMapStore } from "@/stores/MapStore";
import { Check, Map, MapPlus, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import tileURLs from "@/app/config/mapTiles";

// ✅ Reusable TileGrid component
function TileGrid({
    tiles,
    styleURL,
    setStyleURL,
    setTerrain3D,
    columns = 2,
    imgHeight = "h-12",
}: {
    tiles: any[];
    styleURL: string;
    setStyleURL: (url: string) => void;
    setTerrain3D: (v: boolean) => void;
    columns?: number;
    imgHeight?: string;
}) {
    return (
        <div className={`grid grid-cols-${columns} gap-3 pb-2 pt-1`}>
            {tiles.map((tile) => {
                const isActive = styleURL.includes(tile.url.split("?")[0]);
                return (
                    <button
                        key={tile.name}
                        onClick={() => {
                            setStyleURL(`${tile.url}?key=${process.env.NEXT_PUBLIC_MAP_TILER_API_KEY}`);
                            setTerrain3D(false); // Reset terrain on switch
                        }}
                        className={`relative group flex flex-col items-center p-2 sm:p-3 rounded-lg border-2 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer ${isActive
                            ? "border-emerald-400 bg-gradient-to-br from-emerald-50 to-blue-50 shadow-lg shadow-emerald-100"
                            : "border-gray-200 hover:border-indigo-300 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50"
                            }`}
                    >
                        <div className="relative overflow-hidden rounded-md mb-2 w-full">
                            <img
                                src={tile.img}
                                alt={tile.name}
                                className={`w-full ${imgHeight} object-cover transition-transform duration-200 group-hover:scale-105`}
                            />
                            {isActive && (
                                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 flex items-center justify-center rounded-md">
                                    <div className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full p-1 shadow-lg">
                                        <Check className="w-3 sm:w-4 h-3 sm:h-4 text-white" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <span className="text-xs font-medium bg-gradient-to-r from-gray-700 to-gray-800 bg-clip-text text-transparent text-center leading-tight">
                            {tile.name}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

function BaseMapSwitcher() {
    const baseMapSwitcherRef = useRef(null);
    const {
        basemapPopupOpen,
        setBasemapPopupOpen,
        styleURL,
        setStyleURL,
        setTerrain3D,
        isMobile,
    } = useMapStore();

    if (!basemapPopupOpen) return null;

    const content = (
        <div className="overflow-y-auto p-4 sm:p-6 max-h-[calc(70vh-120px)] sm:max-h-[calc(24rem-120px)]">
            <Tabs defaultValue="standard" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4 bg-gradient-to-r from-slate-100 to-gray-100 p-1 rounded-lg">
                    {/* <TabsTrigger value="mapbox" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-700 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200">Mapbox</TabsTrigger>
                    <TabsTrigger value="standard" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200">Standard</TabsTrigger>
                    <TabsTrigger value="experimental" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-red-500 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-200">Experimental</TabsTrigger> */}
                    <TabsTrigger value="standard">Standard</TabsTrigger>
                    <TabsTrigger value="experimental">Experimental</TabsTrigger>
                    <TabsTrigger value="mapbox">Mapbox</TabsTrigger>
                </TabsList>

                <TabsContent value="mapbox">
                    <TileGrid
                        tiles={tileURLs.filter((t) => t.type === "mapbox")}
                        styleURL={styleURL}
                        setStyleURL={setStyleURL}
                        setTerrain3D={setTerrain3D}
                        columns={isMobile ? 2 : 3}
                        imgHeight={isMobile ? "h-12" : "h-16"}
                    />
                </TabsContent>

                <TabsContent value="standard">
                    <TileGrid
                        tiles={tileURLs.filter((t) => t.type === "standard")}
                        styleURL={styleURL}
                        setStyleURL={setStyleURL}
                        setTerrain3D={setTerrain3D}
                        columns={isMobile ? 2 : 3}
                        imgHeight={isMobile ? "h-12" : "h-16"}
                    />
                </TabsContent>

                <TabsContent value="experimental">
                    <TileGrid
                        tiles={tileURLs.filter((t) => t.type === "experimental")}
                        styleURL={styleURL}
                        setStyleURL={setStyleURL}
                        setTerrain3D={setTerrain3D}
                        columns={isMobile ? 2 : 3}
                        imgHeight={isMobile ? "h-12" : "h-16"}
                    />
                </TabsContent>
            </Tabs>

        </div>
    );

    return isMobile ? (
        // ✅ Mobile full-width bottom sheet
        <div ref={baseMapSwitcherRef}>
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-white via-white to-gray-50 shadow-2xl rounded-t-xl max-h-[70vh] transition-all duration-200 ease-out border-t border-gray-200">
                <div className="flex items-center justify-between p-4 pb-2 bg-gradient-to-r from-teal-600 to-teal-800 rounded-t-xl border-b border-purple-200">
                    <h2 className="text-base text-white font-semibold"><Map className="inline-block w-5 h-5 mr-2" />Choose Basemap</h2>
                    <button
                        onClick={() => setBasemapPopupOpen(false)}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors duration-150 cursor-pointer backdrop-blur-sm"
                    >
                        <X className="w-5 h-5 text-white drop-shadow-sm" />
                    </button>
                </div>
                {content}
            </div>
        </div>
    ) : (
        // ✅ Desktop draggable popup
        <Draggable nodeRef={baseMapSwitcherRef} handle=".drag-handle">
            <div ref={baseMapSwitcherRef}>
                <div className="absolute bottom-20 right-4 w-[420px] z-50 bg-white shadow-2xl rounded-lg border overflow-hidden">
                    <div className="drag-handle flex justify-between items-center p-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white cursor-move"
                    >                        <h2 className="text-base text-white font-semibold"><Map className="inline-block w-5 h-5 mr-2" />Choose Basemap</h2>
                        <button
                            onClick={() => setBasemapPopupOpen(false)}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors duration-150 cursor-pointer backdrop-blur-sm"
                        >
                            <X className="w-5 h-5 text-white drop-shadow-sm" />
                        </button>
                    </div>
                    {content}
                </div>
            </div>
        </Draggable>
    );
}

function BasemapSwitchButton() {
    const { basemapPopupOpen, setBasemapPopupOpen, styleURL } = useMapStore();
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    onClick={() => setBasemapPopupOpen(!basemapPopupOpen)}
                    className="absolute bottom-2 right-2 p-2 bg-gradient-to-r from-teal-600 to-teal-700 shadow-lg rounded-lg hover:shadow-xl transition-all duration-200 z-20 flex items-center space-x-2 border border-white/20 backdrop-blur-sm"
                    title="Change basemap"
                >
                    <MapPlus className="w-4 h-4 sm:w-5 sm:h-5 text-white drop-shadow-sm" />
                    <img
                        src={
                            tileURLs.find((tile) => styleURL.includes(tile.url.split("?")[0]))?.img ||
                            tileURLs[0].img
                        }
                        alt="Current basemap"
                        className="w-8 h-6 sm:w-10 sm:h-8 object-cover rounded border-2 border-white/30 shadow-sm"
                    />
                </button>
            </TooltipTrigger>
            <TooltipContent>
                <p>Switch Basemap</p>
            </TooltipContent>
        </Tooltip>
    );
}

export { BaseMapSwitcher, BasemapSwitchButton };
