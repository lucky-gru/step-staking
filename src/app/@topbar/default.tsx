"use client";

import Link from "next/link";
import Image from "next/image";
import { WalletButton } from "@/components/common/buttons/WalletButton";

import stepSrc from "@/assets/step.svg";
import { useTitle } from "@/hooks/useTitle";

export default function Page() {
  useTitle();

  return (
    <div className="sticky top-0 z-[1000] flex w-full justify-between bg-black p-5">
      <Link href="/" className="flex items-center gap-3">
        <Image src={stepSrc} width={40} height={40} alt="xStep token" />
        <span className="font-bold text-white">Step</span>
      </Link>

      <WalletButton />
    </div>
  );
}
