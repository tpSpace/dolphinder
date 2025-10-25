"use client";

import { useState } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ImageUpload } from "./ImageUpload";
import { useCreatePost, useProfile } from "@/lib/hooks/useProfile";
import { PlusCircle, X } from "lucide-react";

interface CreatePostFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
}

export function CreatePostForm({ onClose, onSuccess }: CreatePostFormProps) {
  const account = useCurrentAccount();
  const { data: profile } = useProfile(account?.address);
  const createPost = useCreatePost();

  const [content, setContent] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (url: string) => {
    setImageUrls((prev) => [...prev, url]);
  };

  const handleRemoveImage = (index: number) => {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!account || !profile || (!content.trim() && imageUrls.length === 0)) {
      return;
    }

    setIsSubmitting(true);

    try {
      await createPost.mutateAsync({
        profileId: profile.id,
        content: content.trim(),
        imageUrls,
      });

      setContent("");
      setImageUrls([]);

      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.error("Failed to create post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!account) {
    return (
      <Card className="border-0 shadow-none bg-muted/30">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground mb-4">
            Connect your wallet to create posts and share your achievements!
          </p>
          <Button>Connect Wallet</Button>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className="border-0 shadow-none bg-muted/30">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground mb-4">
            Create your profile first to start sharing posts!
          </p>
          <Button>Create Profile</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-none bg-muted/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Create New Post
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Profile Info */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-background">
          <Avatar className="h-10 w-10">
            <AvatarImage src={profile.avatarUrl} />
            <AvatarFallback>
              {profile.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold">{profile.name}</span>
              {profile.isVerified && (
                <Badge variant="secondary" className="text-xs">
                  ✓ Verified
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Share your achievements...
            </p>
          </div>
        </div>

        {/* Post Content */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              placeholder="What's your latest achievement? Share your progress, wins, or milestones..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] resize-none"
              maxLength={500}
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Share your development journey, projects, or insights</span>
              <span>{content.length}/500</span>
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <ImageUpload
              onChange={handleImageUpload}
              type="certificate"
              placeholder="Add images (optional)"
            />

            {/* Preview uploaded images */}
            {imageUrls.length > 0 && (
              <div className="grid grid-cols-2 gap-2">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={url}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2">
            {onClose && (
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={
                isSubmitting || (!content.trim() && imageUrls.length === 0)
              }
              className="min-w-[100px]"
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
