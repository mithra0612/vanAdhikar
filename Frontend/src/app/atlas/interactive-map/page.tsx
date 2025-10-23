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
import SpecificLocationFilterPopup from "@/components/mapComponents/specificStateFilter";

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

            <SpecificLocationFilterPopup mapRef={mapRef as React.RefObject<maplibregl.Map>} />
            <HoverInfoCard />

        </div >
    );
}