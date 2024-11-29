"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { 
  programFormSchema, 
  type ProgramFormValues,
  journeyTypes,
  type SchoolDayEvent
} from "@/lib/schemas/program";
import { SchoolDayEventForm } from "./school-day-event-form";

// Mock schools data until we implement the API
const mockSchools = [
  { id: "1", name: "Lincoln High School" },
  { id: "2", name: "St. Mary's Academy" },
];

const defaultSchoolDayEvent: SchoolDayEvent = {
  stageOption: "readiness_day",
  type: "one_to_one",
  cost: 0,
  date: new Date().toISOString().split('T')[0],
};

export function ProgramForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProgramFormValues>({
    resolver: zodResolver(programFormSchema),
    defaultValues: {
      schoolId: "",
      academicYearStart: new Date().getFullYear(),
      academicYearEnd: new Date().getFullYear() + 1,
      journeyType: "prep_journey",
      yearGroup: "",
      numberOfStudents: 1,
      totalCost: 0,
      costPerDay: 0,
      costPerStudent: 0,
      generalInformation: "",
      schoolDayEvents: [defaultSchoolDayEvent],
    },
  });

  const { fields, append, remove } = form.control._formValues.schoolDayEvents 
    ? form.control._fields.schoolDayEvents
    : { fields: [], append: () => {}, remove: () => {} };

  async function onSubmit(values: ProgramFormValues) {
    setIsLoading(true);
    try {
      // TODO: Implement API call to create program
      console.log(values);
      router.push('/dashboard/programs');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <h3 className="text-lg font-medium">Program Details</h3>
          
          <FormField
            control={form.control}
            name="schoolId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>School</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a school" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mockSchools.map((school) => (
                      <SelectItem key={school.id} value={school.id}>
                        {school.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="academicYearStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academic Year Start</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={2000}
                      max={2100}
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="academicYearEnd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Academic Year End</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min={2000}
                      max={2100}
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="journeyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Journey Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select journey type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {journeyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yearGroup"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Year Group</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="numberOfStudents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Number of Students</FormLabel>
                <FormControl>
                  <Input 
                    type="number"
                    min={1}
                    {...field}
                    onChange={e => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormField
              control={form.control}
              name="totalCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Cost</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min={0}
                      step={0.01}
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="costPerDay"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost Per Day</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min={0}
                      step={0.01}
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="costPerStudent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost Per Student</FormLabel>
                  <FormControl>
                    <Input 
                      type="number"
                      min={0}
                      step={0.01}
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="generalInformation"
            render={({ field }) => (
              <FormItem>
                <FormLabel>General Information</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Enter any additional information about the program"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">School Day Events</h3>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => append(defaultSchoolDayEvent)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>

          <div className="space-y-4">
            {fields.map((field, index) => (
              <SchoolDayEventForm
                key={field.id}
                form={form}
                index={index}
                onRemove={() => remove(index)}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <Button 
            type="button" 
            variant="outline"
            onClick={() => router.push('/dashboard/programs')}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Program"}
          </Button>
        </div>
      </form>
    </Form>
  );
}