"use client";

import { ReactNode } from "react";

import { FilledCheckIcon } from "@/components/common/icons/FilledCheckIcon";
import { MoreIcon } from "../icons/MoreIcon";
import { FilledCloseIcon } from "../icons/FilledCloseIcon";

export type Variant = "success" | "info" | "error" | "default";

export const iconsByVariant: Record<Variant, ReactNode> = {
  success: <FilledCheckIcon size={24} className="text-green-600" />,
  info: <MoreIcon size={24} className="text-sky-500" />,
  error: <FilledCloseIcon size={24} className="text-orange-700" />,
  default: null,
};

export type AlertProps = {
  icon?: ReactNode;
  variant?: Variant;
  children?: ReactNode;
};

export function Alert({ variant = "default", icon, children }: AlertProps) {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-neutral-900 p-5">
      {icon ? icon : <div>{iconsByVariant[variant]}</div>}

      <div className="sm:max-w-[500px]">{children}</div>
    </div>
  );
}
