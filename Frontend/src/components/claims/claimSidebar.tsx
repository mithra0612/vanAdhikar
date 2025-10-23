import React, { useState, useEffect } from "react";
import {
  X,
  User,
  MapPin,
  Landmark,
  Building2,
  Flag,
  FileText,
  BadgeCheck,
  ShieldCheck,
  Timer,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// InfoCard: always use text-black for value
function InfoCard({
  icon,
  label,
  value,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`bg-white rounded-lg border border-black/10 ${className}`}>
      <div className="p-4 flex items-start gap-3">
        {/* Remove bg-black/5 from icon wrapper */}
        <div className="flex-shrink-0 p-2 rounded-lg">
          <span>{icon}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs font-medium text-black/40 uppercase mb-1">
            {label}
          </div>
          <div className="text-sm font-semibold text-black break-words">
            {value}
          </div>
        </div>
      </div>
    </div>
  );
}

function TimelineCard({
  timeline,
}: {
  timeline: { status: string; date: string }[];
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const steps = [
    {
      label: "Gramsabha",
      description: "Village level review",
      status: "Completed",
      date: timeline[0]?.date || new Date().toLocaleDateString(),
    },
    {
      label: "Sub-Divisional Level Committee",
      description: "Sub-district authorities",
      status: timeline[1]?.status || "Pending",
      date: timeline[1]?.date || "",
    },
    {
      label: "District Level Committee",
      description: "District committee decision",
      status: timeline[2]?.status || "Pending",
      date: timeline[2]?.date || "",
    },
  ];

  // If SDLC is pending, force DLC to pending as well
  const sdlcPending = steps[1].status === "Pending";
  if (sdlcPending) {
    steps[2].status = "Pending";
    steps[2].date = "";
  }

  function getStepStatus(idx: number) {
    if (idx === 0) return "completed";
    const currentStep = steps[idx];
    if (currentStep.status === "Approved" || currentStep.status === "Completed")
      return "completed";
    if (currentStep.status === "Rejected") return "rejected";
    const prevStep = steps[idx - 1];
    if (prevStep.status === "Completed" || prevStep.status === "Approved")
      return "active";
    return "pending";
  }

  // Accent color for icons only
  function getStatusIcon(status: string) {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-red-500" />;
      case "active":
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <Timer className="w-4 h-4 text-orange-400" />;
    }
  }

  return (
    <div className="bg-white rounded-lg border border-black/10 mt-6">
      <div className="px-4 py-4">
        <div>
          {steps.map((step, idx) => {
            const status = getStepStatus(idx);
            const isLast = idx === steps.length - 1;
            return (
              <div key={idx} className="relative flex items-start">
                {/* Timeline circle and vertical line */}
                <div className="flex flex-col items-center mr-4">
                  <div className="relative flex h-10 w-10 items-center justify-center">
                    <div
                      className={`absolute h-10 w-10 rounded-full border-2 ${
                        status === "completed"
                          ? "border-green-200"
                          : status === "rejected"
                          ? "border-red-200"
                          : status === "active"
                          ? "border-indigo-200"
                          : "border-black/10"
                      }`}
                    />
                    <div className="relative z-10">{getStatusIcon(status)}</div>
                  </div>
                  {/* Vertical line for all except last step */}
                  {!isLast && (
                    <div className="w-0.5 bg-black/10" style={{ height: "48px" }} />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  {/* Remove bg-black/5 from timeline step card */}
                  <div className="rounded p-3 mb-8">
                    <div className="text-sm font-semibold text-black mb-1">
                      {step.label}
                    </div>
                    <div className="text-xs text-black/40 mb-2">
                      {step.description}
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${
                          status === "completed"
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : status === "rejected"
                            ? "bg-red-50 text-red-600 border border-red-200"
                            : status === "active"
                            ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                            : "bg-orange-50 text-orange-700 border border-orange-200"
                        }`}
                      >
                        {step.status}
                      </span>
                      {step.date && (
                        <span className="text-xs text-black/40">
                          {step.date}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// StatusBadge: accent color for icon and badge only
function StatusBadge({ status }: { status: string }) {
  const statusConfig = {
    Approved: {
      className: "text-green-700",
    },
    Rejected: {
      className: "text-red-600",
    },
    Pending: {
      className: "text-orange-700",
    },
  };
  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.Pending;
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded text-sm font-medium ${config.className}`}
    >
      {status}
    </div>
  );
}

type Claim = {
  id: number;
  name: string;
  spouseName?: string; // <-- Add spouseName field
  village: string;
  gramPanchayat: string;
  taluk: string;
  district: string;
  claimType: "IFR" | "CR" | "CFR";
  status: "Approved" | "Rejected" | "Pending";
  timeline: {
    status: "Approved" | "Rejected" | "Pending";
    date: string;
    reason?: string;
  }[];
  stFdst: boolean;
  otfd: boolean;
  districtClaimsCount?: number;
  districtApprovedCount?: number;
  rejectionReason?: string; // <-- add this for rejected claims
};

// Main Sidebar Wrapper with enhanced animations
export default function ClaimSidebarWrapper({
  selectedClaim,
  setSelectedClaim,
}: {
  selectedClaim: any;
  setSelectedClaim: (claim: any) => void;
}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (selectedClaim) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [selectedClaim]);

  return (
    <>
      {/* Black/white minimalistic backdrop */}
      {selectedClaim && (
        <div
          className="fixed inset-0 bg-black/20 transition-opacity duration-300 z-40"
          onClick={() => setSelectedClaim(null)}
        />
      )}

      {/* Black/white sidebar */}
      <div
        className={`fixed top-0 right-0 h-screen w-full max-w-2xl bg-white shadow-xl transform transition-all duration-500 ease-out ${
          selectedClaim
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
        } flex flex-col z-50`}
      >
        {isVisible && selectedClaim && (
          <ClaimSidebar
            claim={{
              id: selectedClaim.id,
              name: selectedClaim.name,
              village: selectedClaim.village,
              gramPanchayat: selectedClaim.gramPanchayat,
              taluk: selectedClaim.taluk,
              district: selectedClaim.district,
              claimType: selectedClaim.claimType,
              status: selectedClaim.status,
              timeline: selectedClaim.timeline || [],
              stFdst: selectedClaim.stFdst,
              otfd: selectedClaim.otfd,
            }}
            onClose={() => setSelectedClaim(null)}
          />
        )}
      </div>
    </>
  );
}

// (Removed duplicate Claim type definition)

// Enhanced main sidebar component
function ClaimSidebar({
  claim,
  onClose,
}: {
  claim: Claim;
  onClose?: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const claimTypeDetails: Record<string, { name: string }> = {
    IFR: { name: "Individual Forest Rights" },
    CR: { name: "Community Rights" },
    CFR: { name: "Community Forest Resource" },
  };

  return (
    <div
      className={`relative h-full w-full flex flex-col transition-all duration-700 ${
        mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <div className="sticky top-0 z-10 bg-white border-b border-black/10 shadow-sm">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <User className="w-6 h-6 text-blue-500" />
            <h1 className="text-xl font-bold text-black">Claim Details</h1>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-black/40 hover:text-blue-500 hover:bg-blue-50 rounded-full"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-6 space-y-6">
          {/* --- Status, Claim Type --- */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-black flex items-center gap-2">
                <Info className="w-5 h-5 text-blue-500" />
                Current Status
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Claim Type */}
              <InfoCard
                icon={
                  <FileText className="w-5 h-5 text-purple-500" />
                }
                label="Claim Type"
                value={
                  <span className="font-semibold text-black">
                    {claimTypeDetails[claim.claimType]?.name || claim.claimType}
                  </span>
                }
              />
              {/* Claim Status */}
              <InfoCard
                icon={<BadgeCheck className="w-5 h-5 text-green-600" />}
                label="Claim Status"
                value={<StatusBadge status={claim.status} />}
              />
            </div>
            {/* Rejection Reason */}
            {claim.status === "Rejected" && (
              <div className="mt-4 p-4 bg-black/5 border border-black/10 rounded-lg flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-500 mt-1" />
                <div>
                  <div className="text-sm font-semibold text-black mb-1">
                    Rejection Reason
                  </div>
                  <div className="text-sm text-black/60">
                    {
                      claim.rejectionReason && claim.rejectionReason.trim()
                        ? claim.rejectionReason
                        : claim.timeline.find((t) => t.status === "Rejected" && t.reason)?.reason
                        || "No reason provided"
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* --- Claim Information --- */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-black flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              Claim Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Full Name */}
              <InfoCard
                icon={<User className="w-5 h-5 text-blue-500" />}
                label="Full Name"
                value={<span className="text-black">{claim.name}</span>}
              />
              {/* Spouse Name */}
              <InfoCard
                icon={<User className="w-5 h-5 text-pink-500" />}
                label="Spouse Name"
                value={
                  <span className="text-black">
                    {claim.spouseName ? claim.spouseName : "N/A"}
                  </span>
                }
              />
              {/* Village */}
              <InfoCard
                icon={<MapPin className="w-5 h-5 text-teal-500" />}
                label="Village"
                value={<span className="text-black">{claim.village}</span>}
              />
              {/* Gram Panchayat */}
              <InfoCard
                icon={<Landmark className="w-5 h-5 text-purple-500" />}
                label="Gram Panchayat"
                value={<span className="text-black">{claim.gramPanchayat}</span>}
              />
              {/* Taluk / Tehsil */}
              <InfoCard
                icon={<Building2 className="w-5 h-5 text-orange-500" />}
                label="Taluk / Tehsil"
                value={<span className="text-black">{claim.taluk}</span>}
              />
              {/* District */}
              <InfoCard
                icon={<Flag className="w-5 h-5 text-pink-500" />}
                label="District"
                value={
                  <div>
                    <div className="font-semibold text-black">
                      {claim.district}
                    </div>
                    <div className="text-xs text-black/40 mt-1">
                      {typeof claim.districtClaimsCount === "number"
                        ? `Total claims: ${claim.districtClaimsCount}`
                        : "District committee: final review"}
                    </div>
                  </div>
                }
                className=""
              />
            </div>
          </div>
          {/* --- ST and OTFD --- */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-black flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              Eligibility Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoCard
                icon={<ShieldCheck className="w-5 h-5 text-green-600" />}
                label="Scheduled Tribe (ST)"
                value={
                  <span
                    className={
                      claim.stFdst
                        ? "text-green-600 font-semibold"
                        : "text-black"
                    }
                  >
                    {claim.stFdst ? "Yes" : "No"}
                  </span>
                }
              />
              <InfoCard
                icon={<ShieldCheck className="w-5 h-5 text-orange-500" />}
                label="Other Traditional Forest Dweller (OTFD)"
                value={
                  <span
                    className={
                      claim.otfd
                        ? "text-green-600 font-semibold"
                        : "text-black"
                    }
                  >
                    {claim.otfd ? "Yes" : "No"}
                  </span>
                }
              />
            </div>
          </div>
          {/* --- Timeline --- */}
          <div className="space-y-4">
            {/* Add timeline section title */}
            <h2 className="text-lg font-semibold text-black flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" />
              Claim Timeline
            </h2>
            <TimelineCard timeline={claim.timeline} />
          </div>
        </div>
      </div>
    </div>
  );
}