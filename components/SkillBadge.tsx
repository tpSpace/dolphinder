"use client";

import { Skill } from "@/lib/types";
import { Badge } from "./ui/badge";

interface SkillBadgeProps {
  skill: Skill;
}

export function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <Badge variant="secondary" className="text-sm py-1 px-3">
      {skill.name}
      {skill.endorsement_count > 0 && (
        <span className="ml-2 text-xs text-muted-foreground">
          ({skill.endorsement_count})
        </span>
      )}
    </Badge>
  );
}
