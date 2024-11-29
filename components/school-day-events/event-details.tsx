"use client";

import { Card } from "@/components/ui/card";
import { SchoolDayEvent } from "@/lib/schemas/school-day-event";

interface EventDetailsProps {
  event: SchoolDayEvent & {
    schoolName: string;
    studentsCount: number;
    status: 'scheduled' | 'in_progress' | 'completed';
  };
}

export function EventDetails({ event }: EventDetailsProps) {
  const statusColors = {
    scheduled: "bg-blue-100 text-blue-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Event Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Date</h4>
            <p>{new Date(event.date).toLocaleDateString()}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Type</h4>
            <p className="capitalize">{event.type.replace('_', ' ')}</p>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
              statusColors[event.status]
            }`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">Students</h4>
            <p>{event.studentsCount}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}