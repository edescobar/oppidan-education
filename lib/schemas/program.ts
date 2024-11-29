import * as z from "zod";

export const schoolDayEventSchema = z.object({
  stageOption: z.enum([
    'readiness_day',
    'oppidan_journey_pillar',
    'progress_update_talk',
    'mentor_training_day',
    'financial_literacy_course',
    'korean_after_school_club',
    'character_education_course',
    'parent_launch_talk',
    'launch_day',
    'character_day',
    'teacher_talk',
    'graduation_day',
    'careers_interview',
    'interview_masterclass',
    'communication_day',
    'oracy_day'
  ], {
    required_error: "Please select a stage option",
  }),
  type: z.enum(['one_to_one', 'group_day'], {
    required_error: "Please select an event type",
  }),
  imageUrl: z.string().optional(),
  cost: z.number().min(0, "Cost cannot be negative"),
  date: z.string().min(1, "Date is required"),
});

export const programFormSchema = z.object({
  schoolId: z.string().min(1, "Please select a school"),
  academicYearStart: z.number().min(2000).max(2100),
  academicYearEnd: z.number().min(2000).max(2100),
  journeyType: z.enum([
    'prep_journey',
    'prep_standalone',
    'secondary_journey',
    'secondary_standalone',
    'bespoke'
  ], {
    required_error: "Please select a journey type",
  }),
  yearGroup: z.string().min(1, "Year group is required"),
  numberOfStudents: z.number().min(1, "Must have at least 1 student"),
  totalCost: z.number().min(0, "Total cost cannot be negative"),
  costPerDay: z.number().min(0, "Cost per day cannot be negative"),
  costPerStudent: z.number().min(0, "Cost per student cannot be negative"),
  generalInformation: z.string(),
  schoolDayEvents: z.array(schoolDayEventSchema).min(1, "At least one school day event is required"),
});

export type SchoolDayEvent = z.infer<typeof schoolDayEventSchema>;
export type ProgramFormValues = z.infer<typeof programFormSchema>;

export const stageOptions = [
  { label: "Readiness Day", value: "readiness_day" },
  { label: "Oppidan Journey Pillar", value: "oppidan_journey_pillar" },
  { label: "Progress Update Talk", value: "progress_update_talk" },
  { label: "Mentor Training Day", value: "mentor_training_day" },
  { label: "Financial Literacy Course", value: "financial_literacy_course" },
  { label: "Korean After School Club", value: "korean_after_school_club" },
  { label: "Character Education Course", value: "character_education_course" },
  { label: "Parent Launch Talk", value: "parent_launch_talk" },
  { label: "Launch Day", value: "launch_day" },
  { label: "Character Day", value: "character_day" },
  { label: "Teacher Talk", value: "teacher_talk" },
  { label: "Graduation Day", value: "graduation_day" },
  { label: "Careers Interview", value: "careers_interview" },
  { label: "Interview Masterclass", value: "interview_masterclass" },
  { label: "Communication Day", value: "communication_day" },
  { label: "Oracy Day", value: "oracy_day" },
] as const;

export const journeyTypes = [
  { label: "Prep Journey", value: "prep_journey" },
  { label: "Prep Standalone", value: "prep_standalone" },
  { label: "Secondary Journey", value: "secondary_journey" },
  { label: "Secondary Standalone", value: "secondary_standalone" },
  { label: "Bespoke", value: "bespoke" },
] as const;