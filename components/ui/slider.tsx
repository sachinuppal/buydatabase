"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Simplified Slider that handles double-thumb via two inputs if needed, 
// but for MVP let's implement a single or simple dual-range slider.
// Actually, standard HTML input[type=range] is single thumb. 
// For price range (min, max), we usually need two thumbs.
// Since we don't have Radix, implementing a robust dual-thumb slider is complex in vanilla React without deps.
// I will implement a SINGLE thumb version that acts as "Max Price" for now to simplify, 
// OR I'll try to use a simple dual-slider approach.

// Let's stick to a simple controlled component wrapper for now.
// Note: Props interface matches Radix Slider slightly to minimize refactor if we swap later.

interface SliderProps {
    defaultValue?: number[];
    value?: number[]; // Expecting [min, max] or [max]
    max?: number;
    step?: number;
    onValueChange?: (value: number[]) => void;
    className?: string;
}

export function Slider({ defaultValue, value: controlledValue, max = 100, step = 1, onValueChange, className }: SliderProps) {
    const [localValue, setLocalValue] = React.useState(defaultValue || [0]);
    const value = controlledValue || localValue;

    // We'll support just one thumb (Max Price) for the MVP as HTML range is single thumb.
    // Implementing dual thumb with native inputs requires overlaying two inputs.

    const val = value[0] ?? 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = [parseFloat(e.target.value)];
        setLocalValue(newValue);
        onValueChange?.(newValue);
    };

    return (
        <div className={cn("relative flex w-full touch-none select-none items-center", className)}>
            <input
                type="range"
                min={0}
                max={max}
                step={step}
                value={val}
                onChange={handleChange}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
        </div>
    )
}
