'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Store, 
  Package, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Users, 
  Star,
  Plus,
  Eye,
  Edit,
  Download,
  Calendar,
  BarChart3,
  Activity,
  Settings,
  MessageSquare
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface VendorStats {
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  totalCustomers: number
  pendingOrders: number
  averageRating: number
  commissionRate: number
}

interface VendorProduct {
  id: string
  name: string
  price: number
  sale_price: number | null
  stock_quantity: number
  status: 'active' | 'inactive' | 'pending_approval' | 'rejected'
  sales: number
  rating: number
  review_count: number
  image_url?: string
}

interface VendorOrder {
  id: string
  orderNumber: string
  customerName: string
  total: number
  commission: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
  items: number
}

export default function VendorDashboard() {
  const { user, isVendor } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<VendorStats>({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    averageRating: 0,
    commissionRate: 15
  })

  // Mock data pour le développement
  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalProducts: 24,
        totalOrders: 156,
        totalRevenue: 2345000,
        totalCustomers: 89,
        pendingOrders: 8,
        averageRating: 4.7,
        commissionRate: 15
      })
      setLoading(false)
    }, 1000)
  }, [])

  const vendorProducts: VendorProduct[] = [
    {
      id: '1',
      name: 'Smartphone Samsung Galaxy S23',
      price: 450000,
      sale_price: 420000,
      stock_quantity: 15,
      status: 'active',
      sales: 45,
      rating: 4.8,
      review_count: 23,
      image_url: '/api/placeholder/100/100'
    },
    {
      id: '2',
      name: 'Casque Bluetooth Sony WH-1000XM4',
      price: 85000,
      sale_price: null,
      stock_quantity: 3,
      status: 'active',
      sales: 23,
      rating: 4.6,
      review_count: 12,
      image_url: '/api/placeholder/100/100'
    },
    {
      id: '3',
      name: 'Montre connectée Apple Watch Series 8',
      price: 280000,
      sale_price: null,
      stock_quantity: 8,
      status: 'pending_approval',
      sales: 0,
      rating: 0,
      review_count: 0,
      image_url: '/api/placeholder/100/100'
    }
  ]

  const vendorOrders: VendorOrder[] = [
    {
      id: '1',
      orderNumber: 'CMD-2024-001',
      customerName: 'Jean Dupont',
      total: 125000,
      commission: 18750,
      status: 'pending',
      date: '2024-01-15',
      items: 2
    },
    {
      id: '2',
      orderNumber: 'CMD-2024-002',
      customerName: 'Marie Martin',
      total: 89000,
      commission: 13350,
      status: 'processing',
      date: '2024-01-14',
      items: 1
    },
    {
      id: '3',
      orderNumber: 'CMD-2024-003',
      customerName: 'Pierre Durand',
      total: 234000,
      commission: 35100,
      status: 'shipped',
      date: '2024-01-13',
      items: 3
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(price)
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', label: 'En attente' },
      processing: { color: 'bg-blue-100 text-blue-800', label: 'En cours' },
      shipped: { color: 'bg-purple-100 text-purple-800', label: 'Expédié' },
      delivered: { color: 'bg-green-100 text-green-800', label: 'Livré' },
      cancelled: { color: 'bg-red-100 text-red-800', label: 'Annulé' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const getProductStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-100 text-green-800', label: 'Actif' },
      inactive: { color: 'bg-gray-100 text-gray-800', label: 'Inactif' },
      pending_approval: { color: 'bg-yellow-100 text-yellow-800', label: 'En attente' },
      rejected: { color: 'bg-red-100 text-red-800', label: 'Rejeté' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive
    return <Badge className={config.color}>{config.label}</Badge>
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ))
  }

  if (!isVendor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="be-container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
            <p className="text-gray-600 mb-4">Vous devez être vendeur pour accéder à cette page.</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="h-96 bg-gray-200 rounded"></div>
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Vendeur</h1>
              <p className="text-gray-600">Gérez votre boutique et vos ventes</p>
            </div>
            <div className="flex items-center space-x-2">
              <Link href="/vendor/settings">
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Paramètres
                </Button>
              </Link>
              <Link href="/vendor/support">
                <Button variant="outline">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Support
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produits</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                {vendorProducts.filter(p => p.status === 'pending_approval').length} en attente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                {stats.pendingOrders} en attente
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenus</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                Commission {stats.commissionRate}%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Note moyenne</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
              <div className="flex items-center space-x-1 mt-1">
                {renderStars(stats.averageRating)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contenu principal */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="analytics">Analyses</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Commandes récentes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Commandes récentes</span>
                    <Link href="/vendor/orders">
                      <Button variant="outline" size="sm">
                        Voir tout
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vendorOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{order.orderNumber}</span>
                            {getStatusBadge(order.status)}
                          </div>
                          <p className="text-sm text-gray-600">{order.customerName}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(order.date).toLocaleDateString('fr-FR')} • {order.items} article(s)
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatPrice(order.total)}</p>
                          <p className="text-xs text-green-600">
                            +{formatPrice(order.commission)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Produits populaires */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Produits populaires</span>
                    <Link href="/vendor/products">
                      <Button variant="outline" size="sm">
                        Voir tout
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {vendorProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{product.name}</span>
                            {getProductStatusBadge(product.status)}
                          </div>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex">
                              {renderStars(product.rating)}
                            </div>
                            <span className="text-sm text-gray-600">({product.review_count})</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Stock: {product.stock_quantity} | Ventes: {product.sales}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            {product.sale_price ? formatPrice(product.sale_price) : formatPrice(product.price)}
                          </p>
                          <Link href={`/vendor/products/${product.id}`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Graphiques */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Ventes mensuelles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                      <p>Graphique des ventes à venir</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenus et commissions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Activity className="h-12 w-12 mx-auto mb-2" />
                      <p>Graphique des revenus à venir</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Gestion des produits</span>
                  <Link href="/vendor/products/new">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Nouveau produit
                    </Button>
                  </Link>
                </CardTitle>
                <CardDescription>
                  Gérez votre catalogue de produits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Package className="h-12 w-12 mx-auto mb-4" />
                  <p>Page de gestion des produits à venir</p>
                  <Link href="/vendor/products" className="mt-4 inline-block">
                    <Button>Voir mes produits</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des commandes</CardTitle>
                <CardDescription>
                  Gérez les commandes de vos produits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4" />
                  <p>Page de gestion des commandes à venir</p>
                  <Link href="/vendor/orders" className="mt-4 inline-block">
                    <Button>Voir mes commandes</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Analyses et rapports</CardTitle>
                <CardDescription>
                  Consultez vos performances et analyses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                  <p>Page d'analyses à venir</p>
                  <Link href="/vendor/analytics" className="mt-4 inline-block">
                    <Button>Voir les analyses</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Actions rapides */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link href="/vendor/products/new">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <Plus className="h-6 w-6 mb-2" />
                    <span>Nouveau produit</span>
                  </Button>
                </Link>
                <Link href="/vendor/orders">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <ShoppingBag className="h-6 w-6 mb-2" />
                    <span>Voir commandes</span>
                  </Button>
                </Link>
                <Link href="/vendor/analytics">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <BarChart3 className="h-6 w-6 mb-2" />
                    <span>Analyses</span>
                  </Button>
                </Link>
                <Link href="/vendor/settings">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <Settings className="h-6 w-6 mb-2" />
                    <span>Paramètres</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}


