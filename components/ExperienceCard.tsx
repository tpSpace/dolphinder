"use client";

import { Experience } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Briefcase, Calendar } from "lucide-react";

interface ExperienceCardProps {
  experience: Experience;
}

export function ExperienceCard({ experience }: ExperienceCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Briefcase className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-lg">{experience.job_title}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {experience.company}
            </p>
            <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>
                {experience.start_date} - {experience.end_date || "Present"}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      {experience.description && (
        <CardContent>
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">
            {experience.description}
          </p>
        </CardContent>
      )}
    </Card>
  );
}
