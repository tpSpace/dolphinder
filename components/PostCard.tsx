"use client";

import { useState } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Trash2, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post, Profile } from "@/lib/types";
import {
  useLikePost,
  useUnlikePost,
  useDeletePost,
  useProfile,
} from "@/lib/hooks/useProfile";
import { formatDistanceToNow } from "date-fns";

interface PostCardProps {
  post: Post;
  profile?: Profile;
  showProfileInfo?: boolean;
}

export function PostCard({
  post,
  profile,
  showProfileInfo = true,
}: PostCardProps) {
  const account = useCurrentAccount();
  const [isLiked, setIsLiked] = useState(post.isLikedByUser || false);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const likePost = useLikePost();
  const unlikePost = useUnlikePost();
  const deletePost = useDeletePost();
  const { data: authorProfile } = useProfile(post.author);

  const handleLike = async () => {
    if (!account || !profile) return;

    try {
      if (isLiked) {
        await unlikePost.mutateAsync({
          postId: post.id,
          profileId: profile.id,
        });
        setIsLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await likePost.mutateAsync({ postId: post.id, profileId: profile.id });
        setIsLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  };

  const handleDelete = async () => {
    if (!account) return;

    try {
      await deletePost.mutateAsync(post.id);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const displayProfile = profile || authorProfile;
  const timeAgo = formatDistanceToNow(new Date(Number(post.createdAt) * 1000), {
    addSuffix: true,
  });

  return (
    <Card className="border-0 shadow-none bg-muted/30">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {showProfileInfo && displayProfile && (
              <>
                <Avatar className="h-10 w-10">
                  <AvatarImage src={displayProfile.avatarUrl} />
                  <AvatarFallback>
                    {displayProfile.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{displayProfile.name}</span>
                    {displayProfile.isVerified && (
                      <Badge variant="secondary" className="text-xs">
                        ✓
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{timeAgo}</p>
                </div>
              </>
            )}
          </div>

          {account && post.author === account.address && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-destructive"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Post
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Post Content */}
        {post.content && (
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        )}

        {/* Post Images */}
        {post.imageUrls.length > 0 && (
          <div className="grid gap-2">
            {post.imageUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Post image ${index + 1}`}
                className="w-full max-h-96 object-cover rounded-lg"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ))}
          </div>
        )}

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4">
            {/* Like Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={!account}
              className={`flex items-center gap-2 ${
                isLiked
                  ? "text-red-500 hover:text-red-600"
                  : "text-muted-foreground hover:text-red-500"
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              <span>{likeCount}</span>
            </Button>

            {/* Comment Button */}
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-muted-foreground"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{post.commentCount}</span>
            </Button>
          </div>

          {/* Share Button */}
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
