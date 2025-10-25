"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentAccount } from "@mysten/dapp-kit";
import {
  useProfile,
  useCreateProfile,
  useUpdateProfile,
  useAddExperience,
  useAddEducation,
  useAddCertificate,
  useAddSkill,
} from "@/lib/hooks/useProfile";
import { WalletConnect } from "@/components/WalletConnect";
import { ImageUpload } from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function EditProfilePage() {
  const router = useRouter();
  const account = useCurrentAccount();
  const { data: profile, isLoading } = useProfile(account?.address);

  const createProfile = useCreateProfile();
  const updateProfile = useUpdateProfile();
  const addExperience = useAddExperience();
  const addEducation = useAddEducation();
  const addCertificate = useAddCertificate();
  const addSkill = useAddSkill();

  // Profile form state
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [socialLinks, setSocialLinks] = useState<string[]>([]);

  // Experience form state
  const [showExpDialog, setShowExpDialog] = useState(false);
  const [expJobTitle, setExpJobTitle] = useState("");
  const [expCompany, setExpCompany] = useState("");
  const [expStartDate, setExpStartDate] = useState("");
  const [expEndDate, setExpEndDate] = useState("");
  const [expDescription, setExpDescription] = useState("");

  // Education form state
  const [showEduDialog, setShowEduDialog] = useState(false);
  const [eduSchool, setEduSchool] = useState("");
  const [eduDegree, setEduDegree] = useState("");
  const [eduField, setEduField] = useState("");
  const [eduStartDate, setEduStartDate] = useState("");
  const [eduEndDate, setEduEndDate] = useState("");

  // Certificate form state
  const [showCertDialog, setShowCertDialog] = useState(false);
  const [certName, setCertName] = useState("");
  const [certIssuer, setCertIssuer] = useState("");
  const [certDate, setCertDate] = useState("");
  const [certUrl, setCertUrl] = useState("");

  // Skill form state
  const [showSkillDialog, setShowSkillDialog] = useState(false);
  const [skillName, setSkillName] = useState("");

  const [isSaving, setIsSaving] = useState(false);

  // Load profile data
  useEffect(() => {
    if (profile) {
      setName(profile.name);
      setBio(profile.bio);
      setAvatarUrl(profile.avatarUrl);
      setBannerUrl(profile.bannerUrl);
      setSocialLinks(profile.socialLinks || []);
    }
  }, [profile]);

  if (!account) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Connect Wallet</h1>
        <p className="text-muted-foreground">
          Please connect your wallet to edit your profile.
        </p>
        <WalletConnect />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      if (profile) {
        await updateProfile.mutateAsync({
          profileId: profile.id,
          name,
          bio,
          avatarUrl,
          bannerUrl,
        });
      } else {
        await createProfile.mutateAsync({
          name,
          bio,
          avatarUrl,
          bannerUrl,
        });
      }
      router.push(`/profile/${account.address}`);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddExperience = async () => {
    if (!profile) {
      alert("Please create your profile first");
      return;
    }

    try {
      await addExperience.mutateAsync({
        profileId: profile.id,
        jobTitle: expJobTitle,
        company: expCompany,
        startDate: expStartDate,
        endDate: expEndDate,
        description: expDescription,
        orderIndex: profile.experienceCount,
      });

      // Reset form
      setExpJobTitle("");
      setExpCompany("");
      setExpStartDate("");
      setExpEndDate("");
      setExpDescription("");
      setShowExpDialog(false);
    } catch (error) {
      console.error("Error adding experience:", error);
      alert("Failed to add experience. Please try again.");
    }
  };

  const handleAddEducation = async () => {
    if (!profile) {
      alert("Please create your profile first");
      return;
    }

    try {
      await addEducation.mutateAsync({
        profileId: profile.id,
        school: eduSchool,
        degree: eduDegree,
        fieldOfStudy: eduField,
        startDate: eduStartDate,
        endDate: eduEndDate,
        orderIndex: profile.educationCount,
      });

      // Reset form
      setEduSchool("");
      setEduDegree("");
      setEduField("");
      setEduStartDate("");
      setEduEndDate("");
      setShowEduDialog(false);
    } catch (error) {
      console.error("Error adding education:", error);
      alert("Failed to add education. Please try again.");
    }
  };

  const handleAddCertificate = async () => {
    if (!profile) {
      alert("Please create your profile first");
      return;
    }

    try {
      await addCertificate.mutateAsync({
        profileId: profile.id,
        name: certName,
        issuer: certIssuer,
        issueDate: certDate,
        certificateUrl: certUrl,
        orderIndex: profile.certificateCount,
      });

      // Reset form
      setCertName("");
      setCertIssuer("");
      setCertDate("");
      setCertUrl("");
      setShowCertDialog(false);
    } catch (error) {
      console.error("Error adding certificate:", error);
      alert("Failed to add certificate. Please try again.");
    }
  };

  const handleAddSkill = async () => {
    if (!profile) {
      alert("Please create your profile first");
      return;
    }

    try {
      await addSkill.mutateAsync({
        profileId: profile.id,
        skillName,
      });

      // Reset form
      setSkillName("");
      setShowSkillDialog(false);
    } catch (error) {
      console.error("Error adding skill:", error);
      alert("Failed to add skill. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href={profile ? `/profile/${account.address}` : "/"}>
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">
              {profile ? "Edit Profile" : "Create Profile"}
            </h1>
          </div>
          <WalletConnect />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="experience" disabled={!profile}>
              Experience
            </TabsTrigger>
            <TabsTrigger value="education" disabled={!profile}>
              Education
            </TabsTrigger>
            <TabsTrigger value="certificates" disabled={!profile}>
              Certificates
            </TabsTrigger>
            <TabsTrigger value="skills" disabled={!profile}>
              Skills
            </TabsTrigger>
          </TabsList>

          {/* Basic Info Tab */}
          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Update your profile information and images
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Upload */}
                <div>
                  <Label>Profile Picture</Label>
                  <div className="mt-2">
                    <ImageUpload
                      type="avatar"
                      value={avatarUrl}
                      onChange={setAvatarUrl}
                    />
                  </div>
                </div>

                <Separator />

                {/* Banner Upload */}
                <div>
                  <Label>Profile Banner</Label>
                  <div className="mt-2">
                    <ImageUpload
                      type="banner"
                      value={bannerUrl}
                      onChange={setBannerUrl}
                    />
                  </div>
                </div>

                <Separator />

                {/* Name */}
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>

                {/* Social Links */}
                <div>
                  <Label>Social Links</Label>
                  <div className="space-y-2 mt-2">
                    {socialLinks.map((link, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={link}
                          onChange={(e) => {
                            const newLinks = [...socialLinks];
                            newLinks[index] = e.target.value;
                            setSocialLinks(newLinks);
                          }}
                          placeholder="https://..."
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setSocialLinks(
                              socialLinks.filter((_, i) => i !== index)
                            );
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSocialLinks([...socialLinks, ""])}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Social Link
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={handleSaveProfile}
                  disabled={isSaving || !name}
                  className="w-full"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : profile ? (
                    "Save Changes"
                  ) : (
                    "Create Profile"
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Work Experience</CardTitle>
                    <CardDescription>Add your work experience</CardDescription>
                  </div>
                  <Dialog open={showExpDialog} onOpenChange={setShowExpDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add Work Experience</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="exp-job-title">Job Title *</Label>
                          <Input
                            id="exp-job-title"
                            value={expJobTitle}
                            onChange={(e) => setExpJobTitle(e.target.value)}
                            placeholder="e.g. Software Engineer"
                          />
                        </div>
                        <div>
                          <Label htmlFor="exp-company">Company *</Label>
                          <Input
                            id="exp-company"
                            value={expCompany}
                            onChange={(e) => setExpCompany(e.target.value)}
                            placeholder="e.g. Tech Corp"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="exp-start">Start Date</Label>
                            <Input
                              id="exp-start"
                              value={expStartDate}
                              onChange={(e) => setExpStartDate(e.target.value)}
                              placeholder="e.g. Jan 2020"
                            />
                          </div>
                          <div>
                            <Label htmlFor="exp-end">End Date</Label>
                            <Input
                              id="exp-end"
                              value={expEndDate}
                              onChange={(e) => setExpEndDate(e.target.value)}
                              placeholder="e.g. Present"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="exp-desc">Description</Label>
                          <Textarea
                            id="exp-desc"
                            value={expDescription}
                            onChange={(e) => setExpDescription(e.target.value)}
                            placeholder="Describe your role and achievements..."
                            rows={4}
                          />
                        </div>
                        <Button
                          onClick={handleAddExperience}
                          disabled={
                            !expJobTitle ||
                            !expCompany ||
                            addExperience.isPending
                          }
                          className="w-full"
                        >
                          {addExperience.isPending ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            "Add Experience"
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Click "Add Experience" to add your work history to your
                  profile.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Education Tab */}
          <TabsContent value="education">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Education</CardTitle>
                    <CardDescription>
                      Add your education background
                    </CardDescription>
                  </div>
                  <Dialog open={showEduDialog} onOpenChange={setShowEduDialog}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add Education</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="edu-school">School *</Label>
                          <Input
                            id="edu-school"
                            value={eduSchool}
                            onChange={(e) => setEduSchool(e.target.value)}
                            placeholder="e.g. Stanford University"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edu-degree">Degree *</Label>
                          <Input
                            id="edu-degree"
                            value={eduDegree}
                            onChange={(e) => setEduDegree(e.target.value)}
                            placeholder="e.g. Bachelor's"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edu-field">Field of Study *</Label>
                          <Input
                            id="edu-field"
                            value={eduField}
                            onChange={(e) => setEduField(e.target.value)}
                            placeholder="e.g. Computer Science"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="edu-start">Start Date</Label>
                            <Input
                              id="edu-start"
                              value={eduStartDate}
                              onChange={(e) => setEduStartDate(e.target.value)}
                              placeholder="e.g. 2018"
                            />
                          </div>
                          <div>
                            <Label htmlFor="edu-end">End Date</Label>
                            <Input
                              id="edu-end"
                              value={eduEndDate}
                              onChange={(e) => setEduEndDate(e.target.value)}
                              placeholder="e.g. 2022"
                            />
                          </div>
                        </div>
                        <Button
                          onClick={handleAddEducation}
                          disabled={
                            !eduSchool ||
                            !eduDegree ||
                            !eduField ||
                            addEducation.isPending
                          }
                          className="w-full"
                        >
                          {addEducation.isPending ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            "Add Education"
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Click "Add Education" to add your educational background.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Certificates</CardTitle>
                    <CardDescription>
                      Add your certificates and achievements
                    </CardDescription>
                  </div>
                  <Dialog
                    open={showCertDialog}
                    onOpenChange={setShowCertDialog}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Certificate
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Add Certificate</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cert-name">Certificate Name *</Label>
                          <Input
                            id="cert-name"
                            value={certName}
                            onChange={(e) => setCertName(e.target.value)}
                            placeholder="e.g. AWS Certified Solutions Architect"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cert-issuer">Issuer *</Label>
                          <Input
                            id="cert-issuer"
                            value={certIssuer}
                            onChange={(e) => setCertIssuer(e.target.value)}
                            placeholder="e.g. Amazon Web Services"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cert-date">Issue Date</Label>
                          <Input
                            id="cert-date"
                            value={certDate}
                            onChange={(e) => setCertDate(e.target.value)}
                            placeholder="e.g. Dec 2023"
                          />
                        </div>
                        <div>
                          <Label>Certificate Image (optional)</Label>
                          <div className="mt-2">
                            <ImageUpload
                              type="certificate"
                              value={certUrl}
                              onChange={setCertUrl}
                              placeholder="Upload certificate image"
                            />
                          </div>
                        </div>
                        <Button
                          onClick={handleAddCertificate}
                          disabled={
                            !certName || !certIssuer || addCertificate.isPending
                          }
                          className="w-full"
                        >
                          {addCertificate.isPending ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            "Add Certificate"
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Click "Add Certificate" to showcase your certifications.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Skills</CardTitle>
                    <CardDescription>
                      Add your skills and expertise
                    </CardDescription>
                  </div>
                  <Dialog
                    open={showSkillDialog}
                    onOpenChange={setShowSkillDialog}
                  >
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Skill</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="skill-name">Skill Name *</Label>
                          <Input
                            id="skill-name"
                            value={skillName}
                            onChange={(e) => setSkillName(e.target.value)}
                            placeholder="e.g. React, Move, Blockchain"
                          />
                        </div>
                        <Button
                          onClick={handleAddSkill}
                          disabled={!skillName || addSkill.isPending}
                          className="w-full"
                        >
                          {addSkill.isPending ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Adding...
                            </>
                          ) : (
                            "Add Skill"
                          )}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Click "Add Skill" to list your technical and professional
                  skills.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
