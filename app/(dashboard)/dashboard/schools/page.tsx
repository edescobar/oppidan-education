import { SchoolList } from "@/components/schools/school-list";

export default function SchoolsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Schools</h2>
      </div>
      <SchoolList />
    </div>
  );
}