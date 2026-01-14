import * as React from 'react';

interface OrderItem {
    title: string;
    price: number;
    download_url?: string;
}

interface PurchaseReceiptEmailProps {
    customerName?: string;
    orderId: string;
    orderDate: string;
    items: OrderItem[];
    totalAmount: number;
}

export function PurchaseReceiptEmail({
    customerName = 'Valued Customer',
    orderId,
    orderDate,
    items,
    totalAmount
}: PurchaseReceiptEmailProps) {
    return (
        <html>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Your Order Confirmation - BuyDatabase.ai</title>
            </head>
            <body style={{ fontFamily: 'system-ui, -apple-system, sans-serif', backgroundColor: '#f4f4f5', margin: 0, padding: 0 }}>
                <table width="100%" cellPadding={0} cellSpacing={0} style={{ backgroundColor: '#f4f4f5', padding: '40px 20px' }}>
                    <tr>
                        <td align="center">
                            <table width="600" cellPadding={0} cellSpacing={0} style={{ backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                {/* Header */}
                                <tr>
                                    <td style={{ backgroundColor: '#0f172a', padding: '32px 40px', textAlign: 'center' }}>
                                        <h1 style={{ color: '#ffffff', fontSize: '24px', margin: 0, fontWeight: 700 }}>
                                            BuyDatabase.ai
                                        </h1>
                                        <p style={{ color: '#94a3b8', fontSize: '14px', margin: '8px 0 0' }}>
                                            Audience Intelligence Platform
                                        </p>
                                    </td>
                                </tr>

                                {/* Success Banner */}
                                <tr>
                                    <td style={{ padding: '40px 40px 20px', textAlign: 'center' }}>
                                        <div style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '12px 24px', borderRadius: '8px', display: 'inline-block', fontSize: '14px', fontWeight: 600 }}>
                                            ✓ Order Confirmed
                                        </div>
                                        <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0f172a', margin: '24px 0 8px' }}>
                                            Thank You for Your Purchase!
                                        </h2>
                                        <p style={{ color: '#64748b', fontSize: '16px', margin: 0 }}>
                                            Hi {customerName}, your dataset is ready.
                                        </p>
                                    </td>
                                </tr>

                                {/* Order Details */}
                                <tr>
                                    <td style={{ padding: '20px 40px' }}>
                                        <table width="100%" style={{ backgroundColor: '#f8fafc', borderRadius: '8px', padding: '16px' }}>
                                            <tr>
                                                <td style={{ fontSize: '14px', color: '#64748b' }}>Order ID</td>
                                                <td style={{ fontSize: '14px', color: '#0f172a', fontWeight: 600, textAlign: 'right' }}>{orderId.slice(0, 8)}...</td>
                                            </tr>
                                            <tr>
                                                <td style={{ fontSize: '14px', color: '#64748b', paddingTop: '8px' }}>Date</td>
                                                <td style={{ fontSize: '14px', color: '#0f172a', textAlign: 'right', paddingTop: '8px' }}>{orderDate}</td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                {/* Items */}
                                <tr>
                                    <td style={{ padding: '20px 40px' }}>
                                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0f172a', margin: '0 0 16px' }}>
                                            Your Items
                                        </h3>
                                        <table width="100%" cellPadding={0} cellSpacing={0}>
                                            {items.map((item, index) => (
                                                <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                                                    <td style={{ padding: '16px 0' }}>
                                                        <div style={{ fontSize: '15px', fontWeight: 500, color: '#0f172a' }}>{item.title}</div>
                                                        {item.download_url && (
                                                            <a
                                                                href={item.download_url}
                                                                style={{
                                                                    display: 'inline-block',
                                                                    marginTop: '8px',
                                                                    backgroundColor: '#3b82f6',
                                                                    color: '#ffffff',
                                                                    padding: '8px 16px',
                                                                    borderRadius: '6px',
                                                                    fontSize: '13px',
                                                                    fontWeight: 600,
                                                                    textDecoration: 'none'
                                                                }}
                                                            >
                                                                📥 Download Dataset
                                                            </a>
                                                        )}
                                                    </td>
                                                    <td style={{ padding: '16px 0', textAlign: 'right', fontSize: '15px', fontWeight: 600, color: '#0f172a' }}>
                                                        ₹{item.price.toLocaleString()}
                                                    </td>
                                                </tr>
                                            ))}
                                        </table>
                                    </td>
                                </tr>

                                {/* Total */}
                                <tr>
                                    <td style={{ padding: '20px 40px' }}>
                                        <table width="100%" style={{ backgroundColor: '#f1f5f9', borderRadius: '8px', padding: '16px' }}>
                                            <tr>
                                                <td style={{ fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>Total Paid</td>
                                                <td style={{ fontSize: '24px', fontWeight: 700, color: '#0f172a', textAlign: 'right' }}>
                                                    ₹{totalAmount.toLocaleString()}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                {/* Footer */}
                                <tr>
                                    <td style={{ padding: '40px', backgroundColor: '#f8fafc', textAlign: 'center' }}>
                                        <p style={{ fontSize: '14px', color: '#64748b', margin: '0 0 16px' }}>
                                            Questions? Reply to this email or contact <a href="mailto:support@buydatabase.ai" style={{ color: '#3b82f6' }}>support@buydatabase.ai</a>
                                        </p>
                                        <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
                                            © {new Date().getFullYear()} BuyDatabase.ai. All rights reserved.
                                        </p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
    );
}
