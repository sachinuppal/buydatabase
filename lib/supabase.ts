
import { createClient } from '@supabase/supabase-js'

// Provide fallbacks to prevent build-time crashes if env vars are missing
// The client will still fail at runtime if not configured, which is expected.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
