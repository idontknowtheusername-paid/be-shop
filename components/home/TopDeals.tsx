'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart, ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TopDeals = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const topDeals = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max 256GB',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      originalPrice: 650000,
      salePrice: 580000,
      discount: 11,
      rating: 4.8,
      reviews: 256,
      badge: 'Meilleur Vendeur'
    },
    {
      id: 2,
      name: 'Nike Air Force 1 Low',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      originalPrice: 55000,
      salePrice: 42000,
      discount: 24,
      rating: 4.6,
      reviews: 189,
      badge: 'Limité'
    },
    {
      id: 3,
      name: 'Dell XPS 13 Laptop',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
      originalPrice: 750000,
      salePrice: 650000,
      discount: 13,
      rating: 4.7,
      reviews: 145,
      badge: 'Mieux Noté'
    },
    {
      id: 4,
      name: 'Samsung 55" 4K Smart TV',
      image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg',
      originalPrice: 320000,
      salePrice: 275000,
      discount: 14,
      rating: 4.5,
      reviews: 203,
      badge: 'Offre Chaud'
    },
    {
      id: 5,
      name: 'Adidas Ultraboost 22',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      originalPrice: 72000,
      salePrice: 58000,
      discount: 19,
      rating: 4.6,
      reviews: 167,
      badge: 'Nouveau'
    },
    {
      id: 6,
      name: 'Sony PlayStation 5',
      image: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg',
      originalPrice: 285000,
      salePrice: 265000,
      discount: 7,
      rating: 4.9,
      reviews: 412,
      badge: 'Chaud'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', {
      style: 'currency',
      currency: 'XOF'
    }).format(price);
  };

  const itemsToShow = 4;
  const maxIndex = Math.max(0, topDeals.length - itemsToShow);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-12">
      <div className="be-container">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Meilleures Offres
            </h2>
            <p className="text-lg text-gray-600">
              Meilleurs prix sur les produits tendance
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-2"
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className="p-2"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>

        {/* Products Slider */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
          >
            {topDeals.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2"
              >
                <div className="be-card p-4 h-full group hover:shadow-lg transition-all duration-300">
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
                      <Badge className="absolute top-2 left-2 bg-[#EA580C] text-white">
                        {product.badge}
                      </Badge>
                    )}
                    
                    {product.discount > 0 && (
                      <Badge className="absolute top-2 right-2 bg-red-500 text-white">
                        -{product.discount}%
                      </Badge>
                    )}
                    
                    {/* Quick Actions */}
                    <div className="absolute bottom-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="outline" className="p-2 bg-white hover:bg-gray-100">
                        <Heart size={16} />
                      </Button>
                      <Button size="sm" className="p-2 be-primary">
                        <ShoppingCart size={16} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-medium line-clamp-2 hover:text-[#1E40AF] transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    
                    <div className="flex items-center space-x-1">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i < Math.floor(product.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({product.reviews})
                      </span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-[#EA580C]">
                          {formatPrice(product.salePrice)}
                        </span>
                        {product.originalPrice > product.salePrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <Button className="w-full be-button-primary">
                      Ajouter au Panier
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button asChild variant="outline" className="text-lg px-8 py-3 h-auto border-[#1E40AF] text-[#1E40AF] hover:bg-[#1E40AF] hover:text-white">
            <Link href="/deals">Voir toutes les offres</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TopDeals;