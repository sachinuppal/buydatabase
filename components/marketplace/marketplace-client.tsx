"use client";

import { useState, useMemo } from 'react';
import { Package, FilterState } from '@/types/package';
import { PackageCard } from './package-card';
import { FilterSidebar } from './filter-sidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Filter, Search } from 'lucide-react';

export function MarketplaceClient({ packages }: { packages: Package[] }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filters, setFilters] = useState<FilterState>({
        priceRange: [0, 50000],
        selectedCountries: [],
        selectedRoles: [],
        selectedIndustries: [],
    });

    // Filtering Logic
    const filteredPackages = useMemo(() => {
        return packages.filter(pkg => {
            // Search
            if (searchQuery) {
                const q = searchQuery.toLowerCase();
                const matches =
                    pkg.title.toLowerCase().includes(q) ||
                    pkg.slug.includes(q) ||
                    pkg.category.toLowerCase().includes(q) ||
                    pkg.industry.toLowerCase().includes(q) ||
                    pkg.audience.role.toLowerCase().includes(q);
                if (!matches) return false;
            }

            // Price (Sale Price)
            if (pkg.sale_price_inr < filters.priceRange[0] || pkg.sale_price_inr > filters.priceRange[1]) {
                if (filters.priceRange[1] < 20000) return false; // If maxed out, treat as unlimited
            }

            // Role
            if (filters.selectedRoles.length > 0) {
                const match = filters.selectedRoles.some(r => pkg.audience.role.includes(r) || pkg.category.includes(r));
                if (!match) return false;
            }

            // Industry
            if (filters.selectedIndustries.length > 0) {
                const match = filters.selectedIndustries.some(i => pkg.industry.includes(i) || pkg.category.includes(i));
                if (!match) return false;
            }

            return true;
        });
    }, [packages, searchQuery, filters]);

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Sidebar Logic */}
            <FilterSidebar
                filters={filters}
                onFilterChange={setFilters}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Mobile Filter Toggle Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="flex-1 w-full">
                {/* Controls */}
                <div className="flex gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search datasets by role, industry, or location..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="outline"
                        className="lg:hidden"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Filter className="h-4 w-4 mr-2" /> Filters
                    </Button>
                </div>

                {/* Grid */}
                {filteredPackages.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredPackages.map(pkg => (
                            <PackageCard key={pkg.id} pkg={pkg} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-muted-foreground">
                        <p className="text-lg">No datasets found matching your filters.</p>
                        <Button
                            variant="link"
                            onClick={() => {
                                setFilters({
                                    priceRange: [0, 50000],
                                    selectedCountries: [],
                                    selectedRoles: [],
                                    selectedIndustries: [],
                                });
                                setSearchQuery('');
                            }}
                        >
                            Clear all filters
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
