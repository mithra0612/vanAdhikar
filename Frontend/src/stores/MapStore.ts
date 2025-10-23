import { create } from "zustand";
import { persist } from "zustand/middleware";

interface MapState {
  styleURL: string;
  setStyleURL: (url: string) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  pitch: number;
  setPitch: (pitch: number) => void;
  bearing: number;
  setBearing: (bearing: number) => void;
  settingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
  terrain3D: boolean;
  setTerrain3D: (enabled: boolean) => void;
  terrainExaggeration: number;
  setTerrainExaggeration: (exaggeration: number) => void;
  basemapPopupOpen: boolean;
  setBasemapPopupOpen: (open: boolean) => void;
  filterPopupOpen: boolean;
  setFilterPopupOpen: (open: boolean) => void;
  query: string;
  setQuery: (query: string) => void;
  results: any[];
  setResults: (results: any[]) => void;
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  bearingControlOpen: boolean;
  setBearingControlOpen: (open: boolean) => void;
  specificLocationFilterPopupOpen: boolean;
  setSpecificLocationFilterPopupOpen: (open: boolean) => void;
  // Hover popup state
  hoverInfo: {
    visible: boolean;
    x: number;
    y: number;
    data: any;
    type: "state" | "district" | null;
  };
  setHoverInfo: (info: {
    visible: boolean;
    x: number;
    y: number;
    data: any;
    type: "state" | "district" | null;
  }) => void;
}

export const useMapStore = create<MapState>()(
  persist(
    (set) => ({
      styleURL: "https://demotiles.maplibre.org/style.json",
      setStyleURL: (url: string) => set({ styleURL: url }),
      loading: true,
      setLoading: (loading: boolean) => set({ loading }),
      pitch: 0,
      setPitch: (pitch: number) => set({ pitch }),
      bearing: 0,
      setBearing: (bearing: number) => set({ bearing }),
      settingsOpen: false,
      setSettingsOpen: (open: boolean) => set({ settingsOpen: open }),
      terrain3D: false,
      setTerrain3D: (enabled: boolean) => set({ terrain3D: enabled }),
      terrainExaggeration: 1.5,
      setTerrainExaggeration: (exaggeration: number) =>
        set({ terrainExaggeration: exaggeration }),
      basemapPopupOpen: false,
      setBasemapPopupOpen: (open: boolean) => set({ basemapPopupOpen: open }),
      filterPopupOpen: false,
      setFilterPopupOpen: (open: boolean) => set({ filterPopupOpen: open }),
      query: "",
      setQuery: (query: string) => set({ query }),
      results: [],
      setResults: (results: any[]) => set({ results }),
      isMobile: false,
      setIsMobile: (isMobile: boolean) => set({ isMobile }),
      bearingControlOpen: false,
      setBearingControlOpen: (open: boolean) =>
        set({ bearingControlOpen: open }),
      specificLocationFilterPopupOpen: false,
      setSpecificLocationFilterPopupOpen: (open: boolean) =>
        set({ specificLocationFilterPopupOpen: open }),
      // Hover popup state
      hoverInfo: {
        visible: false,
        x: 0,
        y: 0,
        data: null,
        type: null,
      },
      setHoverInfo: (info) => set({ hoverInfo: info }),
    }),
    { name: "map-storage" }
  )
);
