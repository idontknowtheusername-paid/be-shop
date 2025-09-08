// Export de tous les services Supabase
export { authService } from './authService'
export { productService } from './productService'
export { categoryService } from './categoryService'
export { cartService } from './cartService'

// Export des types
export type { AuthUser, SignUpData, SignInData, UpdateProfileData } from './authService'
export type { 
  ProductWithRelations, 
  ProductFilters, 
  ProductSort, 
  ProductPagination, 
  ProductListResponse 
} from './productService'
export type { CategoryWithChildren, CategoryTree } from './categoryService'
export type { CartItemWithProduct, CartSummary, CartItemData } from './cartService'
