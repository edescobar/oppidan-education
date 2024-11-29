import * as z from "zod";

export const timeSlotSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
  studentId: z.string(),
  mentorId: z.string().optional(),
});

export const studentAttendanceSchema = z.object({
  studentId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  yearGroup: z.string(),
  present: z.boolean().default(false),
});

export const schoolDayEventSchema = z.object({
  date: z.string(),
  type: z.enum(["one_to_one", "group_day"]),
  stageOption: z.enum([
    "readiness_day",
    "mentor_training_day",
    "graduation_day",
    "parent_launch_talk",
    "character_day",
    "communication_day",
  ]),
  timeSlots: z.array(timeSlotSchema),
  students: z.array(studentAttendanceSchema),
  csvFile: z.any().optional(),
});

export type TimeSlot = z.infer<typeof timeSlotSchema>;
export type StudentAttendance = z.infer<typeof studentAttendanceSchema>;
export type SchoolDayEvent = z.infer<typeof schoolDayEventSchema>;