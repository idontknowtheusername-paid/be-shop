'use client'

import React, { useEffect, useState } from 'react'
import { categoryService, productService } from '@/lib/services'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const SupabaseTest = () => {
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [categories, setCategories] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  // Test de connexion à Supabase
  const testConnection = async () => {
    try {
      setConnectionStatus('checking')
      setErrorMessage('')
      
      // Test avec le service des catégories
      const { data, error } = await categoryService.getAllCategories()

      if (error) {
        throw new Error(error)
      }

      setConnectionStatus('connected')
    } catch (error) {
      setConnectionStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Erreur de connexion')
    }
  }

  // Test de récupération des catégories
  const testCategories = async () => {
    try {
      setLoading(true)
      const { data, error } = await categoryService.getAllCategories()

      if (error) throw new Error(error)

      setCategories(data || [])
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Erreur lors de la récupération des catégories')
    } finally {
      setLoading(false)
    }
  }

  // Test de récupération des produits
  const testProducts = async () => {
    try {
      setLoading(true)
      const { data, error } = await productService.getProducts({}, { field: 'created_at', order: 'desc' }, { page: 1, limit: 5 })

      if (error) throw new Error(error)

      setProducts(data?.products || [])
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Erreur lors de la récupération des produits')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testConnection()
  }, [])

  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'bg-green-500'
      case 'error':
        return 'bg-red-500'
      default:
        return 'bg-yellow-500'
    }
  }

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Connecté'
      case 'error':
        return 'Erreur'
      default:
        return 'Vérification...'
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Test de Connexion Supabase avec Services
            <Badge className={getStatusColor()}>
              {getStatusText()}
            </Badge>
          </CardTitle>
          <CardDescription>
            Vérification de la configuration Supabase et test des services modulaires
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Variables d'environnement */}
          <div className="space-y-2">
            <h4 className="font-medium">Variables d'environnement :</h4>
            <div className="text-sm space-y-1">
              <div>
                <span className="font-medium">URL :</span> 
                <span className="ml-2 text-gray-600">
                  {process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'your_supabase_project_url' 
                    ? '✅ Configurée' : '❌ Manquante ou non configurée'}
                </span>
              </div>
              <div>
                <span className="font-medium">Clé Anon :</span> 
                <span className="ml-2 text-gray-600">
                  {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your-anon-key-here'
                    ? '✅ Configurée' : '❌ Manquante ou non configurée'}
                </span>
              </div>
              <div>
                <span className="font-medium">App URL :</span> 
                <span className="ml-2 text-gray-600">
                  {process.env.NEXT_PUBLIC_APP_URL ? '✅ Configurée' : '⚠️ Optionnelle'}
                </span>
              </div>
            </div>
            {(!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === 'your_supabase_project_url') && (
              <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                <p className="text-yellow-700 text-sm">
                  <strong>Configuration requise :</strong> Créez un fichier <code>.env.local</code> avec vos clés Supabase. 
                  Voir <code>SUPABASE_SETUP.md</code> pour les instructions détaillées.
                </p>
              </div>
            )}
          </div>

          {/* Boutons de test */}
          <div className="flex gap-2 flex-wrap">
            <Button onClick={testConnection} variant="outline">
              Tester la connexion
            </Button>
            <Button onClick={testCategories} disabled={loading}>
              {loading ? 'Chargement...' : 'Tester les catégories'}
            </Button>
            <Button onClick={testProducts} disabled={loading}>
              {loading ? 'Chargement...' : 'Tester les produits'}
            </Button>
          </div>

          {/* Message d'erreur */}
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-700 text-sm">{errorMessage}</p>
            </div>
          )}

          {/* Résultats des catégories */}
          {categories.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Catégories trouvées :</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {categories.map((category) => (
                  <div key={category.id} className="text-sm p-2 bg-gray-50 rounded">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-gray-600 ml-2">({category.slug})</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Résultats des produits */}
          {products.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Produits trouvés :</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {products.map((product) => (
                  <div key={product.id} className="text-sm p-2 bg-blue-50 rounded">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-gray-600 text-xs">
                      Prix: {product.price} XOF | Stock: {product.stock_quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture des services */}
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-md">
            <h4 className="font-medium text-green-900 mb-2">Architecture des Services :</h4>
            <div className="text-sm text-green-800 space-y-1">
              <div>✅ <code>authService</code> - Authentification et gestion des utilisateurs</div>
              <div>✅ <code>productService</code> - Gestion des produits et recherche</div>
              <div>✅ <code>categoryService</code> - Gestion des catégories et arborescence</div>
              <div>✅ <code>cartService</code> - Gestion du panier et calculs</div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h4 className="font-medium text-blue-900 mb-2">Instructions :</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Configurez vos variables d'environnement dans <code>.env.local</code></li>
              <li>• Assurez-vous que votre projet Supabase est actif</li>
              <li>• Vérifiez que les migrations ont été appliquées</li>
              <li>• Testez les services individuellement</li>
              <li>• Utilisez les services dans vos composants : <code>import { '{ authService }' } from '@/lib/services'</code></li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SupabaseTest
