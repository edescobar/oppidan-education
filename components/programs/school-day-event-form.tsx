"use client";

import { Button } from "@/components/ui/button";
import {
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
import { Trash2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { ProgramFormValues, stageOptions } from "@/lib/schemas/program";

interface SchoolDayEventFormProps {
  form: UseFormReturn<ProgramFormValues>;
  index: number;
  onRemove: () => void;
}

export function SchoolDayEventForm({ form, index, onRemove }: SchoolDayEventFormProps) {
  return (
    <div className="space-y-4 p-4 border rounded-lg relative">
      <div className="absolute right-4 top-4">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <h3 className="font-medium">School Day Event {index + 1}</h3>

      <FormField
        control={form.control}
        name={`schoolDayEvents.${index}.stageOption`}
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
                {stageOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
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
        name={`schoolDayEvents.${index}.type`}
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

      <FormField
        control={form.control}
        name={`schoolDayEvents.${index}.date`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
              <Input type="date" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`schoolDayEvents.${index}.cost`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cost</FormLabel>
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
        name={`schoolDayEvents.${index}.imageUrl`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image URL (Optional)</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}