"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { TimeSlotScheduler } from "@/components/school-day-events/time-slot-scheduler";
import { EventDetails } from "@/components/school-day-events/event-details";
import { QuickActions } from "@/components/school-day-events/quick-actions";

// Temporary mock data until we implement the API
const mockEvent = {
  id: "1",
  date: "2024-02-15",
  type: "one_to_one" as const,
  stageOption: "readiness_day",
  schoolName: "Lincoln High School",
  studentsCount: 25,
  status: "scheduled" as const,
  students: [
    {
      studentId: "1",
      firstName: "John",
      lastName: "Smith",
      yearGroup: "Year 11",
      present: true
    },
    {
      studentId: "2",
      firstName: "Sarah",
      lastName: "Johnson",
      yearGroup: "Year 11",
      present: true
    }
  ],
  timeSlots: [
    {
      startTime: "09:00",
      endTime: "09:30",
      studentId: "1",
      mentorId: "m1"
    },
    {
      startTime: "09:30",
      endTime: "10:00", 
      studentId: "2",
      mentorId: "m1"
    }
  ]
};

export default function EventDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // TODO: Fetch event details from API using id
  const event = mockEvent;

  const formatStageOption = (option: string) => {
    return option
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="flex-1 space-y-6 p-8 pt-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push('/dashboard/events')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            {formatStageOption(event.stageOption)}
          </h2>
          <p className="text-muted-foreground">{event.schoolName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <EventDetails event={event} />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Schedule</h3>
            <TimeSlotScheduler
              students={event.students}
              timeSlots={event.timeSlots}
              onScheduleUpdate={() => {}}
            />
          </div>
        </div>

        <div>
          <QuickActions
            onEdit={() => {}}
            onManageAttendance={() => {}}
            onViewReports={() => {}}
            onCancel={() => {}}
          />
        </div>
      </div>
    </div>
  );
}