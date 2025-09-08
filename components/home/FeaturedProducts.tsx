'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FeaturedProducts = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const featuredProducts = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max 256GB',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      originalPrice: 650000,
      salePrice: 580000,
      discount: 11,
      rating: 4.8,
      reviews: 256,
      badge: 'Meilleur Vendeur',
      category: 'Électronique'
    },
    {
      id: 2,
      name: 'Samsung Galaxy A54 5G',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      originalPrice: 185000,
      salePrice: 145000,
      discount: 22,
      rating: 4.5,
      reviews: 342,
      badge: 'Offre Chaud',
      category: 'Électronique'
    },
    {
      id: 3,
      name: 'Nike Air Max 270',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      originalPrice: 65000,
      salePrice: 48000,
      discount: 26,
      rating: 4.7,
      reviews: 128,
      badge: 'Limité',
      category: 'Mode'
    },
    {
      id: 4,
      name: 'Apple MacBook Air M2',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
      originalPrice: 850000,
      salePrice: 720000,
      discount: 15,
      rating: 4.9,
      reviews: 89,
      badge: 'Mieux Noté',
      category: 'Électronique'
    },
    {
      id: 5,
      name: 'Sony WH-1000XM5',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      originalPrice: 95000,
      salePrice: 68000,
      discount: 28,
      rating: 4.6,
      reviews: 234,
      badge: 'Nouveau',
      category: 'Électronique'
    },
    {
      id: 6,
      name: 'Adidas Ultraboost 22',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      originalPrice: 72000,
      salePrice: 58000,
      discount: 19,
      rating: 4.6,
      reviews: 167,
      badge: 'Populaire',
      category: 'Mode'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', {
      style: 'currency',
      currency: 'XOF'
    }).format(price);
  };

  return (
    <section className="py-12 bg-white">
      <div className="be-container">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Produits Vedettes
          </h2>
          <p className="text-lg text-gray-600">
            Produits sélectionnés avec les meilleures offres et qualité
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="be-card p-4 group hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative mb-4">
                <Link href={`/product/${product.id}`}>
                  <div className="aspect-square relative overflow-hidden rounded-lg">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
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
                <div className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center space-x-2 transition-opacity duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <Button size="sm" variant="outline" className="p-2 bg-white hover:bg-gray-100">
                    <Heart size={16} />
                  </Button>
                  <Button size="sm" className="p-2 be-primary">
                    <ShoppingCart size={16} />
                  </Button>
                  <Button size="sm" variant="outline" className="p-2 bg-white hover:bg-gray-100">
                    <Eye size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-xs text-[#EA580C] font-medium">
                  {product.category}
                </div>
                
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
      </div>
    </section>
  );
};

export default FeaturedProducts;