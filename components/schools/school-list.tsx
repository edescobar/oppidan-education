"use client";

import { useState } from "react";
import { SchoolCard } from "./school-card";
import { SchoolDetail } from "./school-detail";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";

// Temporary type until we implement the API
type School = {
  id: string;
  name: string;
  address: string;
  type: 'private' | 'state';
  created_at: string;
  updated_at: string;
};

// Temporary data until we implement the API
const mockSchools: School[] = [
  {
    id: "1",
    name: "Lincoln High School",
    address: "123 Education St, Portland, OR 97201",
    type: "state",
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  },
  {
    id: "2",
    name: "St. Mary's Academy",
    address: "456 Learning Ave, Portland, OR 97202",
    type: "private",
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  }
];

export function SchoolList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSchoolId, setSelectedSchoolId] = useState<string | null>(null);

  const filteredSchools = mockSchools.filter(school =>
    school.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSchoolClick = (id: string) => {
    setSelectedSchoolId(id);
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search schools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button onClick={() => router.push('/dashboard/schools/new')}>
            <Plus className="h-4 w-4 mr-2" />
            Add School
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchools.map((school) => (
            <SchoolCard
              key={school.id}
              {...school}
              onClick={handleSchoolClick}
            />
          ))}
        </div>
      </div>

      <SchoolDetail 
        schoolId={selectedSchoolId} 
        onClose={() => setSelectedSchoolId(null)}
      />
    </>
  );
}