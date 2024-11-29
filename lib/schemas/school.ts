import * as z from "zod";

export const schoolFormSchema = z.object({
  name: z.string().min(2, "School name must be at least 2 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  type: z.enum(["private", "state"], {
    required_error: "Please select a school type",
  }),
});

export type SchoolFormValues = z.infer<typeof schoolFormSchema>;