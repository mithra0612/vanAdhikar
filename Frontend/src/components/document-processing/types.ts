export interface ExtractedField {
  field: string;
  extractedValue: string;
  confidence: number;
  verifiedValue: string;
  isLocked: boolean;
  isEdited: boolean;
}

export interface FRAClaimData {
  // Personal Information
  claimantName: string;
  spouseName: string;
  fatherMotherName: string;
  address: string;
  village: string;
  gramPanchayat: string;
  tehsilTaluka: string;
  district: string;
  
  // Tribe Status
  scheduledTribe: boolean;
  scheduledTribeCertificate?: string;
  otherTraditionalForestDweller: boolean;
  spouseScheduledTribe?: boolean;
  
  // Family Members
  familyMembers: Array<{
    name: string;
    age: number;
    relationship: string;
  }>;
  
  // Nature of Claim
  habitationLand?: string;
  selfCultivationLand?: string;
  disputedLands?: string;
  pattasLeasesGrants?: string;
  rehabilitationLand?: string;
  displacedLand?: string;
  forestVillageLand?: string;
  otherTraditionalRights?: string;
  evidence?: string;
  additionalInfo?: string;
}

export interface FFRAPatttaData {
  dssClickBox: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  pattNo: string;
  name: string;
  village: string;
  surveyNumber?: string;
  area?: string;
  boundaryDetails?: string;
}

export type ClaimType = 
  | 'individual_rights' 
  | 'community_rights' 
  | 'community_forest_resource';

export type ProcessingStep = 
  | 'upload' 
  | 'claim_selection'
  | 'fra_extraction' 
  | 'ffra_extraction' 
  | 'review' 
  | 'map_processing' 
  | 'final_review';

export interface DocumentProcessingState {
  currentStep: ProcessingStep;
  selectedClaimType: ClaimType | null;
  uploadedDocument: File | null;
  documentUrl: string;
  fraClaimData: Partial<FRAClaimData>;
  ffraPatttaData: Partial<FFRAPatttaData>;
  extractedFields: ExtractedField[];
  isProcessing: boolean;
  allFieldsLocked: boolean;
}

// Mock data for Tripura
export const TRIPURA_MOCK_DATA = {
  districts: [
    'Dhalai', 'Gomati', 'Khowai', 'North Tripura', 
    'Sepahijala', 'South Tripura', 'Unakoti', 'West Tripura'
  ],
  villages: [
    'Agartala', 'Udaipur', 'Belonia', 'Kailasahar', 
    'Dharmanagar', 'Ambassa', 'Ranir Bazar', 'Sonamura',
    'Kumarghat', 'Teliamura'
  ],
  gramPanchayats: [
    'Agartala Municipal Corporation', 'Udaipur Nagar Panchayat',
    'Belonia Nagar Panchayat', 'Dharmanagar Nagar Panchayat',
    'Kailasahar Nagar Panchayat', 'Ambassa Nagar Panchayat'
  ],
  tehsils: [
    'Agartala', 'Mohanpur', 'Hezamara', 'Jirania',
    'Bishalgarh', 'Khowai', 'Teliamura', 'Kamalpur',
    'Kumarghat', 'Longtharai Valley'
  ]
};

export const SAMPLE_FRA_CLAIM_DATA: Partial<FRAClaimData> = {
  claimantName: "Ratan Kumar Tripura",
  spouseName: "Sunita Tripura",
  fatherMotherName: "Late Biren Tripura",
  address: "Village Kumarghat, Post Office Kumarghat",
  village: "Kumarghat",
  gramPanchayat: "Kumarghat Gram Panchayat",
  tehsilTaluka: "Kumarghat",
  district: "Unakoti",
  scheduledTribe: true,
  otherTraditionalForestDweller: false,
  familyMembers: [
    { name: "Ratan Kumar Tripura", age: 45, relationship: "Self" },
    { name: "Sunita Tripura", age: 42, relationship: "Wife" },
    { name: "Amit Tripura", age: 18, relationship: "Son" },
    { name: "Priya Tripura", age: 16, relationship: "Daughter" }
  ],
  habitationLand: "0.25 acres",
  selfCultivationLand: "2.5 acres",
  evidence: "Residing in the area since 1985, cultivation records, village headman certificate"
};

export const SAMPLE_FFRA_PATTA_DATA: FFRAPatttaData = {
  dssClickBox: "TR_UNA_KUM_001",
  coordinates: {
    latitude: 24.3176,
    longitude: 92.1734
  },
  pattNo: "FRA/UNA/2024/001",
  name: "Ratan Kumar Tripura",
  village: "Kumarghat",
  surveyNumber: "145/2A",
  area: "2.75 acres",
  boundaryDetails: "North: Village Road, South: Forest Land, East: Stream, West: Agricultural Land"
};