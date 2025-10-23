"use client";

export const communityData = {
  // Header Summary
  headerSummary: {
    community_id: "COMM-4567",
    name: "Kundiyam Village Community",
    district: "Erode",
    state: "Tamil Nadu",
    verified: true,
    total_households: 214,
    total_members: 940
  },
  
  // Map + Geometry
  mapGeometry: {
    community_polygon: {
      type: "Polygon",
      coordinates: [[[77.124,11.423],[77.135,11.423],[77.135,11.434],[77.124,11.434],[77.124,11.423]]]
    },
    satellite_snapshot_url: "/images/commap.png", // Using the same map for now
    assets: {
      forest: { area_ha: 380, percentage: 62.4 },
      agriculture: { area_ha: 415, percentage: 25.6 },
      settlement: { area_ha: 85, percentage: 8.2 },
      water: { area_ha: 35, percentage: 3.8 }
    }
  },
  
  // Community Members
  members: [
    { member_id: "IND-123", name: "Lakshmi Devi", role: "Household Head", household_code: "HH-01", photo_url: "/images/avatars/avatar-1.png" },
    { member_id: "IND-124", name: "R. Kumar", role: "Farmer", household_code: "HH-02", photo_url: "/images/avatars/avatar-2.png" },
    { member_id: "IND-125", name: "Meena", role: "Youth Representative", household_code: "HH-03", photo_url: "/images/avatars/avatar-3.png" },
    { member_id: "IND-126", name: "Arjun Singh", role: "Elder", household_code: "HH-04", photo_url: "/images/avatars/avatar-4.png" },
    { member_id: "IND-127", name: "Priya Desai", role: "Household Head", household_code: "HH-05", photo_url: "/images/avatars/avatar-5.png" },
    { member_id: "IND-128", name: "Vikram Patel", role: "Farmer", household_code: "HH-06", photo_url: "/images/avatars/avatar-6.png" },
    { member_id: "IND-129", name: "Sunita Gupta", role: "Household Head", household_code: "HH-07", photo_url: "/images/avatars/avatar-7.png" },
    { member_id: "IND-130", name: "Raj Sharma", role: "Elder", household_code: "HH-08", photo_url: "/images/avatars/avatar-8.png" },
  ],
  
  // Community Assets & Resources
  assets: {
    forest_cover_pct: 62.4,
    agriculture_area_ha: 415,
    waterbodies: { count: 12, total_area_m2: 18500 },
    grazing_land_ha: 38,
    homesteads: 210
  },
  
  // Schemes & Eligibility
  schemesSummary: [
    { scheme_id: "PMKISAN", scheme_name: "PM-KISAN", eligible_households: 150, enrolled: 130 },
    { scheme_id: "JJM", scheme_name: "Jal Jeevan Mission", eligible_households: 190, enrolled: 175 },
    { scheme_id: "MGNREGA", scheme_name: "MGNREGA", eligible_households: 214, enrolled: 198 },
    { scheme_id: "PMAY", scheme_name: "PM Awaas Yojana", eligible_households: 120, enrolled: 95 },
    { scheme_id: "PMJAY", scheme_name: "Ayushman Bharat", eligible_households: 175, enrolled: 140 }
  ],
  
  // IoT & Environment
  iotNetwork: {
    total_sensors: 25,
    online: 21,
    offline: 4,
    sensor_types: ["DWLR", "Weather", "Soil Moisture"],
    last_update: "2025-09-11T09:00:00+05:30",
    monthly_rainfall: 182,
    avg_groundwater: 4.2,
    avg_soil_moisture: 32
  },
  
  // Feedback & Participation
  feedback: {
    ivr_responses_pct: 65,
    smartphone_users_pct: 42,
    meeting_participation_pct: 78,
    last_meeting_date: "2025-08-20",
    next_meeting_date: "2025-09-25",
    total_feedback_received: 156
  },
  
  // Documents & Reports
  documents: [
    { doc_id: "DOC-001", type: "CFR Recognition", url: "/docs/cfr_community.pdf", uploaded_by: "Govt", upload_date: "2023-05-10" },
    { doc_id: "DOC-002", type: "Annual Resource Report", url: "/docs/resource2024.pdf", uploaded_by: "Field Officer", upload_date: "2024-06-21" },
    { doc_id: "DOC-003", type: "Water Usage Report", url: "/docs/water_usage.pdf", uploaded_by: "NGO Partner", upload_date: "2025-01-15" },
    { doc_id: "DOC-004", type: "Community Meeting Minutes", url: "/docs/meeting_aug2025.pdf", uploaded_by: "Community Secretary", upload_date: "2025-08-22" },
    { doc_id: "DOC-005", type: "Land Survey Map", url: "/docs/land_survey.pdf", uploaded_by: "Revenue Dept", upload_date: "2024-11-30" }
  ]
};
