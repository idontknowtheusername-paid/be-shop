'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart, ShoppingCart, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ProductsByCategory = () => {
  const categories = [
    {
      id: 'electronics',
      name: 'Électronique',
      icon: '📱',
      color: 'bg-blue-500',
      products: [
        {
          id: 7,
          name: 'Téléviseur Samsung 55" 4K Smart',
          image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg',
          originalPrice: 320000,
          salePrice: 275000,
          discount: 14,
          rating: 4.5,
          reviews: 203,
          badge: 'Offre Chaud'
        },
        {
          id: 8,
          name: 'HP Pavilion Gaming',
          image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg',
          originalPrice: 450000,
          salePrice: 385000,
          discount: 14,
          rating: 4.4,
          reviews: 156,
          badge: 'Gaming'
        },
        {
          id: 9,
          name: 'Ordinateur Portable Dell XPS 13',
          image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
          originalPrice: 750000,
          salePrice: 650000,
          discount: 13,
          rating: 4.7,
          reviews: 145,
          badge: 'Professionnel'
        },
        {
          id: 10,
          name: 'iPad Air 5ème Génération',
          image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg',
          originalPrice: 380000,
          salePrice: 340000,
          discount: 11,
          rating: 4.8,
          reviews: 298,
          badge: 'Apple'
        }
      ]
    },
    {
      id: 'fashion',
      name: 'Mode',
      icon: '👕',
      color: 'bg-pink-500',
      products: [
        {
          id: 11,
          name: 'Nike Air Force 1 Low',
          image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
          originalPrice: 55000,
          salePrice: 42000,
          discount: 24,
          rating: 4.6,
          reviews: 189,
          badge: 'Classique'
        },
        {
          id: 12,
          name: 'Jeans Levi\'s 501 Original',
          image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
          originalPrice: 35000,
          salePrice: 28000,
          discount: 20,
          rating: 4.4,
          reviews: 267,
          badge: 'Meilleur Vendeur'
        },
        {
          id: 13,
          name: 'Hoodie Adidas Originals',
          image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
          originalPrice: 45000,
          salePrice: 36000,
          discount: 20,
          rating: 4.5,
          reviews: 134,
          badge: 'Confort'
        },
        {
          id: 14,
          name: 'Lunettes de Soleil Ray-Ban Aviator',
          image: 'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg',
          originalPrice: 85000,
          salePrice: 68000,
          discount: 20,
          rating: 4.7,
          reviews: 456,
          badge: 'Luxe'
        }
      ]
    },
    {
      id: 'home',
      name: 'Maison & Jardin',
      icon: '🏠',
      color: 'bg-green-500',
      products: [
        {
          id: 15,
          name: 'Table Basse Moderne',
          image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
          originalPrice: 125000,
          salePrice: 95000,
          discount: 24,
          rating: 4.3,
          reviews: 89,
          badge: 'Meubles'
        },
        {
          id: 16,
          name: 'Lampe de Bureau LED',
          image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
          originalPrice: 25000,
          salePrice: 18000,
          discount: 28,
          rating: 4.5,
          reviews: 156,
          badge: 'Intelligent'
        },
        {
          id: 17,
          name: 'Set de Pots de Plantes (3pcs)',
          image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
          originalPrice: 15000,
          salePrice: 12000,
          discount: 20,
          rating: 4.2,
          reviews: 78,
          badge: 'Jardin'
        },
        {
          id: 18,
          name: 'Blender de Cuisine Pro',
          image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
          originalPrice: 65000,
          salePrice: 52000,
          discount: 20,
          rating: 4.6,
          reviews: 234,
          badge: 'Cuisine'
        }
      ]
    },
    {
      id: 'beauty',
      name: 'Beauté & Santé',
      icon: '💄',
      color: 'bg-purple-500',
      products: [
        {
          id: 19,
          name: 'Set de Routine de Soins',
          image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg',
          originalPrice: 45000,
          salePrice: 36000,
          discount: 20,
          rating: 4.7,
          reviews: 345,
          badge: 'Complet'
        },
        {
          id: 20,
          name: 'Sèche-Cheveux Professionnel',
          image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg',
          originalPrice: 35000,
          salePrice: 28000,
          discount: 20,
          rating: 4.4,
          reviews: 167,
          badge: 'Salon'
        },
        {
          id: 21,
          name: 'Set de Pinceaux de Maquillage',
          image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg',
          originalPrice: 25000,
          salePrice: 18000,
          discount: 28,
          rating: 4.5,
          reviews: 289,
          badge: 'Professionnel'
        },
        {
          id: 22,
          name: 'Sérum Vitamine C',
          image: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg',
          originalPrice: 18000,
          salePrice: 14000,
          discount: 22,
          rating: 4.6,
          reviews: 456,
          badge: 'Meilleur Vendeur'
        }
      ]
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', {
      style: 'currency',
      currency: 'XOF'
    }).format(price);
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="be-container">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Acheter par Catégorie
          </h2>
          <p className="text-lg text-gray-600">
            Explorez notre gamme complète de produits dans toutes les catégories
          </p>
        </div>

        <Tabs defaultValue="electronics" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex items-center space-x-2 data-[state=active]:bg-[#1E40AF] data-[state=active]:text-white"
              >
                <span className="text-lg">{category.icon}</span>
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900 flex items-center">
                  <span className="text-3xl mr-3">{category.icon}</span>
                  {category.name}
                </h3>
                <Button asChild variant="outline" className="border-[#1E40AF] text-[#1E40AF] hover:bg-[#1E40AF] hover:text-white">
                  <Link href={`/${category.id}`} className="flex items-center space-x-2">
                    <span>Voir Tout</span>
                    <ChevronRight size={16} />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {category.products.map((product) => (
                  <div key={product.id} className="be-card p-4 group hover:shadow-lg transition-all duration-300">
                    <div className="relative mb-4">
                      <Link href={`/product/${product.id}`}>
                        <div className="aspect-square relative overflow-hidden rounded-lg">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                      
                      {product.badge && (
                        <Badge className="absolute top-2 left-2 bg-[#EA580C] text-white text-xs">
                          {product.badge}
                        </Badge>
                      )}
                      
                      {product.discount > 0 && (
                        <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                          -{product.discount}%
                        </Badge>
                      )}
                      
                      {/* Quick Actions */}
                      <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="sm" variant="outline" className="p-1 bg-white hover:bg-gray-100">
                          <Heart size={14} />
                        </Button>
                        <Button size="sm" className="p-1 be-primary">
                          <ShoppingCart size={14} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Link href={`/product/${product.id}`}>
                        <h3 className="font-medium text-sm line-clamp-2 hover:text-[#1E40AF] transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={`${
                                i < Math.floor(product.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          ({product.reviews})
                        </span>
                      </div>
                      
                      <div className="space-y-1">
                        <div className="text-lg font-bold text-[#EA580C]">
                          {formatPrice(product.salePrice)}
                        </div>
                        {product.originalPrice > product.salePrice && (
                          <div className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ProductsByCategory;