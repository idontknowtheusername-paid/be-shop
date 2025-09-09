'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft,
  MapPin,
  Truck,
  CreditCard,
  CheckCircle,
  Lock,
  Shield,
  RotateCcw
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface CheckoutItem {
  id: string
  name: string
  price: number
  sale_price: number | null
  quantity: number
  image_url?: string
}

interface ShippingAddress {
  full_name: string
  phone: string
  address: string
  city: string
  postal_code: string
  country: string
  instructions?: string
}

interface DeliveryOption {
  id: string
  name: string
  price: number
  estimated_days: string
  description: string
}

interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: string
}

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  
  // Données de commande (mock)
  const [orderItems] = useState<CheckoutItem[]>([
    {
      id: '1',
      name: 'Smartphone Samsung Galaxy S23',
      price: 450000,
      sale_price: 420000,
      quantity: 1,
      image_url: '/api/placeholder/100/100'
    },
    {
      id: '2',
      name: 'Casque Bluetooth Sony WH-1000XM4',
      price: 85000,
      sale_price: null,
      quantity: 2,
      image_url: '/api/placeholder/100/100'
    }
  ])

  // Adresse de livraison
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    full_name: '',
    phone: '',
    address: '',
    city: '',
    postal_code: '',
    country: 'Bénin',
    instructions: ''
  })

  // Options de livraison
  const [selectedDelivery, setSelectedDelivery] = useState<string>('')
  const deliveryOptions: DeliveryOption[] = [
    {
      id: 'standard',
      name: 'Livraison standard',
      price: 2000,
      estimated_days: '3-5 jours ouvrables',
      description: 'Livraison à domicile ou en point relais'
    },
    {
      id: 'express',
      name: 'Livraison express',
      price: 5000,
      estimated_days: '1-2 jours ouvrables',
      description: 'Livraison rapide en priorité'
    },
    {
      id: 'free',
      name: 'Livraison gratuite',
      price: 0,
      estimated_days: '5-7 jours ouvrables',
      description: 'Livraison gratuite pour les commandes > 50 000 FCFA'
    }
  ]

  // Méthodes de paiement
  const [selectedPayment, setSelectedPayment] = useState<string>('')
  const paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Carte bancaire',
      description: 'Visa, Mastercard, American Express',
      icon: '💳'
    },
    {
      id: 'mobile_money',
      name: 'Mobile Money',
      description: 'Moov Money, MTN Mobile Money',
      icon: '📱'
    },
    {
      id: 'cod',
      name: 'Paiement à la livraison',
      description: 'Payer en espèces à la réception',
      icon: '💰'
    }
  ]

  // Calculs
  const subtotal = orderItems.reduce((sum, item) => {
    const price = item.sale_price || item.price
    return sum + (price * item.quantity)
  }, 0)

  const selectedDeliveryOption = deliveryOptions.find(option => option.id === selectedDelivery)
  const deliveryCost = selectedDeliveryOption?.price || 0
  const total = subtotal + deliveryCost

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF'
    }).format(price)
  }

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    // Simuler le traitement de la commande
    setTimeout(() => {
      setLoading(false)
      setCurrentStep(4)
    }, 2000)
  }

  const canProceedToNext = () => {
    switch (currentStep) {
      case 1:
        return shippingAddress.full_name && shippingAddress.phone && shippingAddress.address && shippingAddress.city
      case 2:
        return selectedDelivery
      case 3:
        return selectedPayment
      default:
        return true
    }
  }

  const renderStepIndicator = () => {
    const steps = [
      { number: 1, title: 'Adresse', icon: MapPin },
      { number: 2, title: 'Livraison', icon: Truck },
      { number: 3, title: 'Paiement', icon: CreditCard },
      { number: 4, title: 'Confirmation', icon: CheckCircle }
    ]

    return (
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isActive = currentStep === step.number
          const isCompleted = currentStep > step.number
          
          return (
            <div key={step.number} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                isActive ? 'border-blue-500 bg-blue-500 text-white' :
                isCompleted ? 'border-green-500 bg-green-500 text-white' :
                'border-gray-300 text-gray-500'
              }`}>
                {isCompleted ? (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                ) : (
                  <div className="h-5 w-5">
                    {step.number === 1 && (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    )}
                    {step.number === 2 && (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                      </svg>
                    )}
                    {step.number === 3 && (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                      </svg>
                    )}
                    {step.number === 4 && (
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                      </svg>
                    )}
                  </div>
                )}
              </div>
              <div className="ml-3">
                <p className={`text-sm font-medium ${
                  isActive ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  Étape {step.number}
                </p>
                <p className={`text-xs ${
                  isActive ? 'text-blue-600' : 'text-gray-400'
                }`}>
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-300'
                }`} />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MapPin className="h-5 w-5" />
          <span>Adresse de livraison</span>
        </CardTitle>
        <CardDescription>
          Entrez vos informations de livraison
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="full_name">Nom complet *</Label>
            <Input
              id="full_name"
              value={shippingAddress.full_name}
              onChange={(e) => setShippingAddress(prev => ({ ...prev, full_name: e.target.value }))}
              placeholder="Votre nom complet"
            />
          </div>
          <div>
            <Label htmlFor="phone">Téléphone *</Label>
            <Input
              id="phone"
              value={shippingAddress.phone}
              onChange={(e) => setShippingAddress(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+225 0123456789"
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="address">Adresse *</Label>
          <Textarea
            id="address"
            value={shippingAddress.address}
            onChange={(e) => setShippingAddress(prev => ({ ...prev, address: e.target.value }))}
            placeholder="Rue, quartier, ville"
            rows={3}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="city">Ville *</Label>
            <Input
              id="city"
              value={shippingAddress.city}
              onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
              placeholder="Cotonou"
            />
          </div>
          <div>
            <Label htmlFor="postal_code">Code postal</Label>
            <Input
              id="postal_code"
              value={shippingAddress.postal_code}
              onChange={(e) => setShippingAddress(prev => ({ ...prev, postal_code: e.target.value }))}
              placeholder="01 BP 1234"
            />
          </div>
          <div>
            <Label htmlFor="country">Pays</Label>
            <Input
              id="country"
              value={shippingAddress.country}
              onChange={(e) => setShippingAddress(prev => ({ ...prev, country: e.target.value }))}
              disabled
            />
          </div>
        </div>
        
        <div>
          <Label htmlFor="instructions">Instructions de livraison</Label>
          <Textarea
            id="instructions"
            value={shippingAddress.instructions}
            onChange={(e) => setShippingAddress(prev => ({ ...prev, instructions: e.target.value }))}
            placeholder="Instructions spéciales pour la livraison..."
            rows={2}
          />
        </div>
      </CardContent>
    </Card>
  )

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Truck className="h-5 w-5" />
          <span>Options de livraison</span>
        </CardTitle>
        <CardDescription>
          Choisissez votre méthode de livraison
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedDelivery} onValueChange={setSelectedDelivery}>
          <div className="space-y-4">
            {deliveryOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                <RadioGroupItem value={option.id} id={option.id} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor={option.id} className="font-medium">
                        {option.name}
                      </Label>
                      <p className="text-sm text-gray-600">{option.description}</p>
                      <p className="text-sm text-gray-500">
                        Délai estimé: {option.estimated_days}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="font-bold">
                        {option.price === 0 ? 'Gratuit' : formatPrice(option.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )

  const renderStep3 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CreditCard className="h-5 w-5" />
          <span>Méthode de paiement</span>
        </CardTitle>
        <CardDescription>
          Choisissez votre méthode de paiement sécurisée
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedPayment} onValueChange={setSelectedPayment}>
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-center space-x-3 p-4 border rounded-lg">
                <RadioGroupItem value={method.id} id={method.id} />
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{method.icon}</span>
                  <div>
                    <Label htmlFor={method.id} className="font-medium">
                      {method.name}
                    </Label>
                    <p className="text-sm text-gray-600">{method.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center space-x-2 text-blue-600">
            <Lock className="h-4 w-4" />
            <span className="text-sm font-medium">Paiement sécurisé</span>
          </div>
          <p className="text-sm text-blue-600 mt-1">
            Vos informations de paiement sont protégées par un chiffrement SSL 256-bit
          </p>
        </div>
      </CardContent>
    </Card>
  )

  const renderStep4 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          <span>Commande confirmée</span>
        </CardTitle>
        <CardDescription>
          Votre commande a été traitée avec succès
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="mb-6">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Merci pour votre commande !</h3>
          <p className="text-gray-600">
            Votre numéro de commande est: <strong>#CMD-2024-001</strong>
          </p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold mb-2">Prochaines étapes:</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Vous recevrez un email de confirmation</li>
            <li>• Votre commande sera préparée dans les 24h</li>
            <li>• Vous recevrez un SMS lors de l'expédition</li>
            <li>• Livraison estimée: {selectedDeliveryOption?.estimated_days}</li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/dashboard/orders" className="flex-1">
            <Button variant="outline" className="w-full">
              Suivre ma commande
            </Button>
          </Link>
          <Link href="/" className="flex-1">
            <Button className="w-full">
              Continuer mes achats
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="be-container py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-4">
            <Link href="/cart" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Finaliser la commande</h1>
          </div>
        </div>

        {/* Indicateur d'étapes */}
        {renderStepIndicator()}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contenu principal */}
          <div className="lg:col-span-2">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
            
            {/* Navigation */}
            {currentStep < 4 && (
              <div className="flex justify-between mt-6">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 1}
                >
                  Précédent
                </Button>
                
                {currentStep === 3 ? (
                  <Button
                    onClick={handlePlaceOrder}
                    disabled={!canProceedToNext() || loading}
                  >
                    {loading ? 'Traitement...' : 'Confirmer la commande'}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNextStep}
                    disabled={!canProceedToNext()}
                  >
                    Suivant
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Résumé de commande */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Résumé de commande</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Articles */}
                <div className="space-y-3">
                  {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                        {item.image_url && (
                          <img
                            src={item.image_url}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Qté: {item.quantity} × {formatPrice(item.sale_price || item.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Calculs */}
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Sous-total</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {selectedDeliveryOption && (
                    <div className="flex justify-between">
                      <span>Livraison</span>
                      <span>
                        {selectedDeliveryOption.price === 0 ? 'Gratuit' : formatPrice(selectedDeliveryOption.price)}
                      </span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Services */}
                <div className="border-t pt-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Garantie 2 ans</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RotateCcw className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Retour gratuit 30 jours</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Lock className="h-4 w-4 text-orange-600" />
                    <span className="text-sm">Paiement sécurisé</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}


