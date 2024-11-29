"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { ProgramCard } from "./program-card";

// Temporary type until we implement the API
type Program = {
  id: string;
  name: string;
  schoolName: string;
  startDate: string;
  endDate: string;
  maxStudents: number;
  cost: number;
  status: 'active' | 'completed' | 'cancelled';
};

// Temporary data until we implement the API
const mockPrograms: Program[] = [
  {
    id: "1",
    name: "SAT Prep Course",
    schoolName: "Lincoln High School",
    startDate: "2024-02-01",
    endDate: "2024-05-01",
    maxStudents: 25,
    cost: 1200,
    status: "active",
  },
  {
    id: "2",
    name: "College Essay Workshop",
    schoolName: "St. Mary's Academy",
    startDate: "2024-03-15",
    endDate: "2024-04-15",
    maxStudents: 15,
    cost: 800,
    status: "completed",
  },
];

export function ProgramList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPrograms = mockPrograms.filter(program =>
    program.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    program.schoolName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProgramClick = (id: string) => {
    router.push(`/dashboard/programs/${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search programs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={() => router.push('/dashboard/programs/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Program
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPrograms.map((program) => (
          <ProgramCard
            key={program.id}
            {...program}
            onClick={handleProgramClick}
          />
        ))}
      </div>
    </div>
  );
}