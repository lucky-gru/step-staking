import { Button, ButtonProps } from "antd";
import { twMerge } from "tailwind-merge";

export function IconButton({
  className,
  ...props
}: Omit<ButtonProps, "type" | "variant" | "color" | "children">) {
  return (
    <Button
      type="link"
      color="default"
      className={twMerge(
        "!rounded-sm !text-neutral-400 focus:!border focus:!border-teal-400 focus:!bg-teal-700",
        className,
      )}
      {...props}
    />
  );
}
