"use client";

import { useParams } from "next/navigation";
import { useCurrentAccount } from "@mysten/dapp-kit";
import {
  useProfile,
  useProfileExperiences,
  useProfileEducation,
  useProfileCertificates,
} from "@/lib/hooks/useProfile";
import { ProfileCard } from "@/components/ProfileCard";
import { ExperienceCard } from "@/components/ExperienceCard";
import { EducationCard } from "@/components/EducationCard";
import { CertificateCard } from "@/components/CertificateCard";
import { SkillBadge } from "@/components/SkillBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { WalletConnect } from "@/components/WalletConnect";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
  const params = useParams();
  const address = params.address as string;
  const currentAccount = useCurrentAccount();

  const { data: profile, isLoading } = useProfile(address);
  const { data: experiences = [] } = useProfileExperiences(
    profile?.id,
    profile?.experienceCount
  );
  const { data: education = [] } = useProfileEducation(
    profile?.id,
    profile?.educationCount
  );
  const { data: certificates = [] } = useProfileCertificates(
    profile?.id,
    profile?.certificateCount
  );

  const isOwner = currentAccount?.address === address;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Profile not found</h1>
        <p className="text-muted-foreground">
          This user hasn't created a profile yet.
        </p>
        {isOwner && (
          <Link href="/profile/edit">
            <Button>Create Profile</Button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <h1 className="text-2xl font-bold">Dolphinder</h1>
          </Link>
          <WalletConnect />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Profile Header */}
        <ProfileCard profile={profile} isOwner={isOwner} />

        <Separator className="my-8" />

        {/* Profile Content Tabs */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="certificates">Certificates</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-6">
            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill: any, index: number) => (
                      <SkillBadge key={index} skill={skill} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Profile Info */}
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <p className="text-sm font-medium">Wallet Address</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {address}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Profile ID</p>
                  <p className="text-sm text-muted-foreground font-mono">
                    {profile.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Member Since</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(parseInt(profile.createdAt)).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-4">
            {experiences.length > 0 ? (
              experiences.map((exp) => (
                <ExperienceCard key={exp.id} experience={exp} />
              ))
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No work experience added yet.
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education" className="space-y-4">
            {education.length > 0 ? (
              education.map((edu) => (
                <EducationCard key={edu.id} education={edu} />
              ))
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No education added yet.
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="space-y-4">
            {certificates.length > 0 ? (
              certificates.map((cert) => (
                <CertificateCard key={cert.id} certificate={cert} />
              ))
            ) : (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  No certificates added yet.
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
