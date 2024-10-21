"use client";

import { Alert } from "@/components/common/notifications/Alert";

export function StakeErrorAlert({
  title,
  errorMessage,
}: {
  title: string;
  errorMessage?: string;
}) {
  return (
    <Alert variant="error">
      <div className="flex flex-col gap-4">
        <h1 className="text-base font-bold text-white/85">{title}</h1>
        {errorMessage ? (
          <p className="text-wrap break-words text-sm text-neutral-400">
            {errorMessage}
          </p>
        ) : null}
      </div>
    </Alert>
  );
}
