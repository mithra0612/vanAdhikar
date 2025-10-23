"use client";

import Draggable from "react-draggable";
import { useRef } from "react";
import { useMapStore } from "@/stores/MapStore";
import { Slider } from "../ui/slider";
import { Settings, Settings2Icon, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

function SettingsContent({
  mapRef,
  toggle3DTerrain,
  applyPreset,
}: {
  mapRef: React.RefObject<maplibregl.Map>;
  toggle3DTerrain: () => void;
  applyPreset: (p: number, b: number) => void;
}) {
  const {
    terrain3D,
    terrainExaggeration,
    setTerrainExaggeration,
    pitch,
    setPitch,
    bearing,
    setBearing,
  } = useMapStore();

  return (
    <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(70vh-80px)]">
      {/* 3D Terrain Toggle */}
      <div className="flex items-center justify-between">
        <label className="text-xs font-medium text-gray-700">3D Terrain</label>
        <button
          onClick={toggle3DTerrain}
          className={`w-12 h-6 rounded-full transition-colors ${terrain3D ? "bg-teal-600" : "bg-gray-300"
            }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full transition-transform ${terrain3D ? "translate-x-6" : "translate-x-0.5"
              }`}
          />
        </button>
      </div>

      {/* Terrain Exaggeration */}
      {terrain3D && (
        <div>
          <label className="text-xs font-medium text-gray-700">
            Terrain Exaggeration ({terrainExaggeration.toFixed(1)}x)
          </label>
          <Slider
            value={[terrainExaggeration]}
            min={0.1}
            max={5}
            step={0.1}
            onValueChange={(value) => setTerrainExaggeration(value[0])}
            className="w-full py-2"
          />
        </div>
      )}

      {/* Pitch */}
      <div>
        <label className="text-xs font-medium text-gray-700">
          Pitch ({pitch}°)
        </label>
        <Slider
          value={[pitch]}
          min={0}
          max={85}
          step={1}
          onValueChange={(value) => setPitch(value[0])}
          className="w-full py-2"
        />
      </div>

      {/* Bearing */}
      <div>
        <label className="text-xs font-medium text-gray-700">
          Bearing ({bearing}°)
        </label>
        <Slider
          value={[bearing]}
          min={-180}
          max={180}
          step={1}
          onValueChange={(value) => setBearing(value[0])}
          className="w-full py-2"
        />
      </div>

      {/* Presets */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-700">Quick Presets</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => applyPreset(60, 0)}
            className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200"
          >
            3D View North
          </button>
          <button
            onClick={() => applyPreset(45, 45)}
            className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200"
          >
            Angled NE
          </button>
          <button
            onClick={() => applyPreset(0, 90)}
            className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200"
          >
            Flat East
          </button>
          <button
            onClick={() => applyPreset(85, -90)}
            className="px-2 py-1 text-xs rounded bg-gray-100 hover:bg-gray-200"
          >
            Max Tilt West
          </button>
        </div>
      </div>
    </div>
  );
}

function MasterMapSettings({
  mapRef,
  toggle3DTerrain,
}: {
  mapRef: React.RefObject<maplibregl.Map>;
  toggle3DTerrain: () => void;
}) {
  const masterSettingsRef = useRef(null);
  const { settingsOpen, setSettingsOpen, setPitch, setBearing, isMobile } =
    useMapStore();

  // Presets handler with smooth animation
  const applyPreset = (p: number, b: number) => {
    if (mapRef.current) {
      mapRef.current.easeTo({
        pitch: p,
        bearing: b,
        duration: 2000,
        easing: (t) => t,
      });
    }
    setPitch(p);
    setBearing(b);
  };

  if (!settingsOpen) return null;

  const Header = (
    <div className="settings-drag-handle  flex justify-between items-center p-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white cursor-move"
    >      <h2 className="text-base font-semibold text-white"><Settings className="inline-block w-5 h-5 mr-2" />Map Settings</h2>
      <button
        onClick={() => setSettingsOpen(false)}
        className="p-1 hover:bg-white/20 rounded-full transition-colors duration-150 cursor-pointer"
      >
        <X className="w-5 h-5 text-white" />
      </button>
    </div>
  );

  return isMobile ? (
    // Mobile: bottom sheet
    <div
      ref={masterSettingsRef}
      className="fixed bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-xl max-h-[70vh] overflow-hidden z-40"
    >
      {Header}
      <SettingsContent
        mapRef={mapRef}
        toggle3DTerrain={toggle3DTerrain}
        applyPreset={applyPreset}
      />
    </div>
  ) : (
    // Desktop: draggable panel
    <Draggable nodeRef={masterSettingsRef} handle=".settings-drag-handle">
      <div
        ref={masterSettingsRef}
        className="fixed top-5 z-30 left-20 w-[300px] bg-white shadow-2xl rounded-lg border overflow-hidden"      >
        {Header}
        <SettingsContent
          mapRef={mapRef}
          toggle3DTerrain={toggle3DTerrain}
          applyPreset={applyPreset}
        />
      </div>
    </Draggable>
  );
}

function MasterSettingsButton() {
  const { settingsOpen, setSettingsOpen } = useMapStore();
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={() => setSettingsOpen(!settingsOpen)}
          className="absolute bg-gradient-to-r from-teal-600 to-teal-700 top-2 sm:top-4 left-2 sm:left-4 p-2 shadow-md rounded-full hover:opacity-90 z-10"
        >
          <Settings2Icon className="w-5 h-5 text-white sm:w-6 sm:h-6" />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Master Map Settings</p>
      </TooltipContent>
    </Tooltip>
  );
}

export { MasterMapSettings, MasterSettingsButton };
