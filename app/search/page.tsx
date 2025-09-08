'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useSearch } from '@/hooks/useSupabase'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  Star, 
  ShoppingCart, 
  Heart,
  X,
  TrendingUp
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
  categories?: { name: string; slug: string }
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  
  const { results, loading, error, searchProducts } = useSearch()
  
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('relevance')
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedRatings, setSelectedRatings] = useState<number[]>([])
  const [showFilters, setShowFilters] = useState(false)

  // Catégories disponibles (mock data)
  const availableCategories = [
    { id: 'electronics', name: 'Électronique', count: 156 },
    { id: 'fashion', name: 'Mode', count: 89 },
    { id: 'home-garden', name: 'Maison & Jardin', count: 234 },
    { id: 'beauty-health', name: 'Beauté & Santé', count: 67 },
    { id: 'sports', name: 'Sport & Loisirs', count: 123 },
    { id: 'food', name: 'Alimentation', count: 45 }
  ]

  // Marques populaires (mock data)
  const popularBrands = [
    { id: 'samsung', name: 'Samsung', count: 23 },
    { id: 'apple', name: 'Apple', count: 18 },
    { id: 'sony', name: 'Sony', count: 15 },
    { id: 'nike', name: 'Nike', count: 34 },
    { id: 'adidas', name: 'Adidas', count: 28 }
  ]

  useEffect(() => {
    if (initialQuery) {
      performSearch()
    }
  }, [initialQuery])

  const performSearch = async () => {
    if (!searchQuery.trim()) return
    
    await searchProducts(searchQuery, {
      category: selectedCategories.length === 1 ? selectedCategories[0] : undefined,
      limit: 50
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch()
  }

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const handleRatingToggle = (rating: number) => {
    setSelectedRatings(prev => 
      prev.includes(rating)
        ? prev.filter(r => r !== rating)
        : [...prev, rating]
    )
  }

  const clearFilters = () => {
    setPriceRange([0, 100000])
    setSelectedCategories([])
    setSelectedRatings([])
    setSortBy('relevance')
  }

  const filteredResults = results?.filter(product => {
    // Filtre par prix
    const price = product.sale_price || product.price
    if (price < priceRange[0] || price > priceRange[1]) return false
    
    // Filtre par note
    if (selectedRatings.length > 0 && !selectedRatings.includes(Math.floor(product.rating))) {
      return false
    }
    
    return true
  }) || []

  const sortedResults = [...filteredResults].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.sale_price || a.price) - (b.sale_price || b.price)
      case 'price-high':
        return (b.sale_price || b.price) - (a.sale_price || a.price)
      case 'rating':
        return b.rating - a.rating
      case 'reviews':
        return b.review_count - a.review_count
      case 'newest':
        return 0 // TODO: Ajouter date de création
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
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="be-container py-8">
        {/* Barre de recherche */}
        <div className="mb-8">
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Rechercher des produits, marques, catégories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit">
                Rechercher
              </Button>
            </div>
          </form>
        </div>

        {/* Résultats de recherche */}
        {searchQuery && (
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Résultats pour "{searchQuery}"
                </h1>
                <p className="text-gray-600 mt-1">
                  {sortedResults.length} produit{sortedResults.length > 1 ? 's' : ''} trouvé{sortedResults.length > 1 ? 's' : ''}
                </p>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="hidden md:flex"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filtres
                </Button>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Pertinence</SelectItem>
                    <SelectItem value="price-low">Prix croissant</SelectItem>
                    <SelectItem value="price-high">Prix décroissant</SelectItem>
                    <SelectItem value="rating">Meilleures notes</SelectItem>
                    <SelectItem value="reviews">Plus d'avis</SelectItem>
                    <SelectItem value="newest">Plus récents</SelectItem>
                  </SelectContent>
                </Select>

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
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtres */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Filter className="h-5 w-5" />
                    <span>Filtres</span>
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-sm"
                  >
                    Effacer
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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

                <Separator />

                {/* Catégories */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Catégories</label>
                  <div className="space-y-2">
                    {availableCategories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={() => handleCategoryToggle(category.id)}
                        />
                        <label htmlFor={`category-${category.id}`} className="text-sm flex items-center justify-between w-full">
                          <span>{category.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {category.count}
                          </Badge>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Marques */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Marques populaires</label>
                  <div className="space-y-2">
                    {popularBrands.map((brand) => (
                      <div key={brand.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand.id}`}
                        />
                        <label htmlFor={`brand-${brand.id}`} className="text-sm flex items-center justify-between w-full">
                          <span>{brand.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {brand.count}
                          </Badge>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Notes */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Notes</label>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={selectedRatings.includes(rating)}
                          onCheckedChange={() => handleRatingToggle(rating)}
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

          {/* Résultats */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-64 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <h3 className="text-lg font-semibold mb-2">Erreur de recherche</h3>
                <p className="text-gray-600">{error}</p>
              </div>
            ) : sortedResults.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {sortedResults.map((product) => (
                  <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square bg-gray-100 relative">
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <span className="text-sm">Image produit</span>
                      </div>
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
            ) : searchQuery ? (
              <div className="text-center py-12">
                <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun résultat trouvé</h3>
                <p className="text-gray-600 mb-6">
                  Aucun produit ne correspond à votre recherche "{searchQuery}"
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Suggestions :</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    <li>• Vérifiez l'orthographe des mots-clés</li>
                    <li>• Essayez des mots-clés plus généraux</li>
                    <li>• Utilisez moins de mots-clés</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Recherchez des produits</h3>
                <p className="text-gray-600">
                  Entrez un mot-clé dans la barre de recherche pour commencer
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}


