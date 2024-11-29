"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, DollarSign, School2, Users } from "lucide-react";
import { ProgramDayEventCard } from "@/components/programs/program-day-event-card";

// Temporary mock data until we implement the API
const mockProgram = {
  id: "1",
  name: "SAT Prep Course",
  schoolName: "Lincoln High School",
  academicYearStart: 2024,
  academicYearEnd: 2025,
  journeyType: "prep_journey",
  yearGroup: "Year 11",
  numberOfStudents: 25,
  totalCost: 12000,
  costPerDay: 800,
  costPerStudent: 480,
  status: "active",
  generalInformation: "Comprehensive SAT preparation program designed to help students achieve their best possible scores. Includes practice tests, study materials, and personalized feedback.",
  schoolDayEvents: [
    {
      id: "1",
      stageOption: "readiness_day",
      type: "group_day",
      date: "2024-02-01",
      cost: 1000,
      imageUrl: "/images/readiness-day.jpg"
    },
    {
      id: "2",
      stageOption: "mentor_training_day",
      type: "one_to_one",
      date: "2024-02-15",
      cost: 800,
    },
    {
      id: "3",
      stageOption: "graduation_day",
      type: "group_day",
      date: "2024-05-01",
      cost: 1200,
      imageUrl: "/images/graduation.jpg"
    }
  ]
};

export default function ProgramDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  // TODO: Fetch program details from API using id
  const program = mockProgram;

  const statusColors = {
    active: "bg-green-100 text-green-800",
    completed: "bg-blue-100 text-blue-800",
    cancelled: "bg-red-100 text-red-800",
  };

  const formatJourneyType = (type: string) => {
    return type
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
          onClick={() => router.push('/dashboard/programs')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{program.name}</h2>
          <p className="text-muted-foreground">{program.schoolName}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Program Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Academic Year</h4>
                  <p>{program.academicYearStart} - {program.academicYearEnd}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Journey Type</h4>
                  <p>{formatJourneyType(program.journeyType)}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Year Group</h4>
                  <p>{program.yearGroup}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Status</h4>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                    statusColors[program.status as keyof typeof statusColors]
                  }`}>
                    {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Number of Students</h4>
                  <p>{program.numberOfStudents}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Total Cost</h4>
                  <p>${program.totalCost.toLocaleString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Cost per Day</h4>
                  <p>${program.costPerDay.toLocaleString()}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground">Cost per Student</h4>
                  <p>${program.costPerStudent.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </Card>

          {program.generalInformation && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">General Information</h3>
              <p className="text-muted-foreground whitespace-pre-line">
                {program.generalInformation}
              </p>
            </Card>
          )}

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">School Day Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {program.schoolDayEvents.map((event) => (
                <ProgramDayEventCard
                  key={event.id}
                  {...event}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button className="w-full" variant="outline">
                Edit Program
              </Button>
              <Button className="w-full" variant="outline">
                Manage Students
              </Button>
              <Button className="w-full" variant="outline">
                View Reports
              </Button>
              <Button className="w-full" variant="destructive">
                Cancel Program
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}