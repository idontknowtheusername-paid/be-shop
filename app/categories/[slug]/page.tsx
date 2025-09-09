'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useCategories, useProducts } from '@/hooks/useSupabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { 
  Filter, 
  Grid, 
  List, 
  Star, 
  ShoppingCart, 
  Heart,
  ChevronRight,
  Home
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  sale_price: number | null
  rating: number
  review_count: number
  image_url?: string
  categories?: { name: string; slug: string }
}

export default function CategoryPage() {
  const params = useParams()
  const categorySlug = params.slug as string
  
  const { fetchCategoryBySlug } = useCategories()
  const { fetchProducts } = useProducts()
  
  const [category, setCategory] = useState<any>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Filtres
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('newest')
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    loadCategoryAndProducts()
  }, [categorySlug])

  const loadCategoryAndProducts = async () => {
    try {
      setLoading(true)
      
      // Charger la catégorie
      const categoryData = await fetchCategoryBySlug(categorySlug)
      setCategory(categoryData)
      
      // Charger les produits de la catégorie
      const productsData = await fetchProducts({ category: categorySlug })
      setProducts(productsData || [])
      
    } catch (err) {
      setError('Erreur lors du chargement de la catégorie')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter(product => {
    // Filtre par prix
    const price = product.sale_price || product.price
    if (price < priceRange[0] || price > priceRange[1]) return false
    
    // Filtre par recherche
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    // Filtre par note
    if (selectedRatings.length > 0 && !selectedRatings.includes(Math.floor(product.rating))) {
      return false
    }
    
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.sale_price || a.price) - (b.sale_price || b.price)
      case 'price-high':
        return (b.sale_price || b.price) - (a.sale_price || a.price)
      case 'rating':
        return b.rating - a.rating
      case 'reviews':
        return b.review_count - a.review_count
      default:
        return 0
    }
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(price)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <svg
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="be-container py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="md:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="h-64 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="be-container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Catégorie non trouvée</h1>
            <p className="text-gray-600 mb-4">{error || 'Cette catégorie n\'existe pas.'}</p>
            <Link href="/">
              <Button>
                <Home className="h-4 w-4 mr-2" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="be-container py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">Accueil</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/categories" className="hover:text-blue-600">Catégories</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* Header de la catégorie */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{category.name}</h1>
          {category.description && (
            <p className="text-gray-600">{category.description}</p>
          )}
          <p className="text-sm text-gray-500 mt-2">
            {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} trouvé{sortedProducts.length > 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtres */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Filtres</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Recherche */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Recherche</label>
                  <Input
                    placeholder="Rechercher un produit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Prix */}
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Prix: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={100000}
                    min={0}
                    step={1000}
                    className="w-full"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="text-sm font-medium mb-2 block">Notes</label>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={selectedRatings.includes(rating)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedRatings([...selectedRatings, rating])
                            } else {
                              setSelectedRatings(selectedRatings.filter(r => r !== rating))
                            }
                          }}
                        />
                        <label htmlFor={`rating-${rating}`} className="text-sm flex items-center space-x-1">
                          <span>{rating}+</span>
                          <div className="flex">
                            {renderStars(rating)}
                          </div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Produits */}
          <div className="lg:col-span-3">
            {/* Contrôles */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Plus récents</SelectItem>
                    <SelectItem value="price-low">Prix croissant</SelectItem>
                    <SelectItem value="price-high">Prix décroissant</SelectItem>
                    <SelectItem value="rating">Meilleures notes</SelectItem>
                    <SelectItem value="reviews">Plus d'avis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Grille de produits */}
            {sortedProducts.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {sortedProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-gray-100 relative">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          Aucune image
                        </div>
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 h-8 w-8 p-0"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      {product.sale_price && (
                        <Badge className="absolute top-2 left-2 bg-red-500">
                          -{Math.round(((product.price - product.sale_price) / product.price) * 100)}%
                        </Badge>
                      )}
                    </div>
                    
                    <CardContent className="p-4">
                      <Link href={`/products/${product.slug}`}>
                        <h3 className="font-semibold text-lg mb-2 hover:text-blue-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center space-x-1 mb-2">
                        {renderStars(product.rating)}
                        <span className="text-sm text-gray-600">({product.review_count})</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-4">
                        {product.sale_price ? (
                          <>
                            <span className="text-lg font-bold text-red-600">
                              {formatPrice(product.sale_price)}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(product.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold">
                            {formatPrice(product.price)}
                          </span>
                        )}
                      </div>
                      
                      <Button className="w-full">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Ajouter au panier
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-600 mb-4">
                  Aucun produit ne correspond à vos critères de recherche.
                </p>
                <Button variant="outline" onClick={() => {
                  setSearchQuery('')
                  setPriceRange([0, 100000])
                  setSelectedRatings([])
                }}>
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}


