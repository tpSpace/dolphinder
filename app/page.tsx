"use client";

import { useCurrentAccount } from "@mysten/dapp-kit";
import { WalletConnect } from "@/components/WalletConnect";
import { Button } from "@/components/ui/button";
import {
  Home as HomeIcon,
  PlusCircle,
  User,
  Search,
  Bell,
  PenTool,
  Network,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProfile } from "@/lib/hooks/useProfile";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CreatePostForm } from "@/components/CreatePostForm";
import { PostCard } from "@/components/PostCard";
import { usePosts, useCreatePost } from "@/lib/hooks/useProfile";

export default function Home() {
  const account = useCurrentAccount();
  const router = useRouter();
  const { data: profile } = useProfile(account?.address);
  const { data: posts } = usePosts();

  return (
    <div className="min-h-screen bg-background">
      {/* Left Sidebar Navigation */}
      <aside className="fixed left-0 top-0 h-full w-20 bg-background flex flex-col items-center py-6 space-y-4 z-50">
        {/* Logo */}
        <Link href="/" className="mb-6">
          <div className="w-12 h-12 bg-foreground text-background rounded-xl flex items-center justify-center font-bold text-lg">
            D
          </div>
        </Link>

        {/* Navigation Items */}
        <Link href="/">
          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl">
            <HomeIcon className="h-6 w-6" />
          </Button>
        </Link>

        <Link href="/profile/edit">
          <Button variant="ghost" size="icon" className="w-12 h-12 rounded-xl">
            <PenTool className="h-6 w-6" />
          </Button>
        </Link>

        {account && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-xl"
              onClick={() => {
                alert("Create post feature ready!");
              }}
            >
              <PlusCircle className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Profile Button - Bottom */}
        {account && (
          <Link href={`/profile/${account.address}`} className="mt-auto">
            <Button
              variant="ghost"
              size="icon"
              className="w-12 h-12 rounded-full"
            >
              <User className="h-6 w-6" />
            </Button>
          </Link>
        )}
      </aside>

      {/* Main Content Area */}
      <main className="ml-20 min-h-screen">
        {/* Top Header */}
        <header className="sticky top-0 bg-background z-40 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dolphinder</h1>
            <WalletConnect />
          </div>
        </header>

        {/* Main Feed/Content */}
        <div className="max-w-2xl mx-auto px-6 py-6">
          {/* Feed Header */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Feed</h2>
            <p className="text-sm text-muted-foreground">
              Latest posts from the community
            </p>
          </div>
          {/* Content based on wallet connection */}
          {!account ? (
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="space-y-4 text-center py-8">
                <h1 className="text-4xl font-bold tracking-tight">
                  Welcome to Dolphinder
                </h1>
                <p className="text-xl text-muted-foreground">
                  The on-chain LinkedIn for Web3 developers
                </p>
              </div>

              {/* Get Started Card */}
              <Card className="border-0 shadow-none bg-muted/30">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">Get Started</CardTitle>
                  <CardDescription>
                    Connect your wallet to create your professional profile on
                    the Sui blockchain
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-background">
                      <User className="h-10 w-10" />
                      <h3 className="font-semibold">Create Profile</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Build your on-chain identity
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-background">
                      <PenTool className="h-10 w-10" />
                      <h3 className="font-semibold">Share Posts</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Post your accomplishments
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-3 p-6 rounded-lg bg-background">
                      <Network className="h-10 w-10" />
                      <h3 className="font-semibold">Connect</h3>
                      <p className="text-sm text-muted-foreground text-center">
                        Network with builders
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <WalletConnect />
                  </div>
                </CardContent>
              </Card>

              {/* Footer */}
              <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-8">
                <span>Powered by Sui</span>
                <span>•</span>
                <span>Walrus Storage</span>
                <span>•</span>
                <span>Sponsored Gas</span>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Quick Profile Check */}
              {!profile && (
                <Card className="border-0 shadow-none bg-muted/30">
                  <CardContent className="p-4 text-center">
                    <p className="text-muted-foreground mb-3">
                      Complete your profile to start sharing posts!
                    </p>
                    <Link href="/profile/edit">
                      <Button>Create Profile</Button>
                    </Link>
                  </CardContent>
                </Card>
              )}

              {/* Create Post Section */}
              {profile && (
                <CreatePostForm
                  onSuccess={() => {
                    // Refresh posts after creation
                    window.location.reload();
                  }}
                />
              )}

              {/* Post Feed */}
              <div className="space-y-4">
                {/* Posts List */}
                {posts && posts.length > 0 ? (
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        profile={profile || undefined}
                        showProfileInfo={true}
                      />
                    ))}
                  </div>
                ) : (
                  <Card className="border-0 shadow-none bg-muted/30">
                    <CardContent className="p-8 text-center space-y-4">
                      <div className="text-4xl">📝</div>
                      <h3 className="text-lg font-semibold">No posts yet</h3>
                      <p className="text-muted-foreground">
                        Be the first to share your achievements! Create a post
                        to inspire others.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
