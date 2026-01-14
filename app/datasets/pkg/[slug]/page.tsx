import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Check, Clock, FileText, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { Hero } from '@/components/ui/hero';
import { AddToCartButton } from '@/components/marketplace/add-to-cart-button'; // Will create this

// Force dynamic rendering since we are fetching from DB
export const dynamic = 'force-dynamic';

async function getProduct(slug: string) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error || !data) return null;
    return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) return {};

    return {
        title: `${product.title} - BuyDatabase.ai`,
        description: product.description || `Buy ${product.title}. Verified B2B data for ${product.region}. Instant download.`,
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        notFound();
    }

    // Map DB fields to friendly formats
    const isInstant = product.delivery_type === 'instant' || product.delivery_time === 'Instant';
    const features = product.description?.split('.').filter((s: string) => s.length > 3) || [];
    const fields = product.format?.split('/') || ['CSV', 'Excel'];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Breadcrumbs */}
            <div className="bg-muted/30 border-b py-3">
                <div className="container max-w-5xl mx-auto px-6 flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/datasets" className="hover:text-foreground transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-1 inline" /> Back to Marketplace
                    </Link>
                    <span className="opacity-30">/</span>
                    <span className="text-foreground font-medium truncate">{product.title}</span>
                </div>
            </div>

            <main className="flex-1">
                <div className="container max-w-5xl mx-auto px-6 py-12">
                    <div className="grid md:grid-cols-3 gap-10">
                        {/* LEFT COLUMN: Main Details */}
                        <div className="md:col-span-2 space-y-8">
                            <div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
                                        {product.industry || 'General'}
                                    </Badge>
                                    <Badge variant="outline">{product.records_count} Records</Badge>
                                    <Badge variant="outline">{product.region}</Badge>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">{product.title}</h1>

                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {product.description || `Premium B2B dataset for ${product.title}. Verified contacts including ${product.role || 'decision makers'} in ${product.region}.`}
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="p-4 bg-muted/20 border rounded-xl">
                                    <Shield className="h-5 w-5 text-primary mb-2" />
                                    <div className="font-semibold text-sm">100% Verified</div>
                                    <div className="text-xs text-muted-foreground">Clean, active data</div>
                                </div>
                                <div className="p-4 bg-muted/20 border rounded-xl">
                                    <Clock className="h-5 w-5 text-primary mb-2" />
                                    <div className="font-semibold text-sm">{product.delivery_time || '24 Hours'}</div>
                                    <div className="text-xs text-muted-foreground">Delivery time</div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h3 className="font-bold text-lg">Includes Data Fields:</h3>
                                <ul className="grid sm:grid-cols-2 gap-2">
                                    {['Name', 'Company', 'Job Title', 'Email Address', 'Phone Number', 'City', 'Industry', 'Employees'].map((f) => (
                                        <li key={f} className="flex items-center text-sm">
                                            <Check className="h-4 w-4 text-green-500 mr-2" /> {f}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="prose prose-sm max-w-none text-muted-foreground">
                                <p>
                                    This dataset is compliant with GDPR and CCPA standards where applicable.
                                    Our sourcing matches public professional profiles with verified business contact information.
                                </p>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Buying Card */}
                        <div className="md:col-span-1">
                            <div className="sticky top-24 bg-card border rounded-2xl shadow-lg p-6 space-y-6">
                                <div>
                                    <div className="text-sm text-muted-foreground mb-1">One-time purchase</div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-bold">₹{product.sale_price_inr.toLocaleString()}</span>
                                        {product.price_inr > product.sale_price_inr && (
                                            <span className="text-sm text-muted-foreground line-through">₹{product.price_inr.toLocaleString()}</span>
                                        )}
                                    </div>
                                    {product.price_inr > product.sale_price_inr && (
                                        <Badge variant="default" className="mt-2 bg-green-600 hover:bg-green-700">
                                            Save {Math.round((1 - product.sale_price_inr / product.price_inr) * 100)}%
                                        </Badge>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    <div className="flex items-center text-sm gap-2">
                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                        <span>Format: <strong>{product.format || 'CSV / Excel'}</strong></span>
                                    </div>
                                    <div className="flex items-center text-sm gap-2">
                                        <Zap className="h-4 w-4 text-muted-foreground" />
                                        <span>Delivery: <strong>{product.delivery_time || 'Instant'}</strong></span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t">
                                    {/* We need a client component for the Cart Interaction */}
                                    <AddToCartButton
                                        product={{
                                            id: product.id,
                                            slug: product.slug,
                                            title: product.title,
                                            // Map DB fields to Package type manually for the cart
                                            price_inr: product.price_inr,
                                            sale_price_inr: product.sale_price_inr,
                                            delivery_type: product.delivery_type as any,
                                            // Mock required fields for Cart item
                                            category: product.industry || 'General',
                                            geo: { country: product.region || 'Unknown' },
                                            audience: { role: product.role || 'Mixed', group: 'Mixed' },
                                            industry: product.industry || 'General',
                                            record_count_estimate: product.records_count || 'Unknown',
                                            fields_included: [],
                                            update_frequency: 'Monthly',
                                            formats: ['CSV'],
                                            image_prompt: ''
                                        }}
                                    />
                                    <p className="text-xs text-center text-muted-foreground mt-3">
                                        Secure payment via Stripe/Razorpay.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
