"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StudentAttendance } from "@/lib/schemas/school-day-event";

interface CSVUploadProps {
  onUpload: (students: StudentAttendance[]) => void;
}

export function CSVUpload({ onUpload }: CSVUploadProps) {
  const [error, setError] = useState<string>("");

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const rows = text.split("\n");
      const headers = rows[0].split(",");

      const students: StudentAttendance[] = rows.slice(1).map((row) => {
        const values = row.split(",");
        return {
          studentId: values[0],
          firstName: values[1],
          lastName: values[2],
          yearGroup: values[3],
          present: false,
        };
      });

      onUpload(students);
      setError("");
    } catch (err) {
      setError("Error parsing CSV file. Please check the format.");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="max-w-xs"
        />
        <Button variant="outline">Download Template</Button>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}