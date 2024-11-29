"use client";

import { Calendar, Users, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProgramCardProps {
  id: string;
  name: string;
  schoolName: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  cost: number;
  status: 'active' | 'completed' | 'cancelled';
  onClick: (id: string) => void;
}

export function ProgramCard({ 
  id, 
  name, 
  schoolName, 
  startDate, 
  endDate, 
  maxStudents,
  cost,
  status,
  onClick 
}: ProgramCardProps) {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(id)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex flex-col gap-1">
          <span>{name}</span>
          <span className="text-sm font-normal text-muted-foreground">{schoolName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(startDate).toLocaleDateString()} - {new Date(endDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Max {maxStudents} students</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4" />
            <span>${cost.toLocaleString()}</span>
          </div>
          <div className="pt-2">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[status]}`}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}