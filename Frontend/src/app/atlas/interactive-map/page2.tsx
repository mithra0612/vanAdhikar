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
import DraggablePopup from "./drag";
import { FilterButton, FilterPopup } from "@/components/mapComponents/filters";
import HoverInfoCard from "@/components/mapComponents/hoverpopup";
import { useFilterStore } from "@/stores/FilterStore";
import { attachHoverListeners, detachHoverListeners } from "@/lib/mapHoverUtils";

/**
 * FRA (Forest Rights Act) Regions Visualization
 * 
 * This section implements visualization of Forest Rights Act regions on the map.
 * The implementation includes:
 * 1. Dummy GeoJSON data representing potential FRA regions
 * 2. Color-coded styling based on status (Protected, Approved, Pending, Under Review)
 * 3. Interactive hover effects to display region information
 * 4. Persistent display across map style changes
 * 
 * Each FRA region contains the following properties:
 * - id: Unique identifier for the region
 * - name: Descriptive name of the FRA region
 * - area_ha: Area in hectares
 * - status: Current status (Protected, Approved, Pending Approval, Under Review)
 * - forest_type: Type of forest in the region
 * - tribal_communities: Array of tribal communities in the region
 * - biodiversity_index: Numerical index representing biodiversity (0-10)
 */

// Dummy GeoJSON data for FRA regions
const fraRegionsData = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "id": "fra-001",
                "name": "Western Ghats FRA Region",
                "area_ha": 12500,
                "status": "Protected",
                "forest_type": "Tropical Evergreen",
                "tribal_communities": ["Toda", "Kota", "Kurumba"],
                "biodiversity_index": 8.7
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [76.50, 13.20],
                        [76.55, 13.22],
                        [76.62, 13.21],
                        [76.68, 13.23],
                        [76.70, 13.19],
                        [76.69, 13.15],
                        [76.72, 13.10],
                        [76.68, 13.05],
                        [76.63, 13.02],
                        [76.58, 13.00],
                        [76.53, 13.03],
                        [76.51, 13.08],
                        [76.48, 13.12],
                        [76.50, 13.17],
                        [76.50, 13.20]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "fra-002",
                "name": "Eastern Ghats FRA Zone",
                "area_ha": 8900,
                "status": "Pending Approval",
                "forest_type": "Deciduous",
                "tribal_communities": ["Kondadora", "Khond"],
                "biodiversity_index": 7.5
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [78.10, 12.80],
                        [78.15, 12.83],
                        [78.21, 12.82],
                        [78.26, 12.84],
                        [78.30, 12.81],
                        [78.32, 12.77],
                        [78.29, 12.73],
                        [78.31, 12.69],
                        [78.28, 12.65],
                        [78.23, 12.63],
                        [78.18, 12.62],
                        [78.14, 12.65],
                        [78.11, 12.69],
                        [78.09, 12.74],
                        [78.10, 12.80]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "fra-003",
                "name": "Central India FRA Corridor",
                "area_ha": 15600,
                "status": "Approved",
                "forest_type": "Mixed Deciduous",
                "tribal_communities": ["Gond", "Baiga", "Muria"],
                "biodiversity_index": 8.2
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [77.30, 12.20],
                        [77.33, 12.23],
                        [77.38, 12.24],
                        [77.42, 12.22],
                        [77.46, 12.24],
                        [77.50, 12.21],
                        [77.52, 12.17],
                        [77.49, 12.13],
                        [77.51, 12.09],
                        [77.48, 12.05],
                        [77.43, 12.02],
                        [77.38, 12.00],
                        [77.34, 12.03],
                        [77.31, 12.07],
                        [77.28, 12.12],
                        [77.29, 12.16],
                        [77.30, 12.20]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "fra-004",
                "name": "Himalayan Foothills FRA Area",
                "area_ha": 18200,
                "status": "Under Review",
                "forest_type": "Sub-tropical Pine",
                "tribal_communities": ["Tharu", "Bhotiya"],
                "biodiversity_index": 9.1
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [77.80, 13.50],
                        [77.84, 13.53],
                        [77.89, 13.54],
                        [77.93, 13.52],
                        [77.97, 13.54],
                        [78.00, 13.51],
                        [78.02, 13.47],
                        [78.00, 13.43],
                        [78.03, 13.39],
                        [78.00, 13.35],
                        [77.96, 13.33],
                        [77.91, 13.31],
                        [77.86, 13.32],
                        [77.82, 13.35],
                        [77.79, 13.39],
                        [77.77, 13.44],
                        [77.80, 13.50]
                    ]
                ]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "id": "fra-005",
                "name": "Sundarbans FRA Region",
                "area_ha": 9800,
                "status": "Protected",
                "forest_type": "Mangrove",
                "tribal_communities": ["Munda"],
                "biodiversity_index": 8.9
            },
            "geometry": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [77.00, 13.80],
                        [77.03, 13.84],
                        [77.07, 13.85],
                        [77.12, 13.83],
                        [77.16, 13.85],
                        [77.20, 13.82],
                        [77.22, 13.78],
                        [77.19, 13.74],
                        [77.21, 13.70],
                        [77.18, 13.66],
                        [77.14, 13.63],
                        [77.09, 13.61],
                        [77.05, 13.63],
                        [77.02, 13.67],
                        [76.98, 13.71],
                        [76.97, 13.76],
                        [77.00, 13.80]
                    ]
                ]
            }
        }
    ]
};

export default function MapWithStats() {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);

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

    /**
     * Adds FRA (Forest Rights Act) regions to the map
     * 
     * This function adds the FRA regions GeoJSON data to the map with appropriate styling:
     * - Fill layer with color coding based on status
     * - Outline layer for region boundaries
     * - Text labels showing region names
     * - Hover interactions to display detailed information
     * 
     * The function checks if the source already exists to prevent duplication
     * and attaches hover listeners for interactive information display.
     */
    const addFraRegionsToMap = () => {
        if (!mapRef.current) return;
        
        // Add FRA regions source if it doesn't exist
        if (!mapRef.current.getSource('fra-regions')) {
            mapRef.current.addSource('fra-regions', {
                type: 'geojson',
                data: fraRegionsData
            });

            // Add base fill layer for FRA regions
            mapRef.current.addLayer({
                id: 'fra-regions-layer',
                type: 'fill',
                source: 'fra-regions',
                paint: {
                    'fill-color': [
                        'match',
                        ['get', 'status'],
                        'Protected', '#8B4513',  // Brown for Protected
                        'Approved', '#006400',   // Dark Green for Approved
                        'Pending Approval', '#DAA520', // Goldenrod for Pending
                        'Under Review', '#4682B4',  // Steel Blue for Under Review
                        '#888888'  // Default gray
                    ],
                    'fill-opacity': 0.7
                }
            });
            
            // Add texture fill layer with noise effect
            mapRef.current.addLayer({
                id: 'fra-regions-texture',
                type: 'fill',
                source: 'fra-regions',
                paint: {
                    'fill-color': '#ffffff',
                    'fill-opacity': [
                        'match',
                        ['get', 'forest_type'],
                        'Tropical Evergreen', 0.15,
                        'Deciduous', 0.12,
                        'Mixed Deciduous', 0.10,
                        'Sub-tropical Pine', 0.08,
                        'Mangrove', 0.18,
                        0.12 // Default opacity
                    ]
                }
            });

            // Add primary outline
            mapRef.current.addLayer({
                id: 'fra-regions-outline',
                type: 'line',
                source: 'fra-regions',
                paint: {
                    'line-color': '#000',
                    'line-width': 2,
                    'line-opacity': 0.8,
                    'line-dasharray': [3, 1],
                    'line-blur': 0.5
                }
            });
            
            // Add secondary outline with offset for rougher appearance
            mapRef.current.addLayer({
                id: 'fra-regions-outline-rough',
                type: 'line',
                source: 'fra-regions',
                paint: {
                    'line-color': '#333',
                    'line-width': 1,
                    'line-opacity': 0.5,
                    'line-dasharray': [2, 2, 1],
                    'line-translate': [1, 1],
                    'line-translate-anchor': 'viewport'
                }
            });
            
            // Add tertiary outline with different offset for even rougher appearance
            mapRef.current.addLayer({
                id: 'fra-regions-outline-rougher',
                type: 'line',
                source: 'fra-regions',
                paint: {
                    'line-color': '#555',
                    'line-width': 0.5,
                    'line-opacity': 0.3,
                    'line-dasharray': [1, 2],
                    'line-translate': [-1, -1],
                    'line-translate-anchor': 'viewport'
                }
            });

            // Add labels for FRA regions
            mapRef.current.addLayer({
                id: 'fra-regions-labels',
                type: 'symbol',
                source: 'fra-regions',
                layout: {
                    'text-field': ['get', 'name'],
                    'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'],
                    'text-size': 12,
                    'text-offset': [0, 0],
                    'text-anchor': 'center'
                },
                paint: {
                    'text-color': '#fff',
                    'text-halo-color': '#000',
                    'text-halo-width': 1
                }
            });

            // Add hover interaction for FRA regions
            // Attach to base layer only to avoid multiple hover events
            attachHoverListeners(
                mapRef as React.RefObject<maplibregl.Map>, 
                'fra-regions-layer', 
                'state', // Using 'state' type for hover info display
                setHoverInfo
            );
        }
    };

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
                const response = await fetch('/api/stateBoundaries');
                
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
                const response = await fetch('/api/stateBoundaries');
                
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
                    const response = await fetch(`/api/districts/${encodeURIComponent(stateName)}`);
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
            if (mapRef.current.getSource('fra-regions')) {
                layersToSave.push({ type: 'fra-regions' });
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
                
                // Re-add FRA regions
                addFraRegionsToMap();
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
            
            // Add FRA regions to the map
            addFraRegionsToMap();
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


    return (
        <div className="relative w-full h-screen overflow-hidden">
            {/* Map Container */}
            <div ref={mapContainer} className="w-full h-full" />

            <SearchLocation mapRef={mapRef as React.RefObject<maplibregl.Map>} />

            <TopButtons toggle3DTerrain={toggle3DTerrain} mapRef={mapRef as React.RefObject<maplibregl.Map>} />

            <BearingAdjuster mapRef={mapRef as React.RefObject<maplibregl.Map>} />


            <BasemapSwitchButton />
            <BaseMapSwitcher />

            <DraggablePopup />

            <MasterSettingsButton />
            <MasterMapSettings mapRef={mapRef as React.RefObject<maplibregl.Map>} toggle3DTerrain={toggle3DTerrain} />

            <FilterButton />
            <FilterPopup mapRef={mapRef as React.RefObject<maplibregl.Map>} />

            <HoverInfoCard />

        </div >
    );
}	