"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  headerContent?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function DashboardCard({ title, headerContent, children, className = "" }: DashboardCardProps) {
  return (
    <Card className={`w-full h-full flex flex-col shadow-lg rounded-xl border border-border bg-background ${className}`}>
      <CardHeader className="pb-3 pt-4 px-4 flex-shrink-0 border-b border-border">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          {headerContent}
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-4 px-4 pb-4 overflow-hidden">
        <div className="h-full flex flex-col overflow-y-auto">{children}</div>
      </CardContent>
    </Card>
  );
}
