"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface LeadCaptureContextType {
    isOpen: boolean;
    openCapture: () => void;
    closeCapture: () => void;
}

const LeadCaptureContext = createContext<LeadCaptureContextType | undefined>(undefined);

export function LeadCaptureProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    const openCapture = () => setIsOpen(true);
    const closeCapture = () => setIsOpen(false);

    return (
        <LeadCaptureContext.Provider value={{ isOpen, openCapture, closeCapture }}>
            {children}
        </LeadCaptureContext.Provider>
    );
}

export function useLeadCapture() {
    const context = useContext(LeadCaptureContext);
    if (context === undefined) {
        throw new Error("useLeadCapture must be used within a LeadCaptureProvider");
    }
    return context;
}
