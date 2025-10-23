"use client";
import { BaseMapSwitcher, BasemapSwitchButton } from "@/components/mapComponents/baseMapSwitcher";
import BearingAdjuster from "@/components/mapComponents/bearingAdjuster";
import { MasterMapSettings, MasterSettingsButton } from "@/components/mapComponents/masterSettings";
import SearchLocation from "@/components/mapComponents/search";
import TopButtons from "@/components/mapComponents/topButtons";
import { useMapStore } from "@/stores/MapStore";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from "react";

export default function MapWithStats() {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    const { styleURL: styleUrl, pitch, setPitch, bearing, setBearing, settingsOpen, setSettingsOpen, terrain3D, setTerrain3D, terrainExaggeration, setTerrainExaggeration, basemapPopupOpen, setBasemapPopupOpen, query, setQuery, results, setResults, isMobile, setIsMobile, bearingControlOpen, setBearingControlOpen } = useMapStore();

    // Check for mobile on mount
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 640);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setStyle(styleUrl);
            return;
        }

        mapboxgl.accessToken = 'pk.eyJ1IjoiZ2lyaXNoMjA1NSIsImEiOiJjbWYyYmViaHAxMnBlMmlzYmNxdWozejNhIn0.71tCKVVLxEt92nv5yOAlXQ';

        mapRef.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: styleUrl,
            center: [77.5946, 12.9716],
            zoom: 6,
            pitch,
            bearing,
            maxPitch: 85,
        });

        mapRef.current.addControl(new mapboxgl.NavigationControl(), "bottom-left");

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

            <SearchLocation mapRef={mapRef as React.RefObject<mapboxgl.Map>} />

            <TopButtons toggle3DTerrain={toggle3DTerrain} mapRef={mapRef as React.RefObject<mapboxgl.Map>} />

            <BearingAdjuster mapRef={mapRef as React.RefObject<mapboxgl.Map>} />


            <BasemapSwitchButton />
            <BaseMapSwitcher />


            <MasterSettingsButton />
            <MasterMapSettings mapRef={mapRef as React.RefObject<mapboxgl.Map>} toggle3DTerrain={toggle3DTerrain} />

        </div >
    );
}