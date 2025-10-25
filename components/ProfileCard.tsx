"use client";

import { Profile } from "@/lib/types";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { CheckCircle2, Edit } from "lucide-react";
import Link from "next/link";

interface ProfileCardProps {
  profile: Profile;
  isOwner?: boolean;
}

export function ProfileCard({ profile, isOwner }: ProfileCardProps) {
  return (
    <Card className="overflow-hidden">
      {/* Banner */}
      <div className="h-32 bg-linear-to-r from-blue-500 to-purple-600 relative">
        {profile.bannerUrl && (
          <img
            src={profile.bannerUrl}
            alt="Profile banner"
            className="w-full h-full object-cover"
          />
        )}
      </div>

      <CardContent className="pt-0">
        {/* Avatar and Header */}
        <div className="flex justify-between items-start -mt-16 mb-4">
          <Avatar className="h-32 w-32 border-4 border-background">
            <AvatarImage src={profile.avatarUrl} alt={profile.name} />
            <AvatarFallback className="text-4xl">
              {profile.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          {isOwner && (
            <Link href="/profile/edit">
              <Button variant="outline" size="sm" className="mt-4">
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </Link>
          )}
        </div>

        {/* Name and Verification */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            {profile.isVerified && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4" />
                Verified
              </Badge>
            )}
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="text-muted-foreground text-lg">{profile.bio}</p>
          )}

          {/* Social Links */}
          {profile.socialLinks && profile.socialLinks.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {profile.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {new URL(link).hostname}
                </a>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
