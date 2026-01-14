import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { getResend } from '@/lib/resend';
import { PurchaseReceiptEmail } from '@/components/emails/purchase-receipt';
import { render } from '@react-email/render';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface CartItem {
    id: string;
    slug: string;
    title: string;
    sale_price_inr: number;
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            items,
            userId,
            userEmail,
            totalAmount
        } = body as {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
            items: CartItem[];
            userId: string;
            userEmail: string;
            totalAmount: number;
        };

        // 1. Verify Signature
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return NextResponse.json({
                success: false,
                error: 'Payment verification failed'
            }, { status: 400 });
        }

        // 2. Create Order in DB
        // Handle guest users - use null if not a valid UUID
        const isValidUuid = userId && userId !== 'guest' && userId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

        const { data: orderData, error: orderError } = await supabase
            .from('orders')
            .insert({
                user_id: isValidUuid ? userId : null,
                guest_email: !isValidUuid ? userEmail : null,
                total_amount: totalAmount,
                status: 'completed',
                currency: 'INR',
                payment_id: razorpay_payment_id,
                razorpay_order_id: razorpay_order_id
            })
            .select()
            .single();

        if (orderError) throw orderError;

        // 3. Fetch Asset URLs
        const slugs = items.map(i => i.slug);
        const { data: productsData } = await supabase
            .from('products')
            .select('slug, asset_url')
            .in('slug', slugs);

        const assetUrlMap: Record<string, string> = {};
        productsData?.forEach(p => {
            if (p.asset_url) assetUrlMap[p.slug] = p.asset_url;
        });

        // 4. Insert Order Items
        const orderItemsData = items.map(item => ({
            order_id: orderData.id,
            package_id: item.slug,
            package_title: item.title,
            price: item.sale_price_inr
        }));

        await supabase.from('order_items').insert(orderItemsData);

        // 5. Send Confirmation Email
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
                totalAmount
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
            message: 'Payment verified and order created.'
        });

    } catch (error: any) {
        console.error('Payment Verification Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}
