"use client";

import React, { cloneElement, isValidElement } from "react";
import { useLeadCapture } from "./lead-capture-context";

interface LeadCaptureTriggerProps {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

export function LeadCaptureTrigger({ children, asChild, className }: LeadCaptureTriggerProps) {
    const { openCapture } = useLeadCapture();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        openCapture();
    };

    if (asChild && isValidElement(children)) {
        return cloneElement(children as React.ReactElement<any>, {
            onClick: handleClick,
        });
    }

    return (
        <div onClick={handleClick} className={className} role="button" tabIndex={0}>
            {children}
        </div>
    );
}
