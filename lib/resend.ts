import { Resend } from 'resend';

// Lazy initialization to avoid build-time errors when env vars are not present
let resendClient: Resend | null = null;

export function getResend(): Resend {
    // Only initialize when called to avoid build-time errors
    if (!resendClient) {
        const apiKey = process.env.RESEND_API_KEY;

        // During build time, this might be called by static analysis or some edge cases
        // We return a mock or throw a helpful error at runtime
        if (!apiKey) {
            // Check if we are building - if so, don't crash, just validation
            if (process.env.NODE_ENV === 'production' && process.env.NEXT_PHASE === 'phase-production-build') {
                console.warn('RESEND_API_KEY missing during build - skipping initialization');
                // Return a dummy to pass build if needed, though usually lazy init prevents this
                return new Resend('re_123_dummy_key_for_build');
            }
            throw new Error('RESEND_API_KEY environment variable is not set');
        }
        resendClient = new Resend(apiKey);
    }
    return resendClient;
}
