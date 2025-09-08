'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart, ShoppingCart, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const TrendingProducts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const trendingProducts = [
    {
      id: 23,
      name: 'AirPods Pro 2ème Génération',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      originalPrice: 145000,
      salePrice: 125000,
      discount: 14,
      rating: 4.8,
      reviews: 567,
      badge: 'Tendance',
      trendingRank: 1
    },
    {
      id: 24,
      name: 'Console PlayStation 5',
      image: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg',
      originalPrice: 285000,
      salePrice: 265000,
      discount: 7,
      rating: 4.9,
      reviews: 412,
      badge: 'Chaud',
      trendingRank: 2
    },
    {
      id: 25,
      name: 'Appareil Photo Canon EOS R6',
      image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
      originalPrice: 1250000,
      salePrice: 1150000,
      discount: 8,
      rating: 4.7,
      reviews: 234,
      badge: 'Professionnel',
      trendingRank: 3
    },
    {
      id: 26,
      name: 'Nintendo Switch OLED',
      image: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg',
      originalPrice: 185000,
      salePrice: 165000,
      discount: 11,
      rating: 4.6,
      reviews: 345,
      badge: 'Gaming',
      trendingRank: 4
    },
    {
      id: 27,
      name: 'Apple Watch Series 9',
      image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
      originalPrice: 225000,
      salePrice: 195000,
      discount: 13,
      rating: 4.8,
      reviews: 456,
      badge: 'Intelligent',
      trendingRank: 5
    },
    {
      id: 28,
      name: 'Aspirateur Dyson V15',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
      originalPrice: 385000,
      salePrice: 325000,
      discount: 16,
      rating: 4.7,
      reviews: 289,
      badge: 'Innovation',
      trendingRank: 6
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', {
      style: 'currency',
      currency: 'XOF'
    }).format(price);
  };

  const itemsToShow = 4;
  const maxIndex = Math.max(0, trendingProducts.length - itemsToShow);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(timer);
  }, [isAutoPlaying, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
    setIsAutoPlaying(false);
  };

  return (
    <section className="py-12 bg-gradient-to-br from-[#1E40AF] via-[#3B82F6] to-[#1E40AF]">
      <div className="be-container">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold flex items-center mb-2">
              <TrendingUp className="mr-3 text-[#EA580C]" size={36} />
              Tendance Actuelle
            </h2>
            <p className="text-lg opacity-90">
              Produits les plus populaires cette semaine
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-2 bg-white bg-opacity-20 border-white text-white hover:bg-white hover:text-[#1E40AF]"
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentIndex === maxIndex}
              className="p-2 bg-white bg-opacity-20 border-white text-white hover:bg-white hover:text-[#1E40AF]"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
          >
            {trendingProducts.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 px-2"
              >
                <div className="bg-white rounded-lg p-4 h-full group hover:shadow-2xl transition-all duration-300 relative">
                  {/* Trending Rank */}
                  <div className="absolute -top-2 -left-2 bg-[#EA580C] text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm z-10">
                    #{product.trendingRank}
                  </div>
                  
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

        {/* Indicators */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: maxIndex + 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;