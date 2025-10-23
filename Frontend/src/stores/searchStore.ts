import { create } from "zustand";

interface DashboardState {
  State: string | null;
  District: string | null;
  taluk: string | null;
  village: string | null;
  activeTab: string;
  loading: boolean;

  // Actions
  setLoading: (loading: boolean) => void;
  setActiveTab: (tab: string) => void;
  setState: (State: string) => void;
  setDistrict: (District: string) => void;
  setTaluk: (taluk: string) => void;
  setVillage: (village: string) => void;
}

const useDashboardStore = create<DashboardState>((set) => ({
  State: null,
  District: null,
  taluk: null,
  village: null,
  activeTab: "",
  loading: false,

  setLoading: (loading) => set({ loading }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setState: (State) => set({ State }),
  setDistrict: (District) => set({ District }),
  setTaluk: (taluk) => set({ taluk }),
  setVillage: (village) => set({ village }),
}));

export default useDashboardStore;