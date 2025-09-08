import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Check if environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables!')
  console.error('Please create a .env.local file with the following variables:')
  console.error('NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co')
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here')
  console.error('')
  console.error('You can get these values from your Supabase project dashboard:')
  console.error('1. Go to https://supabase.com/dashboard')
  console.error('2. Select your project')
  console.error('3. Go to Settings > API')
  console.error('4. Copy the Project URL and anon/public key')
  
  // Create a mock client for development to prevent crashes
  console.warn('⚠️ Using mock Supabase client for development')
}

// Types pour TypeScript
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          phone: string | null
          avatar_url: string | null
          date_of_birth: string | null
          gender: string | null
          role: 'customer' | 'vendor' | 'admin'
          is_verified: boolean
          language: string
          currency: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          date_of_birth?: string | null
          gender?: string | null
          role?: 'customer' | 'vendor' | 'admin'
          is_verified?: boolean
          language?: string
          currency?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          phone?: string | null
          avatar_url?: string | null
          date_of_birth?: string | null
          gender?: string | null
          role?: 'customer' | 'vendor' | 'admin'
          is_verified?: boolean
          language?: string
          currency?: string
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          vendor_id: string | null
          category_id: string | null
          brand_id: string | null
          name: string
          slug: string
          description: string | null
          short_description: string | null
          price: number
          sale_price: number | null
          cost_price: number | null
          sku: string | null
          barcode: string | null
          stock_quantity: number
          low_stock_threshold: number
          weight: number | null
          dimensions: string | null
          status: 'draft' | 'active' | 'inactive' | 'out_of_stock'
          is_featured: boolean
          is_bestseller: boolean
          rating: number
          review_count: number
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          vendor_id?: string | null
          category_id?: string | null
          brand_id?: string | null
          name: string
          slug: string
          description?: string | null
          short_description?: string | null
          price: number
          sale_price?: number | null
          cost_price?: number | null
          sku?: string | null
          barcode?: string | null
          stock_quantity: number
          low_stock_threshold?: number
          weight?: number | null
          dimensions?: string | null
          status?: 'draft' | 'active' | 'inactive' | 'out_of_stock'
          is_featured?: boolean
          is_bestseller?: boolean
          rating?: number
          review_count?: number
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          vendor_id?: string | null
          category_id?: string | null
          brand_id?: string | null
          name?: string
          slug?: string
          description?: string | null
          short_description?: string | null
          price?: number
          sale_price?: number | null
          cost_price?: number | null
          sku?: string | null
          barcode?: string | null
          stock_quantity?: number
          low_stock_threshold?: number
          weight?: number | null
          dimensions?: string | null
          status?: 'draft' | 'active' | 'inactive' | 'out_of_stock'
          is_featured?: boolean
          is_bestseller?: boolean
          rating?: number
          review_count?: number
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          image_url: string | null
          parent_id: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          parent_id?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

// Create a single Supabase client instance to avoid multiple GoTrueClient instances
export const supabase = createClient<Database>(
  supabaseUrl && supabaseUrl !== 'your_supabase_project_url' ? supabaseUrl : 'https://mock.supabase.co',
  supabaseAnonKey && supabaseAnonKey !== 'your-anon-key-here' ? supabaseAnonKey : 'mock-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      // Add storage key to prevent conflicts
      storageKey: 'be-shop-auth'
    }
  }
)

// Export the same client with a different name for backward compatibility
export const supabaseClient = supabase
