'use client'

import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { User, ShoppingBag, Heart, Settings, LogOut } from 'lucide-react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, signOut } = useAuth()

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Accès refusé</h1>
          <p className="text-gray-600 mb-4">Vous devez être connecté pour accéder à cette page.</p>
          <Link href="/auth/login">
            <Button>Se connecter</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="be-container py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mon Dashboard</h1>
            <p className="text-gray-600">Bienvenue sur votre espace personnel</p>
          </div>

          {/* User Profile Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Profil Utilisateur</span>
              </CardTitle>
              <CardDescription>
                Vos informations personnelles
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user.avatar_url} alt={user.full_name} />
                  <AvatarFallback className="text-lg">
                    {user.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{user.full_name || 'Utilisateur'}</h3>
                  <p className="text-gray-600">{user.email}</p>
                  {user.phone && <p className="text-gray-600">{user.phone}</p>}
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {user.role === 'admin' ? 'Administrateur' : 
                       user.role === 'vendor' ? 'Vendeur' : 'Client'}
                    </span>
                    {user.is_verified && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Vérifié
                      </span>
                    )}
                  </div>
                </div>
                <Link href="/dashboard/profile">
                  <Button variant="outline">
                    <Settings className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingBag className="h-5 w-5" />
                  <span>Mes Commandes</span>
                </CardTitle>
                <CardDescription>
                  Suivez vos commandes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-blue-600">0</p>
                <p className="text-sm text-gray-600">Commandes en cours</p>
                <Link href="/dashboard/orders" className="mt-4 inline-block">
                  <Button variant="outline" size="sm">
                    Voir toutes
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Liste de Souhaits</span>
                </CardTitle>
                <CardDescription>
                  Vos produits favoris
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-600">0</p>
                <p className="text-sm text-gray-600">Produits favoris</p>
                <Link href="/dashboard/wishlist" className="mt-4 inline-block">
                  <Button variant="outline" size="sm">
                    Voir tous
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Paramètres</span>
                </CardTitle>
                <CardDescription>
                  Gérez votre compte
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Modifiez vos informations personnelles et préférences
                </p>
                <Link href="/dashboard/profile" className="inline-block">
                  <Button variant="outline" size="sm">
                    Configurer
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Activité Récente</CardTitle>
              <CardDescription>
                Vos dernières actions sur Be Shop
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                <p>Aucune activité récente</p>
                <p className="text-sm">Commencez à faire des achats pour voir votre activité ici</p>
              </div>
            </CardContent>
          </Card>

          {/* Logout Button */}
          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              onClick={() => signOut()}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Se déconnecter
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}


