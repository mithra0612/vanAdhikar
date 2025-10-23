import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FilterState {
  // State boundaries filter
  stateBoundariesVisible: boolean;
  setStateBoundariesVisible: (visible: boolean) => void;

  // Specific states filter
  specificStatesEnabled: boolean;
  setSpecificStatesEnabled: (enabled: boolean) => void;
  selectedStates: string[];
  setSelectedStates: (states: string[]) => void;

  // Districts filter
  selectedDistricts: Record<string, boolean>;
  setSelectedDistricts: (districts: Record<string, boolean>) => void;
  //SubDistrict
  selectedSubDistricts: Record<string, boolean>;
  setSelectedSubDistricts: (districts: Record<string, boolean>) => void;

  // UI state
  expandedAccordion: string | null;
  setExpandedAccordion: (accordion: string | null) => void;

  // Future FRA-specific filters (ready for implementation)
  forestAreasVisible: boolean;
  setForestAreasVisible: (visible: boolean) => void;

  tribalVillagesVisible: boolean;
  setTribalVillagesVisible: (visible: boolean) => void;

  fraClaimsVisible: boolean;
  setFraClaimsVisible: (visible: boolean) => void;

  governmentOfficesVisible: boolean;
  setGovernmentOfficesVisible: (visible: boolean) => void;

  surveyedAreasVisible: boolean;
  setSurveyedAreasVisible: (visible: boolean) => void;

  // Claim status filters
  approvedClaimsVisible: boolean;
  setApprovedClaimsVisible: (visible: boolean) => void;

  pendingClaimsVisible: boolean;
  setPendingClaimsVisible: (visible: boolean) => void;

  rejectedClaimsVisible: boolean;
  setRejectedClaimsVisible: (visible: boolean) => void;

  incompleteClaimsVisible: boolean;
  setIncompleteClaimsVisible: (visible: boolean) => void;

  // Analytics filters
  densityHeatmapVisible: boolean;
  setDensityHeatmapVisible: (visible: boolean) => void;

  approvalRateVisible: boolean;
  setApprovalRateVisible: (visible: boolean) => void;

  timelineAnalysisVisible: boolean;
  setTimelineAnalysisVisible: (visible: boolean) => void;

  tribalDemographicsVisible: boolean;
  setTribalDemographicsVisible: (visible: boolean) => void;

  // Helper methods
  clearAllFilters: () => void;
  resetToDefaults: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set, get) => ({
      // State boundaries
      stateBoundariesVisible: false,
      setStateBoundariesVisible: (visible: boolean) =>
        set({ stateBoundariesVisible: visible }),

      // Specific states
      specificStatesEnabled: false,
      setSpecificStatesEnabled: (enabled: boolean) =>
        set({ specificStatesEnabled: enabled }),
      selectedStates: [],
      setSelectedStates: (states: string[]) => set({ selectedStates: states }),

      // Districts
      selectedDistricts: {},
      setSelectedDistricts: (districts: Record<string, boolean>) =>
        set({ selectedDistricts: districts }),

      selectedSubDistricts: {},
      setSelectedSubDistricts: (subDistricts) =>
        set({ selectedSubDistricts: subDistricts }),

      // UI state (not persisted in practice, but included for completeness)
      expandedAccordion: null,
      setExpandedAccordion: (accordion: string | null) =>
        set({ expandedAccordion: accordion }),

      // Future FRA filters (all disabled by default)
      forestAreasVisible: false,
      setForestAreasVisible: (visible: boolean) =>
        set({ forestAreasVisible: visible }),

      tribalVillagesVisible: false,
      setTribalVillagesVisible: (visible: boolean) =>
        set({ tribalVillagesVisible: visible }),

      fraClaimsVisible: false,
      setFraClaimsVisible: (visible: boolean) =>
        set({ fraClaimsVisible: visible }),

      governmentOfficesVisible: false,
      setGovernmentOfficesVisible: (visible: boolean) =>
        set({ governmentOfficesVisible: visible }),

      surveyedAreasVisible: false,
      setSurveyedAreasVisible: (visible: boolean) =>
        set({ surveyedAreasVisible: visible }),

      // Claim status filters
      approvedClaimsVisible: false,
      setApprovedClaimsVisible: (visible: boolean) =>
        set({ approvedClaimsVisible: visible }),

      pendingClaimsVisible: false,
      setPendingClaimsVisible: (visible: boolean) =>
        set({ pendingClaimsVisible: visible }),

      rejectedClaimsVisible: false,
      setRejectedClaimsVisible: (visible: boolean) =>
        set({ rejectedClaimsVisible: visible }),

      incompleteClaimsVisible: false,
      setIncompleteClaimsVisible: (visible: boolean) =>
        set({ incompleteClaimsVisible: visible }),

      // Analytics filters
      densityHeatmapVisible: false,
      setDensityHeatmapVisible: (visible: boolean) =>
        set({ densityHeatmapVisible: visible }),

      approvalRateVisible: false,
      setApprovalRateVisible: (visible: boolean) =>
        set({ approvalRateVisible: visible }),

      timelineAnalysisVisible: false,
      setTimelineAnalysisVisible: (visible: boolean) =>
        set({ timelineAnalysisVisible: visible }),

      tribalDemographicsVisible: false,
      setTribalDemographicsVisible: (visible: boolean) =>
        set({ tribalDemographicsVisible: visible }),

      // Helper methods
      clearAllFilters: () =>
        set({
          stateBoundariesVisible: false,
          specificStatesEnabled: false,
          selectedStates: [],
          selectedDistricts: {},
          forestAreasVisible: false,
          tribalVillagesVisible: false,
          fraClaimsVisible: false,
          governmentOfficesVisible: false,
          surveyedAreasVisible: false,
          approvedClaimsVisible: false,
          pendingClaimsVisible: false,
          rejectedClaimsVisible: false,
          incompleteClaimsVisible: false,
          densityHeatmapVisible: false,
          approvalRateVisible: false,
          timelineAnalysisVisible: false,
          tribalDemographicsVisible: false,
        }),

      resetToDefaults: () =>
        set({
          stateBoundariesVisible: false,
          specificStatesEnabled: false,
          selectedStates: [],
          selectedDistricts: {},
          expandedAccordion: null,
          forestAreasVisible: false,
          tribalVillagesVisible: false,
          fraClaimsVisible: false,
          governmentOfficesVisible: false,
          surveyedAreasVisible: false,
          approvedClaimsVisible: false,
          pendingClaimsVisible: false,
          rejectedClaimsVisible: false,
          incompleteClaimsVisible: false,
          densityHeatmapVisible: false,
          approvalRateVisible: false,
          timelineAnalysisVisible: false,
          tribalDemographicsVisible: false,
        }),
    }),
    {
      name: "filter-storage",
      // Only persist certain fields, exclude UI state like expandedAccordion
      partialize: (state) => ({
        stateBoundariesVisible: state.stateBoundariesVisible,
        specificStatesEnabled: state.specificStatesEnabled,
        selectedStates: state.selectedStates,
        selectedDistricts: state.selectedDistricts,
        forestAreasVisible: state.forestAreasVisible,
        tribalVillagesVisible: state.tribalVillagesVisible,
        fraClaimsVisible: state.fraClaimsVisible,
        governmentOfficesVisible: state.governmentOfficesVisible,
        surveyedAreasVisible: state.surveyedAreasVisible,
        approvedClaimsVisible: state.approvedClaimsVisible,
        pendingClaimsVisible: state.pendingClaimsVisible,
        rejectedClaimsVisible: state.rejectedClaimsVisible,
        incompleteClaimsVisible: state.incompleteClaimsVisible,
        densityHeatmapVisible: state.densityHeatmapVisible,
        approvalRateVisible: state.approvalRateVisible,
        timelineAnalysisVisible: state.timelineAnalysisVisible,
        tribalDemographicsVisible: state.tribalDemographicsVisible,
      }),
    }
  )
);
