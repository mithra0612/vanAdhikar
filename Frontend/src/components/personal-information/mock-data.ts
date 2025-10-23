"use client";

export const personalData = {
  // Header Summary
  headerSummary: {
    name: "Lakshmi Devi",
    fra_id: "FRA-TN-2025-01452",
    village: "Kundiyam Village",
    district: "Erode",
    verified: true,
    confidence_score: 94,
    verification_date: "2025-08-12",
    photo_url: "/images/Lakshmi Devi.jpg" // placeholder
  },
  
  // Map + Geometry
  mapGeometry: {
    gps_point: [11.4235, 77.1245],
    patta_polygon: {
      type: "Polygon",
      coordinates: [[[77.124,11.423],[77.125,11.423],[77.125,11.424],[77.124,11.424],[77.124,11.423]]]
    },
    satellite_snapshot_url: "/images/LdPLOT.png"
  },
  
  // Patta (Title) Details
  pattaDetails: {
    patta_id: "PAT-8923",
    status: "Granted",
    area_ha: 1.24,
    issued_date: "2021-03-14",
    document_url: "/docs/patta_8923.pdf",
    ocr_confidence: 92
  },
  
  // Claims & Verification History
  claimsHistory: {
    claims: [
      {
        claim_id: "CLM-452",
        date_submitted: "2020-12-10",
        type: "Individual",
        supporting_docs: ["/docs/affidavit.pdf"],
        status: "Approved"
      }
    ],
    verification_records: [
      {
        officer: "D. Kumar", 
        date: "2021-01-05", 
        result: "Approved", 
        notes: "Boundary matched"
      }
    ]
  },
  
  // Asset Evidence (Land Use & Natural Assets)
  assetEvidence: {
    landcover_class: "Agriculture",
    agriculture_area: 0.84,
    forest_cover_pct: 10.2,
    waterbody_area_m2: 120,
    homestead_count: 1,
    tree_count: 34
  },
  
  // Schemes & Eligibility
  schemes: {
    schemes: [
      {
        scheme_id: "PMKISAN",
        name: "PM-KISAN",
        eligibility_score: 88,
        status: "Eligible",
        matched_criteria: ["Has land <2 ha", "Bank account linked"],
        apply_link: "https://pmkisan.gov.in/apply"
      },
      {
        scheme_id: "MGNREGA",
        name: "MGNREGA",
        eligibility_score: 95,
        status: "Eligible",
        matched_criteria: ["Rural household", "Adult members", "Manual labor"],
        apply_link: "https://nrega.nic.in/apply"
      },
      {
        scheme_id: "PMAY",
        name: "Pradhan Mantri Awas Yojana",
        eligibility_score: 70,
        status: "Eligible",
        matched_criteria: ["Rural household", "No pucca house"],
        apply_link: "https://pmayg.nic.in/apply"
      }
    ]
  },
  
  // IoT & Environment
  iotEnvironment: {
    sensors: [
      {
        id: "DWLR-23",
        type: "Groundwater (DWLR)",
        last_seen: "2025-09-10T10:24:00+05:30",
        reading: {value: 3.4, unit: "m depth"},
        battery_pct: 78,
        status: "Online",
        trend_data: [3.2, 3.3, 3.5, 3.4, 3.4, 3.3, 3.4] // last 7 days
      },
      {
        id: "SMS-45",
        type: "Soil Moisture",
        last_seen: "2025-09-10T09:15:00+05:30",
        reading: {value: 24, unit: "%"},
        battery_pct: 65,
        status: "Online",
        trend_data: [22, 23, 25, 24, 23, 24, 24] // last 7 days
      }
    ]
  },
  
  // Carbon Credits
  carbonCredits: {
    tree_count: 34,
    annual_co2_sequestration_kg: 1200,
    estimated_credits: 1.2,
    market_price_per_credit: 2000,
    estimated_revenue: 24000,
    status: "Unassigned"
  },
  
  // Socio-Economic & Agro Data
  socioEconomic: {
    household_size: 5,
    occupation: "Agriculture",
    crop_types: ["Millet", "Groundnut"],
    annual_income_est: 95000,
    benefits_received: ["PM-KISAN", "MGNREGA"]
  },
  
  // Documents & Attachments
  documents: {
    documents: [
      {
        id: "DOC-1221",
        type: "Patta",
        url: "/docs/patta_8923.pdf",
        uploaded_by: "OCR",
        upload_date: "2021-03-14"
      },
      {
        id: "DOC-1222",
        type: "Photo",
        url: "/images/field_photo.png",
        uploaded_by: "Field Officer",
        upload_date: "2021-03-20"
      },
      {
        id: "DOC-1223",
        type: "ID Proof",
        url: "/docs/id_proof.pdf",
        uploaded_by: "Applicant",
        upload_date: "2020-12-05"
      },
      {
        id: "DOC-1224",
        type: "Supporting Document",
        url: "/docs/supporting_doc.pdf",
        uploaded_by: "Field Officer",
        upload_date: "2021-01-03"
      }
    ]
  }
};
