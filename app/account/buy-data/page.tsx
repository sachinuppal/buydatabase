"use client";

import { AllDatasetsList } from "@/components/home/all-datasets-list";

export default function BuyDataPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold tracking-tight">Buy Data</h2>
                <p className="text-muted-foreground">
                    Browse our complete catalog of verified B2B datasets.
                </p>
            </div>

            <AllDatasetsList />
        </div>
    );
}
