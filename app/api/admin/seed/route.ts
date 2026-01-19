
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { ALL_PACKAGES } from '@/data/packages';

// Initialize Supabase Client
// Note: In a real admin scenario, we would use a Service Role Key here to bypass RLS.
// Since we only have the Anon Key available in env, we must rely on RLS policies allowing this,
// or the user manually running this logic.
// Initialize Supabase Client inside the handler to avoid build-time errors if env vars are missing
export async function GET() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        return NextResponse.json({
            success: false,
            error: "Missing Supabase environment variables. Please check your .env file or Vercel project settings."
        }, { status: 500 });
    }

    // Prefer Service Role if available to bypass RLS
    const clientKey = serviceRoleKey || supabaseAnonKey;
    const supabase = createClient(supabaseUrl, clientKey);
    try {
        console.log("Starting seed process...");

        // 1. Fetch existing to avoid duplicates
        const { data: existing, error: fetchError } = await supabase
            .from('products')
            .select('slug');

        if (fetchError) {
            return NextResponse.json({ success: false, error: fetchError.message }, { status: 500 });
        }

        // 2. Process all packages (Upsert/Update logic)
        let updatedCount = 0;
        let insertedCount = 0;

        for (const p of ALL_PACKAGES) {
            // Check if exists
            const { data: current } = await supabase.from('products').select('id').eq('slug', p.slug).single();

            const payload = {
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
                updated_at: new Date().toISOString()
            };

            if (current) {
                // Update
                const { error: updateError } = await supabase
                    .from('products')
                    .update(payload)
                    .eq('slug', p.slug);

                if (updateError) {
                    console.error(`Failed to update ${p.slug}:`, updateError);
                } else {
                    updatedCount++;
                }
            } else {
                // Insert
                const { error: insertError } = await supabase
                    .from('products')
                    .insert({
                        slug: p.slug,
                        created_at: new Date().toISOString(),
                        ...payload
                    });

                if (insertError) {
                    console.error(`Failed to insert ${p.slug}:`, insertError);
                } else {
                    insertedCount++;
                }
            }
        }

        return NextResponse.json({
            success: true,
            updated: updatedCount,
            inserted: insertedCount,
            message: `Processed ${ALL_PACKAGES.length} packages. Updated: ${updatedCount}, Inserted: ${insertedCount}.`
        });

    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
