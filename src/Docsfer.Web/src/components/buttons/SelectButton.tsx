import * as Select from "@radix-ui/react-select";
import clsx from "clsx";
import { Check, ChevronDown } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectGroup {
  label: string;
  options: SelectOption[];
}

interface SelectProps {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  options?: SelectOption[];
  groups?: SelectGroup[];
  disabled?: boolean;
  className?: string;
}

export const SelectButton = ({
  placeholder = "Selecionar...",
  value,
  onValueChange,
  options = [],
  groups = [],
  disabled = false,
  className = "",
}: SelectProps) => {
  const hasGroups = groups.length > 0;
  const hasOptions = options.length > 0;

  return (
    <Select.Root
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <Select.Trigger
        className={clsx(
          `inline-flex items-center justify-between rounded-lg px-3 py-1 border border-zinc-300 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed dark:border-zinc-400 dark:text-zinc-400  dark:hover:bg-zinc-700 font-nunito`,
          className
        )}
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-lg shadow-lg border border-zinc-200 dark:bg-zinc-800 dark:border-zinc-600">
          <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            <ChevronDown className="rotate-180" />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            {/* Render standalone options */}
            {hasOptions &&
              options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="relative flex items-center px-8 py-2 text-sm text-zinc-900 rounded cursor-pointer select-none hover:bg-sky-100 focus:bg-sky-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed dark:text-zinc-100 dark:hover:bg-sky-500/20 dark:focus:bg-sky-500/20"
                >
                  <Select.ItemText className="font-gabarito">
                    {option.label}
                  </Select.ItemText>
                  <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                    <Check />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}

            {/* Add separator if we have both options and groups */}
            {hasOptions && hasGroups && (
              <Select.Separator className="h-px bg-zinc-200 dark:bg-zinc-600 m-1" />
            )}

            {/* Render grouped options */}
            {hasGroups &&
              groups.map((group, groupIndex) => (
                <Select.Group key={groupIndex}>
                  <Select.Label className="px-6 py-2 font-gabarito text-zinc-500 uppercase dark:text-zinc-400">
                    {group.label}
                  </Select.Label>
                  {group.options.map((option) => (
                    <Select.Item
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      className="relative flex items-center px-8 py-2 font-gabarito text-zinc-900 rounded cursor-pointer select-none hover:bg-sky-100 focus:bg-sky-100 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed dark:text-zinc-100 dark:hover:bg-sky-500/25 dark:focus:bg-sky-500/20"
                    >
                      <Select.ItemText className="font-gabarito ">
                        {option.label}
                      </Select.ItemText>
                      <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                        <Check />
                      </Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.Group>
              ))}
          </Select.Viewport>

          <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200">
            <ChevronDown />
          </Select.ScrollDownButton>
          <Select.Arrow className="fill-white dark:fill-zinc-800" />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};
