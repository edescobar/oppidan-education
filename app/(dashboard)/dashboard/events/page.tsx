"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { EventCard } from "@/components/school-day-events/event-card";

// Temporary type until we implement the API
type Event = {
  id: string;
  date: string;
  type: 'one_to_one' | 'group_day';
  stageOption: string;
  schoolName: string;
  studentsCount: number;
  status: 'scheduled' | 'in_progress' | 'completed';
};

// Temporary data until we implement the API
const mockEvents: Event[] = [
  {
    id: "1",
    date: "2024-02-15",
    type: "one_to_one",
    stageOption: "readiness_day",
    schoolName: "Lincoln High School",
    studentsCount: 25,
    status: "scheduled",
  },
  {
    id: "2",
    date: "2024-02-20",
    type: "group_day",
    stageOption: "character_day",
    schoolName: "St. Mary's Academy",
    studentsCount: 30,
    status: "in_progress",
  },
];

export default function EventsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = mockEvents.filter(event =>
    event.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.stageOption.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEventClick = (id: string) => {
    router.push(`/dashboard/events/${id}`);
  };

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => router.push('/dashboard/events/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            {...event}
            onClick={handleEventClick}
          />
        ))}
      </div>
    </div>
  );
}