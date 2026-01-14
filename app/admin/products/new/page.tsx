"use client";

import { useAuth } from "@/context/auth-context";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";

export default function NewProductPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        price_inr: "",
        sale_price_inr: "",
        delivery_type: "instant",
        asset_url: "",
        region: "India",
        records_count: "",
        industry: "",
        role: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.from('products').insert([
                {
                    ...formData,
                    price_inr: Number(formData.price_inr) || 0,
                    sale_price_inr: Number(formData.sale_price_inr) || 0,
                    created_at: new Date().toISOString()
                }
            ]);

            if (error) throw error;
            router.push('/admin/products');
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Auto-generate slug from title if slug is empty
        if (name === "title" && !formData.slug) {
            setFormData(prev => ({
                ...prev,
                slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
            }));
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6">
                <Link href="/admin/products" className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm mb-4">
                    <ArrowLeft className="h-4 w-4" /> Back to Products
                </Link>
                <h1 className="text-3xl font-bold tracking-tight">Create New Product</h1>
                <p className="text-muted-foreground">Add a new dataset to the catalog.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white border rounded-xl shadow-sm p-6 md:p-8 space-y-8">

                {/* Basic Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Basic Details</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Product Title</Label>
                            <Input
                                id="title" name="title" required
                                placeholder="e.g. HR Managers in Bangalore"
                                value={formData.title} onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug (URL)</Label>
                            <Input
                                id="slug" name="slug" required
                                placeholder="hr-managers-bangalore"
                                value={formData.slug} onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description" name="description" rows={3}
                            placeholder="Brief details about fields and sources..."
                            value={formData.description} onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Pricing & Delivery */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Pricing & Fulfillment</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="price_inr">Display Price (₹)</Label>
                            <Input
                                id="price_inr" name="price_inr" type="number" required
                                placeholder="2999"
                                value={formData.price_inr} onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sale_price_inr">Sale Price (₹)</Label>
                            <Input
                                id="sale_price_inr" name="sale_price_inr" type="number" required
                                placeholder="999"
                                value={formData.sale_price_inr} onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="delivery_type">Delivery Method</Label>
                            <select
                                id="delivery_type" name="delivery_type"
                                value={formData.delivery_type}
                                onChange={handleChange}
                                className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                <option value="instant">Instant Download</option>
                                <option value="manual">Manual (Request)</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="asset_url" className="text-blue-600 font-bold">Delivery Link (Secure)</Label>
                            <Input
                                id="asset_url" name="asset_url"
                                placeholder="https://drive.google.com/..."
                                value={formData.asset_url} onChange={handleChange}
                                className="border-blue-200 bg-blue-50 focus-visible:ring-blue-500"
                            />
                            <p className="text-xs text-muted-foreground">
                                Paste the Google Drive, Dropbox, or S3 link here. This will be emailed/shown to the user after purchase.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Metadata */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold border-b pb-2">Filters & Metadata</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="region">Region</Label>
                            <Input id="region" name="region" value={formData.region} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="records_count">Approx Records</Label>
                            <Input id="records_count" name="records_count" placeholder="e.g. 5K - 10K" value={formData.records_count} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="industry">Industry</Label>
                            <Input id="industry" name="industry" placeholder="SaaS, Retail..." value={formData.industry} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input id="role" name="role" placeholder="Founders, HR..." value={formData.role} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" size="lg" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Save className="mr-2 h-4 w-4" />
                        Save Product
                    </Button>
                </div>
            </form>
        </div>
    );
}
