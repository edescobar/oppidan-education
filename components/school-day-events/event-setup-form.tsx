"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SchoolDayEvent, schoolDayEventSchema } from "@/lib/schemas/school-day-event";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CSVUpload } from "./csv-upload";
import { TimeSlotScheduler } from "./time-slot-scheduler";

export function EventSetupForm() {
  const form = useForm<SchoolDayEvent>({
    resolver: zodResolver(schoolDayEventSchema),
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      type: "one_to_one",
      stageOption: "readiness_day",
      timeSlots: [],
      students: [],
    },
  });

  const onSubmit = async (data: SchoolDayEvent) => {
    try {
      // TODO: Implement API call to save event
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="one_to_one">One to One</SelectItem>
                    <SelectItem value="group_day">Group Day</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="stageOption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stage Option</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="readiness_day">Readiness Day</SelectItem>
                  <SelectItem value="mentor_training_day">Mentor Training Day</SelectItem>
                  <SelectItem value="graduation_day">Graduation Day</SelectItem>
                  <SelectItem value="parent_launch_talk">Parent Launch Talk</SelectItem>
                  <SelectItem value="character_day">Character Day</SelectItem>
                  <SelectItem value="communication_day">Communication Day</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Student Attendance</h3>
          <CSVUpload
            onUpload={(students) => form.setValue("students", students)}
          />
        </div>

        {form.watch("students").length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Schedule</h3>
            <TimeSlotScheduler
              students={form.watch("students")}
              timeSlots={form.watch("timeSlots")}
              onScheduleUpdate={(timeSlots) => form.setValue("timeSlots", timeSlots)}
            />
          </div>
        )}

        <div className="flex justify-end">
          <Button type="submit">Create Event</Button>
        </div>
      </form>
    </Form>
  );
}