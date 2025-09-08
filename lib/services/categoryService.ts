import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type Category = Database['public']['Tables']['categories']['Row']
type CategoryInsert = Database['public']['Tables']['categories']['Insert']
type CategoryUpdate = Database['public']['Tables']['categories']['Update']

export interface CategoryWithChildren extends Category {
  children?: CategoryWithChildren[]
  product_count?: number
}

export interface CategoryTree {
  id: string
  name: string
  slug: string
  description: string | null
  image_url: string | null
  children: CategoryTree[]
  product_count: number
}

class CategoryService {
  // Récupérer toutes les catégories
  async getAllCategories(): Promise<{ data: Category[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (error) throw error

      return {
        data,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erreur lors de la récupération des catégories'
      }
    }
  }

  // Récupérer les catégories principales (sans parent)
  async getMainCategories(): Promise<{ data: Category[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .is('parent_id', null)
        .order('sort_order', { ascending: true })

      if (error) throw error

      return {
        data,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erreur lors de la récupération des catégories principales'
      }
    }
  }

  // Récupérer les sous-catégories d'une catégorie
  async getSubCategories(parentId: string): Promise<{ data: Category[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .eq('parent_id', parentId)
        .order('sort_order', { ascending: true })

      if (error) throw error

      return {
        data,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erreur lors de la récupération des sous-catégories'
      }
    }
  }

  // Récupérer une catégorie par son slug
  async getCategoryBySlug(slug: string): Promise<{ data: Category | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single()

      if (error) throw error

      return {
        data,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Catégorie non trouvée'
      }
    }
  }

  // Récupérer une catégorie par son ID
  async getCategoryById(id: string): Promise<{ data: Category | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .eq('is_active', true)
        .single()

      if (error) throw error

      return {
        data,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Catégorie non trouvée'
      }
    }
  }

  // Récupérer l'arbre complet des catégories
  async getCategoryTree(): Promise<{ data: CategoryTree[] | null; error: string | null }> {
    try {
      // Récupérer toutes les catégories
      const { data: allCategories, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (error) throw error

      if (!allCategories) {
        return { data: [], error: null }
      }

      // Construire l'arbre des catégories
      const categoryTree = this.buildCategoryTree(allCategories)

      return {
        data: categoryTree,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erreur lors de la récupération de l\'arbre des catégories'
      }
    }
  }

  // Récupérer le chemin d'une catégorie (breadcrumb)
  async getCategoryPath(categoryId: string): Promise<{ data: Category[] | null; error: string | null }> {
    try {
      const path: Category[] = []
      let currentId = categoryId

      while (currentId) {
        const { data: category, error } = await supabase
          .from('categories')
          .select('*')
          .eq('id', currentId)
          .single()

        if (error) throw error

        if (category) {
          path.unshift(category)
          currentId = category.parent_id || ''
        } else {
          break
        }
      }

      return {
        data: path,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erreur lors de la récupération du chemin de la catégorie'
      }
    }
  }

  // Récupérer les catégories populaires (avec le nombre de produits)
  async getPopularCategories(limit: number = 10): Promise<{ data: CategoryWithChildren[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select(`
          *,
          product_count:products(count)
        `)
        .eq('is_active', true)
        .order('product_count', { ascending: false })
        .limit(limit)

      if (error) throw error

      return {
        data: data as CategoryWithChildren[],
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erreur lors de la récupération des catégories populaires'
      }
    }
  }

  // Créer une nouvelle catégorie
  async createCategory(categoryData: CategoryInsert): Promise<{ data: Category | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .insert(categoryData)
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
        error: error instanceof Error ? error.message : 'Erreur lors de la création de la catégorie'
      }
    }
  }

  // Mettre à jour une catégorie
  async updateCategory(
    id: string,
    updates: CategoryUpdate
  ): Promise<{ data: Category | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('categories')
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
        error: error instanceof Error ? error.message : 'Erreur lors de la mise à jour de la catégorie'
      }
    }
  }

  // Supprimer une catégorie
  async deleteCategory(id: string): Promise<{ error: string | null }> {
    try {
      // Vérifier s'il y a des sous-catégories
      const { data: subCategories } = await supabase
        .from('categories')
        .select('id')
        .eq('parent_id', id)

      if (subCategories && subCategories.length > 0) {
        return {
          error: 'Impossible de supprimer une catégorie qui contient des sous-catégories'
        }
      }

      // Vérifier s'il y a des produits dans cette catégorie
      const { data: products } = await supabase
        .from('products')
        .select('id')
        .eq('category_id', id)
        .limit(1)

      if (products && products.length > 0) {
        return {
          error: 'Impossible de supprimer une catégorie qui contient des produits'
        }
      }

      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)

      if (error) throw error

      return { error: null }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erreur lors de la suppression de la catégorie'
      }
    }
  }

  // Rechercher des catégories
  async searchCategories(query: string): Promise<{ data: Category[] | null; error: string | null }> {
    try {
      if (!query.trim()) {
        return { data: [], error: null }
      }

      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        .order('name', { ascending: true })

      if (error) throw error

      return {
        data,
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erreur lors de la recherche de catégories'
      }
    }
  }

  // Construire l'arbre des catégories
  private buildCategoryTree(categories: Category[]): CategoryTree[] {
    const categoryMap = new Map<string, CategoryTree>()
    const rootCategories: CategoryTree[] = []

    // Créer un map de toutes les catégories
    categories.forEach(category => {
      categoryMap.set(category.id, {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        image_url: category.image_url,
        children: [],
        product_count: 0
      })
    })

    // Construire l'arbre
    categories.forEach(category => {
      const categoryNode = categoryMap.get(category.id)!
      
      if (category.parent_id) {
        const parent = categoryMap.get(category.parent_id)
        if (parent) {
          parent.children.push(categoryNode)
        }
      } else {
        rootCategories.push(categoryNode)
      }
    })

    return rootCategories
  }
}

export const categoryService = new CategoryService()
