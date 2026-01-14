export type DeliveryType = 'instant' | 'queued' | 'manual';
export type UpdateFrequency = 'Weekly' | 'Monthly' | 'Quarterly';
export type FileFormat = 'CSV' | 'XLSX';

export interface PackageGeo {
    country: string;
    city?: string;
    state?: string;
}

export interface PackageAudience {
    group: string;
    role: string;
}

export interface Package {
    id: string;
    slug: string;
    title: string;
    category: string;
    geo: PackageGeo;
    audience: PackageAudience;
    industry: string;
    record_count_estimate: string;
    fields_included: string[];
    update_frequency: UpdateFrequency;
    formats: FileFormat[];
    price_inr: number;
    sale_price_inr: number;
    delivery_type: DeliveryType;
    image_prompt: string;
}

export interface FilterState {
    priceRange: [number, number];
    selectedCountries: string[];
    selectedRoles: string[];
    selectedIndustries: string[];
    deliveryType?: DeliveryType;
}
