"use client";

import { useCallback, useMemo, useState } from "react";
import type { FC, MouseEvent } from "react";
import type { ModalProps, MenuProps } from "antd";
import { Menu, Modal } from "antd";
import type { WalletName } from "@solana/wallet-adapter-base";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useWallet, type Wallet } from "@solana/wallet-adapter-react";

import { CloseIcon } from "@/components/common/icons/CloseIcon";

import { useWalletModal } from "./useWalletModal";
import { WalletIcon } from "./WalletIcon";
import { twMerge } from "tailwind-merge";

type MenuItem = Required<MenuProps>["items"][number];

export interface WalletModalProps extends Omit<ModalProps, "visible"> {
  featuredWallets?: number;
}

export const WalletModal: FC<WalletModalProps> = ({
  title = "Select Wallet",
  featuredWallets = 2,
  onCancel,
  ...props
}) => {
  const { wallets, select } = useWallet();
  const { visible, setVisible } = useWalletModal();
  const [expanded, setExpanded] = useState(false);

  const handleCancel = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      if (onCancel) onCancel(event);
      if (!event.defaultPrevented) setVisible(false);
    },
    [onCancel, setVisible],
  );

  const handleWalletClick = useCallback(
    (
      event: MouseEvent<HTMLButtonElement>,
      walletName: WalletName,
      readyState: string,
      url: string,
    ) => {
      if (readyState === "Installed" || readyState === "Loadable") {
        select(walletName);
      } else {
        window.open(url);
      }

      handleCancel(event);
    },
    [select, handleCancel],
  );

  const menuItems = useMemo(() => {
    const installed: Wallet[] = [];
    const notInstalled: Wallet[] = [];

    for (const wallet of wallets) {
      if (wallet.readyState === WalletReadyState.Installed) {
        installed.push(wallet);
      } else {
        notInstalled.push(wallet);
      }
    }

    const orderedWallets = [...installed, ...notInstalled];

    const [featured, more] = [
      orderedWallets.slice(0, featuredWallets),
      orderedWallets.slice(featuredWallets),
    ];

    const walletToMenuItemProps = (className?: string) => (wallet: Wallet) => {
      return {
        key: wallet.adapter.name,
        icon: <WalletIcon wallet={wallet} width={20} height={20} />,
        className: twMerge(
          "!m-0 !font-sans !text-base !text-white/85 !mb-2 !border !border-neutral-600 !bg-transparent !rounded-sm !px-4 !w-full !py-1.5",
          "hover:!border-teal-500 hover:!text-teal-500",
          "active:!border-teal-400 active:!text-teal-400",
          className,
        ),
        label: wallet.adapter.name,
        onClick: (event: MouseEvent<HTMLButtonElement>) =>
          handleWalletClick(
            event,
            wallet.adapter.name,
            wallet.readyState,
            wallet.adapter.url,
          ),
      };
    };

    return [
      ...featured.map(walletToMenuItemProps()),
      {
        key: "moreWallets",
        label: `${expanded ? "Less" : "More"} options`,
        className: "!w-full",
        children: [...more.map(walletToMenuItemProps("!bg-white/5"))],
      },
    ];
  }, [expanded, featuredWallets, handleWalletClick, wallets]);

  const onOpenChange = useCallback(
    () => setExpanded(!expanded),
    [setExpanded, expanded],
  );

  return (
    <Modal
      title={
        <h1 className="!font-sans text-base font-medium text-white/85">
          {title}
        </h1>
      }
      closeIcon={<CloseIcon size={24} className="text-neutral-500" />}
      open={visible}
      centered={true}
      onCancel={handleCancel}
      footer={null}
      width={320}
      classNames={{
        wrapper: "!bg-black",
        content: "!bg-neutral-900 !rounded-sm !p-0 md:!w-[400px]",
        header:
          "!border-b !border-solid !m-0 !border-b-neutral-700 !px-6 !py-4 !bg-transparent",
        body: "!p-6",
      }}
      {...props}
    >
      <Menu
        className="!border-none !bg-transparent"
        inlineIndent={0}
        mode="inline"
        onOpenChange={onOpenChange}
        items={menuItems as MenuItem[]}
      />
    </Modal>
  );
};
