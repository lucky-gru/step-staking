"use client";

import type { ButtonProps } from "antd";
import type { WalletName } from "@solana/wallet-adapter-base";

import { FilledButton } from "@/components/common/buttons/FilledButton";

import { WalletIcon } from "./WalletIcon";
import { twMerge } from "tailwind-merge";

type Props = ButtonProps & {
  walletIcon?: string;
  walletName?: WalletName;
};

export function BaseWalletConnectionButton({
  htmlType = "button",
  size = "large",
  type = "primary",
  walletIcon,
  walletName,
  className,
  ...props
}: Props) {
  return (
    <FilledButton
      {...props}
      className={twMerge(
        "!h-8 !min-w-[95px] !px-2 !text-sm !font-extrabold",
        className,
      )}
      htmlType={htmlType}
      icon={
        walletIcon && walletName ? (
          <WalletIcon
            wallet={{ adapter: { icon: walletIcon, name: walletName } }}
          />
        ) : undefined
      }
      type={type}
      size={size}
    />
  );
}
