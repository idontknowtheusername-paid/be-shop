'use client'

import { useAuth } from '@/hooks/useAuth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export default function TestAuthPage() {
  const { user, loading, isAuthenticated, signIn, signOut } = useAuth()

  const handleTestSignIn = async () => {
    const result = await signIn('test@example.com', 'password123')
    console.log('Sign in result:', result)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Chargement...</h1>
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test d'Authentification</h1>
          <p className="text-gray-600">Page de test pour vérifier le système d'authentification</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* État de l'authentification */}
          <Card>
            <CardHeader>
              <CardTitle>État de l'Authentification</CardTitle>
              <CardDescription>
                Informations sur l'état actuel de l'authentification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Connecté :</span>
                <Badge variant={isAuthenticated ? "default" : "secondary"}>
                  {isAuthenticated ? "Oui" : "Non"}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="font-medium">Chargement :</span>
                <Badge variant={loading ? "default" : "secondary"}>
                  {loading ? "En cours" : "Terminé"}
                </Badge>
              </div>

              {user && (
                <>
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Rôle :</span>
                    <Badge variant="outline">
                      {user.role === 'admin' ? 'Administrateur' : 
                       user.role === 'vendor' ? 'Vendeur' : 'Client'}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Vérifié :</span>
                    <Badge variant={user.is_verified ? "default" : "secondary"}>
                      {user.is_verified ? "Oui" : "Non"}
                    </Badge>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Informations utilisateur */}
          <Card>
            <CardHeader>
              <CardTitle>Informations Utilisateur</CardTitle>
              <CardDescription>
                Détails de l'utilisateur connecté
              </CardDescription>
            </CardHeader>
            <CardContent>
              {user ? (
                <div className="space-y-2">
                  <p><strong>Nom :</strong> {user.full_name || 'Non renseigné'}</p>
                  <p><strong>Email :</strong> {user.email}</p>
                  <p><strong>Téléphone :</strong> {user.phone || 'Non renseigné'}</p>
                  <p><strong>Langue :</strong> {user.language}</p>
                  <p><strong>Devise :</strong> {user.currency}</p>
                </div>
              ) : (
                <p className="text-gray-500">Aucun utilisateur connecté</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Actions de Test</CardTitle>
            <CardDescription>
              Boutons pour tester les fonctionnalités d'authentification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              {!isAuthenticated ? (
                <>
                  <Link href="/auth/login">
                    <Button>Se connecter</Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button variant="outline">S'inscrire</Button>
                  </Link>
                  <Button variant="outline" onClick={handleTestSignIn}>
                    Test Connexion (console)
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="destructive" onClick={() => signOut()}>
                    Se déconnecter
                  </Button>
                  <Link href="/dashboard">
                    <Button variant="outline">Dashboard</Button>
                  </Link>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Navigation</CardTitle>
            <CardDescription>
              Liens vers les pages d'authentification
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Link href="/auth/login">
                <Button variant="outline">Page de connexion</Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="outline">Page d'inscription</Button>
              </Link>
              <Link href="/auth/forgot-password">
                <Button variant="outline">Mot de passe oublié</Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="outline">Dashboard</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}


