import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getResend } from '@/lib/resend';
import { PurchaseReceiptEmail } from '@/components/emails/purchase-receipt';
import { render } from '@react-email/render';

// Use Service Role Key for server-side DB operations
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, serviceKey);

interface CartItem {
    id: string;
    slug: string;
    title: string;
    sale_price_inr: number;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { items, userId, userEmail } = body as {
            items: CartItem[];
            userId: string;
            userEmail: string;
        };

        if (!items?.length || !userId || !userEmail) {
            return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
        }

        const cartTotal = items.reduce((sum, item) => sum + item.sale_price_inr, 0);

        // 1. Insert Order
        const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: userId,
                total_amount: cartTotal,
                status: 'completed',
                currency: 'INR'
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // 2. Fetch Asset URLs for purchased products
        const slugs = items.map(i => i.slug);
        const { data: productsData } = await supabase
            .from('products')
            .select('slug, asset_url')
            .in('slug', slugs);

        const assetUrlMap: Record<string, string> = {};
        productsData?.forEach(p => {
            if (p.asset_url) assetUrlMap[p.slug] = p.asset_url;
        });

        // 3. Insert Order Items
        const orderItemsData = items.map(item => ({
            order_id: orderData.id,
            package_id: item.slug,
            package_title: item.title,
            price: item.sale_price_inr
        }));

        const { error: itemsError } = await supabase
            .from('order_items')
            .insert(orderItemsData);

        if (itemsError) throw itemsError;

        // 4. Send Confirmation Email
        const emailItems = items.map(item => ({
            title: item.title,
            price: item.sale_price_inr,
            download_url: assetUrlMap[item.slug] || undefined
        }));

        const emailHtml = await render(
            PurchaseReceiptEmail({
                customerName: userEmail.split('@')[0],
                orderId: orderData.id,
                orderDate: new Date().toLocaleDateString('en-IN', { dateStyle: 'long' }),
                items: emailItems,
                totalAmount: cartTotal
            })
        );

        await getResend().emails.send({
            from: 'BuyDatabase.ai <orders@delivery.buydatabase.ai>',
            to: userEmail,
            subject: `Order Confirmed: ${items.length} Dataset${items.length > 1 ? 's' : ''} Ready for Download`,
            html: emailHtml
        });

        return NextResponse.json({
            success: true,
            orderId: orderData.id,
            message: 'Order placed and email sent.'
        });

    } catch (error: any) {
        console.error('Checkout Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
