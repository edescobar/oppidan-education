import { EventSetupForm } from "@/components/school-day-events/event-setup-form";

export default function NewEventPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Create New Event</h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <div className="p-6 bg-white rounded-lg shadow">
          <EventSetupForm />
        </div>
      </div>
    </div>
  );
}