import { ReactNode } from "react";
import { Button } from "antd";
import { twMerge } from "tailwind-merge";

export type TabProps = {
  id: string;
  label: ReactNode;
  selected?: boolean;
  onSelect(value: string): void;
};

export function Tab({ id, label, selected, onSelect }: TabProps) {
  const handleClick = () => {
    onSelect(id);
  };

  return (
    <Button
      variant="filled"
      color="default"
      onClick={handleClick}
      className={twMerge(
        "!h-[45px] w-[150px] !rounded-b-none !rounded-t-lg !bg-neutral-950 !p-2.5 !font-sans !text-sm !font-extrabold !text-neutral-500 hover:text-teal-400/80",
        selected && "!bg-neutral-900 !text-teal-400",
      )}
    >
      {label}
    </Button>
  );
}
