import { supabase } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type CartItem = Database['public']['Tables']['cart_items']['Row']
type CartItemInsert = Database['public']['Tables']['cart_items']['Insert']
type CartItemUpdate = Database['public']['Tables']['cart_items']['Update']

export interface CartItemWithProduct extends CartItem {
  products: {
    id: string
    name: string
    slug: string
    price: number
    sale_price: number | null
    image_url: string | null
    stock_quantity: number
  } | null
}

export interface CartSummary {
  totalItems: number
  subtotal: number
  total: number
  shipping: number
  tax: number
}

export interface CartItemData {
  product_id: string
  quantity: number
  user_id: string
}

class CartService {
  // Récupérer le panier d'un utilisateur
  async getCart(userId: string): Promise<{ data: CartItemWithProduct[] | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          products (
            id,
            name,
            slug,
            price,
            sale_price,
            image_url,
            stock_quantity
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      return {
        data: data as CartItemWithProduct[],
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erreur lors de la récupération du panier'
      }
    }
  }

  // Ajouter un produit au panier
  async addToCart(itemData: CartItemData): Promise<{ data: CartItem | null; error: string | null }> {
    try {
      // Vérifier si le produit existe déjà dans le panier
      const { data: existingItem } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', itemData.user_id)
        .eq('product_id', itemData.product_id)
        .single()

      if (existingItem) {
        // Mettre à jour la quantité
        const newQuantity = existingItem.quantity + itemData.quantity
        return this.updateCartItem(existingItem.id, { quantity: newQuantity })
      } else {
        // Créer un nouvel élément
        const { data, error } = await supabase
          .from('cart_items')
          .insert(itemData)
          .select()
          .single()

        if (error) throw error

        return {
          data,
          error: null
        }
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erreur lors de l\'ajout au panier'
      }
    }
  }

  // Mettre à jour un élément du panier
  async updateCartItem(
    itemId: string,
    updates: CartItemUpdate
  ): Promise<{ data: CartItem | null; error: string | null }> {
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .update(updates)
        .eq('id', itemId)
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
        error: error instanceof Error ? error.message : 'Erreur lors de la mise à jour du panier'
      }
    }
  }

  // Supprimer un élément du panier
  async removeFromCart(itemId: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemId)

      if (error) throw error

      return { error: null }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erreur lors de la suppression du panier'
      }
    }
  }

  // Vider le panier d'un utilisateur
  async clearCart(userId: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId)

      if (error) throw error

      return { error: null }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erreur lors du vidage du panier'
      }
    }
  }

  // Calculer le résumé du panier
  async getCartSummary(userId: string): Promise<{ data: CartSummary | null; error: string | null }> {
    try {
      const { data: cartItems, error } = await this.getCart(userId)

      if (error) throw new Error(error)

      if (!cartItems || cartItems.length === 0) {
        return {
          data: {
            totalItems: 0,
            subtotal: 0,
            total: 0,
            shipping: 0,
            tax: 0
          },
          error: null
        }
      }

      let totalItems = 0
      let subtotal = 0

      cartItems.forEach(item => {
        const price = item.products?.sale_price || item.products?.price || 0
        totalItems += item.quantity
        subtotal += price * item.quantity
      })

      // Calculer les frais de livraison (exemple simple)
      const shipping = subtotal > 50000 ? 0 : 2000 // Gratuit au-dessus de 50 000 XOF

      // Calculer la taxe (TVA 18% au Bénin)
      const tax = subtotal * 0.18

      const total = subtotal + shipping + tax

      return {
        data: {
          totalItems,
          subtotal,
          total,
          shipping,
          tax
        },
        error: null
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : 'Erreur lors du calcul du résumé du panier'
      }
    }
  }

  // Vérifier la disponibilité des produits dans le panier
  async validateCart(userId: string): Promise<{ valid: boolean; errors: string[] }> {
    try {
      const { data: cartItems, error } = await this.getCart(userId)

      if (error) throw new Error(error)

      if (!cartItems || cartItems.length === 0) {
        return { valid: true, errors: [] }
      }

      const errors: string[] = []

      for (const item of cartItems) {
        if (!item.products) {
          errors.push(`Produit non trouvé pour l'élément ${item.id}`)
          continue
        }

        // Vérifier le stock
        if (item.quantity > item.products.stock_quantity) {
          errors.push(`Stock insuffisant pour ${item.products.name}. Disponible: ${item.products.stock_quantity}`)
        }

        // Vérifier si le produit est toujours actif
        const { data: product } = await supabase
          .from('products')
          .select('status')
          .eq('id', item.product_id)
          .single()

        if (product && product.status !== 'active') {
          errors.push(`${item.products.name} n'est plus disponible`)
        }
      }

      return {
        valid: errors.length === 0,
        errors
      }
    } catch (error) {
      return {
        valid: false,
        errors: [error instanceof Error ? error.message : 'Erreur lors de la validation du panier']
      }
    }
  }

  // Synchroniser le panier local avec la base de données
  async syncCart(userId: string, localCart: CartItemData[]): Promise<{ error: string | null }> {
    try {
      // Récupérer le panier actuel de la base de données
      const { data: dbCart } = await this.getCart(userId)
      const dbCartMap = new Map(dbCart?.map(item => [item.product_id, item]) || [])

      // Traiter chaque élément du panier local
      for (const localItem of localCart) {
        const dbItem = dbCartMap.get(localItem.product_id)

        if (dbItem) {
          // Mettre à jour si la quantité est différente
          if (dbItem.quantity !== localItem.quantity) {
            await this.updateCartItem(dbItem.id, { quantity: localItem.quantity })
          }
        } else {
          // Ajouter si l'élément n'existe pas en base
          await this.addToCart(localItem)
        }
      }

      return { error: null }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erreur lors de la synchronisation du panier'
      }
    }
  }

  // Récupérer le nombre d'éléments dans le panier
  async getCartItemCount(userId: string): Promise<{ count: number; error: string | null }> {
    try {
      const { count, error } = await supabase
        .from('cart_items')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)

      if (error) throw error

      return {
        count: count || 0,
        error: null
      }
    } catch (error) {
      return {
        count: 0,
        error: error instanceof Error ? error.message : 'Erreur lors du comptage du panier'
      }
    }
  }

  // Mettre à jour les prix du panier (en cas de changement de prix)
  async updateCartPrices(userId: string): Promise<{ error: string | null }> {
    try {
      const { data: cartItems, error } = await this.getCart(userId)

      if (error) throw new Error(error)

      if (!cartItems) return { error: null }

      for (const item of cartItems) {
        if (item.products) {
          const currentPrice = item.products.sale_price || item.products.price
          if (currentPrice !== item.price) {
            await this.updateCartItem(item.id, { price: currentPrice })
          }
        }
      }

      return { error: null }
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : 'Erreur lors de la mise à jour des prix'
      }
    }
  }
}

export const cartService = new CartService()
