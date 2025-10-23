import { useMapStore } from "@/stores/MapStore";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { useRef, useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, Clock, Filter, X, XCircle, Info, ExternalLink } from "lucide-react";
import Draggable from "react-draggable";
import maplibregl from "maplibre-gl";
import { useRouter } from "next/navigation";

export default function SpecificLocationFilterPopup({ mapRef }: { mapRef?: React.RefObject<maplibregl.Map> }) {
    const filterPopupRef = useRef(null);
    const [activeFilters, setActiveFilters] = useState<{ [key: string]: boolean }>({});
    const [showOverallStats, setShowOverallStats] = useState(false);
    const router = useRouter();
    const {
        specificLocationFilterPopupOpen,
        setSpecificLocationFilterPopupOpen,
        isMobile,
    } = useMapStore();

    // Add custom CSS for hover popup
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .fra-hover-popup .maplibregl-popup-content {
                padding: 0 !important;
                border-radius: 8px !important;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15), 0 4px 6px rgba(0, 0, 0, 0.1) !important;
                border: 1px solid rgba(229, 231, 235, 1) !important;
                max-width: 320px !important;
            }
            .fra-hover-popup .maplibregl-popup-tip {
                border-top-color: white !important;
            }
            .fra-hover-popup .maplibregl-popup-close-button {
                display: none !important;
            }
            .fra-stats-popup .maplibregl-popup-content {
                padding: 0 !important;
                border-radius: 12px !important;
                box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.15) !important;
                border: 1px solid rgba(229, 231, 235, 1) !important;
                max-width: 400px !important;
                min-width: 350px !important;
            }
            .fra-stats-popup .maplibregl-popup-tip {
                border-top-color: white !important;
            }
            .fra-stats-popup .maplibregl-popup-close-button {
                display: none !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            if (document.head.contains(style)) {
                document.head.removeChild(style);
            }
        };
    }, []);
    // Add global navigation function for popup buttons
    useEffect(() => {
        (window as any).navigateToDashboard = (claimId: string) => {
            router.push(`/dashboard?claim=${claimId}`);
        };

        return () => {
            delete (window as any).navigateToDashboard;
        };
    }, [router]);
    // Overall statistics data
    const overallStats = {
        stateName: "Tripura",
        totalClaims: 1247,
        tribalPopulation: 1050000,
        approved: 523,
        districts: 8,
        pending: 318,
        ifrClaims: 450,
        rejected: 156,
        incomplete: 250,
        cfrClaims: 300,
        potentialRegions: 15,
        totalArea: 45800, // in hectares
        communities: 28,
        grantedRegions: 12,
        avgProcessingTime: 6.5 // months
    };

    if (!specificLocationFilterPopupOpen) return null;

    // Sample GeoJSON data for different claim types
    const sampleData = {
        'approved-claims': {
            "type": "FeatureCollection" as const,
            "features": [
                {
                    "type": "Feature",
                    "properties": {
                        "id": "approved-001",
                        "name": "North Tripura Approved Area",
                        "status": "Approved",
                        "area_ha": 5200,
                        "forest_type": "Semi-Evergreen",
                        "tribal_communities": ["Tripuri", "Reang"],
                        "owner": "Tripuri Community",
                        "approval_date": "2023-03-15",
                        "biodiversity_index": 7.8
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[
                            [91.85, 24.20],
                            [91.90, 24.22],
                            [91.96, 24.21],
                            [91.99, 24.18],
                            [91.95, 24.14],
                            [91.88, 24.15],
                            [91.85, 24.20]
                        ]]
                    }
                }
            ]
        },
        'pending-claims': {
            "type": "FeatureCollection" as const,
            "features": [
                {
                    "type": "Feature" as const,
                    "properties": {
                        "id": "pending-001",
                        "name": "South Tripura Pending Area",
                        "status": "Pending",
                        "area_ha": 4100,
                        "forest_type": "Moist Deciduous",
                        "tribal_communities": ["Jamatia", "Chakma"],
                        "owner": "Jamatia Community",
                        "submitted_date": "2023-08-20",
                        "expected_decision": "2024-01-15",
                        "biodiversity_index": 7.2
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[
                            [91.40, 23.30],
                            [91.45, 23.33],
                            [91.52, 23.31],
                            [91.55, 23.27],
                            [91.50, 23.24],
                            [91.42, 23.25],
                            [91.40, 23.30]
                        ]]
                    }
                }
            ]
        },
        'rejected-claims': {
            "type": "FeatureCollection" as const,
            "features": [
                {
                    "type": "Feature" as const,
                    "properties": {
                        "id": "rejected-001",
                        "name": "West Tripura Rejected Area",
                        "status": "Rejected",
                        "area_ha": 2800,
                        "forest_type": "Mixed Bamboo",
                        "tribal_communities": ["Halam"],
                        "owner": "Halam Community",
                        "rejection_date": "2023-05-10",
                        "rejection_reason": "Insufficient documentation",
                        "biodiversity_index": 6.5
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[
                            [91.25, 23.80],
                            [91.30, 23.83],
                            [91.36, 23.82],
                            [91.38, 23.77],
                            [91.33, 23.73],
                            [91.27, 23.75],
                            [91.25, 23.80]
                        ]]
                    }
                }
            ]
        },
        'incomplete-claims': {
            "type": "FeatureCollection" as const,
            "features": [
                {
                    "type": "Feature" as const,
                    "properties": {
                        "id": "incomplete-001",
                        "name": "Dhalai Incomplete Area",
                        "status": "Incomplete",
                        "area_ha": 3600,
                        "forest_type": "Hill Forest",
                        "tribal_communities": ["Mog", "Reang"],
                        "owner": "Mog Community",
                        "submitted_date": "2023-06-25",
                        "missing_documents": ["Survey maps", "Community resolution"],
                        "biodiversity_index": 7.0
                    },
                    "geometry": {
                        "type": "Polygon",
                        "coordinates": [[
                            [92.10, 23.90],
                            [92.15, 23.93],
                            [92.21, 23.91],
                            [92.24, 23.87],
                            [92.19, 23.83],
                            [92.12, 23.85],
                            [92.10, 23.90]
                        ]]
                    }
                }
            ]
        }
    };


    // Function to get color based on status
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'approved': return { fill: '#10b981', line: '#047857' }; // Green
            case 'pending': return { fill: '#f59e0b', line: '#d97706' }; // Yellow
            case 'rejected': return { fill: '#ef4444', line: '#dc2626' }; // Red
            case 'incomplete': return { fill: '#f97316', line: '#ea580c' }; // Orange
            default: return { fill: '#6b7280', line: '#4b5563' }; // Gray
        }
    };

    // Function to toggle layer on map
    const toggleLayer = (filterId: string, isActive: boolean) => {
        if (!mapRef?.current) return;

        const map = mapRef.current;
        const sourceId = `fra-${filterId}`;
        const fillLayerId = `fra-${filterId}-fill`;
        const lineLayerId = `fra-${filterId}-line`;

        if (isActive) {
            // Add layer to map
            const data = sampleData[filterId as keyof typeof sampleData];
            if (!data) return;

            // Add source
            if (!map.getSource(sourceId)) {
                map.addSource(sourceId, {
                    type: 'geojson',
                    data: data as any
                });
            }

            const colors = getStatusColor(data.features[0]?.properties.status || '');

            // Add fill layer
            if (!map.getLayer(fillLayerId)) {
                map.addLayer({
                    id: fillLayerId,
                    type: 'fill',
                    source: sourceId,
                    paint: {
                        'fill-color': colors.fill,
                        'fill-opacity': 0.4
                    }
                });
            }

            // Add line layer
            if (!map.getLayer(lineLayerId)) {
                map.addLayer({
                    id: lineLayerId,
                    type: 'line',
                    source: sourceId,
                    paint: {
                        'line-color': colors.line,
                        'line-width': 2,
                        'line-opacity': 0.8
                    }
                });
            }

            // Add hover effects
            let popup: maplibregl.Popup | null = null;
            let popupTimeout: NodeJS.Timeout | null = null;

            map.on('mouseenter', fillLayerId, (e) => {
                map.getCanvas().style.cursor = 'pointer';

                // Clear any existing timeout
                if (popupTimeout) {
                    clearTimeout(popupTimeout);
                    popupTimeout = null;
                }

                // Remove existing popup if any
                if (popup) {
                    popup.remove();
                    popup = null;
                }

                if (e.features && e.features[0]) {
                    const feature = e.features[0];
                    const props = feature.properties;

                    popup = new maplibregl.Popup({
                        closeButton: false,
                        closeOnClick: false,
                        className: 'fra-hover-popup'
                    })
                        .setLngLat(e.lngLat)
                        .setHTML(`
                        <div class="bg-white p-4 rounded-lg shadow-lg border">
                            <div class="flex items-center justify-between mb-3">
                                <h4 class="font-semibold text-gray-800 text-sm">${props.name}</h4>
                                <div class="w-2 h-2 rounded-full animate-pulse" style="background-color: ${colors.fill}"></div>
                                <button 
                                    onclick="window.__fraPopupClose && window.__fraPopupClose()" 
                                    class="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                    title="Close"
                                >
                                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            <div class="space-y-2 text-xs mb-3">
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Owner:</span>
                                    <span class="font-medium">${props.owner}</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Status:</span>
                                    <span class="font-medium px-2 py-0.5 rounded text-white text-xs" 
                                          style="background-color: ${colors.fill}">
                                        ${props.status}
                                    </span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Area:</span>
                                    <span class="font-medium">${props.area_ha} ha</span>
                                </div>
                                <div class="flex justify-between">
                                    <span class="text-gray-600">Forest Type:</span>
                                    <span class="font-medium">${props.forest_type}</span>
                                </div>
                                ${props.approval_date ? `
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Approved:</span>
                                        <span class="font-medium">${props.approval_date}</span>
                                    </div>
                                ` : ''}
                                ${props.rejection_reason ? `
                                    <div class="flex justify-between">
                                        <span class="text-gray-600">Reason:</span>
                                        <span class="font-medium text-red-600">${props.rejection_reason}</span>
                                    </div>
                                ` : ''}
                            </div>
                            <div class="border-t pt-2">
                                <button 
                                    onclick="navigateToDashboard('${props.id}')" 
                                    class="w-full px-3 py-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-medium rounded-md hover:shadow-md transition-all duration-200 hover:scale-105 flex items-center justify-center gap-1"
                                >
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                    </svg>
                                    Detailed Info
                                </button>
                            </div>
                        </div>
                    `)
                        .addTo(map);

                    // Add close handler for the popup close button
                    (window as any).__fraPopupClose = () => {
                        if (popup) {
                            popup.remove();
                            popup = null;
                        }
                        (window as any).__fraPopupClose = null;
                    };
                }
            });

            map.on('mouseleave', fillLayerId, () => {
                map.getCanvas().style.cursor = '';

                // Start 10 second countdown when mouse leaves
                if (popup && !popupTimeout) {
                    popupTimeout = setTimeout(() => {
                        if (popup) {
                            popup.remove();
                            popup = null;
                        }
                        popupTimeout = null;
                    }, 10000);
                }
            });

        } else {
            // Remove layer from map
            if (map.getLayer(fillLayerId)) {
                map.removeLayer(fillLayerId);
            }
            if (map.getLayer(lineLayerId)) {
                map.removeLayer(lineLayerId);
            }
            if (map.getSource(sourceId)) {
                map.removeSource(sourceId);
            }
        }
    };

    // Handle toggle change
    const handleToggle = (filterId: string) => {
        const newState = !activeFilters[filterId];
        setActiveFilters(prev => ({
            ...prev,
            [filterId]: newState
        }));
        toggleLayer(filterId, newState);
    };



    const showOverallStatistics = () => {
        if (!mapRef?.current) return;

        const map = mapRef.current;
        const centerLng = map.getCenter().lng;
        const centerLat = map.getCenter().lat;

        const statsPopup = new maplibregl.Popup({
            closeButton: false,
            closeOnClick: true,
            className: 'fra-stats-popup',
            anchor: 'center'
        })
            .setLngLat([centerLng, centerLat])
            .setHTML(`
      <div class="bg-white w-full p-3 rounded-lg shadow-lg border max-w-sm">
        <div class="flex items-center justify-between mb-2">
          <h3 class="text-sm font-bold text-gray-800 flex items-center gap-2">
            <div class="w-6 h-6 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center">
              <svg class="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
            </div>
            FRA Claims Stats
          </h3>
          <button onclick="closeStatsPopup()" class="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <!-- Key Stats -->
        <div class="grid grid-cols-3 gap-2 mb-3 text-center">
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 p-2 rounded-md border border-blue-200">
            <div class="text-base font-bold text-blue-700">${overallStats.totalClaims.toLocaleString()}</div>
            <div class="text-[10px] text-blue-600">fraClaims</div>
          </div>
          <div class="bg-gradient-to-br from-green-50 to-green-100 p-2 rounded-md border border-green-200">
            <div class="text-base font-bold text-green-700">${overallStats.approved.toLocaleString()}</div>
            <div class="text-[10px] text-green-600">Approved</div>
          </div>
          <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 p-2 rounded-md border border-yellow-200">
            <div class="text-base font-bold text-yellow-700">${overallStats.pending.toLocaleString()}</div>
            <div class="text-[10px] text-yellow-600">Pending</div>
          </div>
          <div class="bg-gradient-to-br from-red-50 to-red-100 p-2 rounded-md border border-red-200">
            <div class="text-base font-bold text-red-700">${overallStats.rejected}</div>
            <div class="text-[10px] text-red-600">Rejected</div>
          </div>
          <div class="bg-gradient-to-br from-orange-50 to-orange-100 p-2 rounded-md border border-orange-200">
            <div class="text-base font-bold text-orange-700">${overallStats.incomplete}</div>
            <div class="text-[10px] text-orange-600">Incomplete</div>
          </div>
          <div class="bg-gradient-to-br from-teal-50 to-teal-100 p-2 rounded-md border border-teal-200">
            <div class="text-base font-bold text-teal-700">${Math.round((overallStats.approved / overallStats.totalClaims) * 100)}%</div>
            <div class="text-[10px] text-teal-600">Success</div>
          </div>
        </div>

        <!-- Extra Detailed Stats -->
        <div class="grid grid-cols-2 gap-2 text-[11px] text-gray-700 mb-3">
          <div class="bg-gray-50 p-1.5 rounded border">State <br><span class="font-semibold">${overallStats.stateName}</span></div>
          <div class="bg-gray-50 p-1.5 rounded border">Total Area <br><span class="font-semibold">${overallStats.totalArea} ha</span></div>
          <div class="bg-gray-50 p-1.5 rounded border">Tribal Population <br><span class="font-semibold">${overallStats.tribalPopulation}</span></div>
          <div class="bg-gray-50 p-1.5 rounded border">Districts <br><span class="font-semibold">${overallStats.districts}</span></div>
          <div class="bg-gray-50 p-1.5 rounded border">Communities <br><span class="font-semibold">${overallStats.communities}</span></div>
          <div class="bg-gray-50 p-1.5 rounded border">IFR Claims <br><span class="font-semibold">${overallStats.ifrClaims}</span></div>
          <div class="bg-gray-50 p-1.5 rounded border">CR Claims <br><span class="font-semibold">${overallStats.crClaims}</span></div>
          <div class="bg-gray-50 p-1.5 rounded border">CFR Claims <br><span class="font-semibold">${overallStats.cfrClaims}</span></div>
          <div class="bg-gray-50 p-1.5 rounded border">Potential Region <br><span class="font-semibold">${overallStats.potentialRegions} ha</span></div>
          <div class="bg-gray-50 p-1.5 rounded border">Granted Region <br><span class="font-semibold">${overallStats.grantedRegions} ha</span></div>
          <div class="bg-gray-50 p-1.5 rounded border">% Potential vs Granted <br><span class="font-semibold">${Math.round((overallStats.grantedRegions / overallStats.potentialRegions) * 100)}%</span></div>
        </div>

        <!-- CTA -->
        <button 
          onclick="navigateToDashboard('overview')" 
          class="w-full px-2 py-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-medium rounded-md hover:shadow-md transition-all duration-200 hover:scale-105 flex items-center justify-center gap-1"
        >
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
          </svg>
          Dashboard
        </button>
      </div>
    `)
            .addTo(map);

        (window as any).closeStatsPopup = () => {
            statsPopup.remove();
            delete (window as any).closeStatsPopup;
        };

        setTimeout(() => {
            if (statsPopup) {
                statsPopup.remove();
                delete (window as any).closeStatsPopup;
            }
        }, 15000);
    };


    const claimStatusItems = [
        {
            id: 'approved-claims',
            icon: CheckCircle,
            title: 'Approved Claims',
            description: 'Forest rights claims that have been approved',
            color: 'text-green-600'
        },
        {
            id: 'pending-claims',
            icon: Clock,
            title: 'Pending Claims',
            description: 'Claims under review or waiting for approval',
            color: 'text-yellow-600'
        },
        {
            id: 'rejected-claims',
            icon: XCircle,
            title: 'Rejected Claims',
            description: 'Claims that have been rejected with reasons',
            color: 'text-red-600'
        },
        {
            id: 'incomplete-claims',
            icon: AlertTriangle,
            title: 'Incomplete Claims',
            description: 'Claims requiring additional documentation',
            color: 'text-orange-600'
        }
    ];
    const content = (

        <div className="space-y-4 p-5">
            <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                    <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-1">FRA Claim Status</h3>
                        <p className="text-xs text-gray-500">Filter claims by their current status in the approval process</p>
                    </div>
                    <button
                        onClick={showOverallStatistics}
                        className="p-2 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-full hover:shadow-lg transition-all duration-200 hover:scale-110"
                        title="View Overall Statistics"
                    >
                        <Info className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {claimStatusItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeFilters[item.id] || false;
                return (
                    <div
                        key={item.id}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${isActive
                            ? 'border-teal-300 bg-teal-50'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <div className="flex items-center space-x-3">
                            <IconComponent className={`w-5 h-5 ${isActive ? item.color : 'text-gray-400'}`} />
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className={`text-sm font-medium ${isActive ? 'text-gray-800' : 'text-gray-600'}`}>
                                        {item.title}
                                    </h4>
                                    {isActive && (
                                        <span className="px-2 py-0.5 text-xs bg-teal-100 text-teal-700 rounded-full">
                                            Active
                                        </span>
                                    )}
                                </div>
                                <p className={`text-xs ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {item.description}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => handleToggle(item.id)}
                            className={`w-12 h-6 rounded-full transition-colors duration-200 ${isActive ? 'bg-teal-500' : 'bg-gray-200'
                                }`}
                        >
                            <div className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${isActive ? 'translate-x-6' : 'translate-x-0.5'
                                }`} />
                        </button>
                    </div>
                );
            })}
        </div>
    );

    return isMobile ? (
        // ✅ Mobile full-width bottom sheet
        <div ref={filterPopupRef}>
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-white via-white to-gray-50 shadow-2xl rounded-t-xl max-h-[70vh] transition-all duration-200 ease-out border-t border-gray-200">
                <div className="flex items-center justify-between p-4 pb-2 bg-gradient-to-r from-teal-600 to-teal-800 rounded-t-xl border-b border-purple-200">
                    <h2 className="text-base text-white font-semibold"><Filter className="inline-block w-5 h-5 mr-2" />GLOBAL FRA Data Filters</h2>
                    <button
                        onClick={() => setSpecificLocationFilterPopupOpen(false)}
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
        <Draggable nodeRef={filterPopupRef} handle=".drag-handle">
            <div ref={filterPopupRef} className="fixed top-5 z-30 left-20 w-[500px] bg-white shadow-2xl rounded-lg border overflow-hidden"
            >
                <div className="drag-handle flex justify-between items-center p-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white cursor-move"
                >
                    <h2 className="text-base text-white font-semibold"> <Filter className="inline-block w-5 h-5 mr-2" />Location Specific FRA Filters</h2>
                    <button
                        onClick={() => setSpecificLocationFilterPopupOpen(false)}
                        className="p-1 hover:bg-white/20 rounded-full transition-colors duration-150 cursor-pointer backdrop-blur-sm"
                    >
                        <X className="w-5 h-5 text-white drop-shadow-sm" />
                    </button>
                </div>
                {content}
            </div>
        </Draggable>
    );
}