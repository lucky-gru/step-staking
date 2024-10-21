import { Button, ButtonProps } from "antd";
import { twMerge } from "tailwind-merge";

export function FilledButton({
  className,
  disabled,
  ...props
}: Omit<ButtonProps, "variant" | "color">) {
  return (
    <Button
      variant="filled"
      color="default"
      disabled={disabled}
      className={twMerge(
        "!bg-teal-700 !font-sans !text-teal-400 hover:!bg-teal-400 hover:!text-black",
        disabled &&
          "!border-neutral-600 !bg-neutral-700 !text-neutral-400 hover:!bg-neutral-700 hover:!text-neutral-400",
        className,
      )}
      {...props}
    />
  );
}
