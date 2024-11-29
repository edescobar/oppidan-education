"use client";

import { Building2, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SchoolCardProps {
  id: string;
  name: string;
  address: string;
  type: 'private' | 'state';
  onClick: (id: string) => void;
}

export function SchoolCard({ id, name, address, type, onClick }: SchoolCardProps) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(id)}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-oppidan-navy" />
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 mt-1" />
          <p className="text-sm">{address}</p>
        </div>
        <div className="mt-4">
          <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
            type === 'private' ? 'bg-oppidan-orange/10 text-oppidan-orange' : 'bg-oppidan-blue/10 text-oppidan-blue'
          }`}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}