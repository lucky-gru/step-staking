"use client";

import { useEffect, useMemo } from "react";
import { Popover } from "antd";
import type { ButtonProps } from "antd";
import { useWalletMultiButton } from "@solana/wallet-adapter-base-ui";
import { useSnackbar } from "notistack";

import { ExplorerLink } from "@/components/common/links/ExplorerLink";
import { FlashOffIcon } from "@/components/common/icons/FlashOffIcon";
import { CopyIcon } from "@/components/common/icons/CopyIcon";
import { IconButton } from "@/components/common/buttons/IconButton";

import { BaseWalletConnectionButton } from "./BaseWalletConnectionButton";
import { useWalletModal } from "./useWalletModal";
import { WalletIcon } from "./WalletIcon";
import { Alert } from "../notifications/Alert";
import { WalletConnectedAlert } from "./notifications/WalletConnectedAlert";
import { AddressCopiedToClipboardAlert } from "./notifications/AddressCopiedToClipboardAlert";
import { WalletDisconnectedAlert } from "./notifications/WalletDisconnectedAlert";

type Props = ButtonProps & {
  labels: Omit<
    {
      [TButtonState in ReturnType<
        typeof useWalletMultiButton
      >["buttonState"]]: string;
    },
    "connected" | "disconnecting"
  > & {
    "copy-address": string;
    "change-wallet": string;
    disconnect: string;
  };
};

export function BaseWalletMultiButton({ children, labels, ...props }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { setVisible: setModalVisible } = useWalletModal();
  const {
    buttonState,
    onConnect,
    onDisconnect,
    publicKey,
    walletIcon,
    walletName,
  } = useWalletMultiButton({
    onSelectWallet() {
      setModalVisible(true);
    },
  });

  useEffect(() => {
    if (publicKey) {
      const base58 = publicKey.toBase58();

      enqueueSnackbar(
        <WalletConnectedAlert
          walletIcon={walletIcon}
          walletName={walletName}
          address={base58.slice(0, 4) + ".." + base58.slice(-4)}
        />,
        { autoHideDuration: 5000 },
      );
    }
  }, [enqueueSnackbar, publicKey, walletIcon, walletName]);

  const handleCopyToClipboard = async () => {
    if (publicKey) {
      enqueueSnackbar(
        <AddressCopiedToClipboardAlert address={publicKey.toBase58()} />,
        {
          autoHideDuration: 5000,
        },
      );

      await navigator.clipboard.writeText(publicKey.toBase58());
    }
  };

  const handleClickDisconnect = async () => {
    if (onDisconnect && publicKey) {
      const base58 = publicKey.toBase58();

      enqueueSnackbar(
        <WalletDisconnectedAlert
          address={base58.slice(0, 4) + ".." + base58.slice(-4)}
        />,
        {
          autoHideDuration: 5000,
        },
      );

      onDisconnect();
    }
  };

  const content = useMemo(() => {
    if (children) {
      return children;
    } else if (publicKey) {
      const base58 = publicKey.toBase58();
      return base58.slice(0, 4) + ".." + base58.slice(-4);
    } else if (buttonState === "connecting" || buttonState === "has-wallet") {
      return labels[buttonState];
    } else {
      return labels["no-wallet"];
    }
  }, [buttonState, children, labels, publicKey]);

  if (buttonState !== "connected") {
    return (
      <BaseWalletConnectionButton
        {...props}
        onClick={() => {
          switch (buttonState) {
            case "no-wallet":
              setModalVisible(true);
              break;
            case "has-wallet":
              if (onConnect) {
                onConnect();
              }
              break;
          }
        }}
        walletIcon={walletIcon}
        walletName={walletName}
      >
        {content}
      </BaseWalletConnectionButton>
    );
  }

  return (
    <Popover
      color="#262626"
      content={
        publicKey ? (
          <div className="flex max-w-[350px] items-center justify-between gap-10 px-2">
            <div className="flex items-center gap-2">
              {walletIcon && walletName ? (
                <WalletIcon
                  wallet={{ adapter: { icon: walletIcon, name: walletName } }}
                />
              ) : null}

              <span className="text-sm font-medium text-white/85">
                {content}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {publicKey ? (
                <ExplorerLink
                  path={`/account/${publicKey.toBase58()}`}
                  className="border-none !text-neutral-500"
                  size={16}
                />
              ) : null}
              {publicKey ? (
                <IconButton
                  icon={
                    <CopyIcon
                      size={24}
                      width={20}
                      height={20}
                      className="scale-x-[-1] transform !text-neutral-500/85"
                    />
                  }
                  onClick={handleCopyToClipboard}
                />
              ) : null}
              {onDisconnect ? (
                <IconButton
                  icon={
                    <FlashOffIcon
                      size={24}
                      width={20}
                      height={20}
                      className="text-orange-700"
                    />
                  }
                  onClick={handleClickDisconnect}
                />
              ) : null}
            </div>
          </div>
        ) : null
      }
      placement="bottomRight"
      trigger={buttonState === "connected" ? ["click"] : []}
    >
      <BaseWalletConnectionButton
        {...props}
        walletIcon={walletIcon}
        walletName={walletName}
        className={
          buttonState === "connected"
            ? "!rounded-lg !bg-neutral-900 !font-normal hover:border-teal-700 hover:!bg-neutral-900 hover:!text-teal-400 active:border-teal-400"
            : undefined
        }
      >
        {content}
      </BaseWalletConnectionButton>
    </Popover>
  );
}
