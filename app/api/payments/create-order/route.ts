import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

// Initialize Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { amount, currency = 'INR', receipt, notes } = body;

        if (!amount) {
            return NextResponse.json({ error: 'Amount is required' }, { status: 400 });
        }

        // Create Razorpay Order
        // Store email in notes so webhook can access it
        const order = await razorpay.orders.create({
            amount: Math.round(amount * 100), // Razorpay expects amount in paise
            currency,
            receipt: receipt || `order_${Date.now()}`,
            notes: {
                ...notes,
                email: notes?.email // Ensure email is in notes for webhook
            }
        });

        return NextResponse.json({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            key_id: process.env.RAZORPAY_KEY_ID
        });

    } catch (error: any) {
        console.error('Razorpay Order Error:', error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Failed to create order'
        }, { status: 500 });
    }
}
