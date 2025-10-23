"use client";

import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Users, User, Trees, Building, Group, Shield, Home, MapPin, Briefcase, MoreHorizontal } from "lucide-react";

interface PieSlice {
  id: string | number;
  value: number;
  label?: string;
  color?: string;
  [key: string]: unknown;
}

interface MyPieProps {
  data: PieSlice[];
}

const groupSmallTribes = (data: PieSlice[], maxDisplay: number = 4): PieSlice[] => {
  const sortedData = [...data].sort((a, b) => (b.value || 0) - (a.value || 0));
  const mainTribes = sortedData.slice(0, maxDisplay);
  const smallTribes = sortedData.slice(maxDisplay);

  if (smallTribes.length > 0) {
    const othersValue = Number(
      smallTribes
        .reduce((sum, item) => sum + Number(item.value || 0), 0)
        .toFixed(1)
    );

    mainTribes.push({
      id: "Others",
      label: "Others",
      value: othersValue,
      color: "#F4511E", // Orange for "Others"
    });
  }

  return mainTribes;
};

const generatePalette = (n: number): string[] => {
  const colorPalette = [
    "#1E88E5", // Blue (Medium Blue)
    "#388E3C", // Green (Dark Green)
    "#F4511E", // Orange (Vibrant Orange)
    "#8E24AA", // Purple (Medium Purple)
    "#D32F2F", // Red (Medium Red)
  ];

  // Repeat colors if more are needed
  const palette = [];
  for (let i = 0; i < n; i++) {
    palette.push(colorPalette[i % colorPalette.length]);
  }

  return palette;
};

// Helper function to adjust color brightness
const adjustColorBrightness = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent * 100);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;

  return (
    "#" +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
};

const getIconForSlice = (id: string | number) => {
  const idStr = String(id).toLowerCase();

  if (idStr.includes("individual") || idStr.includes("forest rights")) {
    return <User size={16} />;
  }
  if (idStr.includes("community") && idStr.includes("forest")) {
    return <Trees size={16} />;
  }
  if (idStr.includes("community")) {
    return <Users size={16} />;
  }
  if (idStr.includes("group") || idStr.includes("collective")) {
    return <Group size={16} />;
  }
  if (idStr.includes("building") || idStr.includes("house") || idStr.includes("residential")) {
    return <Building size={16} />;
  }
  if (idStr.includes("land") || idStr.includes("property")) {
    return <MapPin size={16} />;
  }
  if (idStr.includes("water") || idStr.includes("resource")) {
    return <Shield size={16} />;
  }
  if (idStr.includes("asset") || idStr.includes("business")) {
    return <Briefcase size={16} />;
  }
  if (idStr.includes("others") || idStr.includes("other")) {
    return <MoreHorizontal size={16} />;
  }

  // Default icon
  return <Home size={16} />;
};

const PieChartOne: React.FC<MyPieProps> = ({ data }) => {
  // Group small tribes and generate colors
  const processedData = groupSmallTribes(data);
  const palette = generatePalette(processedData.length);
  const usedColors = new Set<string>();

  // Attach colors and ensure uniqueness
  const coloredData = processedData.map((d, i) => {
    let color = d.color || palette[i];
    let colorIndex = i;

    while (usedColors.has(color) && colorIndex < palette.length - 1) {
      colorIndex++;
      color = palette[colorIndex];
    }

    if (usedColors.has(color)) {
      color = `hsl(${(i * 137.5) % 360}, 55%, ${50 + (i % 3) * 10}%)`;
    }

    usedColors.add(color);
    return { ...d, color };
  });

  // Responsive styles
  const containerStyle: React.CSSProperties = {
    height: "295px",
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
  };

  const chartStyle: React.CSSProperties = {
    height: "250px",
    width: "100%",
    maxWidth: "100%",
    boxSizing: "border-box",
  };

  const legendStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "12px",
    padding: "20px 10px",
    maxWidth: "100%",
  };

  // Mobile adjustments using inline style and media queries
  const mobileStyle = `
    @media (max-width: 600px) {
      .piechartone-container {
        height: 220px !important;
        padding: 0 2px !important;
      }
      .piechartone-chart {
        height: 160px !important;
      }
      .piechartone-legend {
        gap: 8px !important;
        padding: 12px 2px !important;
        font-size: 12px !important;
      }
      .piechartone-legend-item {
        font-size: 12px !important;
        min-width: unset !important;
      }
    }
  `;

  return (
    <div className="piechartone-container" style={containerStyle}>
      <style>{mobileStyle}</style>
      <div className="piechartone-chart" style={chartStyle}>
        <ResponsivePie
          data={coloredData}
          margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
          padAngle={0}
          cornerRadius={0}
          activeOuterRadiusOffset={8}
          colors={{ datum: "data.color" }}
          borderWidth={1.5}
          borderColor="#ffffff"
          tooltip={({ datum }) => {
            const total = data.reduce((sum, d) => sum + (d.value || 0), 0);
            const percentage = ((datum.value / total) * 100).toFixed(1);
            const icon = getIconForSlice(datum.id);

            return (
              <div
                style={{
                  padding: "12px 16px",
                  background: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  fontSize: "14px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "4px",
                  }}
                >
                  <span style={{ color: datum.color }}>{icon}</span>
                  {datum.id}
                </div>
                <div
                  style={{
                    color: "#1E88E5", // Blue for percentage (matches palette)
                    fontWeight: "500",
                  }}
                >
                  {percentage}%
                </div>
              </div>
            );
          }}
          enableArcLabels={true}
          arcLabelsSkipAngle={10}
          arcLabelsTextColor="#000000" // Black text for labels
          arcLabel={() => ""} // Show no label by default
          enableArcLinkLabels={false}
          motionConfig="gentle"
          transitionMode="pushIn"
          legends={[]}
        />
      </div>

      {/* Custom Legend */}
      <div className="piechartone-legend" style={legendStyle}>
        {coloredData.map((item) => (
          <div
            key={item.id}
            className="piechartone-legend-item"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "14px",
              color: "#374151",
              minWidth: "fit-content",
              transition: "all 200ms ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#111827";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#374151";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <div
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: item.color as string,
                flexShrink: 0,
                boxShadow: "0 0 0 1px rgba(0,0,0,0.05)",
              }}
            />
            <span style={{ whiteSpace: "nowrap" }}>{item.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartOne;

// Pie chart colors used:
