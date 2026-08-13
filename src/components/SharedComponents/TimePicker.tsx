/** @format */

"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";

const HOURS = Array.from({ length: 12 }, (_, i) => String(i + 1));
const MINUTES = ["00", "30"];
const PERIODS = ["AM", "PM"] as const;

type Period = (typeof PERIODS)[number];

interface TimePickerProps {
  value: string;
  onChange: (time24: string) => void;
  placeholder?: string;
}

const to24Hour = (hour12: number, minute: string, period: Period): string => {
  let hour24 = hour12;
  if (period === "AM" && hour12 === 12) hour24 = 0;
  else if (period === "PM" && hour12 !== 12) hour24 = hour12 + 12;
  return `${String(hour24).padStart(2, "0")}:${minute}`;
};

const from24Hour = (time24: string): { hour: number; minute: string; period: Period } => {
  if (!time24) return { hour: 12, minute: "00", period: "AM" as Period };
  const [h, m] = time24.split(":").map(Number);
  const period: Period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const minute = m === 30 ? "30" : "00";
  return { hour: hour12, minute, period };
};

const DropdownSelect = ({
  options,
  value,
  onChange,
  className,
}: {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-transparent border border-white/10 rounded-lg px-3 py-2.5 text-sm text-primary text-center hover:border-white/20 transition-colors cursor-pointer"
      >
        <span className="flex-1 text-center">{value}</span>
        <ChevronDown
          className={`w-4 h-4 text-secondary transition-transform flex-shrink-0 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="absolute z-50 top-full mt-1 w-full bg-card border border-white/10 rounded-lg shadow-xl overflow-hidden max-h-48 overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`w-full px-3 py-2 text-sm text-center transition-colors cursor-pointer ${
                opt === value
                  ? "bg-primary/20 text-primary"
                  : "text-primary/80 hover:bg-muted/50"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const { hour, minute, period } = from24Hour(value);

  const handleHourChange = (h: string) => {
    onChange(to24Hour(Number(h), minute, period));
  };

  const handleMinuteChange = (m: string) => {
    onChange(to24Hour(hour, m, period));
  };

  const handlePeriodChange = (p: string) => {
    onChange(to24Hour(hour, minute, p as Period));
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="relative flex-1">
        <DropdownSelect options={HOURS} value={String(hour)} onChange={handleHourChange} />
      </div>
      <span className="text-primary font-medium">:</span>
      <div className="relative flex-1">
        <DropdownSelect options={MINUTES} value={minute} onChange={handleMinuteChange} />
      </div>
      <div className="relative flex-1">
        <DropdownSelect options={[...PERIODS]} value={period} onChange={handlePeriodChange} />
      </div>
    </div>
  );
};

export default TimePicker;
