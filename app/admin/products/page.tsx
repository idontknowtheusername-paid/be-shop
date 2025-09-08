'use client'

import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  MoreHorizontal,
  Package,
  ArrowLeft,
  Download,
  Upload
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  sale_price: number | null
  stock_quantity: number
  status: 'active' | 'inactive' | 'draft' | 'out_of_stock'
  category: string
  brand: string
  image_url?: string
  created_at: string
  sales: number
}

export default function AdminProductsPage() {
  const { isAdmin } = useAuth()
  const [loading, setLoading] = useState(true)
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  // Mock data pour le développement
  useEffect(() => {
    setTimeout(() => {
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Smartphone Samsung Galaxy S23',
          slug: 'samsung-galaxy-s23',
          price: 450000,
          sale_price: 420000,
          stock_quantity: 15,
          status: 'active',
          category: 'Électronique',
          brand: 'Samsung',
          image_url: '/api/placeholder/100/100',
          created_at: '2024-01-15',
          sales: 45
        },
        {
          id: '2',
          name: 'Casque Bluetooth Sony WH-1000XM4',
          slug: 'sony-wh-1000xm4',
          price: 85000,
          sale_price: null,
          stock_quantity: 3,
          status: 'active',
          category: 'Électronique',
          brand: 'Sony',
          image_url: '/api/placeholder/100/100',
          created_at: '2024-01-14',
          sales: 23
        },
        {
          id: '3',
          name: 'Ordinateur portable HP Pavilion',
          slug: 'hp-pavilion-laptop',
          price: 350000,
          sale_price: 320000,
          stock_quantity: 0,
          status: 'out_of_stock',
          category: 'Informatique',
          brand: 'HP',
          image_url: '/api/placeholder/100/100',
          created_at: '2024-01-13',
          sales: 12
        },
        {
          id: '4',
          name: 'Montre connectée Apple Watch Series 8',
          slug: 'apple-watch-series-8',
          price: 280000,
          sale_price: null,
          stock_quantity: 8,
          status: 'active',
          category: 'Électronique',
          brand: 'Apple',
          image_url: '/api/placeholder/100/100',
          created_at: '2024-01-12',
          sales: 18
        },
        {
          id: '5',
          name: 'Sneakers Nike Air Max 270',
          slug: 'nike-air-max-270',
          price: 45000,
          sale_price: 38000,
          stock_quantity: 25,
          status: 'active',
          category: 'Sport',
          brand: 'Nike',
          image_url: '/api/placeholder/100/100',
          created_at: '2024-01-11',
          sales: 34
        }
      ]
      setProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(price)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Actif' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactif' },
      draft: { color: 'bg-yellow-100 text-yellow-800', label: 'Brouillon' },
      out_of_stock: { color: 'bg-red-100 text-red-800', label: 'Rupture' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive
    return React.createElement(Badge, { className: config.color }, config.label)
  }

  const filteredProducts = products.filter(product => {
    // Filtre par recherche
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    
    // Filtre par statut
    if (statusFilter !== 'all' && product.status !== statusFilter) {
      return false
    }
    
    // Filtre par catégorie
    if (categoryFilter !== 'all' && product.category !== categoryFilter) {
      return false
    }
    
    return true
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name)
      case 'price':
        return (a.sale_price || a.price) - (b.sale_price || b.price)
      case 'stock':
        return a.stock_quantity - b.stock_quantity
      case 'sales':
        return b.sales - a.sales
      case 'date':
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      default:
        return 0
    }
  })

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(sortedProducts.map(p => p.id))
    } else {
      setSelectedProducts([])
    }
  }

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts(prev => [...prev, productId])
    } else {
      setSelectedProducts(prev => prev.filter(id => id !== productId))
    }
  }

  const handleBulkDelete = () => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer ${selectedProducts.length} produit(s) ?`)) {
      setProducts(prev => prev.filter(p => !selectedProducts.includes(p.id)))
      setSelectedProducts([])
    }
  }

  const handleBulkStatusChange = (status: string) => {
    setProducts(prev => prev.map(p => 
      selectedProducts.includes(p.id) ? { ...p, status: status as any } : p
    ))
    setSelectedProducts([])
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="be-container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
            <p className="text-gray-600 mb-4">Vous devez être administrateur pour accéder à cette page.</p>
            <Link href="/dashboard">
              <Button>Retour au dashboard</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="be-container py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-12 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
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
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Link href="/admin" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Produits</h1>
          </div>
          <p className="text-gray-600">Gérez votre catalogue de produits</p>
        </div>

        {/* Actions principales */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Link href="/admin/products/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nouveau produit
              </Button>
            </Link>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Importer
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
          
          <div className="text-sm text-gray-600">
            {sortedProducts.length} produit{sortedProducts.length > 1 ? 's' : ''} trouvé{sortedProducts.length > 1 ? 's' : ''}
          </div>
        </div>

        {/* Filtres et recherche */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un produit..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="inactive">Inactif</SelectItem>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="out_of_stock">Rupture</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  <SelectItem value="Électronique">Électronique</SelectItem>
                  <SelectItem value="Informatique">Informatique</SelectItem>
                  <SelectItem value="Sport">Sport</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom</SelectItem>
                  <SelectItem value="price">Prix</SelectItem>
                  <SelectItem value="stock">Stock</SelectItem>
                  <SelectItem value="sales">Ventes</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Actions en lot */}
        {selectedProducts.length > 0 && (
          <Card className="mb-6 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-medium text-blue-800">
                    {selectedProducts.length} produit(s) sélectionné(s)
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setSelectedProducts([])}>
                    Annuler
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Select onValueChange={handleBulkStatusChange}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Changer statut" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Actif</SelectItem>
                      <SelectItem value="inactive">Inactif</SelectItem>
                      <SelectItem value="draft">Brouillon</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Liste des produits */}
        <Card>
          <CardHeader>
            <CardTitle>Produits</CardTitle>
            <CardDescription>
              Gérez votre catalogue de produits
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">
                      <Checkbox
                        checked={selectedProducts.length === sortedProducts.length && sortedProducts.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </th>
                    <th className="text-left p-2">Produit</th>
                    <th className="text-left p-2">Prix</th>
                    <th className="text-left p-2">Stock</th>
                    <th className="text-left p-2">Statut</th>
                    <th className="text-left p-2">Catégorie</th>
                    <th className="text-left p-2">Ventes</th>
                    <th className="text-left p-2">Date</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedProducts.map((product) => (
                    <tr key={product.id} className="border-b hover:bg-gray-50">
                      <td className="p-2">
                        <Checkbox
                          checked={selectedProducts.includes(product.id)}
                          onCheckedChange={(checked) => handleSelectProduct(product.id, checked as boolean)}
                        />
                      </td>
                      <td className="p-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            {product.image_url ? (
                              <img
                                src={product.image_url}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <Package className="h-6 w-6" />
                              </div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-gray-600">{product.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-2">
                        <div>
                          <p className="font-medium">
                            {product.sale_price ? formatPrice(product.sale_price) : formatPrice(product.price)}
                          </p>
                          {product.sale_price && (
                            <p className="text-sm text-gray-500 line-through">
                              {formatPrice(product.price)}
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="p-2">
                        <span className={product.stock_quantity < 5 ? 'text-red-600 font-medium' : ''}>
                          {product.stock_quantity}
                        </span>
                      </td>
                      <td className="p-2">
                        {getStatusBadge(product.status)}
                      </td>
                      <td className="p-2">
                        <span className="text-sm">{product.category}</span>
                      </td>
                      <td className="p-2">
                        <span className="text-sm">{product.sales}</span>
                      </td>
                      <td className="p-2">
                        <span className="text-sm">
                          {new Date(product.created_at).toLocaleDateString('fr-FR')}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex items-center space-x-1">
                          <Link href={`/admin/products/${product.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/products/${product.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
                                setProducts(prev => prev.filter(p => p.id !== product.id))
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-600 mb-4">
                  Aucun produit ne correspond à vos critères de recherche.
                </p>
                <Link href="/admin/products/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Créer un produit
                  </Button>
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  )
}


