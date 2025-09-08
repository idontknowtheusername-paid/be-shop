'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Heart, ShoppingCart, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SwipeGestures from '@/components/ui/swipe-gestures';
import PullToRefresh from '@/components/ui/pull-to-refresh';
import InfiniteScroll from '@/components/ui/infinite-scroll';
import AnimatedSection from '@/components/ui/animated-section';

const InteractiveDemo = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: 650000,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      badge: 'NOUVEAU'
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      price: 580000,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      badge: 'HOT'
    },
    {
      id: 3,
      name: 'MacBook Air M2',
      price: 850000,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
      badge: 'LIMITÉ'
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [swipeCount, setSwipeCount] = useState(0);

  const handleRefresh = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const handleLoadMore = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Add more products
    const newProducts = Array.from({ length: 6 }, (_, i) => ({
      id: products.length + i + 1,
      name: `Produit ${products.length + i + 1}`,
      price: Math.floor(Math.random() * 500000) + 100000,
      rating: Math.random() * 2 + 3,
      image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
      badge: ['NOUVEAU', 'HOT', 'LIMITÉ', 'SOLDES'][Math.floor(Math.random() * 4)]
    }));
    
    setProducts(prev => [...prev, ...newProducts]);
    
    if (products.length > 20) {
      setHasMore(false);
    }
    
    setIsLoading(false);
  };

  const handleSwipe = (direction: string) => {
    setSwipeCount(prev => prev + 1);
    console.log(`Swiped ${direction}! Count: ${swipeCount + 1}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-BJ', {
      style: 'currency',
      currency: 'XOF'
    }).format(price);
  };

  const renderProduct = (product: any, index: number) => (
    <SwipeGestures
      key={product.id}
      onSwipeLeft={() => handleSwipe('left')}
      onSwipeRight={() => handleSwipe('right')}
      onSwipeUp={() => handleSwipe('up')}
      onSwipeDown={() => handleSwipe('down')}
      className="group"
    >
      <motion.div
        className="be-card p-4 hover:shadow-xl transition-all duration-300"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative mb-4">
          <div className="aspect-square relative overflow-hidden rounded-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <Badge className="absolute top-2 left-2 bg-[#EA580C] text-white text-xs">
            {product.badge}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <h3 className="font-medium text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          
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
            <span className="text-xs text-gray-600">({product.rating.toFixed(1)})</span>
          </div>
          
          <div className="text-lg font-bold text-[#EA580C]">
            {formatPrice(product.price)}
          </div>
          
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="flex-1">
              <Heart className="h-4 w-4" />
            </Button>
            <Button size="sm" className="flex-1 be-primary">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </SwipeGestures>
  );

  return (
    <AnimatedSection direction="up" delay={0.2}>
      <section className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="be-container">
          <AnimatedSection direction="fade" delay={0.4}>
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#1E40AF] to-[#3B82F6] rounded-full mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Démo Interactive
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                Testez les nouvelles fonctionnalités : Swipe, Pull-to-Refresh, Infinite Scroll
              </p>
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <RefreshCw className="h-4 w-4" />
                  <span>Pull-to-Refresh</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Zap className="h-4 w-4" />
                  <span>Swipe Gestures</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4" />
                  <span>Infinite Scroll</span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.6}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Produits avec Interactions Avancées
                </h3>
                <p className="text-gray-600 text-sm">
                  Swipez les cartes, tirez vers le bas pour actualiser, et faites défiler pour charger plus
                </p>
                {swipeCount > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-2"
                  >
                    <Badge className="bg-green-500 text-white">
                      {swipeCount} swipe(s) détecté(s)
                    </Badge>
                  </motion.div>
                )}
              </div>
              
              <PullToRefresh onRefresh={handleRefresh} className="max-h-96">
                <div className="p-6">
                  <InfiniteScroll
                    items={products}
                    renderItem={renderProduct}
                    loadMore={handleLoadMore}
                    hasMore={hasMore}
                    isLoading={isLoading}
                    className="max-h-80 overflow-y-auto"
                  />
                </div>
              </PullToRefresh>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </AnimatedSection>
  );
};

export default InteractiveDemo;

