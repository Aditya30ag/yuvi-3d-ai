"use client";

import React, { useId } from "react";
import { ChevronDown } from "lucide-react";

export interface SettingsOption {
  label: string;
  value: string;
}

export interface SettingsRowProps {
  label: string;
  description: string;
  value: string;
  options: SettingsOption[];
  onChange: (value: string) => void;
  id?: string;
  disabled?: boolean;
}

export function SettingsRow({
  label,
  description,
  value,
  options,
  onChange,
  id: customId,
  disabled = false,
}: SettingsRowProps) {
  const generatedId = useId();
  const selectId = customId || generatedId;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-border-subtle gap-3 last:border-b-0">
      <div className="flex-1 pr-4">
        <label
          htmlFor={selectId}
          className="text-sm font-semibold text-text-primary block cursor-pointer"
        >
          {label}
        </label>
        <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="relative inline-block w-full sm:w-44 flex-shrink-0">
        <select
          id={selectId}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          aria-label={label}
          className="w-full appearance-none bg-bg-surface-secondary text-text-primary text-xs font-medium border border-border-subtle hover:border-border-secondary focus:border-neon-green rounded-xl pl-3.5 pr-8 py-2.5 outline-none transition-all cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-bg-surface text-text-primary">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-text-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none transition-transform" />
      </div>
    </div>
  );
}
