# VanAdhikar – AI-Powered WebGIS and Decision Support System

**VanAdhikar** is a comprehensive, AI-driven platform designed to revolutionize **Forest Rights Act (FRA)** implementation in India. It digitizes legacy claims data, provides real-time geospatial monitoring, maps community assets, and delivers personalized scheme recommendations to tribal communities, creating a **transparent and efficient rights recognition ecosystem**.

---

## My Repository Contributions


The following graph highlights my contribution activity to this collaborative repository.

<img width="545" height="269" alt="image" src="https://github.com/user-attachments/assets/17271adc-601f-4216-80a5-8dbe4ee72e38" />

---

## **Key Features**:

### **1. AI-Powered Legacy Data Digitization:**
- **OCR + NER Pipeline**: Automated extraction and standardization of handwritten and scanned FRA claims, verification records, and patta documents.
- **Human-in-the-Loop Verification**: Ensures accuracy by combining AI efficiency with manual validation for critical data points.
- **Centralized Digital Archive**: Creates a searchable, structured repository of all FRA claims, decisions, and title records accessible to authorized stakeholders.

### **2. Real-Time FRA Atlas & WebGIS Platform:**
- **Interactive Geofenced Maps**: Automatically extracts coordinates and generates shapefiles from digitized pattas, visualizing granted FRA regions on an exportable atlas.
- **Satellite Imagery Integration**: Overlays high-resolution satellite images on geofenced areas for visual validation and monitoring.
- **State-District-Village Hierarchy**: Intuitive navigation from state level down to individual tribal groups and claim parcels.
- **Real-Time Status Tracking**: Live dashboards show claim status (pending, approved, rejected) with complete audit trails.

### **3. Deep Learning-Based Asset Mapping:**
- **Custom CNN Pipeline**: Identifies and maps forest resources including ponds, farms, water bodies, and vegetation cover within FRA villages.
- **Automated Inventory Generation**: Creates detailed asset inventories for each community forest resource (CFR) and individual forest rights (IFR) area.
- **Change Detection**: Monitors asset changes over time using temporal satellite imagery analysis.

### **4. AI-Driven Decision Support System (DSS):**
- **FRA Atlas** leverages **AI and multi-parameter analysis** to match eligible tribal individuals and communities with relevant government schemes (MGNREGA, PM-KISAN, PMAY, etc.).
- **Personalized Scheme Mapping**: Uses AI to analyze water index (DWLR), geospatial assets, agro-economic data, IoT sensor data, and socio-demographic profiles.
- **Eligibility Scoring**: Ranks beneficiaries based on need and eligibility criteria for optimal resource allocation.
- The DSS helps users understand which schemes they qualify for and how to maximize benefits, while factoring in key parameters like land size, crop type, income levels, and community needs.
- **Automated Recommendations**: Generates scheme recommendations instantly based on real-time data integration, providing both **immediate eligibility status** and **long-term benefit projections**.

### **5. Multilingual Community Feedback Loop:**
- Upon registration, the **Feedback System** is integrated throughout the platform, enabling continuous community engagement.
- **Automated Voice Calls**: Reaches tribal communities with limited digital access through local language phone calls (Hindi, Gondi, Santali, etc.).
- **Feedback Collection**: Gathers community responses on scheme effectiveness, claim processing experiences, and needs assessment via IVR (Interactive Voice Response).
- **Continuous Improvement**: Uses feedback to refine future schemes, improve service delivery, and update DSS algorithms.
- It's designed to be an inclusive engagement mechanism that ensures tribal voices shape policy and implementation.

### **6. AI + RAG-Powered Query System:**
- A **real-time AI assistant** designed to help users navigate the platform and extract insights from the centralized FRA repository.
- The system has the ability to **process natural language queries** like "How many are eligible for PM-KISAN in Tripura?" and generate instant, data-backed responses.
- Users can ask questions, and the AI will retrieve relevant data, analyze patterns, and provide contextual answers with exportable reports.
- **Instant Report Generation**: Explores the centralized repository and generates exportable reports (PDF, Excel, shapefiles) without navigating the entire platform.
- **Context-Aware Responses**: RAG (Retrieval-Augmented Generation) ensures answers are grounded in actual FRA data, not generic information.
- These reports serve as decision-support tools for district officers, state administrators, and policy researchers.

### **7. Comprehensive Analytics Dashboard:**
- **Key Performance Indicators**: Tracks claim processing rates, title recognition percentages, scheme disbursement, and beneficiary coverage.
- **Comparative Analytics**: Shows before/after metrics, state-wise performance, and trend analysis over time.
- **Visual Reporting**: Interactive charts, heatmaps, and geospatial visualizations for data-driven decision-making.
- **Role-Based Access**: Different dashboard views for tribal communities, district officers, state authorities, and central monitoring agencies.

---

## **How It Works**:

1. **User Onboarding:**
   - Users register as **tribal claimants**, **village officers**, **district coordinators**, or **state administrators**.
   - **Hierarchical Access**: Permissions granted based on role—tribal members view their claims, officers manage village data, administrators oversee entire regions.
   - Each user sees relevant data and actions for their role upon login through **personalized dashboards**.

2. **Legacy Data Digitization:**
   - **Document Upload**: Scanned images of handwritten pattas, claims, and verification records are uploaded to the platform.
   - **OCR Processing**: Tesseract.js and custom NER models extract structured data (names, plot numbers, coordinates, boundaries).
   - **Validation Workflow**: Extracted data is reviewed by human validators before final database entry.
   - **Georeferencing**: Coordinates from pattas are converted into shapefiles and plotted on the WebGIS platform.

3. **Geospatial Visualization:**
   - Users navigate through **state → district → village → tribal group** to zoom into specific FRA areas.
   - **Boundary Display**: Approved FRA boundaries are highlighted with color-coded status (individual rights, community rights).
   - **Satellite Overlay**: Toggle satellite imagery to see actual terrain, forest cover, and land use patterns.
   - **Asset Markers**: Icons indicate mapped resources like water bodies, farmland, and forest patches within each parcel.

4. **AI Asset Mapping:**
   - Platform fetches latest **satellite and SAR imagery** for FRA regions.
   - **CNN Analysis**: Custom deep learning pipeline detects ponds, farms, vegetation types, and infrastructure.
   - **Inventory Creation**: Generates asset reports with area measurements, GPS coordinates, and confidence scores.
   - **Temporal Monitoring**: Compares asset maps across time to detect changes, encroachment, or degradation.

5. **Decision Support & Scheme Mapping:**
   - The dashboard integrates FRA claim data with **DWLR water index**, **IoT agricultural sensors**, and **socio-economic surveys**.
   - **Eligibility Calculation**: AI models evaluate each individual/community against scheme criteria (land size, crop type, income, etc.).
   - **Recommendation Generation**: Outputs personalized scheme lists ranked by relevance and potential benefit.
   - **Application Assistance**: Provides scheme details, application links, and required documents directly on the dashboard.

6. **Community Feedback:**
   - System triggers automated phone calls in local languages to beneficiaries for continuous engagement.
   - **Voice Response Collection**: Records feedback via IVR for accessibility.
   - **Sentiment Analysis**: AI processes feedback to identify satisfaction levels, common complaints, and improvement areas.
   - **Feedback Integration**: Insights feed back into DSS to refine future recommendations and policy adjustments.

7. **AI-Powered Querying:**
   - Users type or speak queries like "Show me rejected claims in Odisha from 2023" in natural language.
   - **RAG Processing**: System retrieves relevant data from the centralized repository and generates contextual answers.
   - **Report Export**: Users download results as formatted PDFs, Excel sheets, or shapefiles for GIS software.
   - Eliminates need to manually filter through dashboards—get answers instantly.

---

## **Tech Stack**:

### **Frontend:**
- **Next.js**: Server-side rendering and static site generation for optimal performance and SEO.
- **TypeScript**: Type-safe development ensuring code reliability and maintainability.
- **Leaflet.js / Mapbox GL**: WebGIS visualization with layer controls, geofencing, and satellite imagery integration.
- **Recharts**: Data visualization library for analytics dashboards and comparative reports.

### **Backend:**
- **Node.js** & **Express.js**: RESTful APIs for authentication, claim management, asset retrieval, and DSS queries.
- **PostGIS**: Spatial database extension for PostgreSQL to store and query geospatial FRA data.
- **PostgreSQL**: Relational database for structured claim records, user profiles, and scheme mappings.

### **AI & Machine Learning:**
- **Tesseract.js + Custom NER**: OCR for digitizing handwritten documents with entity recognition for names, coordinates, and boundaries.
- **Custom CNN Models**: Built with TensorFlow/PyTorch for satellite image analysis and asset detection.
- **RAG Pipeline**: Combines LangChain, vector databases (Pinecone/FAISS), and LLMs (GPT-4/Gemini) for intelligent query responses.

---

## **Live Project:**
- **[Visit FRA Atlas Platform](https://dev-proto-1.vercel.app/)**
