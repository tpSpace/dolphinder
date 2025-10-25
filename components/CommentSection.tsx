"use client";

import { useState } from "react";
import { useCurrentAccount } from "@mysten/dapp-kit";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Send } from "lucide-react";
import { useAddComment, useProfile } from "@/lib/hooks/useProfile";
import { Comment } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

interface CommentSectionProps {
  postId: string;
  profileId: string;
  comments: Comment[];
  commentCount: number;
}

export function CommentSection({
  postId,
  profileId,
  comments,
  commentCount,
}: CommentSectionProps) {
  const account = useCurrentAccount();
  const { data: userProfile } = useProfile(account?.address);
  const addComment = useAddComment();

  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!account || !userProfile || !newComment.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await addComment.mutateAsync({
        postId,
        profileId,
        content: newComment.trim(),
      });

      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!account) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MessageCircle className="h-4 w-4" />
          <span>{commentCount} comments</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Connect your wallet to join the conversation!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Comment Count */}
      <div className="flex items-center gap-2 text-muted-foreground">
        <MessageCircle className="h-4 w-4" />
        <span>{commentCount} comments</span>
      </div>

      {/* Add Comment Form */}
      {userProfile && (
        <Card className="border-0 shadow-none bg-background">
          <CardContent className="p-4">
            <form onSubmit={handleSubmitComment} className="space-y-3">
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={userProfile.avatarUrl} />
                  <AvatarFallback>
                    {userProfile.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[80px] resize-none"
                    maxLength={200}
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      {newComment.length}/200
                    </span>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={isSubmitting || !newComment.trim()}
                    >
                      {isSubmitting ? (
                        "Posting..."
                      ) : (
                        <>
                          <Send className="h-3 w-3 mr-1" />
                          Comment
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Comments List */}
      {comments.length > 0 && (
        <div className="space-y-3">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}

interface CommentItemProps {
  comment: Comment;
}

function CommentItem({ comment }: CommentItemProps) {
  const { data: authorProfile } = useProfile(comment.author);
  const timeAgo = formatDistanceToNow(
    new Date(Number(comment.createdAt) * 1000),
    { addSuffix: true }
  );

  if (!authorProfile) {
    return null;
  }

  return (
    <div className="flex gap-3 p-3 rounded-lg bg-background">
      <Avatar className="h-8 w-8">
        <AvatarImage src={authorProfile.avatarUrl} />
        <AvatarFallback>
          {authorProfile.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1 space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{authorProfile.name}</span>
          {authorProfile.isVerified && (
            <span className="text-xs text-blue-500">✓</span>
          )}
          <span className="text-xs text-muted-foreground">{timeAgo}</span>
        </div>

        <p className="text-sm leading-relaxed">{comment.content}</p>
      </div>
    </div>
  );
}
