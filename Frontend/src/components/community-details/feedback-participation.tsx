"use client";

import { DashboardCard } from "@/components/personal-information/dashboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Users, ChevronRight, Star, ThumbsUp, ChartPie } from "lucide-react";

type FeedbackItem = {
  id: string;
  type: string;
  topic: string;
  submitted_by: string;
  date: string;
  status: "pending" | "reviewed" | "resolved" | "closed";
  rating?: number;
};

type ParticipationStats = {
  meetings_attendance: number;
  total_meetings: number;
  survey_participation: number;
  total_surveys: number;
  feedback_submitted: number;
  community_involvement_score: number;
};

type FeedbackParticipationProps = {
  feedback: FeedbackItem[];
  stats: ParticipationStats;
};

export function FeedbackParticipation({ feedback, stats }: FeedbackParticipationProps) {
  const pendingFeedback = feedback.filter(item => item.status === "pending").length;
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case "pending": return "bg-yellow-500 text-yellow-50";
      case "reviewed": return "bg-blue-500 text-blue-50";
      case "resolved": return "bg-green-500 text-green-50";
      case "closed": return "bg-slate-500 text-slate-50";
      default: return "bg-slate-200";
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  const renderStars = (rating: number = 0) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        className={`h-3 w-3 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}
      />
    ));
  };

  return (
    <DashboardCard 
      title="Feedback & Participation" 
      headerContent={
        <Badge variant="outline" className="flex items-center gap-1">
          <MessageSquare className="h-3 w-3" /> {pendingFeedback} pending
        </Badge>
      }
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-500" />
            <div>
              <div className="text-sm text-muted-foreground">Meeting Attendance</div>
              <div className="text-lg font-medium">{stats.meetings_attendance}/{stats.total_meetings}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ChartPie className="h-5 w-5 text-green-500" />
            <div>
              <div className="text-sm text-muted-foreground">Involvement Score</div>
              <div className="text-lg font-medium">{stats.community_involvement_score}%</div>
            </div>
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Survey Participation</span>
            <span>{stats.survey_participation}/{stats.total_surveys} completed</span>
          </div>
          <Progress value={(stats.survey_participation / stats.total_surveys) * 100} className="h-1.5" />
        </div>
        
        <div className="border rounded-md p-3">
          <div className="flex justify-between items-center">
            <div className="font-medium">Recent Feedback</div>
            <ThumbsUp className="h-4 w-4 text-blue-500" />
          </div>
          <div className="mt-2 space-y-2">
            {feedback.slice(0, 2).map(item => (
              <div key={item.id} className="text-sm border-b pb-2">
                <div className="flex justify-between items-center">
                  <div className="font-medium truncate max-w-[180px]">{item.topic}</div>
                  <Badge className={`text-xs ${getStatusColor(item.status)}`}>
                    {item.status}
                  </Badge>
                </div>
                <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                  <div>{item.type}</div>
                  <div>{formatDate(item.date)}</div>
                </div>
                {item.rating && (
                  <div className="flex items-center mt-1">
                    {renderStars(item.rating)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
              View All Feedback <ChevronRight className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Community Feedback & Participation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="border rounded-md p-3 flex flex-col items-center">
                  <Users className="h-8 w-8 text-blue-500 mb-2" />
                  <div className="text-sm text-muted-foreground">Meeting Attendance</div>
                  <div className="text-xl font-bold">{stats.meetings_attendance}/{stats.total_meetings}</div>
                  <Progress 
                    value={(stats.meetings_attendance / stats.total_meetings) * 100} 
                    className="h-1.5 w-full mt-2" 
                  />
                </div>
                <div className="border rounded-md p-3 flex flex-col items-center">
                  <ChartPie className="h-8 w-8 text-green-500 mb-2" />
                  <div className="text-sm text-muted-foreground">Community Involvement</div>
                  <div className="text-xl font-bold">{stats.community_involvement_score}%</div>
                  <Progress 
                    value={stats.community_involvement_score} 
                    className="h-1.5 w-full mt-2" 
                  />
                </div>
              </div>
              
              <div className="font-medium text-lg mb-2">All Feedback</div>
              {feedback.map(item => (
                <div key={item.id} className="border rounded-md p-3">
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{item.topic}</div>
                    <Badge className={`${getStatusColor(item.status)}`}>
                      {item.status}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <div className="text-sm text-muted-foreground">
                      Type: {item.type}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Submitted by: {item.submitted_by} on {formatDate(item.date)}
                    </div>
                    {item.rating && (
                      <div className="flex items-center gap-1 mt-2">
                        Rating: {renderStars(item.rating)}
                      </div>
                    )}
                  </div>
                  <div className="flex justify-end mt-3">
                    <Button size="sm" variant="outline">View Details</Button>
                  </div>
                </div>
              ))}
              

            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardCard>
  );
}
