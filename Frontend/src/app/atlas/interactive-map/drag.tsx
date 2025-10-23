"use client";

import Draggable from "react-draggable";
import { useState, useRef } from "react";
import { X, FileText, Download, Eye } from "lucide-react";

export default function DraggablePopup() {
    const [open, setOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("");
    const nodeRef = useRef(null);
    const handleRef = useRef(null);

    const tabs = [
        "Vertex", "G-Value", "EC", "Boundary",
        "Thematic", "Crop", "M plan", "N-Facility", "Patta"
    ];

    // Sample data for different tabs
    const tabData = {
        Vertex: {
            vertices: [
                { id: 1, x: 10.747366, y: 78.417595, type: "Corner" },
                { id: 2, x: 10.747520, y: 78.417890, type: "Corner" },
                { id: 3, x: 10.747890, y: 78.417650, type: "Corner" },
                { id: 4, x: 10.747720, y: 78.417355, type: "Corner" }
            ]
        },
        "G-Value": {
            gpsPoints: [
                { point: "GP1", latitude: 10.747366, longitude: 78.417595, accuracy: "±2m" },
                { point: "GP2", latitude: 10.747520, longitude: 78.417890, accuracy: "±1.5m" },
                { point: "GP3", latitude: 10.747890, longitude: 78.417650, accuracy: "±1.8m" }
            ]
        },
        EC: {
            electricalConductivity: "2.3 dS/m",
            soilSalinity: "Moderate",
            phLevel: "7.2",
            organicMatter: "1.8%"
        },
        Boundary: {
            totalArea: "2.45 acres",
            perimeter: "650 meters",
            northBoundary: "Village Road",
            southBoundary: "Canal",
            eastBoundary: "Survey No. 952",
            westBoundary: "Survey No. 950"
        },
        Thematic: {
            landUse: "Agricultural",
            soilType: "Red Loamy",
            cropPattern: "Paddy - Groundnut",
            irrigationType: "Canal + Borewell",
            waterAvailability: "Good"
        },
        Crop: {
            currentCrop: "Paddy",
            season: "Kharif 2024",
            sowingDate: "June 15, 2024",
            expectedHarvest: "October 2024",
            yieldExpected: "4.2 tons/acre"
        },
        "M plan": {
            masterPlan: "Agricultural Zone",
            zoning: "AG-1",
            fsi: "0.5",
            setbacks: "Front: 6m, Side: 3m",
            restrictions: "No commercial activities"
        },
        "N-Facility": {
            nearestRoad: "SH-37 (2.3 km)",
            nearestTown: "Kulithalai (8.5 km)",
            nearestHospital: "PHC Kaluhoor (1.2 km)",
            nearestSchool: "Govt. High School (0.8 km)",
            powerSupply: "Available",
            waterSupply: "Borewell + Canal"
        }
    };
    // Sample land parcel data
    const parcelData = {
        coordinates: "10.747366, 78.417595",
        district: "Karur / கரூர்",
        taluk: "Kulithalai / குளித்தலை",
        village: "Kaluhoor / கழுகூர்",
        villageLGDCode: "635636 (rural)",
        ulpin: "72NBE9DBD0E9H0",
        centroid: "10.747457,78.416457",
        surveyNumber: "951",
        subDivision: "1B"
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case "Vertex":
                return (
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-800">Boundary Vertices</h3>
                        <div className="space-y-1">
                            {tabData.Vertex.vertices.map((vertex) => (
                                <div key={vertex.id} className="bg-gray-50 p-2 rounded border">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-medium">Point {vertex.id}</span>
                                        <span className="text-xs bg-blue-100 text-blue-800 px-1 py-0.5 rounded">{vertex.type}</span>
                                    </div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        {vertex.x}, {vertex.y}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "G-Value":
                return (
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-800">GPS Measurements</h3>
                        <div className="space-y-1">
                            {tabData["G-Value"].gpsPoints.map((point) => (
                                <div key={point.point} className="bg-green-50 p-2 rounded border border-green-200">
                                    <div className="flex justify-between items-center">
                                        <span className="text-xs font-medium text-green-800">{point.point}</span>
                                        <span className="text-xs bg-green-200 text-green-800 px-1 py-0.5 rounded">{point.accuracy}</span>
                                    </div>
                                    <div className="text-xs text-gray-600 mt-1">
                                        {point.latitude}, {point.longitude}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "EC":
                return (
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-800">Soil Analysis</h3>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-orange-50 p-2 rounded border border-orange-200">
                                <div className="text-xs text-orange-600 font-medium">EC</div>
                                <div className="text-sm font-semibold text-orange-800">{tabData.EC.electricalConductivity}</div>
                            </div>
                            <div className="bg-yellow-50 p-2 rounded border border-yellow-200">
                                <div className="text-xs text-yellow-600 font-medium">Salinity</div>
                                <div className="text-sm font-semibold text-yellow-800">{tabData.EC.soilSalinity}</div>
                            </div>
                            <div className="bg-purple-50 p-2 rounded border border-purple-200">
                                <div className="text-xs text-purple-600 font-medium">pH</div>
                                <div className="text-sm font-semibold text-purple-800">{tabData.EC.phLevel}</div>
                            </div>
                            <div className="bg-green-50 p-2 rounded border border-green-200">
                                <div className="text-xs text-green-600 font-medium">Organic</div>
                                <div className="text-sm font-semibold text-green-800">{tabData.EC.organicMatter}</div>
                            </div>
                        </div>
                    </div>
                );

            case "Boundary":
                return (
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-800">Boundary Info</h3>
                        <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-blue-50 p-2 rounded border border-blue-200">
                                    <div className="text-xs text-blue-600 font-medium">Area</div>
                                    <div className="text-sm font-semibold text-blue-800">{tabData.Boundary.totalArea}</div>
                                </div>
                                <div className="bg-blue-50 p-2 rounded border border-blue-200">
                                    <div className="text-xs text-blue-600 font-medium">Perimeter</div>
                                    <div className="text-sm font-semibold text-blue-800">{tabData.Boundary.perimeter}</div>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="bg-gray-50 p-1.5 rounded border">
                                    <span className="text-xs font-medium text-gray-600">N:</span>
                                    <span className="text-xs ml-1">{tabData.Boundary.northBoundary}</span>
                                </div>
                                <div className="bg-gray-50 p-1.5 rounded border">
                                    <span className="text-xs font-medium text-gray-600">S:</span>
                                    <span className="text-xs ml-1">{tabData.Boundary.southBoundary}</span>
                                </div>
                                <div className="bg-gray-50 p-1.5 rounded border">
                                    <span className="text-xs font-medium text-gray-600">E:</span>
                                    <span className="text-xs ml-1">{tabData.Boundary.eastBoundary}</span>
                                </div>
                                <div className="bg-gray-50 p-1.5 rounded border">
                                    <span className="text-xs font-medium text-gray-600">W:</span>
                                    <span className="text-xs ml-1">{tabData.Boundary.westBoundary}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case "Thematic":
                return (
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-800">Land Classification</h3>
                        <div className="space-y-1">
                            {Object.entries(tabData.Thematic).map(([key, value]) => (
                                <div key={key} className="bg-indigo-50 p-2 rounded border border-indigo-200">
                                    <div className="text-xs text-indigo-600 font-medium capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </div>
                                    <div className="text-xs font-semibold text-indigo-800">{value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "Crop":
                return (
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-800">Crop Information</h3>
                        <div className="space-y-1">
                            {Object.entries(tabData.Crop).map(([key, value]) => (
                                <div key={key} className="bg-green-50 p-2 rounded border border-green-200">
                                    <div className="text-xs text-green-600 font-medium capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </div>
                                    <div className="text-xs font-semibold text-green-800">{value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "M plan":
                return (
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-800">Master Plan</h3>
                        <div className="space-y-1">
                            {Object.entries(tabData["M plan"]).map(([key, value]) => (
                                <div key={key} className="bg-red-50 p-2 rounded border border-red-200">
                                    <div className="text-xs text-red-600 font-medium capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </div>
                                    <div className="text-xs font-semibold text-red-800">{value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "N-Facility":
                return (
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-800">Nearby Facilities</h3>
                        <div className="space-y-1">
                            {Object.entries(tabData["N-Facility"]).map(([key, value]) => (
                                <div key={key} className="bg-cyan-50 p-2 rounded border border-cyan-200">
                                    <div className="text-xs text-cyan-600 font-medium capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </div>
                                    <div className="text-xs font-semibold text-cyan-800">{value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case "Patta":
                return (
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-gray-800">Patta Document</h3>
                        <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded p-4 text-center">
                            <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-xs text-gray-600 mb-3">Survey No. {parcelData.surveyNumber}</p>
                            <div className="space-y-1">
                                <button className="w-full bg-red-600 text-white py-1.5 px-3 rounded text-xs font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-1">
                                    <Eye className="w-3 h-3" />
                                    View PDF
                                </button>
                                <button className="w-full bg-gray-600 text-white py-1.5 px-3 rounded text-xs font-medium hover:bg-gray-700 transition-colors flex items-center justify-center gap-1">
                                    <Download className="w-3 h-3" />
                                    Download
                                </button>
                            </div>
                            <div className="mt-2 text-xs text-gray-500">
                                PATTA_{parcelData.surveyNumber}_{parcelData.subDivision}.pdf
                            </div>
                        </div>
                    </div>
                );

            default:
                return <div>Select a tab to view content</div>;
        }
    };


    return (
        <>
            {open && (
                <Draggable nodeRef={nodeRef} handle=".drag-handle">
                    <div
                        ref={nodeRef}
                        className="fixed top-5 z-30 left-20 w-[500px] bg-white shadow-2xl rounded-lg border overflow-hidden"
                    >
                        {/* Header */}
                        <div
                            ref={handleRef}
                            className="drag-handle flex justify-between items-center p-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white cursor-move"
                        >
                            <div>
                                <h2 className="text-base font-semibold">Land Parcel Info</h2>
                                <p className="text-xs text-teal-100">({parcelData.coordinates})</p>
                            </div>
                            <button
                                onClick={() => setOpen(false)}
                            className="p-1 hover:bg-white/20 rounded-full transition-colors duration-150 cursor-pointer backdrop-blur-sm"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-4 space-y-3">
                            {/* Location Tags */}
                            <div className="grid grid-cols-3 gap-2">
                                <div className="bg-gray-50 rounded p-2 border">
                                    <div className="text-xs text-gray-500 font-medium mb-1">District:</div>
                                    <div className="text-xs font-medium text-gray-800">{parcelData.district}</div>
                                </div>
                                <div className="bg-gray-50 rounded p-2 border">
                                    <div className="text-xs text-gray-500 font-medium mb-1">Taluk:</div>
                                    <div className="text-xs font-medium text-gray-800">{parcelData.taluk}</div>
                                </div>
                                <div className="bg-gray-50 rounded p-2 border">
                                    <div className="text-xs text-gray-500 font-medium mb-1">Village:</div>
                                    <div className="text-xs font-medium text-gray-800">{parcelData.village}</div>
                                </div>
                            </div>

                            {/* Village LGD Code */}
                            <div className="bg-blue-50 rounded p-2 border border-blue-200">
                                <div className="text-xs text-blue-600 font-medium mb-1">Village LGD Code:</div>
                                <div className="text-xs font-semibold text-blue-800">{parcelData.villageLGDCode}</div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-xs text-gray-500 font-medium mb-1">ULPIN:</div>
                                        <div className="text-xs font-mono bg-gray-100 p-1 rounded border">{parcelData.ulpin}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 font-medium mb-1">Survey Number:</div>
                                        <div className="text-xs font-semibold text-green-700 bg-green-50 p-1 rounded border border-green-200">{parcelData.surveyNumber}</div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div>
                                        <div className="text-xs text-gray-500 font-medium mb-1">Centroid:</div>
                                        <div className="text-xs font-mono bg-gray-100 p-1 rounded border">{parcelData.centroid}</div>
                                    </div>
                                    <div>
                                        <div className="text-xs text-gray-500 font-medium mb-1">Sub Division:</div>
                                        <div className="text-xs font-semibold text-purple-700 bg-purple-50 p-1 rounded border border-purple-200">{parcelData.subDivision}</div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-2 border-t">
                                <button className="flex-1 bg-teal-600 text-white py-1.5 px-3 rounded text-xs font-medium hover:bg-teal-700 transition-colors">
                                    View Details
                                </button>
                                <button className="flex-1 bg-gray-100 text-gray-700 py-1.5 px-3 rounded text-xs font-medium hover:bg-gray-200 transition-colors">
                                    Download Report
                                </button>
                            </div>
                        </div>
                        <div className="border-b bg-gray-50">
                            <div className="flex overflow-x-auto">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-2 py-2 text-xs font-medium whitespace-nowrap transition-colors ${activeTab === tab
                                            ? "border-b-2 border-teal-600 text-teal-600 bg-white"
                                            : "text-gray-600 hover:text-gray-800 hover:bg-gray-100"
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-3 max-h-64 overflow-y-auto">
                            {renderTabContent()}
                        </div>
                    </div>
                </Draggable>
            )}
        </>
    );
}
