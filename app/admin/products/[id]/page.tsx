"use client";

import { useAuth } from "@/context/auth-context";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, ArrowLeft, Save, Trash2 } from "lucide-react";
import Link from "next/link";

export default function EditProductPage() {
    const { user } = useAuth();
    const router = useRouter();
    const params = useParams(); // { id: string }
    const id = params?.id as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        description: "",
        price_inr: "",
        sale_price_inr: "",
        delivery_type: "instant",
        asset_url: "",
        region: "",
        records_count: "",
        industry: "",
        role: ""
    });

    useEffect(() => {
        if (id) fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('id', id)
                .single();

            if (error) throw error;
            if (data) {
                setFormData({
                    title: data.title || "",
                    slug: data.slug || "",
                    description: data.description || "",
                    price_inr: data.price_inr?.toString() || "",
                    sale_price_inr: data.sale_price_inr?.toString() || "",
                    delivery_type: data.delivery_type || "instant",
                    asset_url: data.asset_url || "",
                    region: data.region || "",
                    records_count: data.records_count || "",
                    industry: data.industry || "",
                    role: data.role || ""
                });
            }
        } catch (error) {
            console.error(error);
            router.push('/admin/products');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const { error } = await supabase
                .from('products')
                .update({
                    ...formData,
                    price_inr: Number(formData.price_inr) || 0,
                    sale_price_inr: Number(formData.sale_price_inr) || 0,
                    updated_at: new Date().toISOString()
                })
                .eq('id', id);

            if (error) throw error;
            // router.refresh(); // Optional
            router.push('/admin/products');
        } catch (error: any) {
            console.error(error);
            alert(error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this product?")) return;
        setSaving(true);
        try {
            const { error } = await supabase.from('products').delete().eq('id', id);
            if (error) throw error;
            router.push('/admin/products');
        } catch (error: any) {
            alert(error.message);
            setSaving(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    if (loading) return <div className="p-8 flex justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <Link href="/admin/products" className="text-muted-foreground hover:text-primary flex items-center gap-2 text-sm mb-4">
                        <ArrowLeft className="h-4 w-4" /> Back to Products
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
                </div>
                <Button variant="destructive" size="sm" onClick={handleDelete} disabled={saving}>
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
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
                                value={formData.title} onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="slug">Slug (URL)</Label>
                            <Input
                                id="slug" name="slug" required
                                value={formData.slug} onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description" name="description" rows={3}
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
                                value={formData.price_inr} onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="sale_price_inr">Sale Price (₹)</Label>
                            <Input
                                id="sale_price_inr" name="sale_price_inr" type="number" required
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
                                value={formData.asset_url} onChange={handleChange}
                                className="border-blue-200 bg-blue-50 focus-visible:ring-blue-500"
                            />
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
                            <Input id="records_count" name="records_count" value={formData.records_count} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="industry">Industry</Label>
                            <Input id="industry" name="industry" value={formData.industry} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input id="role" name="role" value={formData.role} onChange={handleChange} />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" size="lg" disabled={saving}>
                        {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        <Save className="mr-2 h-4 w-4" />
                        Update Product
                    </Button>
                </div>
            </form>
        </div>
    );
}
