"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Accordian } from "@/types";

interface Props {
  items: Accordian[];
  defaultOpen?: string;
  imagePanels: Record<string, React.ReactNode>;
  descriptions: Record<string, React.ReactNode>;
  icons: Record<string, React.ReactNode>;
}

export function AccordionClient({
  items,
  defaultOpen = "item-0",
  imagePanels,
  descriptions,
  icons,
}: Props) {
  const [openItem, setOpenItem] = React.useState(defaultOpen);

  const activeIndex = items.findIndex((_, i) => `item-${i}` === openItem);
  const activeItem = items[Math.max(activeIndex, 0)];

  return (
    <div className="flex w-full flex-col md:flex-row md:items-stretch gap-10">
      {/* LEFT IMAGE */}
      <div className="relative w-full md:w-[50%]">
        {items.map((item) => (
          <div
            key={`${item.id}-${openItem}`}
            aria-hidden={item.id !== activeItem.id}
            className={cn(
              "w-full transition-opacity duration-500",
              item.id === activeItem.id
                ? "relative opacity-100"
                : "absolute inset-0 pointer-events-none opacity-0",
            )}
          >
            {imagePanels[item.id]}
          </div>
        ))}
      </div>

      {/* RIGHT ACCORDION */}
      <div className="flex flex-1 flex-col  bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <AccordionPrimitive.Root
          type="single"
          value={openItem}
          onValueChange={setOpenItem}
          className="w-full space-y-2"
        >
          {items.map((item, index) => {
            const value = `item-${index}`;
            const isOpen = openItem === value;

            return (
              <AccordionPrimitive.Item
                key={item.id}
                value={value}
                className="border-b border-gray-100 last:border-0 cursor-pointer
                  transition-colors duration-150
                  hover:bg-gray-50/60"
              >
                <AccordionPrimitive.Header asChild>
                  <h3>
                    <AccordionPrimitive.Trigger
                      data-active={isOpen ? "true" : undefined}
                      onMouseEnter={() => setOpenItem(value)}
                      className={cn(
                        "group  w-full  gap-3 text-left rounded-md flex items-center justify-between px-5 py-4",
                      )}
                    >
                      <span
                        className={cn(
                          "shrink-0 rounded-md flex items-center justify-center transition-colors p-1",
                          isOpen ? "text-white bg-gray-700" : "text-gray-400",
                        )}
                      >
                        {icons[item.id]}
                      </span>

                      <span className="flex-1 text-[15px] font-medium  rtl:text-right text-gray-900">
                        {item.heading}
                      </span>

                      <Plus
                        className={`"h-4 w-4 transition-colors ${isOpen ? "rotate-45" : ""}`}
                      />
                    </AccordionPrimitive.Trigger>
                  </h3>
                </AccordionPrimitive.Header>

                <AccordionPrimitive.Content className="overflow-hidden px-5  text-sm text-zinc-500 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  {descriptions[item.id]}
                </AccordionPrimitive.Content>
              </AccordionPrimitive.Item>
            );
          })}
        </AccordionPrimitive.Root>
      </div>
    </div>
  );
}
