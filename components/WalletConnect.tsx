"use client";

import {
  ConnectButton,
  useCurrentAccount,
  useDisconnectWallet,
} from "@mysten/dapp-kit";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useProfile } from "@/lib/hooks/useProfile";
import { Wallet, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function WalletConnect() {
  const account = useCurrentAccount();
  const { mutate: disconnect } = useDisconnectWallet();
  const { data: profile } = useProfile(account?.address);

  if (!account) {
    return (
      <ConnectButton
        className="bg-foreground text-background hover:bg-foreground/90 px-4 py-2 rounded-lg font-medium"
        connectText="Connect Slush Wallet"
      />
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 px-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={profile?.avatarUrl} />
            <AvatarFallback className="bg-foreground text-background">
              {profile?.name?.charAt(0)?.toUpperCase() ||
                account.address.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden sm:flex flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="font-medium text-sm">
                {profile?.name || "Anonymous"}
              </span>
              {profile?.isVerified && (
                <Badge variant="secondary" className="text-xs">
                  ✓ Verified
                </Badge>
              )}
            </div>
            <span className="text-xs text-muted-foreground">
              {account.address.slice(0, 6)}...{account.address.slice(-4)}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5">
          <p className="text-sm font-medium">{profile?.name || "Anonymous"}</p>
          <p className="text-xs text-muted-foreground">{account.address}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a href={`/profile/${account.address}`} className="cursor-pointer">
            <Wallet className="h-4 w-4 mr-2" />
            View Profile
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive"
          onClick={() => disconnect()}
        >
          <LogOut className="h-4 w-4 mr-2" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
