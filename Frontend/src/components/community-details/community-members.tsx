"use client";

import { useState } from "react";
import { DashboardCard } from "@/components/personal-information/dashboard-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Users, 
  ChevronRight, 
  UserCheck, 
  Tractor, 
  UserPlus, 
  UserCog 
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Member = {
  member_id: string;
  name: string;
  role: string;
  household_code: string;
  photo_url: string;
};

type CommunityMembersProps = {
  members: Member[];
};

export function CommunityMembers({ members }: CommunityMembersProps) {
  // Simplified version - no filtering
  const filteredMembers = members;

  const getRoleIcon = (role: string) => {
    switch(role) {
      case "Household Head": return <UserCheck className="h-3 w-3" />;
      case "Farmer": return <Tractor className="h-3 w-3" />;
      case "Youth Representative": return <UserPlus className="h-3 w-3" />;
      case "Elder": return <UserCog className="h-3 w-3" />;
      default: return <Users className="h-3 w-3" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch(role) {
      case "Household Head": return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800";
      case "Farmer": return "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800";
      case "Youth Representative": return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800";
      case "Elder": return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <DashboardCard 
      title="Community Members"
      headerContent={
        <Badge variant="outline">{members.length} Members</Badge>
      }
    >
      <div className="space-y-3 h-full">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm">Community Members</h3>
          <Badge variant="outline" className="bg-primary/10 text-primary text-xs">{members.length} Total</Badge>
        </div>

        <div className="space-y-2">
          {filteredMembers.length > 0 ? (
            filteredMembers.map((member: Member) => (
              <Dialog key={member.member_id}>
                <DialogTrigger asChild>
                  <div className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer transition-colors border-b border-border last:border-b-0">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border shadow-sm">
                        <AvatarImage src={member.photo_url} alt={member.name} />
                        <AvatarFallback className="text-xs">{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium text-sm">{member.name}</div>
                        <div className="text-xs text-muted-foreground">{member.household_code}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`${getRoleColor(member.role)} text-xs px-2 py-0.5`}>
                        <span className="flex items-center gap-1">
                          {getRoleIcon(member.role)} {member.role}
                        </span>
                      </Badge>
                      <ChevronRight className="h-3 w-3 text-muted-foreground" />
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Member Details</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col md:flex-row gap-4 items-start mt-2">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={member.photo_url} alt={member.name} />
                      <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-3 flex-1">
                      <div>
                        <h3 className="font-semibold text-lg">{member.name}</h3>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getRoleColor(member.role)}>
                            {getRoleIcon(member.role)} {member.role}
                          </Badge>
                          <span className="text-sm text-muted-foreground">ID: {member.member_id}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        <div className="border rounded-md p-3">
                          <div className="text-sm text-muted-foreground">Household</div>
                          <div className="font-medium">{member.household_code}</div>
                        </div>
                        
                        <div className="border rounded-md p-3">
                          <div className="text-sm text-muted-foreground">Claims Status</div>
                          <div className="font-medium">Active</div>
                        </div>
                      </div>
                      
                      <Button className="w-full">View Full Profile</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground text-sm">
              No members found matching your criteria
            </div>
          )}
        </div>
      </div>
    </DashboardCard>
  );
}
