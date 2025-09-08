'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Clock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const FlashSales = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
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

  const flashProducts = [
    {
      id: 1,
      name: 'Samsung Galaxy A54 5G',
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      originalPrice: 185000,
      salePrice: 145000,
      discount: 22,
      rating: 4.5,
      reviews: 342,
      stock: 15
    },
    {
      id: 2,
      name: 'Nike Air Max 270',
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      originalPrice: 65000,
      salePrice: 48000,
      discount: 26,
      rating: 4.7,
      reviews: 128,
      stock: 8
    },
    {
      id: 3,
      name: 'Apple MacBook Air M2',
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
      originalPrice: 850000,
      salePrice: 720000,
      discount: 15,
      rating: 4.9,
      reviews: 89,
      stock: 3
    },
    {
      id: 4,
      name: 'Sony WH-1000XM5',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
      originalPrice: 95000,
      salePrice: 68000,
      discount: 28,
      rating: 4.6,
      reviews: 234,
      stock: 12
    },
    {
      id: 5,
      name: 'HP Pavilion Gaming',
      image: 'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg',
      originalPrice: 450000,
      salePrice: 385000,
      discount: 14,
      rating: 4.4,
      reviews: 156,
      stock: 6
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', {
      style: 'currency',
      currency: 'XOF'
    }).format(price);
  };

  return (
    <section className="py-12 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6]">
      <div className="be-container">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="text-white mb-4 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold flex items-center">
              ⚡ Ventes Flash
            </h2>
            <p className="text-lg opacity-90 mt-2">Offres limitées - Ne manquez pas !</p>
          </div>
          
          {/* Countdown Timer */}
          <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-2 text-white mb-2">
              <Clock size={20} />
              <span className="font-medium">Se termine dans :</span>
            </div>
            <div className="flex space-x-2">
              <div className="bg-white text-[#1E40AF] px-3 py-2 rounded font-bold min-w-[50px] text-center">
                <div className="text-xl">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-xs">H</div>
              </div>
              <div className="bg-white text-[#1E40AF] px-3 py-2 rounded font-bold min-w-[50px] text-center">
                <div className="text-xl">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-xs">MIN</div>
              </div>
              <div className="bg-white text-[#1E40AF] px-3 py-2 rounded font-bold min-w-[50px] text-center">
                <div className="text-xl">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-xs">SEC</div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {flashProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="bg-white rounded-lg p-4 hover:shadow-lg transition-shadow group"
            >
              <div className="relative mb-3">
                <div className="aspect-square relative overflow-hidden rounded-lg">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <Badge className="absolute top-2 left-2 bg-[#EA580C] text-white">
                  -{product.discount}%
                </Badge>
                {product.stock < 10 && (
                  <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                    {product.stock} restant
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-sm line-clamp-2 group-hover:text-[#1E40AF]">
                  {product.name}
                </h3>
                
                <div className="flex items-center space-x-1">
                  <Star size={14} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-xs text-gray-600">
                    {product.rating} ({product.reviews})
                  </span>
                </div>
                
                <div className="space-y-1">
                  <div className="text-lg font-bold text-[#EA580C]">
                    {formatPrice(product.salePrice)}
                  </div>
                  <div className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Button asChild className="be-button-secondary text-lg px-8 py-3 h-auto">
            <Link href="/flash-sales">Voir toutes les ventes flash</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FlashSales;