import {
  useConnectWallet,
  useCurrentAccount,
  useCurrentWallet,
  useDisconnectWallet,
  useWallets,
} from "@mysten/dapp-kit";
import { useModalStore } from "../../store/useModalStore";
import { Button } from "../shared/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const ConnectBtn = () => {
  const { open } = useModalStore();
  const { mutate: disconnectWallet } = useDisconnectWallet();
  const account = useCurrentAccount();

  if (account) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            {account?.address.slice(0, 6)}...{account?.address.slice(-4)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <p onClick={() => disconnectWallet()}>Disconnect</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button onClick={() => open({ content: <ConnectModal /> })}>Connect</Button>
  );
};

const ConnectModal = () => {
  const wallets = useWallets();
  const { mutate: connect } = useConnectWallet();
  const { close } = useModalStore();

  return (
    <div className="w-full">
      <h1 className="text-2xl font-bold">Connect your wallet</h1>

      <div className="mt-4 flex flex-col gap-2">
        {wallets.map(wallet => (
          <Button
            onClick={() => {
              connect(
                { wallet },
                {
                  onSuccess: () => {
                    close();
                  },
                }
              );
            }}
            key={wallet.name}
            className="flex items-center gap-2 px-2"
          >
            <img
              src={wallet.icon}
              alt={wallet.name}
              className="size-12 rounded-full"
            />
            {wallet.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ConnectBtn;
