import { Calendar, Users, School } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EventCardProps {
  id: string;
  date: string;
  type: 'one_to_one' | 'group_day';
  stageOption: string;
  schoolName: string;
  studentsCount: number;
  status: 'scheduled' | 'in_progress' | 'completed';
  onClick: (id: string) => void;
}

export function EventCard({
  id,
  date,
  type,
  stageOption,
  schoolName,
  studentsCount,
  status,
  onClick
}: EventCardProps) {
  const statusColors = {
    scheduled: "bg-blue-100 text-blue-800",
    in_progress: "bg-yellow-100 text-yellow-800",
    completed: "bg-green-100 text-green-800",
  };

  const formatStageOption = (option: string) => {
    return option
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(id)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex flex-col gap-1">
          <span>{formatStageOption(stageOption)}</span>
          <span className="text-sm font-normal text-muted-foreground">{schoolName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>{studentsCount} students</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <School className="h-4 w-4" />
            <span className="capitalize">{type.replace('_', ' ')}</span>
          </div>
          <div className="pt-2">
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColors[status]}`}>
              {status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' ')}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}