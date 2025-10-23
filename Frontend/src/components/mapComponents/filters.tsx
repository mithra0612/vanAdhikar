"use client";
import Draggable from "react-draggable";
import { useRef, useState, useEffect } from "react";
import { useMapStore } from "@/stores/MapStore";
import { useFilterStore } from "@/stores/FilterStore";
import { Check, Filter, MapPlus, X, Layers, Map, Users, TreePine, FileText, Building, MapPin, CheckCircle, Clock, XCircle, AlertTriangle, BarChart3, PieChart, Globe } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { attachHoverListeners, detachHoverListeners } from "@/lib/mapHoverUtils";
import maplibregl from "maplibre-gl";

// ✅ State Selector component for specific state boundaries
function StateSelector({ mapRef }: { mapRef?: React.RefObject<maplibregl.Map> }) {
    const { setHoverInfo } = useMapStore();
    const { selectedStates, setSelectedStates, selectedDistricts, setSelectedDistricts, selectedSubDistricts, setSelectedSubDistricts } = useFilterStore();

    // List of Indian states (you can expand this)
    const indianStates = [
        "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
        "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
        "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
        "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
        "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
        "Uttar Pradesh", "Uttarakhand", "West Bengal"
    ];

    const handleStateToggle = async (stateName: string) => {
        const isSelected = selectedStates.includes(stateName);
        let newSelectedStates: string[];

        if (isSelected) {
            newSelectedStates = selectedStates.filter(state => state !== stateName);
            // Also remove this state from district toggles
            const newSelectedDistricts = { ...selectedDistricts };
            delete newSelectedDistricts[stateName];
            setSelectedDistricts(newSelectedDistricts);

            // Remove district layers for this state
            if (mapRef?.current) {
                const layerId = `districts-${stateName}`;
                const sourceId = `districts-source-${stateName}`;
                const outlineLayerId = `districts-outline-${stateName}`;

                if (mapRef.current.getLayer(layerId)) {
                    mapRef.current.removeLayer(layerId);
                }
                if (mapRef.current.getLayer(outlineLayerId)) {
                    mapRef.current.removeLayer(outlineLayerId);
                }
                if (mapRef.current.getSource(sourceId)) {
                    mapRef.current.removeSource(sourceId);
                }
            }
        } else {
            newSelectedStates = [...selectedStates, stateName];
        }

        setSelectedStates(newSelectedStates);

        // Update map layers
        if (mapRef?.current) {
            try {
                // Fetch the state boundaries data
                // const response = await fetch('/api/stateBoundaries');
                const response = await fetch('/geojson/stateBoundaries.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch state boundaries');
                }
                const geojsonData = await response.json();

                // Filter features based on selected states
                const filteredFeatures = geojsonData.features.filter((feature: any) =>
                    newSelectedStates.includes(feature.properties.ST_NM)
                );

                const filteredGeoJson = {
                    type: "FeatureCollection" as const,
                    features: filteredFeatures
                };

                // Remove existing layers if they exist
                if (mapRef.current.getLayer('selected-states-layer')) {
                    detachHoverListeners(mapRef, 'selected-states-layer', setHoverInfo);
                    mapRef.current.removeLayer('selected-states-layer');
                }
                if (mapRef.current.getLayer('selected-states-outline')) {
                    mapRef.current.removeLayer('selected-states-outline');
                }
                if (mapRef.current.getSource('selected-states')) {
                    mapRef.current.removeSource('selected-states');
                }

                // Add new layers only if there are selected states
                if (newSelectedStates.length > 0) {
                    mapRef.current.addSource('selected-states', {
                        type: 'geojson',
                        data: filteredGeoJson
                    });

                    // Add the fill layer
                    mapRef.current.addLayer({
                        id: 'selected-states-layer',
                        type: 'fill',
                        source: 'selected-states',
                        paint: {
                            'fill-color': '#3B82F6',
                            'fill-opacity': 0.3
                        }
                    });

                    // Add the outline layer
                    mapRef.current.addLayer({
                        id: 'selected-states-outline',
                        type: 'line',
                        source: 'selected-states',
                        paint: {
                            'line-color': '#2563EB',
                            'line-width': 2
                        }
                    });

                    // Add hover listeners to the fill layer
                    attachHoverListeners(mapRef, 'selected-states-layer', 'state', setHoverInfo);
                }
            } catch (error) {
                console.error('Error loading state boundaries:', error);
            }
        }
    };

    const handleDistrictToggle = async (stateName: string) => {
        const currentlyEnabled = selectedDistricts[stateName] || false;
        const newSelectedDistricts = {
            ...selectedDistricts,
            [stateName]: !currentlyEnabled
        };
        setSelectedDistricts(newSelectedDistricts);

        if (mapRef?.current) {
            const layerId = `districts-${stateName}`;
            const sourceId = `districts-source-${stateName}`;
            const outlineLayerId = `districts-outline-${stateName}`;

            if (currentlyEnabled) {
                // Remove district layers
                if (mapRef.current.getLayer(layerId)) {
                    detachHoverListeners(mapRef, layerId, setHoverInfo);
                    mapRef.current.removeLayer(layerId);
                }
                if (mapRef.current.getLayer(outlineLayerId)) {
                    mapRef.current.removeLayer(outlineLayerId);
                }
                if (mapRef.current.getSource(sourceId)) {
                    mapRef.current.removeSource(sourceId);
                }
            } else {
                // Add district layers
                try {
                    // const response = await fetch(`/api/districts/${encodeURIComponent(stateName)}`);
                    const response = await fetch(`/geojson/districts/${encodeURIComponent(stateName)}.json`);

                    if (response.ok) {
                        const districtData = await response.json();

                        mapRef.current.addSource(sourceId, {
                            type: 'geojson',
                            data: districtData
                        });

                        // Add district fill layer
                        mapRef.current.addLayer({
                            id: layerId,
                            type: 'fill',
                            source: sourceId,
                            paint: {
                                'fill-color': '#10B981',
                                'fill-opacity': 0.2
                            }
                        });

                        // Add district outline layer
                        mapRef.current.addLayer({
                            id: outlineLayerId,
                            type: 'line',
                            source: sourceId,
                            paint: {
                                'line-color': '#059669',
                                'line-width': 1.5
                            }
                        });

                        // Add hover listeners to the district fill layer
                        attachHoverListeners(mapRef, layerId, 'district', setHoverInfo);
                    }
                } catch (error) {
                    console.error(`Error loading districts for ${stateName}:`, error);
                }
            }
        }
    };

    const handleSubDistrictToggle = async (stateName: string) => {
        const currentlyEnabled = selectedSubDistricts[stateName] || false;
        const newSelectedSubDistricts = {
            ...selectedSubDistricts,
            [stateName]: !currentlyEnabled
        };
        setSelectedSubDistricts(newSelectedSubDistricts);

        if (mapRef?.current) {
            const layerId = `subdistricts-${stateName}`;
            const sourceId = `subdistricts-source-${stateName}`;
            const outlineLayerId = `subdistricts-outline-${stateName}`;

            if (currentlyEnabled) {
                // Remove subdistrict layers
                if (mapRef.current.getLayer(layerId)) {
                    detachHoverListeners(mapRef, layerId, setHoverInfo);
                    mapRef.current.removeLayer(layerId);
                }
                if (mapRef.current.getLayer(outlineLayerId)) {
                    mapRef.current.removeLayer(outlineLayerId);
                }
                if (mapRef.current.getSource(sourceId)) {
                    mapRef.current.removeSource(sourceId);
                }
            } else {
                // Add subdistrict layers
                try {
                    const response = await fetch(`/geojson/subdistricts/${encodeURIComponent(stateName)}.json`);

                    if (response.ok) {
                        const subDistrictData = await response.json();

                        mapRef.current.addSource(sourceId, {
                            type: 'geojson',
                            data: subDistrictData
                        });

                        // Add subdistrict fill layer
                        mapRef.current.addLayer({
                            id: layerId,
                            type: 'fill',
                            source: sourceId,
                            paint: {
                                'fill-color': '#8B5CF6',
                                'fill-opacity': 0.15
                            }
                        });

                        // Add subdistrict outline layer
                        mapRef.current.addLayer({
                            id: outlineLayerId,
                            type: 'line',
                            source: sourceId,
                            paint: {
                                'line-color': '#7C3AED',
                                'line-width': 1
                            }
                        });

                        // Add hover listeners to the subdistrict fill layer
                        attachHoverListeners(mapRef, layerId, 'subdistrict', setHoverInfo);
                    }
                } catch (error) {
                    console.error(`Error loading subdistricts for ${stateName}:`, error);
                }
            }
        }
    };

    const handleSelectAll = async () => {
        if (selectedStates.length === indianStates.length) {
            // Deselect all
            setSelectedStates([]);
            setSelectedDistricts({}); // Clear all district toggles
            setSelectedSubDistricts({}); // Clear all subdistrict toggles
            if (mapRef?.current) {
                // Remove state layers
                if (mapRef.current.getLayer('selected-states-layer')) {
                    detachHoverListeners(mapRef, 'selected-states-layer', setHoverInfo);
                    mapRef.current.removeLayer('selected-states-layer');
                }
                if (mapRef.current.getLayer('selected-states-outline')) {
                    mapRef.current.removeLayer('selected-states-outline');
                }
                if (mapRef.current.getSource('selected-states')) {
                    mapRef.current.removeSource('selected-states');
                }

                // Remove all district and subdistrict layers
                indianStates.forEach(state => {
                    // District layers
                    const districtLayerId = `districts-${state}`;
                    const districtSourceId = `districts-source-${state}`;
                    const districtOutlineLayerId = `districts-outline-${state}`;

                    if (mapRef.current!.getLayer(districtLayerId)) {
                        detachHoverListeners(mapRef, districtLayerId, setHoverInfo);
                        mapRef.current!.removeLayer(districtLayerId);
                    }
                    if (mapRef.current!.getLayer(districtOutlineLayerId)) {
                        mapRef.current!.removeLayer(districtOutlineLayerId);
                    }
                    if (mapRef.current!.getSource(districtSourceId)) {
                        mapRef.current!.removeSource(districtSourceId);
                    }

                    // Subdistrict layers
                    const subDistrictLayerId = `subdistricts-${state}`;
                    const subDistrictSourceId = `subdistricts-source-${state}`;
                    const subDistrictOutlineLayerId = `subdistricts-outline-${state}`;

                    if (mapRef.current!.getLayer(subDistrictLayerId)) {
                        detachHoverListeners(mapRef, subDistrictLayerId, setHoverInfo);
                        mapRef.current!.removeLayer(subDistrictLayerId);
                    }
                    if (mapRef.current!.getLayer(subDistrictOutlineLayerId)) {
                        mapRef.current!.removeLayer(subDistrictOutlineLayerId);
                    }
                    if (mapRef.current!.getSource(subDistrictSourceId)) {
                        mapRef.current!.removeSource(subDistrictSourceId);
                    }
                });
            }
        } else {
            // Select all
            setSelectedStates(indianStates);

            // Update map to show all states
            if (mapRef?.current) {
                try {
                    // const response = await fetch('/api/stateBoundaries');
                    const response = await fetch('/geojson/stateBoundaries.json');
                    if (!response.ok) {
                        throw new Error('Failed to fetch state boundaries');
                    }
                    const geojsonData = await response.json();

                    // Remove existing layers if they exist
                    if (mapRef.current.getLayer('selected-states-layer')) {
                        mapRef.current.removeLayer('selected-states-layer');
                    }
                    if (mapRef.current.getLayer('selected-states-outline')) {
                        mapRef.current.removeLayer('selected-states-outline');
                    }
                    if (mapRef.current.getSource('selected-states')) {
                        mapRef.current.removeSource('selected-states');
                    }

                    // Add all states
                    mapRef.current.addSource('selected-states', {
                        type: 'geojson',
                        data: geojsonData
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

                    // Add hover listeners to the selected states layer
                    attachHoverListeners(mapRef, 'selected-states-layer', 'state', setHoverInfo);
                } catch (error) {
                    console.error('Error loading state boundaries:', error);
                }
            }
        }
    };

    return (
        <div className="space-y-4">
            <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Select Specific States</h3>
                <p className="text-xs text-gray-500">Choose individual states to display their boundaries</p>
            </div>

            {/* Select All/Deselect All Button */}
            <div className="flex justify-between items-center mb-3">
                <span className="text-xs text-gray-600">
                    {selectedStates.length} of {indianStates.length} selected
                </span>
                <button
                    onClick={handleSelectAll}
                    className="px-3 py-1 text-xs bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
                >
                    {selectedStates.length === indianStates.length ? 'Deselect All' : 'Select All'}
                </button>
            </div>

            {/* States Grid */}
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                {indianStates.map((state) => {
                    const isSelected = selectedStates.includes(state);
                    const districtToggleEnabled = selectedDistricts[state] || false;
                    const subDistrictToggleEnabled = selectedSubDistricts[state] || false;

                    return (
                        <div
                            key={state}
                            className={`p-3 rounded-lg border transition-colors ${isSelected
                                ? 'bg-blue-50 border border-blue-200'
                                : 'bg-gray-50 border border-gray-200'
                                }`}
                        >
                            {/* State Checkbox */}
                            <div
                                onClick={() => handleStateToggle(state)}
                                className="flex items-center space-x-2 cursor-pointer"
                            >
                                <div
                                    className={`w-4 h-4 rounded border-2 flex items-center justify-center ${isSelected
                                        ? 'bg-blue-500 border-blue-500'
                                        : 'border-gray-300'
                                        }`}
                                >
                                    {isSelected && <Check className="w-3 h-3 text-white" />}
                                </div>
                                <span className={`text-sm font-medium ${isSelected ? 'text-blue-700' : 'text-gray-700'}`}>
                                    {state}
                                </span>
                            </div>

                            {/* District and SubDistrict Toggles - Only show when state is selected */}
                            {isSelected && (
                                <div>
                                    {/* District Toggle */}
                                    <div className="mt-2 ml-6 flex items-center justify-between">
                                        <span className="text-xs text-gray-600">Show Districts</span>
                                        <button
                                            onClick={() => handleDistrictToggle(state)}
                                            className={`w-8 h-4 rounded-full transition-colors duration-200 ${districtToggleEnabled ? 'bg-green-500' : 'bg-gray-300'
                                                }`}
                                        >
                                            <div
                                                className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${districtToggleEnabled ? 'translate-x-4' : 'translate-x-0.5'
                                                    }`}
                                            />
                                        </button>
                                    </div>

                                    {/* SubDistrict Toggle */}
                                    <div className="mt-2 ml-6 flex items-center justify-between">
                                        <span className="text-xs text-gray-600">Show SubDistricts</span>
                                        <button
                                            onClick={() => handleSubDistrictToggle(state)}
                                            className={`w-8 h-4 rounded-full transition-colors duration-200 ${subDistrictToggleEnabled ? 'bg-purple-500' : 'bg-gray-300'
                                                }`}
                                        >
                                            <div
                                                className={`w-3 h-3 bg-white rounded-full transition-transform duration-200 ${subDistrictToggleEnabled ? 'translate-x-4' : 'translate-x-0.5'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

        </div>
    );
}

// ✅ FRA-specific Layer Filters component
function LayerFilters({ mapRef }: { mapRef?: React.RefObject<maplibregl.Map> }) {   
    const { setHoverInfo } = useMapStore();
    const {
        stateBoundariesVisible,
        setStateBoundariesVisible,
        specificStatesEnabled,
        setSpecificStatesEnabled,
        selectedStates,
        setSelectedStates,
        expandedAccordion,
        setExpandedAccordion,
    } = useFilterStore();

    // Auto-enable specific states feature and expand accordion if there are selected states on load
    useEffect(() => {
        if (selectedStates.length > 0) {
            if (!specificStatesEnabled) {
                setSpecificStatesEnabled(true);
            }
            // Always expand accordion if there are selected states and specific states is enabled
            if (specificStatesEnabled && expandedAccordion !== 'specific-states') {
                setExpandedAccordion('specific-states');
            }
        }
    }, [selectedStates.length, specificStatesEnabled, expandedAccordion, setSpecificStatesEnabled, setExpandedAccordion]);

    // Toggle state boundaries on/off
    const toggleStateBoundaries = async () => {
        if (!mapRef?.current) return;

        if (stateBoundariesVisible) {
            // Remove the state boundaries layer and source
            if (mapRef.current.getLayer('state-boundaries-layer')) {
                detachHoverListeners(mapRef, 'state-boundaries-layer', setHoverInfo);
                mapRef.current.removeLayer('state-boundaries-layer');
            }
            if (mapRef.current.getLayer('state-boundaries-outline')) {
                mapRef.current.removeLayer('state-boundaries-outline');
            }
            if (mapRef.current.getSource('state-boundaries')) {
                mapRef.current.removeSource('state-boundaries');
            }
            setStateBoundariesVisible(false);
        } else {
            try {
                // Fetch the state boundaries data
                // const response = await fetch('/api/stateBoundaries');
                const response = await fetch('/geojson/stateBoundaries.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch state boundaries');
                }
                const geojsonData = await response.json();

                // Add the source
                mapRef.current.addSource('state-boundaries', {
                    type: 'geojson',
                    data: geojsonData
                });

                // Add the fill layer
                mapRef.current.addLayer({
                    id: 'state-boundaries-layer',
                    type: 'fill',
                    source: 'state-boundaries',
                    paint: {
                        'fill-color': '#088',
                        'fill-opacity': 0.2
                    }
                });

                // Add the outline layer
                mapRef.current.addLayer({
                    id: 'state-boundaries-outline',
                    type: 'line',
                    source: 'state-boundaries',
                    paint: {
                        'line-color': '#088',
                        'line-width': 2
                    }
                });

                // Add hover listeners to the state boundaries layer
                attachHoverListeners(mapRef, 'state-boundaries-layer', 'state', setHoverInfo);

                setStateBoundariesVisible(true);
            } catch (error) {
                console.error('Error loading state boundaries:', error);
            }
        }
    };

    // Toggle specific states feature on/off
    const toggleSpecificStates = () => {
        const newState = !specificStatesEnabled;
        setSpecificStatesEnabled(newState);

        if (!newState) {
            // If turning off, clear all selected states and remove layers
            setSelectedStates([]);
            setExpandedAccordion(null);

            if (mapRef?.current) {
                if (mapRef.current.getLayer('selected-states-layer')) {
                    detachHoverListeners(mapRef, 'selected-states-layer', setHoverInfo);
                    mapRef.current.removeLayer('selected-states-layer');
                }
                if (mapRef.current.getLayer('selected-states-outline')) {
                    mapRef.current.removeLayer('selected-states-outline');
                }
                if (mapRef.current.getSource('selected-states')) {
                    mapRef.current.removeSource('selected-states');
                }
            }
        }
    };

    const filterItems = [
        {
            id: 'state-boundaries',
            icon: Map,
            title: 'All State Boundaries',
            description: 'Show all Indian state administrative boundaries',
            isActive: stateBoundariesVisible,
            toggle: toggleStateBoundaries,
            color: 'text-teal-600'
        },
        {
            id: 'specific-states',
            icon: Globe,
            title: 'Specific State Boundaries',
            description: 'Select individual states to display',
            isActive: specificStatesEnabled,
            toggle: () => {
                toggleSpecificStates();
                if (!specificStatesEnabled) {
                    setExpandedAccordion('specific-states');
                } else {
                    setExpandedAccordion(null);
                }
            },
            color: 'text-blue-600',
            isStateSelector: true
        },
        {
            id: 'forest-areas',
            icon: TreePine,
            title: 'Forest Areas',
            description: 'Reserved and protected forest areas',
            isActive: false,
            toggle: () => console.log('Forest areas toggle'),
            color: 'text-green-600',
            comingSoon: true
        },
        {
            id: 'tribal-villages',
            icon: Users,
            title: 'Tribal Villages',
            description: 'Villages with tribal population',
            isActive: false,
            toggle: () => console.log('Tribal villages toggle'),
            color: 'text-purple-600',
            comingSoon: true
        },
        {
            id: 'fra-claims',
            icon: FileText,
            title: 'FRA Claims',
            description: 'Individual and community forest rights claims',
            isActive: false,
            toggle: () => console.log('FRA claims toggle'),
            color: 'text-blue-600',
            comingSoon: true
        },
        {
            id: 'government-offices',
            icon: Building,
            title: 'Government Offices',
            description: 'DFO, Collector, and other relevant offices',
            isActive: false,
            toggle: () => console.log('Government offices toggle'),
            color: 'text-red-600',
            comingSoon: true
        },
        {
            id: 'surveyed-areas',
            icon: MapPin,
            title: 'Surveyed Areas',
            description: 'Areas with completed forest rights surveys',
            isActive: false,
            toggle: () => console.log('Surveyed areas toggle'),
            color: 'text-amber-600',
            comingSoon: true
        }
    ];

    return (
        <div className="space-y-4">
            <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Forest Rights Data Layers</h3>
                <p className="text-xs text-gray-500">Toggle data layers relevant to Forest Rights Act (FRA) implementation</p>
            </div>


            {filterItems.map((item) => {
                const IconComponent = item.icon;
                const isExpanded = expandedAccordion === item.id;

                return (
                    <div key={item.id}>
                        <div
                            className={`flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors ${item.comingSoon ? 'opacity-50' : ''
                                }`}
                        >
                            <div className="flex items-center space-x-3">
                                <IconComponent className={`w-5 h-5 ${item.comingSoon ? 'text-gray-400' : item.color}`} />
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h4 className={`text-sm font-medium ${item.comingSoon ? 'text-gray-400' : 'text-gray-800'}`}>
                                            {item.title}
                                        </h4>
                                        {item.comingSoon && (
                                            <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded-full">
                                                Coming Soon
                                            </span>
                                        )}
                                        {item.id === 'specific-states' && selectedStates.length > 0 && (
                                            <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                                                {selectedStates.length} selected
                                            </span>
                                        )}
                                    </div>
                                    <p className={`text-xs ${item.comingSoon ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {item.description}
                                    </p>
                                </div>
                            </div>

                            {item.isStateSelector ? (
                                <button
                                    onClick={item.toggle}
                                    disabled={item.comingSoon}
                                    className={`w-12 h-6 rounded-full transition-colors duration-200 ${item.isActive && !item.comingSoon
                                        ? 'bg-teal-500'
                                        : item.comingSoon
                                            ? 'bg-gray-200'
                                            : 'bg-gray-300'
                                        }`}
                                >
                                    <div
                                        className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${item.isActive && !item.comingSoon ? 'translate-x-6' : 'translate-x-0.5'
                                            }`}
                                    />
                                </button>
                            ) : (
                                <button
                                    onClick={item.toggle}
                                    disabled={item.comingSoon}
                                    className={`w-12 h-6 rounded-full transition-colors duration-200 ${item.isActive && !item.comingSoon
                                        ? 'bg-teal-500'
                                        : item.comingSoon
                                            ? 'bg-gray-200'
                                            : 'bg-gray-300'
                                        }`}
                                >
                                    <div
                                        className={`w-5 h-5 bg-white rounded-full transition-transform duration-200 ${item.isActive && !item.comingSoon ? 'translate-x-6' : 'translate-x-0.5'
                                            }`}
                                    />
                                </button>
                            )}
                        </div>

                        {/* Show StateSelector when specific states is expanded */}
                        {item.isStateSelector && isExpanded && (
                            <div className="mt-3 shadow-xl p-3 bg-gray-50 rounded-lg ">
                                <StateSelector mapRef={mapRef} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// ✅ Claim Status Filters component
function ClaimStatusFilters() {
    const claimStatusItems = [
        {
            id: 'approved-claims',
            icon: CheckCircle,
            title: 'Approved Claims',
            description: 'Forest rights claims that have been approved',
            color: 'text-green-600',
            isActive: false
        },
        {
            id: 'pending-claims',
            icon: Clock,
            title: 'Pending Claims',
            description: 'Claims under review or waiting for approval',
            color: 'text-yellow-600',
            isActive: false
        },
        {
            id: 'rejected-claims',
            icon: XCircle,
            title: 'Rejected Claims',
            description: 'Claims that have been rejected with reasons',
            color: 'text-red-600',
            isActive: false
        },
        {
            id: 'incomplete-claims',
            icon: AlertTriangle,
            title: 'Incomplete Claims',
            description: 'Claims requiring additional documentation',
            color: 'text-orange-600',
            isActive: false
        }
    ];

    return (
        <div className="space-y-4">
            <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-1">FRA Claim Status</h3>
                <p className="text-xs text-gray-500">Filter claims by their current status in the approval process</p>
            </div>

            {claimStatusItems.map((item) => {
                const IconComponent = item.icon;
                return (
                    <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors opacity-50"
                    >
                        <div className="flex items-center space-x-3">
                            <IconComponent className={`w-5 h-5 text-gray-400`} />
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="text-sm font-medium text-gray-400">
                                        {item.title}
                                    </h4>
                                    <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded-full">
                                        Coming Soon
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                        <button
                            disabled
                            className="w-12 h-6 rounded-full bg-gray-200"
                        >
                            <div className="w-5 h-5 bg-white rounded-full translate-x-0.5" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

// ✅ Analytics Filters component
function AnalyticsFilters() {
    const analyticsItems = [
        {
            id: 'density-heatmap',
            icon: BarChart3,
            title: 'Claim Density Heatmap',
            description: 'Visualize claim concentration across regions',
            color: 'text-blue-600',
            isActive: false
        },
        {
            id: 'approval-rate',
            icon: PieChart,
            title: 'Approval Rate Analysis',
            description: 'Show approval rates by district/block',
            color: 'text-purple-600',
            isActive: false
        },
        {
            id: 'timeline-analysis',
            icon: Clock,
            title: 'Processing Timeline',
            description: 'Average time taken for claim processing',
            color: 'text-indigo-600',
            isActive: false
        },
        {
            id: 'tribal-demographics',
            icon: Users,
            title: 'Tribal Demographics',
            description: 'Population and claim statistics by tribe',
            color: 'text-pink-600',
            isActive: false
        }
    ];

    return (
        <div className="space-y-4">
            <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Analytics & Insights</h3>
                <p className="text-xs text-gray-500">Advanced analytics and visualization tools for FRA data</p>
            </div>

            {analyticsItems.map((item) => {
                const IconComponent = item.icon;
                return (
                    <div
                        key={item.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors opacity-50"
                    >
                        <div className="flex items-center space-x-3">
                            <IconComponent className={`w-5 h-5 text-gray-400`} />
                            <div>
                                <div className="flex items-center gap-2">
                                    <h4 className="text-sm font-medium text-gray-400">
                                        {item.title}
                                    </h4>
                                    <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-500 rounded-full">
                                        Coming Soon
                                    </span>
                                </div>
                                <p className="text-xs text-gray-400">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                        <button
                            disabled
                            className="w-12 h-6 rounded-full bg-gray-200"
                        >
                            <div className="w-5 h-5 bg-white rounded-full translate-x-0.5" />
                        </button>
                    </div>
                );
            })}
        </div>
    );
}

function FilterPopup({ mapRef }: { mapRef?: React.RefObject<maplibregl.Map> }) {
    const filterPopupRef = useRef(null);
    const {
        filterPopupOpen,
        setFilterPopupOpen,
        isMobile,
    } = useMapStore();

    if (!filterPopupOpen) return null;

    const content = (
        <div className="overflow-y-auto p-4 sm:p-6 max-h-[calc(80vh-120px)] sm:max-h-[calc(26rem)]">
            <Tabs defaultValue="data-layers" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4 bg-gradient-to-r from-slate-100 to-gray-100 p-1 rounded-lg">
                    <TabsTrigger value="data-layers">Data Layers</TabsTrigger>
                    <TabsTrigger value="claim-status">Claim Status</TabsTrigger>
                    <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="data-layers">
                    <LayerFilters mapRef={mapRef} />
                </TabsContent>

                <TabsContent value="claim-status">
                    <ClaimStatusFilters />
                </TabsContent>

                <TabsContent value="analytics">
                    <AnalyticsFilters />
                </TabsContent>
            </Tabs>

        </div>
    );

    return isMobile ? (
        // ✅ Mobile full-width bottom sheet
        <div ref={filterPopupRef}>
            <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-white via-white to-gray-50 shadow-2xl rounded-t-xl max-h-[70vh] transition-all duration-200 ease-out border-t border-gray-200">
                <div className="flex items-center justify-between p-4 pb-2 bg-gradient-to-r from-teal-600 to-teal-800 rounded-t-xl border-b border-purple-200">
                    <h2 className="text-base text-white font-semibold"><Filter className="inline-block w-5 h-5 mr-2" />GLOBAL FRA Data Filters</h2>
                    <button
                        onClick={() => setFilterPopupOpen(false)}
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
                    <h2 className="text-base text-white font-semibold"> <Filter className="inline-block w-5 h-5 mr-2" />GLOBAL FRA Data Filters</h2>
                    <button
                        onClick={() => setFilterPopupOpen(false)}
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

function FilterButton() {
    const { filterPopupOpen, setFilterPopupOpen } = useMapStore();
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    onClick={() => setFilterPopupOpen(!filterPopupOpen)}
                    className="absolute bg-gradient-to-r from-teal-600 to-teal-700 top-10 sm:top-18 left-2 sm:left-4 p-2.5 shadow-md rounded-full hover:opacity-90 z-10"
                    title="FRA Data Filters"
                >
                    <Filter className="w-5 h-5 sm:w-5 sm:h-5 text-white drop-shadow-sm" />
                </button>
            </TooltipTrigger>
            <TooltipContent>
                <p>FRA Filters</p>
            </TooltipContent>
        </Tooltip>
    );
}

export { FilterPopup, FilterButton, LayerFilters, ClaimStatusFilters, AnalyticsFilters, StateSelector };
