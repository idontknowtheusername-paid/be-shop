import React from 'react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import ProductPageClient from './ProductPageClient'

// Fonction requise pour l'export statique
export async function generateStaticParams() {
  // Retourner des IDs de produits statiques pour l'export
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
  ]
}

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = params

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProductPageClient id={id} />
      <Footer />
    </div>
  )
}
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronRight,
  Home,
  Minus,
  Plus,
  MessageCircle,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  price: number
  sale_price: number | null
  rating: number
  review_count: number
  stock_quantity: number
  image_url?: string
  categories?: { name: string; slug: string }
  brands?: { name: string; slug: string }
}

interface Review {
  id: string
  user_name: string
  rating: number
  comment: string
  created_at: string
  helpful_count: number
}

export default function ProductPage() {
  const params = useParams()
  const productId = params.id as string
  
  const { fetchProductBySlug } = useProducts()
  
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // État du produit
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  
  // Avis
  const [reviews, setReviews] = useState<Review[]>([])
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')

  // Images du produit (mock data)
  const productImages = [
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600',
    '/api/placeholder/600/600'
  ]

  // Tailles disponibles (mock data)
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
  
  // Couleurs disponibles (mock data)
  const availableColors = [
    { name: 'Noir', value: 'black', hex: '#000000' },
    { name: 'Blanc', value: 'white', hex: '#FFFFFF' },
    { name: 'Rouge', value: 'red', hex: '#FF0000' },
    { name: 'Bleu', value: 'blue', hex: '#0000FF' }
  ]

  // Avis mock
  const mockReviews: Review[] = [
    {
      id: '1',
      user_name: 'Jean D.',
      rating: 5,
      comment: 'Excellent produit, très satisfait de mon achat. La qualité est au rendez-vous et la livraison a été rapide.',
      created_at: '2024-01-15',
      helpful_count: 12
    },
    {
      id: '2',
      user_name: 'Marie L.',
      rating: 4,
      comment: 'Bon produit, correspond bien à la description. Petit bémol sur la taille qui est un peu petite.',
      created_at: '2024-01-10',
      helpful_count: 8
    }
  ]

  useEffect(() => {
    loadProduct()
    setReviews(mockReviews)
  }, [productId])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const productData = await fetchProductBySlug(productId)
      setProduct(productData)
    } catch (err) {
      setError('Erreur lors du chargement du produit')
      console.error(err)
    } finally {
      setLoading(false)
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

  const handleAddToCart = () => {
    // TODO: Implémenter l'ajout au panier
    console.log('Ajouter au panier:', {
      product,
      quantity,
      size: selectedSize,
      color: selectedColor
    })
  }

  const handleAddToWishlist = () => {
    // TODO: Implémenter l'ajout aux favoris
    console.log('Ajouter aux favoris:', product)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="be-container py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="h-96 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="be-container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
            <p className="text-gray-600 mb-4">{error || 'Ce produit n\'existe pas.'}</p>
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
          {product.categories && (
            <>
              <Link href={`/categories/${product.categories.slug}`} className="hover:text-blue-600">
                {product.categories.name}
              </Link>
              <ChevronRight className="h-4 w-4" />
            </>
          )}
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Galerie d'images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-blue-500' : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} - Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informations produit */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              {product.brands && (
                <p className="text-gray-600 mb-2">Marque: {product.brands.name}</p>
              )}
              
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">({product.review_count} avis)</span>
                <Badge variant="outline" className="ml-2">
                  En stock ({product.stock_quantity})
                </Badge>
              </div>
            </div>

            {/* Prix */}
            <div className="space-y-2">
              {product.sale_price ? (
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-red-600">
                    {formatPrice(product.sale_price)}
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                  <Badge className="bg-red-500">
                    -{Math.round(((product.price - product.sale_price) / product.price) * 100)}%
                  </Badge>
                </div>
              ) : (
                <span className="text-3xl font-bold">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {/* Description courte */}
            {product.short_description && (
              <p className="text-gray-600">{product.short_description}</p>
            )}

            {/* Options */}
            <div className="space-y-4">
              {/* Tailles */}
              <div>
                <label className="text-sm font-medium mb-2 block">Taille</label>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg text-sm ${
                        selectedSize === size
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Couleurs */}
              <div>
                <label className="text-sm font-medium mb-2 block">Couleur</label>
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setSelectedColor(color.value)}
                      className={`w-10 h-10 rounded-full border-2 ${
                        selectedColor === color.value ? 'border-blue-500' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Quantité */}
              <div>
                <label className="text-sm font-medium mb-2 block">Quantité</label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center"
                    min="1"
                    max={product.stock_quantity}
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-3">
              <Button 
                size="lg" 
                className="w-full"
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {product.stock_quantity > 0 ? 'Ajouter au panier' : 'Rupture de stock'}
              </Button>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleAddToWishlist}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Favoris
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </Button>
              </div>
            </div>

            {/* Services */}
            <div className="border-t pt-6 space-y-3">
              <div className="flex items-center space-x-3">
                <Truck className="h-5 w-5 text-green-600" />
                <span className="text-sm">Livraison gratuite dès 50 000 FCFA</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm">Garantie 2 ans</span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="h-5 w-5 text-orange-600" />
                <span className="text-sm">Retour gratuit sous 30 jours</span>
              </div>
            </div>
          </div>
        </div>

        {/* Onglets détaillés */}
        <Tabs defaultValue="description" className="mb-12">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Spécifications</TabsTrigger>
            <TabsTrigger value="reviews">Avis ({reviews.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  {product.description ? (
                    <div dangerouslySetInnerHTML={{ __html: product.description }} />
                  ) : (
                    <p className="text-gray-600">Aucune description disponible pour ce produit.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Informations générales</h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Marque</dt>
                        <dd>{product.brands?.name || 'Non spécifiée'}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Catégorie</dt>
                        <dd>{product.categories?.name || 'Non spécifiée'}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Stock</dt>
                        <dd>{product.stock_quantity} unités</dd>
                      </div>
                    </dl>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Prix</h4>
                    <dl className="space-y-2">
                      <div className="flex justify-between">
                        <dt className="text-gray-600">Prix original</dt>
                        <dd>{formatPrice(product.price)}</dd>
                      </div>
                      {product.sale_price && (
                        <div className="flex justify-between">
                          <dt className="text-gray-600">Prix en promotion</dt>
                          <dd className="text-red-600 font-semibold">{formatPrice(product.sale_price)}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-lg font-semibold">Avis clients</h4>
                  <Button onClick={() => setShowReviewForm(true)}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Laisser un avis
                  </Button>
                </div>
                
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{review.user_name}</span>
                            <div className="flex">
                              {renderStars(review.rating)}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{review.comment}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <button className="flex items-center space-x-1 hover:text-blue-600">
                            <ThumbsUp className="h-4 w-4" />
                            <span>Utile ({review.helpful_count})</span>
                          </button>
                          <button className="flex items-center space-x-1 hover:text-red-600">
                            <ThumbsDown className="h-4 w-4" />
                            <span>Pas utile</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600 text-center py-8">
                    Aucun avis pour ce produit. Soyez le premier à laisser un avis !
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Produits similaires */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* TODO: Implémenter les produits similaires */}
            <div className="text-center py-8 text-gray-500">
              <p>Produits similaires à venir...</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}


