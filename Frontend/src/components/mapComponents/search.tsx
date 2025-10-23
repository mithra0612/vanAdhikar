import { useMapStore } from '@/stores/MapStore';
import React, { useState, useEffect } from 'react'
import maplibregl from "maplibre-gl";
import { Search, MapPin, X, Loader2, Map } from 'lucide-react';

function SearchLocation({ mapRef }: { mapRef: React.RefObject<maplibregl.Map> }) {
    const { query, setQuery, results, setResults } = useMapStore();
    const [isLoading, setIsLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [boundaryLoading, setBoundaryLoading] = useState(false);
    const [currentMarker, setCurrentMarker] = useState<maplibregl.Marker | null>(null);
    const { setSpecificLocationFilterPopupOpen } = useMapStore();
    // Add custom CSS for popup styling
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            .boundary-popup-custom .maplibregl-popup-content {
                padding: 0 !important;
                border-radius: 8px !important;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05) !important;
                border: 1px solid rgba(229, 231, 235, 0.8) !important;
                max-width: 250px !important;
            }
            .boundary-popup-custom .maplibregl-popup-tip {
                border-top-color: white !important;
            }
            .boundary-popup-custom .maplibregl-popup-close-button {
                display: none !important;
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    // Fetch suggestions from Mapbox Geocoding API
    const handleSearch = async (val: string) => {
        console.log('Searching for:', val);
        setQuery(val);
        if (val.length < 3) {
            setResults([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        try {
            const res = await fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
                    val
                )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}&limit=5`
            );
            const data = await res.json();
            console.log('Geocoding results:', data);
            setResults(data.features || []);
        } catch (error) {
            console.error('Search error:', error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch and display boundary for a location
    const fetchAndDisplayBoundary = async (place: any) => {
        console.log("fetchAndDisplayBoundary called")
        if (!mapRef.current) return;

        setBoundaryLoading(true);
        try {
            const [lon, lat] = place.center;
            const placeName = place.place_name.toLowerCase().split(',')[0].trim();
            const State = place?.context?.find((ctx: any) => ctx.id.includes('region'))?.text;
            const indianStates = [
                "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
                "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
                "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
                "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
                "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
                "Uttar Pradesh", "Uttarakhand", "West Bengal"
            ];

            let boundaryData = null;
            let boundaryType = "approximate";
            let isActualBoundary = false;

            // Check if it's a state
            if (!State && indianStates.map(state => state.toLowerCase()).includes(placeName)) {
                console.log("Checking for state boundary:", placeName);
                try {
                    // const response = await fetch('/api/stateBoundaries');
                    const response = await fetch('/geojson/stateBoundaries.json');
                    if (!response.ok) {
                        throw new Error('Failed to fetch state boundaries');
                    }
                    if (response.ok) {
                        const stateData = await response.json();
                        const stateName = place.text || place.place_name.split(',')[0];

                        const matchingState = stateData.features.find((feature: any) => {
                            const featureName = feature.properties.ST_NM || '';
                            return featureName.toLowerCase() === stateName.toLowerCase();
                        });

                        if (matchingState) {
                            boundaryData = {
                                type: "FeatureCollection" as const,
                                features: [matchingState]
                            };
                            boundaryType = "state";
                            isActualBoundary = true;
                            console.log('Found state boundary:', matchingState.properties);
                        }
                    }
                } catch (error) {
                    console.log('Error loading state boundary:', error);
                }
            }
            // Check if it's a district (only if state boundary wasn't found)
            else if (State && !isActualBoundary) {
                console.log("Checking for district boundary in state:", State);
                try {
                    // const response = await fetch(`/api/districts/${encodeURIComponent(State)}`);
                    const response = await fetch(`/geojson/districts/${encodeURIComponent(State)}.json`);
                    if (response.ok) {
                        const districtData = await response.json();
                        const districtName = place.text || place.place_name.split(',')[0];

                        const matchingDistrict = districtData.features.find((feature: any) => {
                            const featureName = feature.properties.dtname || '';
                            return featureName.toLowerCase() === districtName.toLowerCase();
                        });

                        console.log('Searching for district:', districtName, 'Found:', matchingDistrict ? matchingDistrict.properties : 'None');
                        if (matchingDistrict) {
                            boundaryData = {
                                type: "FeatureCollection" as const,
                                features: [matchingDistrict]
                            };
                            boundaryType = "district";
                            isActualBoundary = true;
                        }
                    }
                } catch (error) {
                    console.log('Error loading district boundary:', error);
                }
            }
            // Check for sub-district (only if district boundary wasn't found)
            if (State && !isActualBoundary) {
                console.log("Checking for sub-district boundary in state:", State);
                try {
                    // Fix: Remove "copy" from the API endpoint
                    // const response = await fetch(`/api/subDistricts/${encodeURIComponent(State)}`);
                    const response = await fetch(`/geojson/subdistricts/${encodeURIComponent(State)}.json`);
                    console.log('Sub-district API response status:', response.status);

                    if (response.ok) {
                        const subDistrictData = await response.json();
                        console.log('Sub-district data loaded:', subDistrictData);

                        const subDistrictName = place.text || place.place_name.split(',')[0];
                        const matchingSubDistrict = subDistrictData.features.find((feature: any) => {
                            const featureName = feature.properties.sdtname || '';
                            return featureName.toLowerCase() === subDistrictName.toLowerCase();
                        });

                        console.log('Searching for sub-district:', subDistrictName, 'Found:', matchingSubDistrict ? matchingSubDistrict.properties : 'None');

                        if (matchingSubDistrict) {
                            boundaryData = {
                                type: "FeatureCollection" as const,
                                features: [matchingSubDistrict]
                            };
                            boundaryType = "sub-district";
                            isActualBoundary = true;
                        }
                    } else {
                        console.log('Sub-district API request failed:', response.status, response.statusText);
                    }
                } catch (error) {
                    console.log('Error loading sub-district boundary:', error);
                }
            }

            // 4. FALLBACK: Create approximate circular boundary
            if (!isActualBoundary) {
                console.log('Using fallback circular boundary for:', placeName);

                // Determine boundary size based on place type
                const getRadiusByPlaceType = (place: any) => {
                    const placeTypes = place.place_type || [];
                    const placeName = place.place_name.toLowerCase();

                    // Different radii for different place types (in degrees)
                    if (placeTypes.includes('country')) return 5.0;
                    if (placeTypes.includes('region') || placeName.includes('state')) return 2.0;
                    if (placeTypes.includes('district') || placeName.includes('district')) return 0.5;
                    if (placeTypes.includes('place') || placeTypes.includes('locality')) return 0.1;
                    if (placeTypes.includes('neighborhood') || placeTypes.includes('poi')) return 0.02;

                    // Default based on context
                    if (placeName.includes('india') || placeName.includes('country')) return 5.0;
                    if (placeName.includes('pradesh') || placeName.includes('bengal') || placeName.includes('gujarat')) return 2.0;
                    if (placeName.includes('district') || placeName.includes('division')) return 0.5;
                    if (placeName.includes('city') || placeName.includes('town')) return 0.1;
                    if (placeName.includes('village') || placeName.includes('area')) return 0.05;

                    return 0.08; // Default radius
                };

                // Create a boundary approximation
                const radius = getRadiusByPlaceType(place);
                const points = 64; // Number of points for smooth circle
                const coordinates = [];

                for (let i = 0; i < points; i++) {
                    const angle = (i / points) * 2 * Math.PI;
                    const x = lon + radius * Math.cos(angle);
                    const y = lat + radius * Math.sin(angle);
                    coordinates.push([x, y]);
                }
                coordinates.push(coordinates[0]); // Close the polygon

                boundaryData = {
                    type: "FeatureCollection" as const,
                    features: [{
                        type: "Feature" as const,
                        properties: {
                            name: place.place_name,
                            boundary_type: "approximate",
                            place_type: place.place_type?.[0] || "location",
                            radius_km: Math.round(radius * 111) // Convert degrees to km approximately
                        },
                        geometry: {
                            type: "Polygon" as const,
                            coordinates: [coordinates]
                        }
                    }]
                };
                boundaryType = "approximate";
            }

            // Only proceed with map rendering if we have boundary data
            if (boundaryData && mapRef.current) {
                const map = mapRef.current;

                // Remove existing boundary layers
                if (map.getLayer('location-boundary-fill')) {
                    map.removeLayer('location-boundary-fill');
                }
                if (map.getLayer('location-boundary-outline')) {
                    map.removeLayer('location-boundary-outline');
                }
                if (map.getSource('location-boundary')) {
                    map.removeSource('location-boundary');
                }

                // Add new boundary source and layers
                map.addSource('location-boundary', {
                    type: 'geojson',
                    data: boundaryData
                });

                // Style based on boundary type
                let fillColor, lineColor, lineWidth, lineDashArray;

                switch (boundaryType) {
                    case 'state':
                        fillColor = '#059669'; // Green for states
                        lineColor = '#047857';
                        lineWidth = 3;
                        lineDashArray = undefined; // Solid line
                        break;
                    case 'district':
                        fillColor = '#0284c7'; // Blue for districts
                        lineColor = '#0369a1';
                        lineWidth = 2.5;
                        lineDashArray = undefined; // Solid line
                        break;
                    case 'sub-district':
                        fillColor = '#7c3aed'; // Purple for sub-districts
                        lineColor = '#6d28d9';
                        lineWidth = 2;
                        lineDashArray = undefined; // Solid line
                        break;
                    default: // approximate
                        fillColor = '#14b8a6'; // Teal for approximate
                        lineColor = '#0f766e';
                        lineWidth = 3;
                        lineDashArray = [2, 2]; // Dashed line
                }

                // Add fill layer
                map.addLayer({
                    id: 'location-boundary-fill',
                    type: 'fill',
                    source: 'location-boundary',
                    paint: {
                        'fill-color': fillColor,
                        'fill-opacity': isActualBoundary ? 0.25 : 0.15
                    }
                });

                // Add outline layer
                map.addLayer({
                    id: 'location-boundary-outline',
                    type: 'line',
                    source: 'location-boundary',
                    paint: {
                        'line-color': lineColor,
                        'line-width': lineWidth,
                        'line-opacity': 0.9,
                        ...(lineDashArray && { 'line-dasharray': lineDashArray })
                    }
                });

                // Add a popup showing boundary info with improved styling and functionality
                const feature = boundaryData.features[0];
                const featureName = feature.properties.name ||
                    feature.properties.ST_NM ||
                    feature.properties.DISTRICT ||
                    feature.properties.dtname ||
                    feature.properties.sdtname ||
                    feature.properties.NAME ||
                    place.place_name;

                // Get additional boundary data
                const boundaryInfo = {
                    area: feature.properties.area || feature.properties.AREA || 'N/A',
                    population: feature.properties.population || feature.properties.POP || 'N/A',
                    code: feature.properties.ST_CODE || feature.properties.dtcode || feature.properties.sdtcode || 'N/A'
                };

                const popup = new maplibregl.Popup({
                    closeButton: false,
                    closeOnClick: false,
                    className: 'boundary-popup-custom',
                    anchor: 'bottom',
                    offset: [0, -15]
                })
                    .setLngLat([lon, lat])
                    .setHTML(`
                        <div class="bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[200px] max-w-[250px]">
                            <!-- Header -->
                            <div class="flex items-center justify-between mb-2">
                                <h3 class="font-semibold text-gray-800 text-sm truncate flex-1" title="${featureName}">${featureName}</h3>
                                <button 
                                    onclick="removeBoundary()" 
                                    class="ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors duration-200 flex-shrink-0"
                                    title="Remove boundary"
                                >
                                    <svg class="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            
                            <!-- Boundary Status -->
                            <div class="flex items-center mb-2">
                                <div class="flex items-center">
                                    <div class="w-2 h-2 rounded-full mr-2" style="background-color: ${lineColor}"></div>
                                    <span class="text-xs font-medium capitalize ${isActualBoundary ? 'text-green-600' : 'text-orange-600'}">
                                        ${boundaryType} ${isActualBoundary ? '(Official)' : '(Estimated)'}
                                    </span>
                                </div>
                            </div>

                            <!-- Boundary Data -->
                            <div class="space-y-1 text-xs text-gray-600">
                                ${boundaryInfo.code !== 'N/A' ? `
                                    <div class="flex justify-between">
                                        <span>Code:</span>
                                        <span class="font-mono">${boundaryInfo.code}</span>
                                    </div>
                                ` : ''}
                                ${!isActualBoundary && feature.properties.radius_km ? `
                                    <div class="flex justify-between">
                                        <span>Radius:</span>
                                        <span>~${feature.properties.radius_km}km</span>
                                    </div>
                                ` : ''}
                                ${boundaryInfo.area !== 'N/A' ? `
                                    <div class="flex justify-between">
                                        <span>Area:</span>
                                        <span>${boundaryInfo.area}</span>
                                    </div>
                                ` : ''}
                                ${boundaryInfo.population !== 'N/A' ? `
                                    <div class="flex justify-between">
                                        <span>Population:</span>
                                        <span>${boundaryInfo.population}</span>
                                    </div>
                                ` : ''}
                            </div>

                            <!-- Action Buttons -->
                            <div class="mt-3 pt-2 border-t border-gray-100 grid grid-cols-1 gap-2">
                                <button 
                                    onclick="toggleBoundaryVisibility()" 
                                    class="w-full px-2 py-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-medium rounded-md hover:shadow-md transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12h16"></path>
                                    </svg>
                                    Toggle Boundary
                                </button>
                                <button 
                                    onclick="setSpecificLocationFilterPopupOpen()" 
                                    class="w-full px-2 py-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-medium rounded-md hover:shadow-md transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7h18M3 12h18M3 17h18"></path>
                                    </svg>
                                    Open Filters
                                </button>
                                <button 
                                    onclick="alert('More info about ${featureName}')" 
                                    class="w-full px-2 py-1.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-medium rounded-md hover:shadow-md transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                                    title="Show info"
                                >
                                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 16v-4M12 8h.01"></path>
                                    </svg>
                                    Info
                                </button>
                            </div>
                        </div>
                    `)
                    .addTo(map);

                // Add global functions for popup buttons
                (window as any).removeBoundary = () => {
                    if (map.getLayer('location-boundary-fill')) {
                        map.removeLayer('location-boundary-fill');
                    }
                    if (map.getLayer('location-boundary-outline')) {
                        map.removeLayer('location-boundary-outline');
                    }
                    if (map.getSource('location-boundary')) {
                        map.removeSource('location-boundary');
                    }
                    popup.remove();
                    // Clean up global functions
                    delete (window as any).removeBoundary;
                    delete (window as any).toggleBoundaryVisibility;
                    delete (window as any).setSpecificLocationFilterPopupOpen;
                };

                (window as any).toggleBoundaryVisibility = () => {
                    const fillLayer = map.getLayer('location-boundary-fill');
                    const outlineLayer = map.getLayer('location-boundary-outline');

                    if (fillLayer && outlineLayer) {
                        const currentFillVisibility = map.getLayoutProperty('location-boundary-fill', 'visibility') || 'visible';
                        const currentOutlineVisibility = map.getLayoutProperty('location-boundary-outline', 'visibility') || 'visible';

                        const newVisibility = currentFillVisibility === 'visible' ? 'none' : 'visible';

                        map.setLayoutProperty('location-boundary-fill', 'visibility', newVisibility);
                        map.setLayoutProperty('location-boundary-outline', 'visibility', newVisibility);
                    }
                };

                (window as any).setSpecificLocationFilterPopupOpen = () => {
                    setSpecificLocationFilterPopupOpen(true);
                };

                // Auto-remove popup after 10 seconds
                // setTimeout(() => {
                //     popup.remove();
                //     // Clean up global functions
                //     delete (window as any).removeBoundary;
                //     delete (window as any).toggleBoundaryVisibility;
                //     delete (window as any).setSpecificLocationFilterPopupOpen;
                // }, 10000);

                // Fit map to boundary
                const bounds = new maplibregl.LngLatBounds();
                boundaryData.features.forEach((feature: any) => {
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

                map.fitBounds(bounds, { padding: 50 });
            } else if (!boundaryData) {
                console.log('No boundary data found for location:', place.place_name);
            }

        } catch (error) {
            console.error('Boundary fetch error:', error);
        } finally {
            setBoundaryLoading(false);
        }
    };

    const goToLocation = (place: any) => {
        console.log('Going to location:', place);
        const [lon, lat] = place.center;

        if (mapRef.current) {
            // Remove existing marker if it exists
            if (currentMarker) {
                currentMarker.remove();
            }

            mapRef.current.flyTo({ center: [lon, lat], zoom: 12 });
            const newMarker = new maplibregl.Marker().setLngLat([lon, lat]).addTo(mapRef.current);
            setCurrentMarker(newMarker);
        }
        setResults([]);
        setQuery(place.place_name);
        setIsFocused(false);
    };

    // Function to show location with boundary
    const goToLocationWithBoundary = (place: any) => {
        goToLocation(place);
        fetchAndDisplayBoundary(place);
    };

    const clearSearch = () => {
        setQuery('');
        setResults([]);
        setIsFocused(false);
    };

    return (
        <div className="absolute top-2 sm:top-4 left-2 right-2 sm:left-1/2 sm:right-auto sm:transform sm:-translate-x-1/2 z-10 sm:w-96">
            {/* Search Container with beautiful styling */}
            <div className={`bg-gradient-to-r from-white via-slate-50 to-white backdrop-blur-md shadow-2xl rounded-2xl border border-gray-200/50 transition-all duration-300 ${isFocused ? 'shadow-teal-200/50 border-teal-300/50 scale-105' : ''
                }`}>
                {/* Search Input Section */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className={`h-5 w-5 transition-colors duration-200 ${isFocused ? 'text-teal-500' : 'text-gray-400'}`} />
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                        placeholder="Search for places, addresses..."
                        className="w-full pl-12 pr-12 py-4 bg-transparent border-0 rounded-2xl text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-0 text-sm font-medium"
                    />
                    {/* Loading or Clear button */}
                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        {isLoading ? (
                            <Loader2 className="h-5 w-5 text-teal-500 animate-spin" />
                        ) : query ? (
                            <button
                                onClick={clearSearch}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                            >
                                <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
                            </button>
                        ) : null}
                    </div>
                </div>

                {/* Results Dropdown */}
                {(results.length > 0 || isLoading) && (
                    <div className="border-t border-gray-100 bg-white/95 backdrop-blur-sm rounded-b-2xl overflow-hidden">
                        {isLoading && results.length === 0 ? (
                            <div className="p-4 text-center">
                                <div className="flex items-center justify-center space-x-2">
                                    <Loader2 className="h-4 w-4 animate-spin text-teal-500" />
                                    <span className="text-sm text-gray-500">Searching...</span>
                                </div>
                            </div>
                        ) : (
                            <ul className="max-h-60 overflow-y-auto">
                                {results.map((place, idx) => (
                                    <li
                                        key={idx}
                                        className="group p-4 hover:bg-gradient-to-r hover:from-teal-50 hover:to-cyan-50 transition-all duration-200 border-b border-gray-50 last:border-b-0"
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0 mt-0.5">
                                                <MapPin className="h-4 w-4 text-teal-500 group-hover:text-teal-600" />
                                            </div>
                                            <div className="flex-1 min-w-0 cursor-pointer" onClick={() => goToLocation(place)}>
                                                <p className="text-sm font-medium text-gray-900 group-hover:text-teal-900 truncate">
                                                    {place.place_name.split(',')[0]}
                                                </p>
                                                <p className="text-xs text-gray-500 group-hover:text-teal-600 mt-0.5">
                                                    {place.place_name.split(',').slice(1).join(',').trim()}
                                                </p>
                                            </div>
                                            <div className="flex-shrink-0 flex items-center space-x-1">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        goToLocationWithBoundary(place);
                                                    }}
                                                    disabled={boundaryLoading}
                                                    className="p-1.5 bg-teal-100 hover:bg-teal-200 rounded-full transition-colors duration-200 disabled:opacity-50"
                                                    title="Show boundary"
                                                >
                                                    {boundaryLoading ? (
                                                        <Loader2 className="h-3 w-3 text-teal-600 animate-spin" />
                                                    ) : (
                                                        <Map className="h-3 w-3 text-teal-600" />
                                                    )}
                                                </button>
                                                <div className="w-2 h-2 bg-teal-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>

            {/* Search Suggestions/Quick Actions */}
            {!isFocused && !query && (
                <div className="mt-3 flex flex-wrap gap-2 justify-center">
                    {['Madhya Pradesh', 'Tripura ', 'Odisha', 'Telangana'].map((city) => (
                        <button
                            key={city}
                            onClick={() => handleSearch(city)}
                            className="px-3 py-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-xs font-medium rounded-full hover:shadow-lg transition-all duration-200 hover:scale-105"
                        >
                            {city}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

export default SearchLocation