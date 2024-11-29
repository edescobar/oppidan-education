import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const activities = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    action: "Created new program",
    program: "SAT Prep Course",
    time: "2 hours ago",
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    action: "Updated school details",
    program: "Lincoln High School",
    time: "4 hours ago",
  },
  {
    name: "Michael Brown",
    email: "m.brown@example.com",
    action: "Added new student",
    program: "ACT Prep Program",
    time: "5 hours ago",
  },
  {
    name: "Emily Davis",
    email: "emily.d@example.com",
    action: "Modified schedule",
    program: "College Essay Workshop",
    time: "6 hours ago",
  },
];

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity, index) => (
        <div key={index} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${index + 1}.png`} alt="Avatar" />
            <AvatarFallback>
              {activity.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{activity.name}</p>
            <p className="text-sm text-muted-foreground">
              {activity.action}: <strong>{activity.program}</strong>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}