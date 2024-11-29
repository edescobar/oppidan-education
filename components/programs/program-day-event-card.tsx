"use client";

import { Card } from "@/components/ui/card";
import { Calendar, Users } from "lucide-react";

interface ProgramDayEventCardProps {
  stageOption: string;
  type: 'one_to_one' | 'group_day';
  date: string;
  cost: number;
  imageUrl?: string;
}

export function ProgramDayEventCard({
  stageOption,
  type,
  date,
  cost,
  imageUrl
}: ProgramDayEventCardProps) {
  const formatStageOption = (option: string) => {
    return option
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="aspect-video relative rounded-md overflow-hidden bg-muted">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={formatStageOption(stageOption)}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-oppidan-navy/5">
            <span className="text-oppidan-navy/50">No image available</span>
          </div>
        )}
      </div>

      <div>
        <h4 className="font-semibold">{formatStageOption(stageOption)}</h4>
        <div className="mt-2 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span className="capitalize">{type.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="text-sm font-medium">
            ${cost.toLocaleString()}
          </div>
        </div>
      </div>
    </Card>
  );
}