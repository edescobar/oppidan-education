import { ProgramForm } from "@/components/programs/program-form";

export default function NewProgramPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Create New Program</h2>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <div className="p-6 bg-white rounded-lg shadow">
          <ProgramForm />
        </div>
      </div>
    </div>
  );
}