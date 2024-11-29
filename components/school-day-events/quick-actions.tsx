"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface QuickActionsProps {
  onEdit: () => void;
  onManageAttendance: () => void;
  onViewReports: () => void;
  onCancel: () => void;
}

export function QuickActions({
  onEdit,
  onManageAttendance,
  onViewReports,
  onCancel,
}: QuickActionsProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <Button className="w-full" variant="outline" onClick={onEdit}>
          Edit Event
        </Button>
        <Button className="w-full" variant="outline" onClick={onManageAttendance}>
          Manage Attendance
        </Button>
        <Button className="w-full" variant="outline" onClick={onViewReports}>
          View Reports
        </Button>
        <Button className="w-full" variant="destructive" onClick={onCancel}>
          Cancel Event
        </Button>
      </div>
    </Card>
  );
}