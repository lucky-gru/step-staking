"use client";

import { ReactNode, ChangeEvent } from "react";
import { twMerge } from "tailwind-merge";
import { Input, Flex } from "antd";
import { NumericFormat } from "react-number-format";

import { FilledButton } from "@/components/common/buttons/FilledButton";

import { getTokenBalanceStr, getUsdPriceStr } from "@/utils/price";

export type TokenInputProps = {
  icon: ReactNode;
  symbol: string;
  balance: number;
  amount: number;
  price?: number;
  label: string;
  onChangeAmount?: (amount: number) => void;
};

export function TokenInput({
  icon,
  symbol,
  balance,
  amount,
  price,
  label,
  onChangeAmount,
}: TokenInputProps) {
  const handleChangeAmount = (e: ChangeEvent<HTMLInputElement>) => {
    const num = +e.target.value.replaceAll(",", "");

    onChangeAmount?.(Number.isNaN(num) ? 0 : num);
  };

  const handleClickHalf = () => {
    onChangeAmount?.(balance / 2);
  };

  const handleClickMax = () => {
    onChangeAmount?.(balance);
  };

  const mode = onChangeAmount ? "input" : "view";

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-white">{label}</span>
        <div className="flex items-center gap-1.5">
          <span className="pb-0.5 text-neutral-500">Balance:</span>
          <span className="font-mono text-neutral-500">
            {getTokenBalanceStr(balance)}
          </span>

          {mode === "input" && (
            <>
              <FilledButton
                className="!h-5 !rounded-sm !px-[5px] !text-[10px] !font-extrabold"
                onClick={handleClickHalf}
              >
                HALF
              </FilledButton>
              <FilledButton
                className="!h-5 !rounded-sm !px-[5px] !text-[10px] !font-extrabold"
                onClick={handleClickMax}
              >
                MAX
              </FilledButton>
            </>
          )}
        </div>
      </div>

      <Flex
        align="center"
        justify="between"
        gap={12}
        className={twMerge(
          "rounded-lg p-3 text-sm",
          mode === "input" && "bg-black",
          mode === "view" && "border border-neutral-500/20",
        )}
      >
        <Flex align="center" gap={8}>
          {icon}
          <span className="font-bold text-white">{symbol}</span>
        </Flex>

        <Flex flex={1} vertical gap={4} align="end">
          <NumericFormat
            variant="borderless"
            placeholder="0.00"
            onChange={handleChangeAmount}
            disabled={!onChangeAmount}
            value={amount || undefined}
            customInput={Input}
            className="!p-0 !text-right !font-mono !text-[18px] !font-bold !tracking-wide !text-white/85 placeholder:!text-neutral-500"
            allowNegative={false}
            decimalScale={mode === "view" ? 9 : 12}
            thousandSeparator
          />
          {mode === "input" && amount > 0 && price && (
            <span className="font-mono text-xs tracking-wide text-neutral-500">
              {getUsdPriceStr(amount * price, 0.01)}
            </span>
          )}
        </Flex>
      </Flex>
    </div>
  );
}
