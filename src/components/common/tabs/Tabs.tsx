"use client";

import { ReactNode } from "react";

import { Tab } from "./Tab";
import { ConfigProvider } from "antd";

export type TabsProps = {
  items: {
    id: string;
    label: ReactNode;
  }[];
  selected: string;
  onChangeSelection(value: string): void;
};

export function Tabs({ items, selected, onChangeSelection }: TabsProps) {
  return (
    <ConfigProvider wave={{ disabled: true }}>
      <div className="flex items-center">
        {items.map((item) => (
          <Tab
            key={item.id}
            id={item.id}
            label={item.label}
            onSelect={onChangeSelection}
            selected={selected === item.id}
          />
        ))}
      </div>
    </ConfigProvider>
  );
}
