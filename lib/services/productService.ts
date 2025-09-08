import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type Product = Database['public']['Tables']['products']['Row']
type ProductInsert = Database['public']['Tables']['products']['Insert']
type ProductUpdate = Database['public']['Tables']['products']['Update']

export interface ProductWithRelations extends Product {
  categories: {
    name: string
    slug: string
  } | null
  brands: {
    name: string
    slug: string
  } | null
}

export interface ProductFilters {
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  featured?: boolean
  bestseller?: boolean
  inStock?: boolean
  search?: string
}

export interface ProductSort {
  field: 'name' | 'price' | 'rating' | 'created_at' | 'view_count'
  order: 'asc' | 'desc'
}

export interface ProductPagination {
  page: number
  limit: number
}

export interface ProductListResponse {
  products: ProductWithRelations[]
  total: number
  page: number
  totalPages: number
  hasMore: boolean
}

class ProductService {
  // Récupérer tous les produits avec pagination et filtres
  async getProducts(
    filters: ProductFilters = {},
    sort: ProductSort = { field: 'created_at', order: 'desc' },
    pagination: ProductPagination = { page: 1, limit: 20 }
  ): Promise<{ data: ProductListResponse | null; error: string | null }> {
    try {
      let query = supabase
        .from('products')
        .select('*, categories(name, slug), brands(name, slug)', { count: 'exact' })
        .eq('status', 'active')

      // Appliquer les filtres
      if (filters.category) {
        query = query.eq('categories.slug', filters.category)
      }

      if (filters.brand) {
        query = query.eq('brands.slug', filters.brand)
      }

      if (filters.minPrice !== undefined) {
        query = query.gte('price', filters.minPrice)
      }

      if (filters.maxPrice !== undefined) {
        query = query.lte('price', filters.maxPrice)
      }

      if (filters.featured) {
        query = query.eq('is_featured', true)
      }

      if (filters.bestseller) {
        query = query.eq('is_bestseller', true)
      }

      if (filters.inStock) {
        query = query.gt('stock_quantity', 0)
      }

      if (filters.search) {
        query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
      }

      // Appliquer le tri
      query = query.order(sort.field, { ascending: sort.order === 'asc' })

      // Appliquer la pagination
      const offset = (pagination.page - 1) * pagination.limit
      query = query.range(offset, offset + pagination.limit - 1)

      const { data: products, error, count } = await query

      if (error) throw error

      const total = count || 0
      const totalPages = Math.ceil(total / pagination.limit)
      const hasMore = pagination.page < totalPages

      return {
        data: {
          products: products as ProductWithRelations[],
          total,
          page: pagination.page,
          totalPages,
          hasMore
        },
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erreur lors de la récupération des produits'
      }
    }
  }

  // Récupérer un produit par son slug
  async getProductBySlug(slug: string): Promise<{ data: ProductWithRelations | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name, slug), brands(name, slug)')
        .eq('slug', slug)
        .eq('status', 'active')
        .single()

      if (error) throw error

      // Incrémenter le compteur de vues
      if (data) {
        await this.incrementViewCount(data.id)
      }

      return {
        data: data as ProductWithRelations,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Produit non trouvé'
      }
    }
  }

  // Récupérer un produit par son ID
  async getProductById(id: string): Promise<{ data: ProductWithRelations | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name, slug), brands(name, slug)')
        .eq('id', id)
        .eq('status', 'active')
        .single()

      if (error) throw error

      return {
        data: data as ProductWithRelations,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Produit non trouvé'
      }
    }
  }

  // Récupérer les produits vedettes
  async getFeaturedProducts(limit: number = 10): Promise<{ data: ProductWithRelations[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name, slug), brands(name, slug)')
        .eq('status', 'active')
        .eq('is_featured', true)
        .order('rating', { ascending: false })
        .limit(limit)

      if (error) throw error

      return {
        data: data as ProductWithRelations[],
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erreur lors de la récupération des produits vedettes'
      }
    }
  }

  // Récupérer les meilleurs vendeurs
  async getBestsellers(limit: number = 10): Promise<{ data: ProductWithRelations[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name, slug), brands(name, slug)')
        .eq('status', 'active')
        .eq('is_bestseller', true)
        .order('rating', { ascending: false })
        .limit(limit)

      if (error) throw error

      return {
        data: data as ProductWithRelations[],
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erreur lors de la récupération des meilleurs vendeurs'
      }
    }
  }

  // Récupérer les produits similaires
  async getSimilarProducts(
    productId: string,
    categoryId: string,
    limit: number = 6
  ): Promise<{ data: ProductWithRelations[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*, categories(name, slug), brands(name, slug)')
        .eq('status', 'active')
        .eq('category_id', categoryId)
        .neq('id', productId)
        .order('rating', { ascending: false })
        .limit(limit)

      if (error) throw error

      return {
        data: data as ProductWithRelations[],
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erreur lors de la récupération des produits similaires'
      }
    }
  }

  // Rechercher des produits
  async searchProducts(
    query: string,
    options: { limit?: number; category?: string } = {}
  ): Promise<{ data: ProductWithRelations[] | null; error: string | null }> {
    try {
      if (!query.trim()) {
        return { data: [], error: null }
      }

      let supabaseQuery = supabase
        .from('products')
        .select('*, categories(name, slug), brands(name, slug)')
        .eq('status', 'active')
        .or(`name.ilike.%${query}%,description.ilike.%${query}%,short_description.ilike.%${query}%`)

      if (options.category) {
        supabaseQuery = supabaseQuery.eq('categories.slug', options.category)
      }

      if (options.limit) {
        supabaseQuery = supabaseQuery.limit(options.limit)
      }

      const { data, error } = await supabaseQuery.order('name', { ascending: true })

      if (error) throw error

      return {
        data: data as ProductWithRelations[],
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erreur lors de la recherche'
      }
    }
  }

  // Créer un nouveau produit
  async createProduct(productData: ProductInsert): Promise<{ data: Product | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single()

      if (error) throw error

      return {
        data,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erreur lors de la création du produit'
      }
    }
  }

  // Mettre à jour un produit
  async updateProduct(
    id: string,
    updates: ProductUpdate
  ): Promise<{ data: Product | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      return {
        data,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erreur lors de la mise à jour du produit'
      }
    }
  }

  // Supprimer un produit
  async deleteProduct(id: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)

      if (error) throw error

      return { error: null }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erreur lors de la suppression du produit'
      }
    }
  }

  // Incrémenter le compteur de vues
  async incrementViewCount(productId: string): Promise<void> {
    try {
      await supabase.rpc('increment_product_views', { product_id: productId })
    } catch (error) {
      console.error('Erreur lors de l\'incrémentation des vues:', error)
    }
  }

  // Mettre à jour le stock
  async updateStock(productId: string, quantity: number): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('products')
        .update({ stock_quantity: quantity })
        .eq('id', productId)

      if (error) throw error

      return { error: null }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erreur lors de la mise à jour du stock'
      }
    }
  }

  // Vérifier la disponibilité du stock
  async checkStockAvailability(productId: string, requestedQuantity: number): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('stock_quantity')
        .eq('id', productId)
        .single()

      if (error) throw error

      return data.stock_quantity >= requestedQuantity
    } catch (error) {
      console.error('Erreur lors de la vérification du stock:', error)
      return false
    }
  }
}

export const productService = new ProductService()
