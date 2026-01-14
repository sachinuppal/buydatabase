
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { ALL_PACKAGES } from '@/data/packages';

// Initialize Supabase Client
// Note: In a real admin scenario, we would use a Service Role Key here to bypass RLS.
// Since we only have the Anon Key available in env, we must rely on RLS policies allowing this,
// or the user manually running this logic.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Prefer Service Role if available to bypass RLS
const clientKey = serviceRoleKey || supabaseAnonKey;
const supabase = createClient(supabaseUrl, clientKey);

export async function GET() {
    try {
        console.log("Starting seed process...");

        // 1. Fetch existing to avoid duplicates
        const { data: existing, error: fetchError } = await supabase
            .from('products')
            .select('slug');

        if (fetchError) {
            return NextResponse.json({ success: false, error: fetchError.message }, { status: 500 });
        }

        const existingSlugs = new Set(existing?.map(p => p.slug) || []);

        // 2. Filter
        const newPackages = ALL_PACKAGES.filter(p => !existingSlugs.has(p.slug));

        if (newPackages.length === 0) {
            return NextResponse.json({ success: true, message: "No new packages to seed." });
        }

        // 3. Map
        const dbRows = newPackages.map(p => ({
            slug: p.slug,
            title: p.title,
            description: `Category: ${p.category}. Audience: ${p.audience.role}.`,
            price_inr: p.price_inr,
            sale_price_inr: p.sale_price_inr,
            currency: 'INR',

            region: p.geo.country,
            city: p.geo.city || '',
            role: p.audience.role,
            industry: p.industry,
            seniority: p.audience.group,

            records_count: p.record_count_estimate,
            delivery_time: p.delivery_type === 'instant' ? 'Instant' : '24-48 Hours',
            format: p.formats.join('/'),

            asset_url: '',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        }));

        // 4. Insert
        const { error: insertError } = await supabase
            .from('products')
            .insert(dbRows);

        if (insertError) {
            return NextResponse.json({ success: false, error: insertError.message }, { status: 500 });
        }

        return NextResponse.json({
            success: true,
            count: dbRows.length,
            message: `Successfully inserted ${dbRows.length} products.`
        });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
