"use client";

import { useState } from "react";
import { TimeSlot, StudentAttendance } from "@/lib/schemas/school-day-event";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TimeSlotSchedulerProps {
  students: StudentAttendance[];
  timeSlots: TimeSlot[];
  onScheduleUpdate: (timeSlots: TimeSlot[]) => void;
}

export function TimeSlotScheduler({
  students,
  timeSlots,
  onScheduleUpdate,
}: TimeSlotSchedulerProps) {
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);

  const handleStudentAssignment = (studentId: string, slotIndex: number) => {
    const updatedTimeSlots = [...timeSlots];
    updatedTimeSlots[slotIndex] = {
      ...updatedTimeSlots[slotIndex],
      studentId,
    };
    onScheduleUpdate(updatedTimeSlots);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {timeSlots.map((slot, index) => (
          <div
            key={index}
            className="p-4 border rounded-lg space-y-3 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center">
              <p className="font-medium">
                {slot.startTime} - {slot.endTime}
              </p>
            </div>
            <Select
              value={slot.studentId}
              onValueChange={(value) => handleStudentAssignment(value, index)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem
                    key={student.studentId}
                    value={student.studentId}
                  >
                    {student.firstName} {student.lastName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
}