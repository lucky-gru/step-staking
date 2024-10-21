"use client";

import { twMerge } from "tailwind-merge";
import { ExportOutlined } from "../icons/ExportOutlined";

function getExplorerUrl(path: string) {
  return `https://explorer.solana.com/${path}`;
}

export function ExplorerLink({
  path,
  label,
  className,
  size,
}: {
  path: string;
  label?: string;
  className?: string;
  size?: number;
}) {
  return (
    <a
      href={getExplorerUrl(path)}
      target="_blank"
      rel="noopener noreferrer"
      className={twMerge(
        "flex items-center gap-2 rounded-sm border border-neutral-600 px-3 py-1.5 text-sm text-teal-400",
        className,
      )}
    >
      {label}

      <ExportOutlined size={24} width={size || 14} height={size || 14} />
    </a>
  );
}
