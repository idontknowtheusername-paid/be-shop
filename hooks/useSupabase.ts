import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type Profile = Database['public']['Tables']['profiles']['Row']
type Product = Database['public']['Tables']['products']['Row']
type Category = Database['public']['Tables']['categories']['Row']

// Hook pour gérer l'état de chargement et les erreurs
export const useSupabaseQuery = <T>() => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reset = () => {
    setData(null)
    setLoading(true)
    setError(null)
  }

  return { data, loading, error, setData, setLoading, setError, reset }
}

// Hook pour les profils utilisateurs
export const useProfiles = () => {
  const { data: profiles, loading, error, setData, setLoading, setError } = useSupabaseQuery<Profile[]>()

  const fetchProfiles = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const createProfile = async (profile: Database['public']['Tables']['profiles']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert(profile)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (err) {
      throw err instanceof Error ? err.message : 'Erreur lors de la création du profil'
    }
  }

  const updateProfile = async (id: string, updates: Database['public']['Tables']['profiles']['Update']) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (err) {
      throw err instanceof Error ? err.message : 'Erreur lors de la mise à jour du profil'
    }
  }

  return {
    profiles,
    loading,
    error,
    fetchProfiles,
    createProfile,
    updateProfile
  }
}

// Hook pour les produits
export const useProducts = () => {
  const { data: products, loading, error, setData, setLoading, setError } = useSupabaseQuery<Product[]>()

  const fetchProducts = async (options?: {
    category?: string
    featured?: boolean
    limit?: number
    offset?: number
  }) => {
    try {
      setLoading(true)
      let query = supabase
        .from('products')
        .select('*, categories(name, slug), brands(name, slug)')
        .eq('status', 'active')

      if (options?.category) {
        query = query.eq('categories.slug', options.category)
      }

      if (options?.featured) {
        query = query.eq('is_featured', true)
      }

      if (options?.limit) {
        query = query.limit(options.limit)
      }

      if (options?.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      setData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const fetchProductBySlug = async (slug: string) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name, slug), brands(name, slug)')
        .eq('slug', slug)
        .eq('status', 'active')
        .single()

      if (error) throw error
      return data
    } catch (err) {
      throw err instanceof Error ? err.message : 'Produit non trouvé'
    }
  }

  const createProduct = async (product: Database['public']['Tables']['products']['Insert']) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert(product)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (err) {
      throw err instanceof Error ? err.message : 'Erreur lors de la création du produit'
    }
  }

  const updateProduct = async (id: string, updates: Database['public']['Tables']['products']['Update']) => {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error
      return data
    } catch (err) {
      throw err instanceof Error ? err.message : 'Erreur lors de la mise à jour du produit'
    }
  }

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductBySlug,
    createProduct,
    updateProduct
  }
}

// Hook pour les catégories
export const useCategories = () => {
  const { data: categories, loading, error, setData, setLoading, setError } = useSupabaseQuery<Category[]>()

  const fetchCategories = async (parentId?: string) => {
    try {
      setLoading(true)
      let query = supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)

      if (parentId) {
        query = query.eq('parent_id', parentId)
      } else {
        query = query.is('parent_id', null)
      }

      const { data, error } = await query.order('sort_order', { ascending: true })

      if (error) throw error
      setData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue')
    } finally {
      setLoading(false)
    }
  }

  const fetchCategoryBySlug = async (slug: string) => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

      if (error) throw error
      return data
    } catch (err) {
      throw err instanceof Error ? err.message : 'Catégorie non trouvée'
    }
  }

  return {
    categories,
    loading,
    error,
    fetchCategories,
    fetchCategoryBySlug
  }
}

// Hook pour la recherche
export const useSearch = () => {
  const { data: results, loading, error, setData, setLoading, setError } = useSupabaseQuery<Product[]>()

  const searchProducts = async (query: string, options?: {
    category?: string
    limit?: number
  }) => {
    if (!query.trim()) {
      setData([])
      return
    }

    try {
      setLoading(true)
      let supabaseQuery = supabase
        .from('products')
        .select('*, categories(name, slug), brands(name, slug)')
        .eq('status', 'active')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)

      if (options?.category) {
        supabaseQuery = supabaseQuery.eq('categories.slug', options.category)
      }

      if (options?.limit) {
        supabaseQuery = supabaseQuery.limit(options.limit)
      }

      const { data, error } = await supabaseQuery.order('name', { ascending: true })

      if (error) throw error
      setData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de la recherche')
    } finally {
      setLoading(false)
    }
  }

  return {
    results,
    loading,
    error,
    searchProducts
  }
}
