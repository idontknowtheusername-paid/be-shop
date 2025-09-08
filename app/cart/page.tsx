'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { 
  ShoppingCart, 
  Trash2, 
  Minus, 
  Plus, 
  ArrowLeft,
  Truck,
  CreditCard,
  Lock,
  Heart,
  Star
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface CartItem {
  id: string
  product_id: string
  name: string
  slug: string
  price: number
  sale_price: number | null
  quantity: number
  image_url?: string
  size?: string
  color?: string
  stock_quantity: number
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [couponCode, setCouponCode] = useState('')
  const [couponDiscount, setCouponDiscount] = useState(0)

  // Mock data pour le développement
  useEffect(() => {
    // Simuler le chargement du panier
    setTimeout(() => {
      const mockCartItems: CartItem[] = [
        {
          id: '1',
          product_id: 'prod-1',
          name: 'Smartphone Samsung Galaxy S23',
          slug: 'samsung-galaxy-s23',
          price: 450000,
          sale_price: 420000,
          quantity: 1,
          image_url: '/api/placeholder/200/200',
          size: '128GB',
          color: 'Noir',
          stock_quantity: 10
        },
        {
          id: '2',
          product_id: 'prod-2',
          name: 'Casque Bluetooth Sony WH-1000XM4',
          slug: 'sony-wh-1000xm4',
          price: 85000,
          sale_price: null,
          quantity: 2,
          image_url: '/api/placeholder/200/200',
          color: 'Blanc',
          stock_quantity: 5
        }
      ]
      setCartItems(mockCartItems)
      setLoading(false)
    }, 1000)
  }, [])

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setCartItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, quantity: Math.min(newQuantity, item.stock_quantity) }
        : item
    ))
  }

  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId))
  }

  const moveToWishlist = (itemId: string) => {
    // TODO: Implémenter le déplacement vers les favoris
    console.log('Déplacer vers les favoris:', itemId)
    removeItem(itemId)
  }

  const applyCoupon = () => {
    // TODO: Implémenter la validation du code promo
    if (couponCode.toLowerCase() === 'promo10') {
      setCouponDiscount(subtotal * 0.1)
    } else {
      setCouponDiscount(0)
    }
  }

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

  // Calculs
  const subtotal = cartItems.reduce((sum, item) => {
    const price = item.sale_price || item.price
    return sum + (price * item.quantity)
  }, 0)

  const shipping = subtotal > 50000 ? 0 : 2000
  const total = subtotal + shipping - couponDiscount

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="be-container py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 rounded"></div>
                ))}
              </div>
              <div className="h-64 bg-gray-200 rounded"></div>
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
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Mon Panier</h1>
          </div>
          <p className="text-gray-600">
            {cartItems.length} article{cartItems.length > 1 ? 's' : ''} dans votre panier
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Votre panier est vide</h2>
            <p className="text-gray-600 mb-6">
              Découvrez nos produits et commencez vos achats !
            </p>
            <Link href="/">
              <Button size="lg">
                Continuer mes achats
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Liste des articles */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex space-x-4">
                      {/* Image */}
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        {item.image_url ? (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <ShoppingCart className="h-8 w-8" />
                          </div>
                        )}
                      </div>

                      {/* Informations produit */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <Link href={`/products/${item.slug}`}>
                              <h3 className="font-semibold text-lg hover:text-blue-600 transition-colors truncate">
                                {item.name}
                              </h3>
                            </Link>
                            
                            <div className="flex items-center space-x-1 mt-1">
                              {renderStars(4.5)}
                              <span className="text-sm text-gray-600">(4.5)</span>
                            </div>

                            {/* Options */}
                            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                              {item.size && (
                                <span>Taille: {item.size}</span>
                              )}
                              {item.color && (
                                <span>Couleur: {item.color}</span>
                              )}
                            </div>

                            {/* Prix */}
                            <div className="flex items-center space-x-2 mt-2">
                              {item.sale_price ? (
                                <>
                                  <span className="text-lg font-bold text-red-600">
                                    {formatPrice(item.sale_price)}
                                  </span>
                                  <span className="text-sm text-gray-500 line-through">
                                    {formatPrice(item.price)}
                                  </span>
                                </>
                              ) : (
                                <span className="text-lg font-bold">
                                  {formatPrice(item.price)}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col items-end space-y-2">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                className="w-16 text-center"
                                min="1"
                                max={item.stock_quantity}
                              />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.stock_quantity}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => moveToWishlist(item.id)}
                                className="text-gray-600 hover:text-red-600"
                              >
                                <Heart className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-gray-600 hover:text-red-600"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>

                        {/* Stock */}
                        {item.stock_quantity < 5 && (
                          <div className="mt-2">
                            <Badge variant="outline" className="text-orange-600 border-orange-600">
                              Plus que {item.stock_quantity} en stock
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Résumé de commande */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Résumé de commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Code promo */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Code promo</label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Entrez votre code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                      />
                      <Button variant="outline" onClick={applyCoupon}>
                        Appliquer
                      </Button>
                    </div>
                    {couponDiscount > 0 && (
                      <p className="text-sm text-green-600 mt-1">
                        Réduction appliquée: {formatPrice(couponDiscount)}
                      </p>
                    )}
                  </div>

                  <Separator />

                  {/* Calculs */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Livraison</span>
                      <span>{shipping === 0 ? 'Gratuit' : formatPrice(shipping)}</span>
                    </div>
                    {couponDiscount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Réduction</span>
                        <span>-{formatPrice(couponDiscount)}</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* Livraison gratuite */}
                  {subtotal < 50000 && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 text-blue-600">
                        <Truck className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          Plus que {formatPrice(50000 - subtotal)} pour la livraison gratuite !
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Bouton de commande */}
                  <Link href="/checkout" className="block">
                    <Button className="w-full" size="lg">
                      <CreditCard className="h-5 w-5 mr-2" />
                      Passer la commande
                    </Button>
                  </Link>

                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                    <Lock className="h-4 w-4" />
                    <span>Paiement sécurisé</span>
                  </div>

                  {/* Paiements acceptés */}
                  <div className="text-center">
                    <p className="text-xs text-gray-500 mb-2">Paiements acceptés</p>
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-8 h-5 bg-gray-200 rounded"></div>
                      <div className="w-8 h-5 bg-gray-200 rounded"></div>
                      <div className="w-8 h-5 bg-gray-200 rounded"></div>
                      <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Produits recommandés */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Recommandés pour vous</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {/* TODO: Implémenter les produits recommandés */}
                    <div className="text-center py-4 text-gray-500">
                      <p className="text-sm">Produits recommandés à venir...</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}


