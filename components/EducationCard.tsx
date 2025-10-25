"use client";

import { Education } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { GraduationCap, Calendar } from "lucide-react";

interface EducationCardProps {
  education: Education;
}

export function EducationCard({ education }: EducationCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{education.school}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {education.degree} - {education.field_of_study}
            </p>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {education.start_date} - {education.end_date || "Present"}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}
