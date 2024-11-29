"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface SchoolDetailProps {
  schoolId: string | null;
  onClose: () => void;
}

export function SchoolDetail({ schoolId, onClose }: SchoolDetailProps) {
  if (!schoolId) return null;

  // TODO: Fetch school details from API
  const school = {
    id: schoolId,
    name: "Lincoln High School",
    address: "123 Education St, Portland, OR 97201",
    type: "state",
    created_at: "2024-01-01",
    updated_at: "2024-01-01"
  };

  return (
    <Sheet open={!!schoolId} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader className="flex flex-row items-center justify-between">
          <SheetTitle>{school.name}</SheetTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Address</h3>
            <p className="mt-1">{school.address}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Type</h3>
            <p className="mt-1 capitalize">{school.type}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Created</h3>
            <p className="mt-1">
              {new Date(school.created_at).toLocaleDateString()}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
            <p className="mt-1">
              {new Date(school.updated_at).toLocaleDateString()}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}