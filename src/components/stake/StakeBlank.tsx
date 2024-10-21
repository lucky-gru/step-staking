import Image from "next/image";

import disconnectedSrc from "@/assets/disconnected-logo.svg";

export function StakeBlank({
  status,
}: {
  status: "disconnected" | "connecting";
}) {
  return (
    <div className="fixed left-1/2 top-1/2 flex h-screen w-screen -translate-x-1/2 -translate-y-1/2 items-center justify-center">
      <div className="flex flex-col items-center gap-10 px-4">
        <Image
          src={disconnectedSrc}
          width={160}
          height={160}
          alt="disconnect logo"
        />
        <span className="text-center text-[20px] text-white/85">
          {status === "disconnected"
            ? "Connect your wallet or watch an address to begin"
            : "Connecting your wallet..."}
        </span>
      </div>
    </div>
  );
}
