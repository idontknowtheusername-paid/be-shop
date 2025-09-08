'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Users, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Package, 
  AlertTriangle,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  Calendar,
  BarChart3,
  Activity
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface DashboardStats {
  totalUsers: number
  totalOrders: number
  totalRevenue: number
  totalProducts: number
  pendingOrders: number
  lowStockProducts: number
}

interface RecentOrder {
  id: string
  orderNumber: string
  customerName: string
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  date: string
}

interface RecentProduct {
  id: string
  name: string
  price: number
  stock: number
  status: 'active' | 'inactive' | 'out_of_stock'
  sales: number
}

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    pendingOrders: 0,
    lowStockProducts: 0
  })

  // Mock data pour le développement
  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalUsers: 1247,
        totalOrders: 892,
        totalRevenue: 45678900,
        totalProducts: 567,
        pendingOrders: 23,
        lowStockProducts: 15
      })
      setLoading(false)
    }, 1000)
  }, [])

  const recentOrders: RecentOrder[] = [
    {
      id: '1',
      orderNumber: 'CMD-2024-001',
      customerName: 'Jean Dupont',
      total: 125000,
      status: 'pending',
      date: '2024-01-15'
    },
    {
      id: '2',
      orderNumber: 'CMD-2024-002',
      customerName: 'Marie Martin',
      total: 89000,
      status: 'processing',
      date: '2024-01-14'
    },
    {
      id: '3',
      orderNumber: 'CMD-2024-003',
      customerName: 'Pierre Durand',
      total: 234000,
      status: 'shipped',
      date: '2024-01-13'
    },
    {
      id: '4',
      orderNumber: 'CMD-2024-004',
      customerName: 'Sophie Bernard',
      total: 67000,
      status: 'delivered',
      date: '2024-01-12'
    }
  ]

  const recentProducts: RecentProduct[] = [
    {
      id: '1',
      name: 'Smartphone Samsung Galaxy S23',
      price: 420000,
      stock: 15,
      status: 'active',
      sales: 45
    },
    {
      id: '2',
      name: 'Casque Bluetooth Sony WH-1000XM4',
      price: 85000,
      stock: 3,
      status: 'active',
      sales: 23
    },
    {
      id: '3',
      name: 'Ordinateur portable HP Pavilion',
      price: 350000,
      stock: 0,
      status: 'out_of_stock',
      sales: 12
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
      out_of_stock: { color: 'bg-red-100 text-red-800', label: 'Rupture' }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive
    return <Badge className={config.color}>{config.label}</Badge>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Administrateur</h1>
          <p className="text-gray-600">Gérez votre boutique e-commerce</p>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Utilisateurs</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Commandes</CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +8% par rapport au mois dernier
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
                +15% par rapport au mois dernier
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produits</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                {stats.lowStockProducts} en stock faible
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Alertes */}
        {(stats.pendingOrders > 0 || stats.lowStockProducts > 0) && (
          <div className="mb-8">
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="pt-6">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <h3 className="font-semibold text-orange-800">Actions requises</h3>
                </div>
                <div className="mt-2 space-y-1">
                  {stats.pendingOrders > 0 && (
                    <p className="text-sm text-orange-700">
                      {stats.pendingOrders} commande(s) en attente de traitement
                    </p>
                  )}
                  {stats.lowStockProducts > 0 && (
                    <p className="text-sm text-orange-700">
                      {stats.lowStockProducts} produit(s) en stock faible
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Contenu principal */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
            <TabsTrigger value="orders">Commandes</TabsTrigger>
            <TabsTrigger value="products">Produits</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Commandes récentes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Commandes récentes</span>
                    <Link href="/admin/orders">
                      <Button variant="outline" size="sm">
                        Voir tout
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{order.orderNumber}</span>
                            {getStatusBadge(order.status)}
                          </div>
                          <p className="text-sm text-gray-600">{order.customerName}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(order.date).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatPrice(order.total)}</p>
                          <Link href={`/admin/orders/${order.id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
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
                    <Link href="/admin/products">
                      <Button variant="outline" size="sm">
                        Voir tout
                      </Button>
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{product.name}</span>
                            {getProductStatusBadge(product.status)}
                          </div>
                          <p className="text-sm text-gray-600">
                            Stock: {product.stock} | Ventes: {product.sales}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatPrice(product.price)}</p>
                          <Link href={`/admin/products/${product.id}`}>
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
                  <CardTitle>Activité récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    <div className="text-center">
                      <Activity className="h-12 w-12 mx-auto mb-2" />
                      <p>Graphique d'activité à venir</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des commandes</CardTitle>
                <CardDescription>
                  Gérez toutes les commandes de votre boutique
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4" />
                  <p>Page de gestion des commandes à venir</p>
                  <Link href="/admin/orders" className="mt-4 inline-block">
                    <Button>Voir les commandes</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Gestion des produits</span>
                  <Link href="/admin/products/new">
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
                  <Link href="/admin/products" className="mt-4 inline-block">
                    <Button>Voir les produits</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gestion des utilisateurs</CardTitle>
                <CardDescription>
                  Gérez les comptes utilisateurs et les rôles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4" />
                  <p>Page de gestion des utilisateurs à venir</p>
                  <Link href="/admin/users" className="mt-4 inline-block">
                    <Button>Voir les utilisateurs</Button>
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
                <Link href="/admin/products/new">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <Plus className="h-6 w-6 mb-2" />
                    <span>Nouveau produit</span>
                  </Button>
                </Link>
                <Link href="/admin/orders">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <ShoppingBag className="h-6 w-6 mb-2" />
                    <span>Voir commandes</span>
                  </Button>
                </Link>
                <Link href="/admin/users">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <Users className="h-6 w-6 mb-2" />
                    <span>Gérer utilisateurs</span>
                  </Button>
                </Link>
                <Link href="/admin/reports">
                  <Button variant="outline" className="w-full h-20 flex flex-col">
                    <Download className="h-6 w-6 mb-2" />
                    <span>Rapports</span>
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

