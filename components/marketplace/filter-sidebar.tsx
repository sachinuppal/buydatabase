"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { FilterState } from "@/types/package";
import { X } from "lucide-react";

interface FilterSidebarProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    isOpen: boolean;
    onClose: () => void;
}

export function FilterSidebar({ filters, onFilterChange, isOpen, onClose }: FilterSidebarProps) {

    const handleRoleChange = (role: string, checked: boolean) => {
        const newRoles = checked
            ? [...filters.selectedRoles, role]
            : filters.selectedRoles.filter(r => r !== role);
        onFilterChange({ ...filters, selectedRoles: newRoles });
    };

    const handleIndustryChange = (ind: string, checked: boolean) => {
        const newInds = checked
            ? [...filters.selectedIndustries, ind]
            : filters.selectedIndustries.filter(i => i !== ind);
        onFilterChange({ ...filters, selectedIndustries: newInds });
    };

    // Derived lists could come from props, let's hardcode common ones for now based on catalog
    const ROLES = ["Founder", "CEO", "CTO", "HR Manager", "Marketing Manager", "Sales", "Engineering", "Doctor"];
    const INDUSTRIES = ["IT & Software", "SaaS", "Healthcare", "Manufacturing", "Real Estate", "Education", "Retail"];

    return (
        <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-background border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-auto lg:border-none lg:bg-transparent ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="h-full overflow-y-auto p-6 space-y-8">
                <div className="flex items-center justify-between lg:hidden">
                    <h2 className="font-bold text-lg">Filters</h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                {/* Price Range */}
                {/* Price Range */}
                {/* Price Range */}
                <div>
                    <h3 className="font-bold mb-4">Max Price (₹{filters.priceRange[1].toLocaleString()})</h3>
                    <Slider
                        defaultValue={[filters.priceRange[1]]}
                        max={20000}
                        step={500}
                        className="mb-2"
                        // Treating slider as Max Price control, keeping min at 0
                        onValueChange={(val: number[]) => onFilterChange({ ...filters, priceRange: [0, val[0]] })}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                        <span>₹0</span>
                        <span>₹20,000+</span>
                    </div>
                </div>

                {/* Roles */}
                <div>
                    <h3 className="font-bold mb-3">By Role</h3>
                    <div className="space-y-2">
                        {ROLES.map(role => (
                            <div key={role} className="flex items-center gap-2">
                                <Checkbox
                                    id={`role-${role}`}
                                    checked={filters.selectedRoles.includes(role)}
                                    // Custom Checkbox uses standard input props, so usage is onChange
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleRoleChange(role, e.target.checked)}
                                />
                                <Label htmlFor={`role-${role}`}>{role}</Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Industries */}
                <div>
                    <h3 className="font-bold mb-3">By Industry</h3>
                    <div className="space-y-2">
                        {INDUSTRIES.map(ind => (
                            <div key={ind} className="flex items-center gap-2">
                                <Checkbox
                                    id={`ind-${ind}`}
                                    checked={filters.selectedIndustries.includes(ind)}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleIndustryChange(ind, e.target.checked)}
                                />
                                <Label htmlFor={`ind-${ind}`}>{ind}</Label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
