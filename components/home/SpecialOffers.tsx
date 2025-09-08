'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, Eye, Clock, TrendingUp, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

const SpecialOffers = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const specialOffers = [
    {
      id: 1,
      title: 'Deal du Jour',
      subtitle: 'Offre limitée dans le temps',
      icon: Clock,
      color: 'bg-red-500',
      bgGradient: 'from-red-500 to-red-700',
      products: [
        {
          id: 1,
          name: 'iPhone 15 Pro Max 256GB',
          image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
          originalPrice: 650000,
          salePrice: 450000,
          discount: 31,
          rating: 4.8,
          reviews: 256,
          badge: 'LIMITÉ'
        },
        {
          id: 2,
          name: 'Samsung Galaxy S24 Ultra',
          image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
          originalPrice: 580000,
          salePrice: 420000,
          discount: 28,
          rating: 4.7,
          reviews: 189,
          badge: 'HOT'
        }
      ]
    },
    {
      id: 2,
      title: 'Tendances du Moment',
      subtitle: 'Les produits les plus populaires',
      icon: TrendingUp,
      color: 'bg-blue-500',
      bgGradient: 'from-blue-500 to-blue-700',
      products: [
        {
          id: 3,
          name: 'Nike Air Max 270',
          image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
          originalPrice: 65000,
          salePrice: 45000,
          discount: 31,
          rating: 4.6,
          reviews: 128,
          badge: 'TRENDING'
        },
        {
          id: 4,
          name: 'Adidas Ultraboost 22',
          image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
          originalPrice: 72000,
          salePrice: 52000,
          discount: 28,
          rating: 4.5,
          reviews: 95,
          badge: 'POPULAR'
        }
      ]
    },
    {
      id: 3,
      title: 'Meilleures Notes',
      subtitle: 'Produits les mieux évalués',
      icon: Award,
      color: 'bg-green-500',
      bgGradient: 'from-green-500 to-green-700',
      products: [
        {
          id: 5,
          name: 'MacBook Air M2',
          image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
          originalPrice: 850000,
          salePrice: 750000,
          discount: 12,
          rating: 4.9,
          reviews: 89,
          badge: 'TOP RATED'
        },
        {
          id: 6,
          name: 'Sony WH-1000XM5',
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
          originalPrice: 95000,
          salePrice: 78000,
          discount: 18,
          rating: 4.8,
          reviews: 234,
          badge: 'BESTSELLER'
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
    <section className="py-12 bg-white">
      <div className="be-container">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Offres Spéciales
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez nos offres exclusives et produits recommandés
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {specialOffers.map((offer) => (
            <Card key={offer.id} className="overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Header */}
              <div className={`bg-gradient-to-r ${offer.bgGradient} p-6 text-white`}>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-white bg-opacity-20 rounded-lg">
                    <offer.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{offer.title}</h3>
                    <p className="text-sm opacity-90">{offer.subtitle}</p>
                  </div>
                </div>
                
                {offer.id === 1 && (
                  <div className="mt-4 p-3 bg-white bg-opacity-20 rounded-lg">
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{timeLeft.hours}</div>
                        <div className="text-xs opacity-80">Heures</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{timeLeft.minutes}</div>
                        <div className="text-xs opacity-80">Min</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{timeLeft.seconds}</div>
                        <div className="text-xs opacity-80">Sec</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Products */}
              <CardContent className="p-6">
                <div className="space-y-4">
                  {offer.products.map((product) => (
                    <div key={product.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="relative">
                        <Link href={`/products/${product.id}`}>
                          <div className="w-16 h-16 relative overflow-hidden rounded-lg">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        </Link>
                        <Badge className={`absolute -top-2 -right-2 ${offer.color} text-white text-xs px-2 py-1`}>
                          {product.badge}
                        </Badge>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <Link href={`/products/${product.id}`}>
                          <h4 className="font-medium text-gray-900 hover:text-[#1E40AF] transition-colors line-clamp-2">
                            {product.name}
                          </h4>
                        </Link>
                        
                        <div className="flex items-center space-x-1 mt-1">
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
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <div className="text-lg font-bold text-[#EA580C]">
                            {formatPrice(product.salePrice)}
                          </div>
                          <div className="text-sm text-gray-500 line-through">
                            {formatPrice(product.originalPrice)}
                          </div>
                          <Badge className="bg-red-500 text-white text-xs">
                            -{product.discount}%
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
                        <Button size="sm" variant="outline" className="p-2">
                          <Heart size={16} />
                        </Button>
                        <Button size="sm" className="p-2 be-primary">
                          <ShoppingCart size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6">
                  <Button asChild className="w-full be-button-primary">
                    <Link href={`/offers/${offer.id}`}>
                      Voir toutes les offres
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Flash Sale Banner */}
        <div className="mt-12 relative overflow-hidden rounded-2xl">
          <div className="bg-gradient-to-r from-[#EA580C] to-[#FB923C] p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-white bg-opacity-20 rounded-full">
                  <Zap className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Vente Flash</h3>
                  <p className="text-lg opacity-90">Jusqu'à 70% de réduction</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold mb-2">
                  {timeLeft.hours}:{timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}
                </div>
                <p className="text-sm opacity-80">Temps restant</p>
              </div>
            </div>
            <Button asChild className="mt-6 bg-white text-[#EA580C] hover:bg-gray-100">
              <Link href="/flash-sales">
                Découvrir les offres flash
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;

