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

/**
 * Razorpay Webhook Handler
 * 
 * This endpoint receives events directly from Razorpay servers.
 * It acts as a fallback if the frontend verify call fails (e.g., user closes browser).
 * 
 * Configure this webhook in Razorpay Dashboard:
 * Settings → Webhooks → Add New Webhook
 * URL: https://your-domain.com/api/payments/webhook
 * Events: payment.captured
 * Secret: Generate and set as RAZORPAY_WEBHOOK_SECRET in .env.local
 */
export async function POST(request: Request) {
    try {
        const body = await request.text();
        const signature = request.headers.get('x-razorpay-signature');

        // 1. Verify webhook signature
        const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;

        if (!webhookSecret) {
            console.warn('RAZORPAY_WEBHOOK_SECRET not set. Skipping signature verification.');
        } else if (signature) {
            const expectedSignature = crypto
                .createHmac('sha256', webhookSecret)
                .update(body)
                .digest('hex');

            if (signature !== expectedSignature) {
                console.error('Webhook signature mismatch');
                return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
            }
        }

        const event = JSON.parse(body);
        const eventType = event.event;

        console.log(`Received Razorpay webhook: ${eventType}`);

        // 2. Handle payment.captured event
        if (eventType === 'payment.captured') {
            const payment = event.payload.payment.entity;
            const orderId = payment.order_id;
            const paymentId = payment.id;
            const amount = payment.amount / 100; // Convert from paise
            const email = payment.email || payment.notes?.email;
            const userId = payment.notes?.user_id || 'guest';

            // 3. Check if order already exists (from frontend verify)
            const { data: existingOrder } = await supabase
                .from('orders')
                .select('id')
                .eq('razorpay_order_id', orderId)
                .single();

            if (existingOrder) {
                console.log(`Order already exists for ${orderId}, skipping webhook processing.`);
                return NextResponse.json({ success: true, message: 'Order already processed' });
            }

            // 4. Get items from notes (we stored them in create-order)
            // Note: For webhook, we need to fetch items differently since they're not passed directly
            // The safest approach is to store pending order details in a separate table
            // For now, we'll create a basic order record

            // 5. Create order in DB
            const { data: orderData, error: orderError } = await supabase
                .from('orders')
                .insert({
                    user_id: userId !== 'guest' ? userId : null,
                    total_amount: amount,
                    status: 'completed',
                    currency: 'INR',
                    payment_id: paymentId,
                    razorpay_order_id: orderId
                })
                .select()
                .single();

            if (orderError) {
                console.error('Error creating order from webhook:', orderError);
                throw orderError;
            }

            console.log(`Order ${orderData.id} created via webhook for payment ${paymentId}`);

            // 6. Send notification email if we have email
            if (email) {
                try {
                    const emailHtml = await render(
                        PurchaseReceiptEmail({
                            customerName: email.split('@')[0],
                            orderId: orderData.id,
                            orderDate: new Date().toLocaleDateString('en-IN', { dateStyle: 'long' }),
                            items: [{ title: 'Dataset Purchase', price: amount }],
                            totalAmount: amount
                        })
                    );

                    await getResend().emails.send({
                        from: 'BuyDatabase.ai <orders@delivery.buydatabase.ai>',
                        to: email,
                        subject: 'Order Confirmed - BuyDatabase.ai',
                        html: emailHtml
                    });
                } catch (emailError) {
                    console.error('Webhook email error:', emailError);
                    // Don't fail the webhook if email fails
                }
            }

            return NextResponse.json({
                success: true,
                orderId: orderData.id,
                message: 'Payment captured and order created via webhook'
            });
        }

        // Handle payment.failed event
        if (eventType === 'payment.failed') {
            const payment = event.payload.payment.entity;
            console.log(`Payment failed: ${payment.id}, reason: ${payment.error_description}`);

            // Log failed payment for monitoring
            // You could store this in a failed_payments table for analysis

            return NextResponse.json({ success: true, message: 'Failed payment logged' });
        }

        // Handle other events
        return NextResponse.json({ success: true, message: `Event ${eventType} received` });

    } catch (error: any) {
        console.error('Webhook Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}

// Razorpay expects the webhook to respond quickly
export const runtime = 'nodejs';
export const maxDuration = 10;
