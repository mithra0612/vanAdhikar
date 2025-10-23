"use client";
import { useMapStore } from "@/stores/MapStore";
import { MapPin, Building, Info, X } from "lucide-react";

export default function HoverInfoCard() {
    const { hoverInfo, setHoverInfo } = useMapStore();

    if (!hoverInfo.visible || !hoverInfo.data) {
        return null;
    }

    const { data, type } = hoverInfo;

    const renderStateInfo = (stateData: any) => {
        console.log("State Data:", stateData);
        return (
            <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <span className="font-semibold text-gray-800 text-lg">{stateData.ST_NM || stateData.name || 'Unknown State'}</span>
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">State Code:</span>
                        <span className="font-medium">{stateData.ST_CEN_CD || stateData.code || 'N/A'}</span>
                    </div>
                    {stateData.AREA && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">Area:</span>
                            <span className="font-medium">{Number(stateData.AREA).toLocaleString()} km²</span>
                        </div>
                    )}
                    {stateData.population && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">Population:</span>
                            <span className="font-medium">{Number(stateData.population).toLocaleString()}</span>
                        </div>
                    )}
                </div>
                <div className="mt-3 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Building className="w-3 h-3" />
                        <span>State Administrative Boundary</span>
                    </div>
                </div>
            </div>
        );
    };

    const renderDistrictInfo = (districtData: any) => {
        console.log("District Data:", districtData);
        
        // Try multiple possible property names for district name
        const districtName = districtData.DISTRICT || 
                           districtData.district || 
                           districtData.DTNAME || 
                           districtData.name || 
                           districtData.NAME ||
                           districtData.dtname ||
                           districtData.District ||
                           districtData.DISTNAME ||
                           districtData.dist_name ||
                           districtData.DIST_NAME ||
                           'Unknown District';
        
        return (
            <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-gray-800 text-lg">{districtName}</span>
                </div>
                <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-600">State:</span>
                        <span className="font-medium">{districtData.ST_NM || districtData.state || districtData.STATE || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">District Code:</span>
                        <span className="font-medium">{districtData.CENCODE || districtData.code || districtData.DTCODE || 'N/A'}</span>
                    </div>
                    {districtData.AREA && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">Area:</span>
                            <span className="font-medium">{Number(districtData.AREA).toLocaleString()} km²</span>
                        </div>
                    )}
                    {districtData.population && (
                        <div className="flex justify-between">
                            <span className="text-gray-600">Population:</span>
                            <span className="font-medium">{Number(districtData.population).toLocaleString()}</span>
                        </div>
                    )}
                </div>
                <div className="mt-3 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Building className="w-3 h-3" />
                        <span>District Administrative Boundary</span>
                    </div>
                </div>
            </div>
        );
    };

    const handleClose = () => {
        setHoverInfo({
            visible: false,
            x: 0,
            y: 0,
            data: null,
            type: null,
        });
    };

    return (
        <div className="fixed bottom-4 right-4 z-50 w-80 max-w-[90vw]">
            <div className="bg-white shadow-2xl rounded-lg border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-teal-600 to-teal-700 px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-white" />
                        <span className="text-white font-medium">
                            {type === 'state' ? 'State Information' : 'District Information'}
                        </span>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors duration-150"
                    >
                        <X className="w-4 h-4 text-white" />
                    </button>
                </div>
                
                {/* Content */}
                <div className="p-4">
                    {type === 'state' && renderStateInfo(data)}
                    {type === 'district' && renderDistrictInfo(data)}
                </div>
            </div>
        </div>
    );
}