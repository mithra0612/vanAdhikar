"use client";
import { BaseMapSwitcher, BasemapSwitchButton } from "@/components/mapComponents/baseMapSwitcher";
import BearingAdjuster from "@/components/mapComponents/bearingAdjuster";
import { MasterMapSettings, MasterSettingsButton } from "@/components/mapComponents/masterSettings";
import SearchLocation from "@/components/mapComponents/search";
import TopButtons from "@/components/mapComponents/topButtons";
import { useMapStore } from "@/stores/MapStore";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useEffect, useRef } from "react";
import { FilterButton, FilterPopup } from "@/components/mapComponents/filters";
import HoverInfoCard from "@/components/mapComponents/hoverpopup";
import { attachHoverListeners } from "@/lib/mapHoverUtils";
import { useFilterStore } from "@/stores/FilterStore";
import { useRouter } from "next/navigation";

export default function MapWithStats() {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const router = useRouter();

    const { styleURL: styleUrl, pitch, setPitch, bearing, setBearing, settingsOpen, setSettingsOpen, terrain3D, setTerrain3D, terrainExaggeration, setTerrainExaggeration, basemapPopupOpen, setBasemapPopupOpen, query, setQuery, results, setResults, isMobile, setIsMobile, bearingControlOpen, setBearingControlOpen, hoverInfo, setHoverInfo } = useMapStore();

    // Filter store for persistence
    const {
        stateBoundariesVisible,
        selectedStates,
        selectedDistricts,
        setStateBoundariesVisible,
        setSelectedStates,
        setSelectedDistricts
    } = useFilterStore();

    // Check for mobile on mount
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Function to restore layers based on persisted state (after page refresh)
    const restoreLayersFromPersistedState = async () => {
        if (!mapRef.current) {
            console.log('Map ref not available, skipping restoration');
            return;
        }

        try {
            console.log('Restoring layers from persisted state...', { stateBoundariesVisible, selectedStates, selectedDistricts });

            // Restore "All State Boundaries" if it was visible
            if (stateBoundariesVisible) {
                console.log('Restoring state boundaries...');
                // const response = await fetch('/api/stateBoundaries');
                const response = await fetch('/geojson/stateBoundaries.json');

                if (!response.ok) {
                    console.error('Failed to fetch state boundaries:', response.status, response.statusText);
                    return;
                }

                const geojsonData = await response.json();
                console.log('State boundaries data loaded:', geojsonData);

                if (!mapRef.current.getSource('state-boundaries')) {
                    mapRef.current.addSource('state-boundaries', {
                        type: 'geojson',
                        data: geojsonData
                    });

                    mapRef.current.addLayer({
                        id: 'state-boundaries-layer',
                        type: 'fill',
                        source: 'state-boundaries',
                        paint: {
                            'fill-color': '#088',
                            'fill-opacity': 0.2
                        }
                    });

                    mapRef.current.addLayer({
                        id: 'state-boundaries-outline',
                        type: 'line',
                        source: 'state-boundaries',
                        paint: {
                            'line-color': '#088',
                            'line-width': 2
                        }
                    });

                    attachHoverListeners(mapRef as React.RefObject<maplibregl.Map>, 'state-boundaries-layer', 'state', setHoverInfo);
                }
            }

            // Restore selected states if any
            if (selectedStates.length > 0) {
                console.log('Restoring selected states...');
                // const response = await fetch('/api/stateBoundaries');
                const response = await fetch('/geojson/stateBoundaries.json');

                if (!response.ok) {
                    console.error('Failed to fetch state boundaries for selected states:', response.status, response.statusText);
                } else {
                    const geojsonData = await response.json();

                    const filteredFeatures = geojsonData.features.filter((feature: any) =>
                        selectedStates.includes(feature.properties.ST_NM)
                    );

                    if (filteredFeatures.length === 0) {
                        console.warn('No features found for selected states:', selectedStates);
                        return;
                    }

                    console.log('Selected states data loaded:', filteredFeatures.length, 'features');

                    const filteredGeoJson = {
                        type: "FeatureCollection" as const,
                        features: filteredFeatures
                    };

                    if (!mapRef.current.getSource('selected-states')) {
                        mapRef.current.addSource('selected-states', {
                            type: 'geojson',
                            data: filteredGeoJson
                        });

                        mapRef.current.addLayer({
                            id: 'selected-states-layer',
                            type: 'fill',
                            source: 'selected-states',
                            paint: {
                                'fill-color': '#3B82F6',
                                'fill-opacity': 0.3
                            }
                        });

                        mapRef.current.addLayer({
                            id: 'selected-states-outline',
                            type: 'line',
                            source: 'selected-states',
                            paint: {
                                'line-color': '#2563EB',
                                'line-width': 2
                            }
                        });

                        attachHoverListeners(mapRef as React.RefObject<maplibregl.Map>, 'selected-states-layer', 'state', setHoverInfo);
                    }
                }
            }

            // Restore selected districts if any
            for (const [stateName, isEnabled] of Object.entries(selectedDistricts)) {
                if (isEnabled) {
                    console.log('Restoring districts for state:', stateName);
                    // const response = await fetch(`/api/districts/${encodeURIComponent(stateName)}`);
                    const response = await fetch(`/geojson/districts/${encodeURIComponent(stateName)}.json`);
                    if (response.ok) {
                        const districtData = await response.json();
                        const layerId = `districts-${stateName}`;
                        const sourceId = `districts-source-${stateName}`;
                        const outlineLayerId = `districts-outline-${stateName}`;

                        if (!mapRef.current?.getSource(sourceId)) {
                            mapRef.current?.addSource(sourceId, {
                                type: 'geojson',
                                data: districtData
                            });

                            mapRef.current?.addLayer({
                                id: layerId,
                                type: 'fill',
                                source: sourceId,
                                paint: {
                                    'fill-color': '#10B981',
                                    'fill-opacity': 0.3
                                }
                            });

                            mapRef.current?.addLayer({
                                id: outlineLayerId,
                                type: 'line',
                                source: sourceId,
                                paint: {
                                    'line-color': '#059669',
                                    'line-width': 2
                                }
                            });

                            attachHoverListeners(mapRef as React.RefObject<maplibregl.Map>, layerId, 'district', setHoverInfo);
                        }
                    } else {
                        console.error('Failed to fetch districts for state:', stateName, response.status);
                    }
                }
            }
        } catch (error) {
            console.error('Error restoring layers:', error);
        }
    };

    useEffect(() => {
        if (mapRef.current) {
            // Save current layers before style change
            const layersToSave: any[] = [];
            if (mapRef.current.getSource('state-boundaries')) {
                layersToSave.push({ type: 'state-boundaries' });
            }
            if (mapRef.current.getSource('selected-states')) {
                layersToSave.push({ type: 'selected-states' });
            }

            // Save district layers
            Object.entries(selectedDistricts).forEach(([stateName, isEnabled]) => {
                if (isEnabled && mapRef.current?.getSource(`districts-source-${stateName}`)) {
                    layersToSave.push({ type: 'district', stateName });
                }
            });

            mapRef.current.setStyle(styleUrl);

            // Restore layers after style loads
            mapRef.current.once('style.load', () => {
                // Re-add terrain source
                if (!mapRef.current?.getSource("terrainSource")) {
                    mapRef.current?.addSource("terrainSource", {
                        type: "raster-dem",
                        tiles: [
                            "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
                        ],
                        tileSize: 256,
                        encoding: "terrarium",
                    });
                }

                // Restore saved layers
                restoreLayersFromPersistedState();
            });

            return;
        }

        mapRef.current = new maplibregl.Map({
            container: mapContainer.current!,
            style: styleUrl,
            center: [77.5946, 12.9716],
            zoom: 6,
            pitch,
            bearing,
            maxPitch: 85,
        });

        mapRef.current.addControl(new maplibregl.NavigationControl(), "bottom-left");

        // Set up terrain source after map loads
        mapRef.current.on("load", () => {
            if (!mapRef.current?.getSource("terrainSource")) {
                mapRef.current?.addSource("terrainSource", {
                    type: "raster-dem",
                    tiles: [
                        "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
                    ],
                    tileSize: 256,
                    encoding: "terrarium",
                });
            }

            // Restore layers from persisted state after map loads
            restoreLayersFromPersistedState();
        });

    }, [styleUrl]);

    // Smooth pitch and bearing changes (sliders)
    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.easeTo({
                pitch,
                bearing,
                duration: 800,
            });
        }
    }, [pitch, bearing]);

    // Update terrain exaggeration when slider changes
    useEffect(() => {
        if (mapRef.current && terrain3D) {
            mapRef.current.setTerrain({
                source: "terrainSource",
                exaggeration: terrainExaggeration,
            });
        }
    }, [terrainExaggeration, terrain3D]);

    // 3D Terrain toggle handler
    const toggle3DTerrain = () => {
        if (!mapRef.current) return;

        if (terrain3D) {
            // Disable 3D terrain
            mapRef.current.setTerrain(null);
            setTerrain3D(false);
        } else {
            // Check if terrain source exists, if not create it
            if (!mapRef.current.getSource("terrainSource")) {
                mapRef.current.addSource("terrainSource", {
                    type: "raster-dem",
                    tiles: [
                        "https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png",
                    ],
                    tileSize: 256,
                    encoding: "terrarium",
                });
            }

            // Enable 3D terrain
            mapRef.current.setTerrain({
                source: "terrainSource",
                exaggeration: terrainExaggeration,
            });
            setTerrain3D(true);

            // Automatically adjust pitch for better 3D view
            if (pitch < 30) {
                setPitch(60);
                mapRef.current.easeTo({
                    pitch: 60,
                    duration: 1000,
                });
            }
        }
    };

    // Handle keyboard events for basemap popup
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && basemapPopupOpen) {
                setBasemapPopupOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [basemapPopupOpen]);


    // Sample GeoJSON data for different claim types
    const sampleData = {
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
    }

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

    // Load sample GeoJSON data - FIXED VERSION
    useEffect(() => {
        if (!mapRef?.current) {
            console.log('Map ref not available for sample data');
            return;
        }

        const map = mapRef.current;
        const sourceId = `fra-incomplete-claims`;
        const fillLayerId = `fra-incomplete-claims-fill`;
        const lineLayerId = `fra-incomplete-claims-line`;

        const data = sampleData['incomplete-claims'];
        if (!data) {
            console.log('Sample data not found');
            return;
        }

        const addGeoJsonLayer = () => {
            console.log('Adding sample GeoJSON layer...');

            // Remove existing layers and source if they exist
            if (map.getLayer(lineLayerId)) {
                map.removeLayer(lineLayerId);
            }
            if (map.getLayer(fillLayerId)) {
                map.removeLayer(fillLayerId);
            }
            if (map.getSource(sourceId)) {
                map.removeSource(sourceId);
            }

            // Add source
            map.addSource(sourceId, {
                type: 'geojson',
                data: data as any
            });
            console.log('Source added:', sourceId);

            const colors = getStatusColor(data.features[0]?.properties.status || '');

            // Add fill layer
            map.addLayer({
                id: fillLayerId,
                type: 'fill',
                source: sourceId,
                paint: {
                    'fill-color': colors.fill,
                    'fill-opacity': 0.4
                }
            });
            console.log('Fill layer added:', fillLayerId);

            // Add line layer
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
            console.log('Line layer added:', lineLayerId);

            // Calculate bounds and fly to the GeoJSON data
            const bounds = new maplibregl.LngLatBounds();
            data.features.forEach((feature: any) => {
                if (feature.geometry.type === 'Polygon') {
                    feature.geometry.coordinates[0].forEach((coord: number[]) => {
                        bounds.extend([coord[0], coord[1]] as [number, number]);
                    });
                } else if (feature.geometry.type === 'MultiPolygon') {
                    feature.geometry.coordinates.forEach((polygon: number[][][]) => {
                        polygon[0].forEach((coord: number[]) => {
                            bounds.extend([coord[0], coord[1]] as [number, number]);
                        });
                    });
                }
            });

            // Fly to the bounds with animation
            if (!bounds.isEmpty()) {
                map.fitBounds(bounds, {
                    padding: 50,
                    duration: 2000,
                    maxZoom: 12
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
        };

        // Use a more reliable approach to ensure style is loaded
        const loadLayer = () => {
            if (map.isStyleLoaded()) {
                addGeoJsonLayer();
            } else {
                // If not loaded, wait a bit and try again
                setTimeout(loadLayer, 100);
            }
        };

        // Try to load immediately
        loadLayer();

        // Also listen for style load event as backup
        map.once('style.load', () => {
            console.log('Style loaded, adding sample GeoJSON layer');
            addGeoJsonLayer();
        });

        // Cleanup function
        return () => {
            if (map.getLayer(lineLayerId)) {
                map.removeLayer(lineLayerId);
            }
            if (map.getLayer(fillLayerId)) {
                map.removeLayer(fillLayerId);
            }
            if (map.getSource(sourceId)) {
                map.removeSource(sourceId);
            }
        };
    }, [mapRef.current]);


    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Map Container */}
            <div ref={mapContainer} className="w-full h-full" />

            <SearchLocation mapRef={mapRef as React.RefObject<maplibregl.Map>} />

            <TopButtons toggle3DTerrain={toggle3DTerrain} mapRef={mapRef as React.RefObject<maplibregl.Map>} />

            <BearingAdjuster mapRef={mapRef as React.RefObject<maplibregl.Map>} />


            <BasemapSwitchButton />
            <BaseMapSwitcher />

            {/* <DraggablePopup /> sample draggable popup implementation */}

            <MasterSettingsButton />
            <MasterMapSettings mapRef={mapRef as React.RefObject<maplibregl.Map>} toggle3DTerrain={toggle3DTerrain} />

            <FilterButton />
            <FilterPopup mapRef={mapRef as React.RefObject<maplibregl.Map>} />

            <HoverInfoCard />

        </div >
    );
}